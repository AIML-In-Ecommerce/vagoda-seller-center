'use client'


import { Breadcrumb, Flex, Typography } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { HiOutlineHome } from "react-icons/hi2";


interface OrderInvoiceProps
{

}

export default function OrderInvoice(setupProps: OrderInvoiceProps)
{
    const breadcrumbItems: ItemType[] =
    [
        {
            key: 1,
            title: <Flex className="h-full" align="center" justify="center"><HiOutlineHome /></Flex>,
            href: "/",
        },
        {
            key: 2,
            title: <Flex className="h-full" align="center" justify="center">Danh sách đơn hàng</Flex>,
            href: "/order"
        },
        {
            key: 3,
            title: <Flex className="h-full" align="center" justify="center">Danh sách hóa đơn</Flex>,
            href: "/order/invoice"
        }
    ]

    return(
        <>
            <div className="w-full h-screen bg-white px-4 rounded-lg">
                <Flex vertical className="w-full mb-4 py-2" justify="center" align="start" gap={6}>
                    <Flex className="w-full" align="baseline">
                        <Breadcrumb items={breadcrumbItems}/>
                    </Flex>
                    <Flex className="w-full" align="baseline">
                        <Typography.Text className="text-2xl font-semibold">Danh sách hoá đơn</Typography.Text>
                    </Flex>
                </Flex>

            </div>
        </>
    )
}