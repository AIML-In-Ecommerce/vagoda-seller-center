"use client";
import { Breadcrumb, Button, ConfigProvider, DatePicker, Empty, Radio, RadioChangeEvent, Segmented } from "antd";
import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import RevenueAndVisits from "@/component/report/product/RevenueAndVisits";
import { useRouter } from "next/navigation";

dayjs.extend(LocalizedFormat)

interface ProductSalesTrafficPageProps {
    pageProps: any,
}

const tabs = [
    {
        label: 'Doanh thu & lượt truy cập',
        value: 'RevenueAndVisits',
        url: '/report/product-sale-traffic'
    },
    {
        label: 'Doanh số thấp',
        value: 'LowSales',
        url: '/report/product-low-sales'
    },
    {
        label: 'Tồn kho thấp',
        value: 'LowInventory',
        url: '/report/product-low-inventory'
    },
]


export default function ProductSalesTrafficPage(props: ProductSalesTrafficPageProps) {

    const [option, setOption] = useState<string>(props.pageProps.value || "RevenueAndVisits");
    const [tabChildren, setTabChildren] = useState<React.JSX.Element>(props.pageProps.children || <RevenueAndVisits />);
    const router = useRouter();

    const handleSegmentChange = (e: string) => {
        setOption(e);
        router.push(tabs.filter(tab => tab.value === e)[0].url);
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
                                title: "Hiệu quả kinh doanh",
                            },
                        ]}
                    />
                    <div className="mt-5 uppercase text-xl font-semibold">Chỉ số sản phẩm</div>
                    <div className="mt-5">Vui lòng xem hướng dẫn chi tiết: Giới thiệu trung tâm phát triển</div>
                    <div className="mt-5">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Segmented: {
                                        itemSelectedColor: '#3366CC',
                                        itemHoverColor: '#3366CC',
                                    },
                                },
                            }}
                        >
                            <Segmented size="large" options={
                                tabs.map(tab => {
                                    return (
                                        {
                                            label: tab.label,
                                            value: tab.value,
                                        }
                                    )
                                })
                            } value={option}
                                onChange={(e) => handleSegmentChange(e)} />
                        </ConfigProvider>
                    </div>
                </div>
                {/* Render when tab change */}
                {tabChildren}


            </div>
        </React.Fragment>
    )
}