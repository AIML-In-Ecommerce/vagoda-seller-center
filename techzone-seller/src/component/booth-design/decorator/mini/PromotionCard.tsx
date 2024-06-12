"use client";
import { DiscountType, PromotionType } from "@/model/PromotionType"
import { Button, Popover } from "antd"
import { FaRegCircleQuestion } from "react-icons/fa6"
import TICKET_UNSELECTED from "@/component/booth-design/decorator/mini/(asset)/coupon-bg.svg"
import TICKET_SELECTED from "@/component/booth-design/decorator/mini/(asset)/coupon-bg-selected.svg"
import LOGO from "../../../../../public/asset/logo.png"
import PromotionCardDetail from "./PromotionCardDetail";
import { useState, useEffect } from "react";
import { formatCurrencyFromValue } from "@/component/util/CurrencyDisplay";

interface PromotionCardProps {
    item: PromotionType
    isSelected: boolean
    applyDiscount: (item: PromotionType) => void
    removeDiscount: (item: PromotionType) => void
}

export default function PromotionCard(props: PromotionCardProps) {
    const [isSelected, setIsSelected] = useState(props.isSelected);

    useEffect(() => {
        setIsSelected(props.isSelected);
    }, [props.isSelected]);

    useEffect(() => {
        if (isSelected) {
            props.applyDiscount(props.item);
        } else props.removeDiscount(props.item);
    }, [isSelected]);

    return (
        <div className="h-auto select-none grid"
            key={props.item._id}
            style={{
                backgroundImage: `${isSelected
                    ? `url(${TICKET_SELECTED.src})`
                    : `url(${TICKET_UNSELECTED.src})`
                    }`,
                backgroundSize: "100% 100%",
                width: "100%"
            }}>
            <div className="grid grid-cols-3 relative gap-2">
                <div className="col-span-1 place-self-center">
                    <div className="flex flex-col justify-center items-center w-16 md:w-20 aspect-square">
                        <img alt="logo" src={LOGO.src}></img>
                        <div className="font-semibold">FashionStyle</div>
                    </div>
                </div>
                <div className="absolute right-2 top-2 text-lg z-10">
                    <Popover content={
                        <div className="text-black">
                            <PromotionCardDetail item={props.item} />
                        </div>}
                        color="white"
                        trigger={["click", "hover", "contextMenu"]}
                        autoAdjustOverflow
                        arrow={{ pointAtCenter: true }}
                        overlayInnerStyle={{ width: '350px' }}
                    >
                        <div className="text-slate-500">
                            <FaRegCircleQuestion />
                        </div>
                    </Popover>
                </div>
                <div className="col-span-2 grid grid-rows-4">
                    <div></div>
                    {
                        props.item.discountType === DiscountType.PERCENTAGE ?
                            <div className="z-10 text-lg font-semibold">Giảm {props.item.discountValue}%</div> :
                            <div className="z-10 text-lg font-semibold">Giảm {formatCurrencyFromValue({value: props.item.discountValue ?? 0})}</div>
                    }
                    <div className="z-10 text-xs">
                        <span>
                            {
                                props.item.upperBound ? `Tối đa ${formatCurrencyFromValue({value: props.item.upperBound ?? 0})}, ` : ""
                            }
                        </span>
                        <span>
                            {
                                props.item.lowerBound ? `Đơn từ ${formatCurrencyFromValue({value: props.item.lowerBound ?? 0})}` : `Đơn từ ${formatCurrencyFromValue({value: 0})}`
                            }
                        </span>
                    </div>
                    <div className="z-10 text-xs lg:text-[8px]">HSD: {props.item.expiredDate ?? '--/--/---- --:--'}</div>
                </div>
                <div className="absolute right-1 bottom-2 z-10 text-xs">
                    {
                        !props.isSelected ?
                            <Button className="w-24 bg-sky-500 text-white font-semibold text-center"
                                onClick={() => props.applyDiscount(props.item)}>
                                Áp dụng
                            </Button> :
                            <Button className="w-24 bg-gray-500 text-white font-semibold text-center"
                                onClick={() => props.removeDiscount(props.item)}>
                                Hủy
                            </Button>

                    }
                </div>
            </div>
        </div>
    )
}