'use client'

import { currencyFormater, datetimeFormaterShort, MyLocaleRef } from "@/component/util/MyFormater"
import { OrderPropType, OrderStatus, OrderStatusValues, ProductInOrder, PromotionInOrder, PromotionTypeConvention } from "@/model/OrderPropType"
import { Button, Card, Col, Divider, Drawer, Flex, Image, Row, Tag, Timeline, TimelineItemProps, Tooltip, Typography } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import { SlSizeActual, SlSizeFullscreen } from "react-icons/sl"


interface OrderDetailDrawerProps
{
    open: boolean,
    orderProps: OrderPropType | null,
    onCloseCallback: (params: any | null) => void,
    confirmButtonOnClick: (params: any) => void ,
    cancelButtonOnClick: (params: any) => void
    confirmButtonActive: boolean,
    cancelButtonActive: boolean
}


export default function OrderDetailDrawer({open, orderProps, onCloseCallback, confirmButtonOnClick, cancelButtonOnClick, confirmButtonActive, cancelButtonActive}: OrderDetailDrawerProps)
{
    const [orderInfoDisplay, setOrderInfoDisplay] = useState<JSX.Element>(<></>)
    const [isLargeSize, setIsLargeSize] = useState<boolean>(false)

    function getOrderStatusTimeline(statusList: OrderStatus[])
    {
        let result: any[] = []

        statusList.forEach((value: OrderStatus) =>
        {
            let label = ""
            let color = "blue"
            let childContent = ""
            let startTime: string = datetimeFormaterShort(MyLocaleRef.VN, value.time)
            let endTime: string = ""

            if(value.status == OrderStatusValues.PENDING)
            {
                label =  "Chờ xác nhận"
            }
            else if(value.status == OrderStatusValues.PROCESSING)
            {
                label = "Đang xử lý"
            }
            else if (value.status == OrderStatusValues.SHIPPING)
            {
                label = "Đang vận chuyển"
            }
            else if(value.status == OrderStatusValues.COMPLETED)
            {
                label = "Đã giao hàng"
            }
            else if(value.status == OrderStatusValues.CANCELLED)
            {
                label = "Đã hủy"
            }

            childContent = startTime + " - "

            if(value.complete != null)
            {
                if(value.complete > value.deadline && value.status != OrderStatusValues.SHIPPING)
                {
                    color = "orange"
                }
                else
                {
                    color = "green"
                }
                
                endTime = datetimeFormaterShort(MyLocaleRef.VN, value.complete)

                childContent = childContent.concat(endTime)
            }
            else
            {
                endTime = "..."
                childContent = childContent.concat(endTime)
            }

            let tooltipTitleStatusPart = <></>

            if(color == "orange")
            {
                tooltipTitleStatusPart = <Typography.Text className="text-sm text-white">Tình trạng: bị trễ</Typography.Text>
            }
            else if(color == "green")
            {
                tooltipTitleStatusPart = <Typography.Text className="text-sm text-white">Tình trạng: đúng hạn</Typography.Text>
            }
            else if(color == "blue")
            {
                tooltipTitleStatusPart = <Typography.Text className="text-sm text-white">Tình trạng: đang chờ</Typography.Text>
            }

            
            const tooltipTitle = 
            <Flex vertical>
                <Typography.Text className="text-sm text-white">
                    {label}:
                </Typography.Text>
                <Typography.Text className="text-sm text-white">
                    Bắt đầu lúc: {startTime}
                </Typography.Text>
                <Typography.Text className="text-sm text-white">
                    Hoàn thành lúc: {endTime}
                </Typography.Text>
                {tooltipTitleStatusPart}
            </Flex>

            const processingDot = 
            {
                label: label,
                dot: undefined,
                color: color,
                children: <>
                    <Tooltip trigger={"hover"} title={tooltipTitle}>
                        <Typography.Text className="w-full">{childContent}</Typography.Text>
                    </Tooltip>
                </>
            }

            result.push(processingDot)
        })

        return result
    }

    function getCurrentOrderStatus(orderStatus: OrderStatus[])
    {
        const latestStatus = orderStatus[orderStatus.length - 1].status

        if(latestStatus == OrderStatusValues.PENDING)
        {
            return "Chờ xác nhận"
        }
        else if(latestStatus == OrderStatusValues.PROCESSING)
        {
            return "Chờ xử lý"
        }
        else if(latestStatus == OrderStatusValues.SHIPPING)
        {
            return "Chờ vận chuyển"
        }
        else if(latestStatus == OrderStatusValues.COMPLETED)
        {
            return "Đã giao"
        }
        else if(latestStatus == OrderStatusValues.CANCELLED)
        {
            return "Đã hủy"
        }
    }

    function getDiscountType(type: string)
    {
        if(type == PromotionTypeConvention.DIRECT_PRICE)
        {
            return "Giảm trực tiếp"
        }
        else if(type == PromotionTypeConvention.PERCENTAGE)
        {
            return "Giảm theo %"
        }
    }

    useEffect(() =>
    {
        if(orderProps == null)
        {
            setOrderInfoDisplay(<></>)
            return
        }

        let orderStatusTimeline = getOrderStatusTimeline(orderProps.orderStatus) as TimelineItemProps[]

        const display = 
        <>
            <Flex className="w-full" vertical justify="start" align="start">
                <Flex className="w-full" justify="start" align="center" gap={4}>
                    <Typography.Text className="font-semibold mr-2">
                        Mã đơn hàng:
                    </Typography.Text>
                    <Typography.Text className="text-blue-500">
                            {orderProps._id}
                        </Typography.Text>
                </Flex>
                <Divider />
                <Flex className="w-full" vertical justify="start" align="start">
                    <Flex className="w-full mb-4" justify="start" gap={4}>
                        <Typography.Text className="font-semibold text-sm">
                            Trạng thái:
                        </Typography.Text>
                        <Tag className="max-w-1/2">
                            {getCurrentOrderStatus(orderProps.orderStatus)}
                        </Tag>
                    </Flex>
                    <Timeline className="w-full" mode="left" items={orderStatusTimeline}/>
                </Flex>
                <Divider />
                <Flex className="w-full" vertical gap={4}>
                    <Tag className="w-fit" color={"geekblue"}>
                        Người đặt
                    </Tag>
                    <Flex gap={2}>
                        <Typography.Text>
                            {orderProps.user.name}
                        </Typography.Text>
                         - 
                        <Typography.Text className="text-blue-500">
                            {orderProps.user.phoneNumber}
                        </Typography.Text>
                    </Flex>
                    <Tag color="success" className="w-fit mt-2">
                        Người nhận
                    </Tag>
                    <Flex vertical>
                        <Flex gap={2}>
                            <Typography.Text>
                                {orderProps.address.receiverName}
                            </Typography.Text>
                            - 
                            <Typography.Text className="text-blue-500">
                                {orderProps.address.phoneNumber}
                            </Typography.Text>
                        </Flex>
                        <Flex justify="start" align="center" wrap="wrap" gap={2}>
                            <Typography.Text className="text-gray-400 text-xs">
                                {orderProps.address.address}
                            </Typography.Text>
                             - 
                            <Tag color="orange">
                                {orderProps.address.label}
                            </Tag>
                        </Flex>
                    </Flex>
                </Flex>
                <Divider />
                <Flex gap={4} align="baseline" className="w-full mb-2">
                    <Flex className="mr-4" justify="start">
                        <Typography.Text className="font-semibold">
                            Shop id: 
                        </Typography.Text>
                    </Flex>
                    <Link className="text-gray-400 text-md" href={"#"} prefetch={false}>
                            {orderProps.shopId}
                    </Link>
                </Flex>
                <Row className="w-full bg-gray-300 font-semibold my-2 px-2">
                    <Col span={10}>
                        <Typography.Text>Tên sản phẩm</Typography.Text>
                    </Col>
                    <Col span={10}>
                        <Typography.Text>Giá đã mua</Typography.Text>
                    </Col>
                    <Col span={4}>
                        <Typography.Text>Số lượng</Typography.Text>
                    </Col>
                </Row>
                <Flex className="w-full max-h-60 min-h-20 overflow-auto px-2" vertical align="center" justify="start">
                        {orderProps.product.map((product: ProductInOrder) =>
                        {
                            
                            return(
                                <>
                                    <Row className="w-full border-b py-2">
                                        <Col span={10}>
                                            <Typography.Text>{product.name}</Typography.Text>
                                        </Col>
                                        <Col span={10}>
                                            <Typography.Text>{currencyFormater(MyLocaleRef.VN, product.purchasedPrice)}</Typography.Text>
                                        </Col>
                                        <Col span={4}>
                                            <Typography.Text>{product.quantity}</Typography.Text>
                                        </Col>
                                    </Row>
                                </>
                            )
                        })}
                </Flex>
                <Row className="w-full bg-gray-300 font-semibold my-2 px-2">
                    <Col span={10}>
                        <Typography.Text>Tên giảm giá</Typography.Text>
                    </Col>
                    <Col span={10}>
                        <Typography.Text>Giá trị</Typography.Text>
                    </Col>
                    <Col span={4}>
                        <Typography.Text>Loại</Typography.Text>
                    </Col>
                </Row>
                <Flex vertical className="w-full min-h-20 overflow-auto px-2" align="center" justify="start">
                    {orderProps.promotion.map((promotion: PromotionInOrder) =>
                        {
                            
                            return(
                                <>
                                    <Row className="w-full border-b py-2">
                                        <Col span={10}>
                                            <Typography.Text>{promotion.name}</Typography.Text>
                                        </Col>
                                        <Col span={10}>
                                            <Typography.Text>{currencyFormater(MyLocaleRef.VN, promotion.discountValue)}</Typography.Text>
                                        </Col>
                                        <Col span={4}>
                                            <Typography.Text>{getDiscountType(promotion.discountType)}</Typography.Text>
                                        </Col>
                                    </Row>
                                </>
                            )
                        })}
                </Flex>
                <Typography.Text className="font-semibold px-1">
                    Vận chuyển
                </Typography.Text>
                <Flex className="w-full">
                    <Row className="w-full px-1">
                        <Col span={12}>
                            Đơn vị đảm nhiệm:
                        </Col>
                        <Col span={12}>
                            <Flex justify="end" align="baseline">
                                {orderProps.shipping.name}
                            </Flex>
                        </Col>
                    </Row>
                </Flex>

                <Divider />

                <Typography.Text className="font-semibold px-1">
                    Tổng tính toán
                </Typography.Text>
                <Flex className="w-full" vertical justify="start" align="start">
                    <Row className="w-full border-b py-2 px-1">
                        <Col span={16}>
                            Giá trị đơn hàng:
                        </Col>
                        <Col span={8}>
                            <Flex className="w-full" justify="end" align="baseline">
                                {currencyFormater(MyLocaleRef.VN, orderProps.totalPrice.product)}
                            </Flex>
                        </Col>
                    </Row>
                    <Row className="w-full border-b py-2 px-1">
                        <Col span={16}>
                            Phí vận chuyển:
                        </Col>
                        <Col span={8}>
                            <Flex className="w-full" justify="end" align="baseline">
                                {currencyFormater(MyLocaleRef.VN, orderProps.totalPrice.shipping)}
                            </Flex>
                        </Col>
                    </Row>
                    <Row className="w-full border-b py-2 px-1">
                        <Col span={16}>
                            Giảm giá áp dụng:
                        </Col>
                        <Col span={8}>
                            <Flex className="w-full" justify="end" align="baseline">
                                {currencyFormater(MyLocaleRef.VN, orderProps.totalPrice.discount)}
                            </Flex>
                        </Col>
                    </Row>
                    <Row className="w-full border-b py-2 bg-gray-100 px-1">
                        <Col span={16}>
                            <Tag color="blue-inverse">Doanh thu</Tag>
                        </Col>
                        <Col span={8}>
                            <Flex className="w-full" justify="end" align="baseline">
                                {currencyFormater(MyLocaleRef.VN, orderProps.totalPrice.total)}
                            </Flex>
                        </Col>
                    </Row>
                    <Row className="w-full border-b py-2 bg-gray-100 px-1">
                        <Col span={16}>
                            <Tag color="gold-inverse">Lợi nhuận</Tag>
                        </Col>
                        <Col span={8}>
                            <Flex className="w-full" justify="end" align="baseline">
                                {currencyFormater(MyLocaleRef.VN, orderProps.totalPrice.profit)}
                            </Flex>
                        </Col>
                    </Row>
                </Flex>

                <Divider />

                <Typography.Text className="font-semibold px-1">
                    Phương thức thanh toán
                </Typography.Text>
                <Flex className="w-full bg-gray-200 py-2">
                    <Row className="w-full px-1">
                        <Col span={12}>
                            Đã lựa chọn:
                        </Col>
                        <Col span={12}>
                            <Flex justify="end" align="baseline">
                                {orderProps.paymentMethod.name}
                            </Flex>
                        </Col>
                    </Row>
                </Flex>
            </Flex>
        </>

        setOrderInfoDisplay(display)
    },
    [orderProps])

    function handleOnClose()
    {
        onCloseCallback(null)
    }

    const drawerSizeIcon = isLargeSize ? <SlSizeActual /> : <SlSizeFullscreen />
    const drawerSize = isLargeSize ? "large" : "default"

    function handleChangeDrawerSizeOnClick()
    {
        const nextState = !isLargeSize
        setIsLargeSize(nextState)
    }

    function handleConfirmButtonOnClick()
    {
        if(orderProps != null)
        {
            confirmButtonOnClick(orderProps._id)
        }
    }

    function handleCancelButtonOnClick()
    {
        if(orderProps != null)
        {
            cancelButtonOnClick(orderProps._id)
        }
    }

    const extra = 
    <>
        <Flex className="w-60" justify="space-evenly" align="center">
            <Button onClick={() => {handleChangeDrawerSizeOnClick()}}>
                {drawerSizeIcon}
            </Button>
            {
                confirmButtonActive ?             
                    <Button onClick={() => handleConfirmButtonOnClick()}>
                        Xác nhận
                    </Button> : <></>}
            {
                cancelButtonActive ? 
                <Button onClick={() => handleCancelButtonOnClick() }>
                    Hủy
                </Button>: <></>
            }
        </Flex>
    </>

    return(
        <Drawer
            open={open}
            placement={"right"}
            closable
            onClose={() => {handleOnClose()}}
            size={drawerSize}
            extra={extra}
        >
            {orderInfoDisplay}
        </Drawer>
    )
}