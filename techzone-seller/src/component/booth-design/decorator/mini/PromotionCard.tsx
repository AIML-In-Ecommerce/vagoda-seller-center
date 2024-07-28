"use client";
import { DiscountType, PromotionType } from "@/model/PromotionType";
import { Button, Popover, Image } from "antd";
import { FaRegCircleQuestion } from "react-icons/fa6";
import TICKET_UNSELECTED from "@/component/booth-design/decorator/mini/(asset)/coupon-bg.svg";
import TICKET_SELECTED from "@/component/booth-design/decorator/mini/(asset)/coupon-bg-selected.svg";
import PromotionCardDetail from "./PromotionCardDetail";
import { useState, useEffect } from "react";
import { formatCurrencyFromValue } from "@/component/util/CurrencyDisplay";

interface PromotionCardProps {
  item: PromotionType;
  isSelected: boolean;
  applyDiscount: (item: PromotionType) => void;
  removeDiscount: (item: PromotionType) => void;
}

const SHOP_ICON_PLACEHOLDER =
  "https://cdn-icons-png.flaticon.com/512/6011/6011673.png";

const formatDate = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

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
    <div
      className="h-auto select-none grid"
      key={props.item._id}
      style={{
        backgroundImage: `${
          isSelected
            ? `url(${TICKET_SELECTED.src})`
            : `url(${TICKET_UNSELECTED.src})`
        }`,
        backgroundSize: "100% 100%",
        width: "100%",
      }}
    >
      <div className="grid grid-cols-3 relative gap-2">
        <div className="col-span-1 place-self-center">
          <div className="flex flex-col justify-center items-center w-16 md:w-20 aspect-square">
            <Image
              preview={false}
              width={50}
              alt="logo"
              src={props.item.shop?.avatarUrl ?? SHOP_ICON_PLACEHOLDER}
            ></Image>
            <div className="font-semibold text-xs">
              {props.item.shop?.name ?? "SHOP"}
            </div>
          </div>
        </div>
        <div className="absolute right-2 top-2 text-lg">
          <Popover
            content={
              <div className="text-black">
                <PromotionCardDetail item={props.item} />
              </div>
            }
            color="white"
            trigger={["click", "hover", "contextMenu"]}
            autoAdjustOverflow
            arrow={{ pointAtCenter: true }}
            overlayInnerStyle={{ width: "350px" }}
          >
            <div className="text-slate-500">
              <FaRegCircleQuestion />
            </div>
          </Popover>
        </div>
        <div className="col-span-2 grid grid-rows-4">
          <div></div>
          {props.item.discountTypeInfo.type === DiscountType.PERCENTAGE ? (
            <div className="z-10 text-lg font-semibold">
              Giảm {props.item.discountTypeInfo.value}%
            </div>
          ) : (
            <div className="z-10 text-lg font-semibold">
              Giảm{" "}
              {formatCurrencyFromValue({
                value: props.item.discountTypeInfo.value ?? 0,
              })}
            </div>
          )}
          <div className="z-10 text-xs">
            <span>
              {props.item.discountTypeInfo.limitAmountToReduce
                ? `Tối đa ${formatCurrencyFromValue({
                    value: props.item.discountTypeInfo.limitAmountToReduce ?? 0,
                  })}, `
                : ""}
            </span>
            <span>
              {props.item.discountTypeInfo.lowerBoundaryForOrder
                ? `Đơn từ ${formatCurrencyFromValue({
                    value:
                      props.item.discountTypeInfo.lowerBoundaryForOrder ?? 0,
                  })}`
                : `Đơn từ ${formatCurrencyFromValue({ value: 0 })}`}
            </span>
          </div>
          <div className="z-10 text-[8px]">
            HSD: {formatDate(new Date(props.item.expiredDate))}
          </div>
        </div>
        <div className="absolute right-1 bottom-2 z-10 text-xs">
          {!props.isSelected ? (
            <Button
              className="w-24 bg-sky-500 text-white font-semibold text-center"
              onClick={() => props.applyDiscount(props.item)}
            >
              Áp dụng
            </Button>
          ) : (
            <Button
              className="w-24 bg-gray-500 text-white font-semibold text-center"
              onClick={() => props.removeDiscount(props.item)}
            >
              Hủy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
