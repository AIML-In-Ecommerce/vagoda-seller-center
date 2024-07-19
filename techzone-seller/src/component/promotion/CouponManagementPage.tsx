"use client";
import { Breadcrumb, Button, Divider } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { HiOutlineHome } from 'react-icons/hi2';
import CouponTable from './table/CouponTable';
import { useRouter } from 'next/navigation';
import { PromotionType } from '@/model/PromotionType';
import { AuthContext } from '@/context/AuthContext';
import { GET_GetPromotionListByShop } from '@/apis/promotion/PromotionAPI';

export default function CouponManagementPage() {
    const context = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
    
    const navigateToAddPromotionPage = () => {
        router.push('/marketing-center/promotion-tool/coupons/new');
    }

    useEffect(() => {
        const fetchPromotions = async () => {
            const response = await GET_GetPromotionListByShop(context.shopInfo?._id as string);
            if (response) {
                const promotionListData = response.data as PromotionType[];
                setPromotions(promotionListData);
                console.log('fetchPromotionList', promotionListData);
            }
        }
        if (context.shopInfo) {
            setLoading(true);
            fetchPromotions();
            setLoading(false);
        }
    }, [context.shopInfo])
    

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
                <div className="pr-4 px-4 mt-5 uppercase text-xl font-semibold">Mã giảm giá</div>
                <div className="pr-4 px-4 mt-5 flex flex-col bg-white">
                    <div className="mt-5 flex flex-row items-center justify-between">
                        <div className="font-semibold text-lg">Danh sách mã giảm giá</div>
                        <Button className="text-white bg-blue-500 cursor-pointer hover:bg-blue-800"
                            onClick={() => navigateToAddPromotionPage()}>
                            <div className="flex flex-row gap-2 items-center">
                                <FaPlus />
                                <div>Tạo mới</div>
                            </div>
                        </Button>
                    </div>
                    <Divider />
                    <CouponTable loading={loading}
                        promotionData={promotions}/>
                </div>
            </div>
        </React.Fragment>

    )
}
