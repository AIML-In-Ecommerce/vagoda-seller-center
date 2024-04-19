"use client";
import { PromotionType } from "@/model/PromotionType";
import { Card, Button } from "antd";
import TICKET_UNSELECTED from "./(asset)/coupon_unselected_short_fill.png";
import TICKET_SELECTED from "./(asset)/coupon_selected_short_fill.png";
import LOGO from "../../../../../public/asset/logo.png";
import { useEffect, useState } from "react";

interface PromotionCardProps {
  item: PromotionType;
  applyDiscount: (item: PromotionType) => void;
  removeDiscount: (item: PromotionType) => void;
}

export default function PromotionCard(props: PromotionCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      props.applyDiscount(props.item);
    } else props.removeDiscount(props.item);
  }, [isSelected]);

  return (
    <Card
      type="inner"
      className="mb-10 h-32"
      key={props.item._id}
      style={{
        backgroundImage: `${
          isSelected
            ? `url(${TICKET_SELECTED.src})`
            : `url(${TICKET_UNSELECTED.src})`
        }`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative grid h-36 ">
        <div className="absolute top-4 z-10 w-7 flex flex-col justify-center items-center">
          <img alt="logo" src={LOGO.src}></img>
          <div className="font-semibold">TechZone</div>
        </div>

        <div className="absolute left-20 z-10 text-lg font-semibold">
          {props.item.name}
        </div>
        <div className="absolute left-20 top-7 z-10 text-xs">
          {props.item.description}
        </div>
        <div className="absolute left-20 bottom-12 z-10 text-[9px]">
          HSD: {props.item.expiredDate}
        </div>
        <div className="absolute right-0 bottom-12 z-10 text-xs">
          {!isSelected ? (
            <Button
              className="w-full bg-sky-500 text-xs text-white font-semibold text-center"
              onClick={() => setIsSelected(true)}
            >
              Áp dụng
            </Button>
          ) : (
            <Button
              className="w-full bg-gray-500 text-white font-semibold text-center"
              onClick={() => setIsSelected(false)}
            >
              Hủy
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
