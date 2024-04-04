'use client'

import { currencyFormater, datetimeFormaterShort, MyLocaleRef } from "@/component/util/MyFormater"
import { OrderPropType } from "@/model/OrderPropType"
import { Button, Divider, Flex, Table, TableColumnType, Tag, Tooltip, Typography } from "antd"
import { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import OrderFilterPool, { OrderFilterPoolCallbackProps } from "../util/OrderFilterPool"
import { TableRowSelection } from "antd/es/table/interface"
import OrderDetailDrawer from "../util/OrderDetailDrawer"
import { CompletedOrderPoolSetting } from "@/component_config/order/filter_pool/CompletedOrderPoolSetting"


interface CompletedOrderTabProps
{
    dataSource: OrderPropType[]
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

interface CompletedOrder
{
    key: string,
    status: DisplayStatus,
    delivery:
    {
        receiverName: string,
        address: string,
        phoneNumber: string,
        coordinate:
        {
            lng: number,
            lat: number
        },
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

const OrderValueTooltip = 
<Flex vertical>
    <Typography.Text className="text-sm text-white">
        Giá trị = Tổng giá trị đơn hàng + Phí ship - Giảm giá
    </Typography.Text>
    <Typography.Text className="text-sm text-white">
        Doanh thu = Giá trị - Phí nền tảng
    </Typography.Text>
</Flex>

const filterPoolSetting = CompletedOrderPoolSetting

export default function CompletedOrderTab({dataSource}: CompletedOrderTabProps)
{
    const completedTabFilterPoolKey = "completed-tab-filter-pool-key"
    const [data, setData] = useState<OrderPropType[]>(dataSource)
    const [dataToDisplay, setDataToDisplay] = useState<CompletedOrder[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])


    const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderPropType | null>(null)
    const [orderDetailOpen, setOrderDetailOpen] = useState<boolean>(false) 

    const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])


    const dataColumns: TableColumnType<CompletedOrder>[] = 
    [
        {
            title: "Mã đơn hàng",
            dataIndex: "key",
            render: (value: any, record: CompletedOrder, index: number) =>
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
            render: (value: any, record: CompletedOrder) =>
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
            title: "Thời gian xác nhận",
            dataIndex: "time",
            render: (value:any, record: CompletedOrder) =>
            {
                if(value){}

                return(
                    <Flex vertical className="w-full" justify="start" align="start" gap={4}>
                        <Flex align="center">
                            <Tag color={"blue-inverse"}>
                                Giao lúc
                            </Tag>
                            <Typography.Text>
                                {record.time.orderTime}
                            </Typography.Text>
                        </Flex>
                        <Flex align="center">
                            <Tag color={"orange-inverse"}>
                                Hạn xác nhận
                            </Tag>
                            <Typography.Text>
                                {record.time.deadline}
                            </Typography.Text>
                        </Flex>
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
            render: (value: any, record: CompletedOrder) =>
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
            render: (record: CompletedOrder) =>
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
        const display = data.map((value: OrderPropType) =>
        {
            let totalProducts = 0;
            value.product.forEach((selection) =>
            {
                totalProducts += selection.quantity
            })

            let orderStatus: DisplayStatus =
            {
                name: "Đang chờ",
                type: StatusType.PENDING
            }
            const today = Date.now()

            const time = value.orderStatus[value.orderStatus.length - 1].deadline*1000


            if(today > time)
            {
                orderStatus =
                {
                    name: "Đang chờ và đã quá hạn",
                    type: StatusType.EXPIRED
                }
            }

            const item: CompletedOrder =
            {
                key: value._id,
                status: orderStatus,
                delivery: {
                    receiverName: value.address.receiverName,
                    address: value.address.address,
                    phoneNumber: value.address.phoneNumber,
                    coordinate: {
                        lng: value.address.coordinate.lng,
                        lat: value.address.coordinate.lat
                    },
                    label: value.address.label,
                    isDefault: value.address.isDefault
                },
                time: {
                    orderTime: datetimeFormaterShort(MyLocaleRef.VN, value.orderStatus[value.orderStatus.length - 1].time),
                    deadline: datetimeFormaterShort(MyLocaleRef.VN, value.orderStatus[value.orderStatus.length - 1].deadline)
                },
                price: {
                    totalProduct: totalProducts,
                    shippingFee: currencyFormater(MyLocaleRef.VN, value.totalPrice.shipping),
                    totalPrice: currencyFormater(MyLocaleRef.VN, value.totalPrice.total),
                    profit: currencyFormater(MyLocaleRef.VN, value.totalPrice.profit)
                }
            }

            return item
        })

        setDataToDisplay(display)
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

    function handleConfirmOrderOnClick(params: any)
    {
        const targetOrderId = params as string
        //TODO: call api to update order status here
    }

    function handleCancelOrderOnClick(params: any)
    {
        const targetOrderId = params as string
        //TODO: call api to update order status here
    }

    function handleSelectedRowKeysOnChange(newSelectedRowKeys: React.Key[], selectedRows: CompletedOrder[])
    {
        setSelectedRowKeys(newSelectedRowKeys)
        const selectedOrderIds: string[] = selectedRows.map((value: CompletedOrder) =>
        {
            return value.key
        })
        setSelectedOrderIds(selectedOrderIds)
    }

    function handleConfirmManyOrder(soids: string[])
    {
        console.log(soids)

        //TODO: call api to update order status here
    }

    const rowSelection: TableRowSelection<CompletedOrder> = 
    {
        selectedRowKeys: selectedRowKeys,
        onChange: handleSelectedRowKeysOnChange
    }

    return(
        <>
            <Flex vertical className="w-full mb-2" justify="center" align="center">
                <OrderFilterPool poolKey={completedTabFilterPoolKey} filterPoolSetting={filterPoolSetting} dataSource={dataSource} filterCallback={handleFilterCallback} />
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

            <Table rowSelection={rowSelection} columns={dataColumns} dataSource={dataToDisplay} showHeader/>

            
            <OrderDetailDrawer open={orderDetailOpen} orderProps={selectedOrderDetail} onCloseCallback={handleOrderDetailDrawerOnClose} 
            confirmButtonActive cancelButtonActive
            confirmButtonOnClick={handleConfirmOrderOnClick} cancelButtonOnClick={handleCancelOrderOnClick}
            />
        </>
    )
}