"use client";
import { formatCurrencyFromValue } from "@/component/util/CurrencyDisplay";
import { PromotionType } from "@/model/PromotionType"
import { Button } from "antd";
import React from "react";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

interface PromotionDetailProps {
    item: PromotionType
}

export default function PromotionCardDetail(props: PromotionDetailProps) {
    return (
        <React.Fragment>
            <div className="flex flex-col gap-y-2 p-3">
                <div className="grid grid-cols-2 bg-slate-50 p-4">
                    <div className="col-start-1 self-center font-semibold">Mã</div>
                    <div className="col-start-2 flex items-center gap-1">
                        <div>{props.item.code}</div>
                        <Button className="text-lg" icon={<HiOutlineClipboardDocument />} onClick={async () => {
                            await navigator.clipboard.writeText(props.item.code);
                            // alert('Đã sao chép vào clipboard');
                        }} />
                    </div>
                </div>
                <div className="grid grid-cols-2 p-4 flex">
                    <div className="col-start-1 text-slate-30 self-center font-semibold">Hạn sử dụng</div>
                    <div className="col-start-2">{props.item.expiredDate ?? "--/--/---- --:--"}</div>
                </div>
                <div className="grid bg-slate-50 p-4 flex flex-col">
                    <div className="text-slate-30 col-start-1 font-semibold">Điều kiện</div>
                    <div className="col-start-1 flex flex-col">
                        {
                            ((!props.item.lowerBound) && (!props.item.upperBound)) ? <div>Không có</div> : (
                                <>
                                    <div>{props.item.lowerBound ? `Giá trị đơn hàng tối thiểu ${formatCurrencyFromValue({ value: props.item.lowerBound ?? 0 })}` : ""}</div>
                                    <div>{props.item.upperBound ? `Giảm tối đa ${formatCurrencyFromValue({ value: props.item.upperBound ?? 0 })}` : ""}</div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}