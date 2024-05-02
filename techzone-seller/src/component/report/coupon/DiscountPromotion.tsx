"use client";
import { Breadcrumb, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { useRouter } from "next/navigation";
import CouponInsight from "./CouponInsight";
import ShippingInsight from "./ShippingInsight";
import CampaignInsight from "./CampaignInsight";

dayjs.extend(LocalizedFormat)

interface DiscountPromotionPageProps {
    tabKey: string;
}

const tabsRouting = [
    {
        key: '1',
        label: 'Mã giảm giá',
        url: '/report/coupon-insight',
    },
    {
        key: '2',
        label: 'Giảm giá vận chuyển',
        url: '/report/shipping-insight'
    },
    {
        key: '3',
        label: 'Chiến dịch khuyến mãi',
        url: '/report/campaign-insight'
    },
]

const tabs: TabsProps['items'] = [
    {
        key: '1',
        label: 'Mã giảm giá',
        children: <CouponInsight />

    },
    {
        key: '2',
        label: 'Giảm giá vận chuyển',
        children: <ShippingInsight />

    },
    {
        key: '3',
        label: 'Chiến dịch khuyến mãi',
        children: <CampaignInsight />

    },
]


export default function DiscountPromotionPage(props: DiscountPromotionPageProps) {
    const router = useRouter();
    const [activeKey, setActiveKey] = useState<string>(props.tabKey);
    const [label, setLabel] = useState<string>(tabsRouting.filter(tab => tab.key === activeKey)[0].label);

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
                    <section id="test1">
                    </section>
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
                    <div className="mt-5 uppercase text-xl font-semibold">Chỉ số khuyến mãi</div>
                    <div className="mt-5">Vui lòng xem hướng dẫn chi tiết: Giới thiệu trung tâm phát triển</div>
                    <div className="mt-5">
                        <Tabs
                            activeKey={activeKey}
                            size="large" items={tabs}
                            onChange={(e) => handleTabChange(e)} />
                    </div>
                </div>


            </div>
        </React.Fragment>
    )
}