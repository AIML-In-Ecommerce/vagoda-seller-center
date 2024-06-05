"use client";
import { Breadcrumb, List, Card, Image, Input } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaTools } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { HiOutlineHome } from 'react-icons/hi2'

const data = [
    {
        title: 'Mã giảm giá',
        value: 'coupons',
        image: 'https://cdn-icons-png.flaticon.com/512/8633/8633417.png'
        
    },
    {
        title: 'Combo khuyến mãi',
        value: 'combo-discounts',
        image: 'https://cdn-icons-png.flaticon.com/128/6037/6037325.png'
    },
];


export default function PromotionToolPage() {
    const [displayData, setDisplayData] = useState(data);
    const router = useRouter();

    const onChange = (value: string) => {
        const filteredTools = data.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
        setDisplayData(filteredTools);
    }

    const onClick = (value: string) => {
        router.push(`/marketing-center/promotion-tool/${value}`);
    }

    return (
        <React.Fragment>
            <div className="flex flex-col container py-5">
                <div className="pr-4 px-4">
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
                                href: "/marketing-center/promotion-tool",
                                title: "Trung tâm marketing",
                            },
                            {
                                title: "Công cụ khuyến mãi",
                            },
                        ]}
                    />
                </div>
                <div className="pr-4 px-4 mt-5 uppercase text-xl font-semibold">Công cụ khuyến mãi</div>
                <div className="pr-4 px-4 flex flex-col gap-2 bg-white mt-10">
                    <div className="flex lg:flex-row lg:justify-between flex-col lg:gap-0 gap-5">
                        <div className="flex flex-row gap-2 items-center mt-5">
                            <div className="text-lg font-semibold">
                                <FaTools />
                            </div>
                            <div className="text-lg font-semibold">Tất cả công cụ</div>
                        </div>
                        <div className="flex flex-row gap-2 items-center mt-5">
                            <div>Tìm kiếm</div>
                            <Input placeholder="Nhập tên công cụ cần tìm" 
                                onChange={(e) => onChange(e.target.value)} style={{ width: 400 }} 
                                suffix={<FaMagnifyingGlass />}/>
                        </div>
                    </div>
                    <List className="p-5"
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3
                        }}
                        dataSource={displayData}
                        renderItem={(item) => (
                            <List.Item>
                                <div className="flex flex-col items-center justify-center gap-1"
                                    onClick={() => onClick(item.value)}>
                                    <div className="border-2 border-slate-200 rounded-lg p-2 cursor-pointer">
                                        <Image preview={false} width={75} src={item.image} />
                                    </div>
                                    <div className="font-semibold cursor-pointer">{item.title}</div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
