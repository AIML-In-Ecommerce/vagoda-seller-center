"use client";
import { Breadcrumb, Button, ConfigProvider, DatePicker, Empty, Radio, RadioChangeEvent, Segmented, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import RevenueAndVisits from "@/component/report/product/RevenueAndVisits";
import { useRouter } from "next/navigation";
import LowInventory from "./LowInventory";
import LowSales from "./LowSales";

dayjs.extend(LocalizedFormat)

interface ProductSalesTrafficPageProps {
    tabKey: string,
}

const tabsRouting = [
    {
        key: '1',
        label: 'Doanh thu & lượt truy cập',
        url: '/report/product-sale-traffic',
    },
    {
        key: '2',
        label: 'Doanh số thấp',
        url: '/report/product-low-sales'
    },
    {
        key: '3',
        label: 'Tồn kho thấp',
        url: '/report/product-low-inventory'
    },
]

const tabs: TabsProps['items'] = [
    {
        key: '1',
        label: 'Doanh thu & lượt truy cập',
        children: <RevenueAndVisits />

    },
    // {
    //     key: '2',
    //     label: 'Doanh số thấp',
    //     children: <LowSales />

    // },
    // {
    //     key: '3',
    //     label: 'Tồn kho thấp',
    //     children: <LowInventory />

    // },
]



export default function ProductSalesTrafficPage(props: ProductSalesTrafficPageProps) {
    const [activeKey, setActiveKey] = useState<string>(props.tabKey);
    const [label, setLabel] = useState<string>(tabsRouting.filter(tab => tab.key === activeKey)[0].label);
    const router = useRouter();

    const handleTabChange = (e: string) => {
        const selectedTab = tabsRouting.filter(tab => tab.key === e)[0];
        setActiveKey(selectedTab.key);
        setLabel(selectedTab.label);
        router.push(selectedTab.url);
    }

    return (
        <React.Fragment>
            <div className="flex flex-col container">
                <div className="bg-white pr-4 px-4">
                    <Breadcrumb
                        className="text-xs"
                        items={[
                            {
                                href: "/",
                                title: (
                                    <div className="flex items-center">
                                        <HiOutlineHome size={15} />
                                    </div>
                                ),
                            },
                            {
                                href: "/report/business-performance",
                                title: "Trung tâm phát triển",
                            },
                            {
                                title: `${label}`,
                            },
                        ]}
                    />
                    <div className="mt-5 uppercase text-xl font-semibold">Chỉ số sản phẩm</div>
                    <div className="mt-5">Vui lòng xem hướng dẫn chi tiết: Giới thiệu trung tâm phát triển</div>
                    <div className="mt-5">
                        <Tabs
                            type="card"
                            activeKey={activeKey}
                            size="large" items={tabs}
                            onChange={(e) => handleTabChange(e)} />
                    </div>
                </div>


            </div>
        </React.Fragment>
    )
}