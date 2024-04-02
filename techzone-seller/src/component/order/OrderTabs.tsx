'use client'

import { Flex, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import WaitingOrderTab from "./tab/WaitingOrderTab";
import { OrderPropType } from "@/model/OrderPropType";
import ProcessingOrderTab from "./tab/ProcessingOrderTab";


interface OrderTabsProps
{

}

const MockData: OrderPropType[] =
[
    {
        _id: "o-01",
        shopId: "sh-01",
        user: 
        {
            _id: "u-01",
            name: "Lê Hồng Kông",
            phoneNumber: "0122446972",
        },
        product:
        [
            {
                _id: "p-01",
                image: "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1710939264~exp=1710939864~hmac=8571b9303891f2dbcd82da68a0a4d4a002d7ee77764e3c7a726ba042348ca9d4",
                name: "Macbook Air 2023",
                originPrice: 22000000,
                purchasedPrice: 22000000,
                quantity: 1
            }
        ],
        promotion: 
        [
            {
                _id: "pro-01",
                name: "Brand opening promotion",
                discountType: "DIRECT_PRICE",
                discountValue: 2000000,
                expiredDate: 1711360457
            }
        ],
        paymentMethod: 
        {
            _id: "pm-01",
            name: "COD"
        },
        shipping:
        {
            _id: "shp-01",
            name: "TechZone Deli",
            fee: 0.00
        },
        totalPrice:
        {
            product: 22000000,
            discount: 2000000,
            shipping: 0.00,
            total: 20000000.00,
            profit: 19980000.00
        },
        address:
        {
            receiverName: "Lê Hồng Phong",
            address: "227 Đ.Nguyễn Văn Cừ, Phường 4, quận 5, tp.Hồ Chí Minh",
            phoneNumber: "0122446972",
            coordinate: {
                lng: 100.0,
                lat: 13.00
            },
            label: "HOME",
            isDefault: false
        },
        orderStatus: 
        [
            {
                status: "PENDING",
                time: 1711785407,
                deadline: 1712217407,
                complete: null,
            }
        ]
    }
]

export default function OrderTabs({}: OrderTabsProps)
{
    const defaultTabKey = "tab-02"
    const totalTabs = 6
    const [orderCount, setOrderCount] = useState<number[]>(new Array(totalTabs).fill(0))
    const [selectedTabKey, setSelectedTabKey] = useState<string>(defaultTabKey)
    const [waitingData, setWaitingData] = useState<OrderPropType[]> ([])
    
    useEffect(() =>
    {
        //fetch data here

        setWaitingData(MockData)
    },
    [])

    const tabs = 
    [
        {
            index: 0,
            key: "tab-01",
            label: "Tất cả",
            children: <div>Tab 1</div>
        },
        {
            index: 1,
            key: "tab-02",
            label: "Chờ xác nhận",
            children: <WaitingOrderTab dataSource={waitingData}/>
        },
        {
            index: 2,
            key: "tab-03",
            label: "Đang xử lý",
            children: <ProcessingOrderTab dataSource={waitingData}/>
        },
        {
            index: 3,
            key: "tab-04",
            label: "Đang vận chuyển",
            children: <div>Tab 4</div>
        },
        {
            index: 4,
            key: "tab-05",
            label: "Đã giao hàng",
            children: <div>Tab 5</div>
        },
        {
            index: 5,
            key: "tab-06",
            label: "Đã hủy",
            children: <div>Tab 6</div>
        }
    ]

    const labelNode = (key:string, name:string, count:number) =>
    {
        let textColor = "text-black font-semibold"
        if(key == selectedTabKey)
        {
            textColor = "text-blue-500 font-semibold"
        }

        return(
            <div className="w-full">
                <Flex vertical justify="center" align="center">
                    <Typography.Text className={textColor}>
                        {name}
                    </Typography.Text>
                    <Typography.Text className={textColor}>
                        {count > 0? count: "-"}
                    </Typography.Text>
                </Flex>
            </div>
        )
    }

    function handleTabKeyOnChange(activeKey: string)
    {
        setSelectedTabKey(activeKey)
    }

    return(
        <>
            <div className="w-full h-screen bg-white px-4 rounded-lg">
                <div>
                    <Tabs
                        activeKey={selectedTabKey}
                        defaultActiveKey={defaultTabKey}
                        type={"card"}
                        items={tabs.map((value) =>
                            {
                                const item = {
                                    key: value.key,
                                    label: labelNode(value.key, value.label, orderCount[value.index]),
                                    children: value.children
                                }
                                return item
                            })}
                        onChange={handleTabKeyOnChange}
                    />
                </div>
            </div>
        </>
    )
}