"use client";
import { Currency } from '@/component/util/CurrencyDisplay'
import { Breadcrumb, Col, Flex, Row, Space, Tabs, TabsProps } from 'antd'
import React, { useState } from 'react'
import { HiOutlineCurrencyDollar, HiOutlineHome } from 'react-icons/hi2'
import VirtualBalanceTab from './tab/VirtualBalanceTab';
import styled from 'styled-components';


const TabsWrapper = styled.div`
    .ant-tabs-tab-active {
        border-radius: 1px !important;
        border: 1px !important;
        border-top: 3px solid rgb(24, 144, 255) !important
    }
`

export default function ShopBalancePage() {
    const [activeKey, setActiveKey] = useState<string>("virtualBalance");
    const [totalBalance, setTotalBalance] = useState<number>(19283000);

    const onTabChange = (key: string) => {
        setActiveKey(key);
    }
    const tabItems: TabsProps['items'] = [
        {
            key: 'virtualBalance',
            label: <Space>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <div><HiOutlineCurrencyDollar size={28} /></div>
                    </Col>
                    <Col span={8}>
                        <div className="text-lg font-semibold align-bottom">VNĐ</div>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}></Col>
                    <Col span={16}>
                        <div className="text-lg font-semibold text-black">
                            <Currency value={totalBalance} />
                        </div>
                    </Col>
                </Row>
            </Space>,
            children: <VirtualBalanceTab />,
        },
    ]
    return (
        <React.Fragment>
            <div className="mt-4 mr-1 space-y-2">
                <div className="space-y-2 bg-white p-4">
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
                                href: "/settlement/my-balance",
                                title: "Quản lý tài chính",
                            },
                            {
                                title: "Quản lý tài sản",
                            },
                        ]}
                    />
                    <div className="flex space-x-2 items-center mb-4">
                        <p className="uppercase text-xl font-semibold">QUẢN LÝ TÀI SẢN</p>
                    </div>
                </div>
                <TabsWrapper>
                    <Tabs
                        activeKey={activeKey}
                        onChange={onTabChange}
                        type="card"
                        size="large"
                        items={tabItems}
                    />
                </TabsWrapper>
            </div>
        </React.Fragment>
    )
}
