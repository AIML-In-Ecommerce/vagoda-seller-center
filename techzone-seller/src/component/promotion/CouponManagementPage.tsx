"use client";
import { Breadcrumb, Button, Divider, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { HiOutlineHome } from 'react-icons/hi2';
import CouponTable from './table/CouponTable';
import { useRouter } from 'next/navigation';
import { PromotionStatus, PromotionType } from '@/model/PromotionType';
import { AuthContext } from '@/context/AuthContext';
import { DELETE_DeletePromotion, GET_GetPromotionListByShop, PUT_UpdatePromotion } from '@/apis/promotion/PromotionAPI';

export default function CouponManagementPage() {
    const context = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [promotions, setPromotions] = useState<PromotionType[]>([]);

    const handleAddPromotion = () => {
        router.push('/marketing-center/promotion-tool/coupons/new');
    }

    const handleEditPromotion = (promotionId: string) => {
        router.push(`/marketing-center/promotion-tool/coupons/edit/${promotionId}`);
    }

    const handleDeletePromotion = async (promotionId: string) => {
        const response = await DELETE_DeletePromotion(context.shopInfo?._id as string, promotionId);
        if (response.status === 200) {
            setTimeout(() => {
                message.success("Xóa mã giảm giá thành công!");
            }, 1000);
        }
    }

    useEffect(() => {
        const fetchPromotions = async () => {
            const response = await GET_GetPromotionListByShop(context.shopInfo?._id as string);
            if (response) {
                const promotionListData = response.data as PromotionType[];
                // setPromotions(promotionListData);
                //update promotion status 
                const updatePromotionStatus = (promotion: PromotionType) => {
                    const currentDate = new Date();
                    const dates = [new Date(promotion.activeDate), new Date(promotion.expiredDate)]
                    let currentDiscountStatus = promotion.status;

                    if (dates && dates[0] && dates[1]) {
                        if (currentDate < dates[0]) {
                            currentDiscountStatus = PromotionStatus.UPCOMMING;
                        }
                        else if (currentDate < dates[1]) {
                            currentDiscountStatus = PromotionStatus.IN_PROGRESS;
                        }
                        else {
                            currentDiscountStatus = PromotionStatus.EXPIRED;
                        }
                    }
                    else {
                        currentDiscountStatus = PromotionStatus.UPCOMMING;
                    }
                    const newPromotion = {
                        ...promotion,
                        status: currentDiscountStatus
                    } as PromotionType

                    console.log(`promotion #${promotion._id}`, currentDate, promotion.activeDate, promotion.expiredDate, currentDiscountStatus)
                    return newPromotion;
                }
                let newPromotions: PromotionType[] = [];
                if (promotionListData && promotionListData.length > 0) {
                    for (const promotion of promotionListData) {
                        const newPromotion = updatePromotionStatus(promotion);
                        newPromotions.push(newPromotion)
                        await PUT_UpdatePromotion(context.shopInfo?._id as string, promotion._id, newPromotion)
                    }
                    // sort promotion based on promotion creation timestamp
                    setPromotions(newPromotions.sort((a, b) => a.createAt < b.createAt ? 1 : -1));
                }
                console.log('fetchPromotionList', promotionListData);
            }
        }
        if (context.shopInfo) {
            setLoading(true);
            fetchPromotions();
            setLoading(false);
        }
    }, [context.shopInfo]);


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
                            onClick={() => handleAddPromotion()}>
                            <div className="flex flex-row gap-2 items-center">
                                <FaPlus />
                                <div>Tạo mới</div>
                            </div>
                        </Button>
                    </div>
                    <Divider />
                    <CouponTable loading={loading}
                        promotionData={promotions}
                        handleEditPromotion={handleEditPromotion}
                        handleDeletePromotion={handleDeletePromotion} />
                </div>
            </div>
        </React.Fragment>

    )
}
