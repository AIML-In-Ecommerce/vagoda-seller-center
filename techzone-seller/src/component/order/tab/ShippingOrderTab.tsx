'use client'

import { currencyFormater, datetimeFormaterShort, MyLocaleRef } from "@/component/util/MyFormater"
import { OrderPropType } from "@/model/OrderPropType"
import { Button, Divider, Flex, Table, TableColumnType, Tag, Tooltip, Typography } from "antd"
import { useContext, useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import OrderFilterPool, { OrderFilterPoolCallbackProps } from "../util/OrderFilterPool"
import { TableRowSelection } from "antd/es/table/interface"
import OrderDetailDrawer from "../util/OrderDetailDrawer"
import { ShippingOrderPoolSetting } from "@/component_config/order/filter_pool/ShippingOrderPoolSetting"
import { AuthContext } from "@/context/AuthContext"
import OrderService from "@/services/order.service"
import { NotificationContext } from "@/context/NotificationContext"


interface ShippingOrderTabProps
{
    tabKey: string,
    dataSource: OrderPropType[],
    askToRefreshData: (tabKey: string) => void
}

enum StatusType
{
    PENDING,
    EXPIRED
}

interface DisplayStatus
{
    name: string,
    type: StatusType
}

interface CoordinateInOrder
{
    lng: number,
    lat: number
}

interface ShippingOrder
{
    key: string,
    status: DisplayStatus,
    delivery:
    {
        receiverName: string,
        address: string,
        phoneNumber: string,
        coordinate: CoordinateInOrder | null,
        label: string,
        isDefault: boolean
    }
    time:
    {
        orderTime: string,
        deadline: string
    },
    price:
    {
        totalProduct: number,
        shippingFee: string,
        totalPrice: string,
        profit: string
    },

}

const filterPoolSetting = ShippingOrderPoolSetting

const OrderValueTooltip = 
<Flex vertical>
    <Typography.Text className="text-sm text-white">
        Giá trị = Tổng giá trị đơn hàng + Phí ship - Giảm giá
    </Typography.Text>
    <Typography.Text className="text-sm text-white">
        Doanh thu = Giá trị - Phí nền tảng
    </Typography.Text>
</Flex>

const OrderTimeTooltip =
<Flex vertical>
    <Typography.Text className="text-sm text-white">
        Bắt đầu - thời gian đơn hàng bắt đầu được vận chuyển
    </Typography.Text>
</Flex>

export default function ShippingOrderTab({tabKey, dataSource, askToRefreshData}: ShippingOrderTabProps)
{
    const shippingTabFilterPoolKey = "shipping-tab-filter-pool-key"
    const [data, setData] = useState<OrderPropType[]>(dataSource)
    const [dataToDisplay, setDataToDisplay] = useState<ShippingOrder[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])


    const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderPropType | null>(null)
    const [orderDetailOpen, setOrderDetailOpen] = useState<boolean>(false) 

    const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])

    const authContext = useContext(AuthContext)

    const notificationContext = useContext(NotificationContext)

    useEffect(() =>
    {
        setData(dataSource)
    }, [dataSource])

    const dataColumns: TableColumnType<ShippingOrder>[] = 
    [
        {
            title: "Mã đơn hàng",
            dataIndex: "key",
            render: (value: any, record: ShippingOrder, index: number) =>
            {
                if(value)
                {}
                const display = () =>
                {
                    let statusDisplay = <></>
                    switch(record.status.type)
                    {
                        case StatusType.PENDING:
                            {
                                statusDisplay = <Tag key={record.status.name+index.toString()+"-"+Date.now().toString()} color={"geekblue"}>{record.status.name}</Tag>
                                break;
                            }
                        case StatusType.EXPIRED:
                            {
                                statusDisplay = <Tag key={record.status.name+index.toString()+"-"+Date.now().toString()} color={"orange"}>{record.status.name}</Tag>
                            }
                    }
                    return statusDisplay
                }
                
                return(
                    <Flex vertical wrap={"wrap"} gap={4} justify="center" align="center">
                        <Typography.Text>
                            {record.key}
                        </Typography.Text>
                        {display()}
                    </Flex>
                )
            }
        },
        {
            title: "Vận chuyển đến",
            dataIndex: "delivery",
            render: (value: any, record: ShippingOrder) =>
            {
                if(value)
                {}

                return(
                    <Flex vertical justify="center" align="start" wrap={"wrap"}>
                        <div>
                            <Flex gap={2} align="baseline">
                                <Typography.Text className="text-sm">
                                    {record.delivery.receiverName}
                                </Typography.Text>
                                - 
                                <Typography.Text className="text-blue-600">
                                    {record.delivery.phoneNumber}
                                </Typography.Text>
                            </Flex>
                            <Flex gap={2}>
                                <Typography.Text className="text-xs text-gray-400">
                                    {record.delivery.address}
                                </Typography.Text>
                            </Flex>
                        </div>
                    </Flex>
                )
            }
        },
        {
            title: <Flex align="center" gap={4}>
                    <Typography.Text>Thời gian xử lý</Typography.Text>
                    <Tooltip title={OrderTimeTooltip}>
                        <BiInfoCircle />
                    </Tooltip>
                </Flex>,
            dataIndex: "time",
            render: (value:any, record: ShippingOrder) =>
            {
                if(value){}

                return(
                    <Flex vertical className="w-full" justify="start" align="start" gap={4}>
                        <Flex align="center">
                            <Tag color={"blue-inverse"}>
                                Bắt đầu
                            </Tag>
                            <Typography.Text>
                                {record.time.orderTime}
                            </Typography.Text>
                        </Flex>
                        {/* <Flex align="center">
                            <Tag color={"orange-inverse"}>
                                Hạn
                            </Tag>
                            <Typography.Text>
                                {record.time.deadline}
                            </Typography.Text>
                        </Flex> */}
                    </Flex>
                )
            }
        },
        {
            title: <Flex align="center" gap={4}>
                    <Typography.Text>Giá trị</Typography.Text>
                    <Tooltip title={OrderValueTooltip}>
                        <BiInfoCircle />
                    </Tooltip>
                </Flex>,
            dataIndex: "price",
            render: (value: any, record: ShippingOrder) =>
            {
                if(value){}

                return(
                    <Flex vertical justify="start" align="start" gap={2}>
                        <Flex justify="start" align="center">
                            <Tag color="geekblue">
                                Số sản phẩm:  
                                <Typography.Text className="ml-1 text-xs">
                                    {record.price.totalProduct} 
                                </Typography.Text>
                            </Tag>
                        </Flex>
                        <Typography.Text className="text-sm text-gray-500">
                            Giá trị: {record.price.totalPrice}
                        </Typography.Text>
                        <Typography.Text className="text-sm text-gray-500">
                            Ship: {record.price.shippingFee}
                        </Typography.Text>
                        <Typography.Text className="text-sm">
                            Doanh thu: {record.price.profit}
                        </Typography.Text>
                    </Flex>
                )
            }
        },
        {
            title: "Thao tác",
            dataIndex: "",
            key: "action",
            render: (record: ShippingOrder) =>
            {
                return(
                    <Flex vertical justify="start" align="center">
                        <Button type={"text"} onClick={() => {handleOpenOrderDetail(record.key)}}>
                            Xem chi tiết
                        </Button>
                    </Flex>
                )
            }
        }
    ]

    useEffect(() =>
    {
        if(data.length == 0)
        {
            setDataToDisplay([])
        }
        else
        {
            const display = data.map((value: OrderPropType) =>
            {
                let totalProducts = 0;
                value.products.forEach((selection) =>
                {
                    totalProducts += selection.quantity
                })
    
                let orderStatus: DisplayStatus =
                {
                    name: "Đang chờ",
                    type: StatusType.PENDING
                }
    
                const item: ShippingOrder =
                {
                    key: value._id,
                    status: orderStatus,
                    delivery: {
                        receiverName: value.shippingAddress.receiverName,
                        address: value.shippingAddress.street,
                        phoneNumber: value.shippingAddress.phoneNumber,
                        coordinate: value.shippingAddress.coordinate,
                        label: value.shippingAddress.label,
                        isDefault: value.shippingAddress.isDefault
                    },
                    time: {
                        orderTime: datetimeFormaterShort(MyLocaleRef.VN, value.orderStatus[value.orderStatus.length - 1].time),
                        deadline: datetimeFormaterShort(MyLocaleRef.VN, value.orderStatus[value.orderStatus.length - 1].deadline)
                    },
                    price: {
                        totalProduct: totalProducts,
                        shippingFee: currencyFormater(MyLocaleRef.VN, value.shippingFee),
                        totalPrice: currencyFormater(MyLocaleRef.VN, value.totalPrice),
                        profit: currencyFormater(MyLocaleRef.VN, value.profit)
                    }
                }
    
                return item
            })
    
            setDataToDisplay(display)
    
        }
    },
    [data])

    function handleFilterCallback(resutl: OrderFilterPoolCallbackProps)
    {
        setData(resutl.filterData)
    }

    function handleOpenOrderDetail(selectedOrderId: string)
    {
        const orderDetail = dataSource.find((value: OrderPropType) => value._id == selectedOrderId)
        if(orderDetail == undefined)
        {
            setSelectedOrderDetail(null)
        }
        else
        {
            setSelectedOrderDetail(orderDetail)
        }
        setOrderDetailOpen(true)
    }

    function handleOrderDetailDrawerOnClose(params: any | null)
    {
        if (params == null){}

        setSelectedOrderDetail(null)
        setOrderDetailOpen(false)
    }

    async function handleConfirmOrderOnClick(params: any)
    {
        const targetOrderId = params as string
        //TODO: call api to update order status here
        if(authContext.shopInfo == null)
        {
            return
        }

        const isUpdateSuccessfully = await OrderService.updateOneOrderStatus(authContext.shopInfo._id as string,
        targetOrderId)
        if(isUpdateSuccessfully == null)
        {
            notificationContext?.notificationAPI.error({
                message: "Xác nhận vận chuyển thất bái",
                description: `Không thể xác nhận vận chuyển đơn hàng ${targetOrderId}`,
                placement: "top"
            })
        }
        else if(isUpdateSuccessfully == true)
        {
            notificationContext?.notificationAPI.success({
                message: "Xác nhận vận chuyển thành công",
                description: `Xác nhận vận chuyển đơn hàng${targetOrderId}`,
                placement: "top"
            })
            askToRefreshData(tabKey)
        }
    }

    async function handleCancelOrderOnClick(params: any)
    {
        const targetOrderId = params as string
        //TODO: call api to update order status here
        if(authContext.shopInfo == null)
        {
            return
        }

        // const isUpdateSuccessfully = await OrderService.cancelOneOrderStatus(authContext.shopInfo._id as string,
        // targetOrderId)
        // if(isUpdateSuccessfully == null)
        // {

        // }
        // else if(isUpdateSuccessfully == true)
        // {
        //     askToRefreshData(tabKey)
        // }
    }

    function handleSelectedRowKeysOnChange(newSelectedRowKeys: React.Key[], selectedRows: ShippingOrder[])
    {
        setSelectedRowKeys(newSelectedRowKeys)
        const selectedOrderIds: string[] = selectedRows.map((value: ShippingOrder) =>
        {
            return value.key
        })
        setSelectedOrderIds(selectedOrderIds)
    }

    async function handleConfirmManyOrder(soids: string[])
    {
        if(authContext.shopInfo == null)
        {
            return
        }

        const isUpdateSuccessfully = await OrderService.updateManyOrdersStatus(authContext.shopInfo._id as string, soids)
        if(isUpdateSuccessfully == null)
        {
            notificationContext?.notificationAPI.error({
                message: "Xác nhận vận chuyển thất bại",
                description: "Không thể xác nhận vận chuyển cho các đơn hàng đã chọn",
                placement: "top"
            })
        }
        else if(isUpdateSuccessfully == true)
        {
            notificationContext?.notificationAPI.success({
                message: "Xác nhận vận chuyển thành công",
                description: "Xác nhận vận chuyển cho các đơn hàng đã chọn",
                placement: "top"
            })
            askToRefreshData(tabKey)
        }

    }

    const rowSelection: TableRowSelection<ShippingOrder> = 
    {
        selectedRowKeys: selectedRowKeys,
        onChange: handleSelectedRowKeysOnChange
    }

    return(
        <>
            <Flex vertical className="w-full mb-2" justify="center" align="center">
                <OrderFilterPool poolKey={shippingTabFilterPoolKey} filterPoolSetting={filterPoolSetting} dataSource={dataSource} filterCallback={handleFilterCallback} />
            </Flex>

            <Divider />

            <Flex className="mb-3" justify="start" align="center" gap={6}>
                <Flex justify="start" align="baseline" gap={4}>
                    <Typography.Text className="text-lg font-semibold">
                        Đơn hàng:
                    </Typography.Text>
                    <Typography.Text className="text-lg">
                        {data.length}
                    </Typography.Text>
                </Flex>
                <Divider type="vertical" />
                {
                    selectedOrderIds.length > 0 ?
                    <Button onClick={() => handleConfirmManyOrder(selectedOrderIds)}>Xác nhận hàng loạt</Button>:
                    <Button disabled>Xác nhận hàng loạt</Button>
                }
            </Flex>

            <Table rowSelection={rowSelection} 
                columns={dataColumns} 
                scroll={{x: 550, y: 600}}
                dataSource={dataToDisplay} showHeader/>

            
            <OrderDetailDrawer open={orderDetailOpen} orderProps={selectedOrderDetail} onCloseCallback={handleOrderDetailDrawerOnClose} 
            confirmButtonActive cancelButtonActive
            confirmButtonOnClick={handleConfirmOrderOnClick} cancelButtonOnClick={handleCancelOrderOnClick}
            />
        </>
    )
}