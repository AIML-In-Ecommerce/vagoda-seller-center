"use client";
import { PromotionType } from "@/model/PromotionType";
import { Card, Tooltip, Button } from "antd";
import { FaRegCircleQuestion } from "react-icons/fa6";
import TICKET_UNSELECTED from "./(asset)/coupon_unselected_short_fill.png";
import TICKET_SELECTED from "./(asset)/coupon_selected_short_fill.png";
import LOGO from "../../../../../public/asset/logo.png";

interface PromotionCardProps {
  item: PromotionType;
  promotions: Array<PromotionType>;
  applyDiscount: (item: PromotionType) => void;
  removeDiscount: (item: PromotionType) => void;
}

const promotion_help =
  "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển";

export default function PromotionCard(props: PromotionCardProps) {
  return (
    <Card
      type="inner"
      className={`mb-10 h-32 ${
        props.promotions.length === 1
          ? props.promotions.includes(props.item)
            ? ""
            : "hidden"
          : ""
      }`}
      key={props.item._id}
      style={{
        backgroundImage: `${
          props.promotions.includes(props.item)
            ? `url(${TICKET_SELECTED.src})`
            : `url(${TICKET_UNSELECTED.src})`
        }`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative grid h-36 ">
        <div className="absolute top-1 z-10 w-7 flex flex-col justify-center items-center">
          <img alt="logo" src={LOGO.src}></img>
          <div className="font-semibold">TechZone</div>
        </div>
        <div className="absolute right-0 top-1">
          <Tooltip title={promotion_help}>
            <div className="text-slate-500">
              <FaRegCircleQuestion />
            </div>
          </Tooltip>
        </div>
        <div className="absolute left-16 top-1 z-10 text-lg font-semibold">
          {props.item.name}
        </div>
        <div className="absolute left-16 top-8 z-10 text-xs">
          {props.item.description}
        </div>
        <div className="absolute left-16 bottom-12 z-10 text-xs">
          HSD: {props.item.expiredDate}
        </div>
        <div className="absolute right-0 bottom-12 z-10 text-xs">
          {!props.promotions.includes(props.item) ? (
            <Button
              className="w-full bg-sky-500 text-xs text-white font-semibold text-center"
              onClick={() => props.applyDiscount(props.item)}
            >
              Áp dụng
            </Button>
          ) : (
            <Button
              className="w-full bg-gray-500 text-white font-semibold text-center"
              onClick={() => props.removeDiscount(props.item)}
            >
              Hủy
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
