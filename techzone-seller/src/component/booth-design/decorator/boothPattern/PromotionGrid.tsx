"use client";
import { Divider, List } from "antd";
import MiniPromotionTicket from "../mini/MiniPromotionTicket";
import { DiscountType, PromotionType } from "@/model/PromotionType";
import { PromotionElement, WidgetType } from "@/model/WidgetType";
import { formatDate } from "@/utils/DateFormatter";
import CustomEmpty from "../mini/CustomEmpty";
import { useEffect, useState } from "react";
import { POST_GetPromotionList } from "@/apis/promotion/PromotionAPI";

interface PromotionGridProps {
  widget: WidgetType;
}

export default function PromotionGrid(props: PromotionGridProps) {
  // const promotions: PromotionType[] = [
  //   {
  //     _id: "1",
  //     name: "Giảm 50%",
  //     description: "Áp dụng cho thanh toán qua ví điện tử MoMo (tối đa 100k)",
  //     discountType: DiscountType.PERCENTAGE,
  //     discountValue: 50,
  //     quantity: 6,
  //     upperBound: 100000,
  //     expiredDate: formatDate(new Date("2024-03-24T12:30:00")),
  //     code: "BONJOUR",
  //   },
  //   {
  //     _id: "2",
  //     name: "Giảm 200k",
  //     description:
  //       "Áp dụng cho mọi đối tượng khách hàng (cho đơn tối thiểu 400k)",
  //     discountType: DiscountType.DIRECT_PRICE,
  //     discountValue: 200000,
  //     quantity: 20,
  //     lowerBound: 400000,
  //     expiredDate: formatDate(new Date("2024-03-27T12:30:00")),
  //     code: "MERCI",
  //   },
  //   {
  //     _id: "3",
  //     name: "Giảm 20%",
  //     description: "Áp dụng cho tất cả khách hàng (tối đa 50k)",
  //     discountType: DiscountType.PERCENTAGE,
  //     discountValue: 20,
  //     quantity: 15,
  //     upperBound: 50000,
  //     expiredDate: formatDate(new Date("2024-03-22T12:30:00")),
  //     code: "AUREVOIR",
  //   },
  //   {
  //     _id: "4",
  //     name: "Giảm 50k",
  //     description: "Chỉ áp dụng cho khách hàng VIP",
  //     discountType: DiscountType.DIRECT_PRICE,
  //     discountValue: 50000,
  //     quantity: 10,
  //     lowerBound: 0,
  //     expiredDate: formatDate(new Date("2024-04-30T12:30:00")),
  //     code: "BONSOIR",
  //   },
  //   {
  //     _id: "5",
  //     name: "Giảm 10%",
  //     description: "Áp dụng cho thanh toán qua thẻ tín dụng (tối đa 50k)",
  //     discountType: DiscountType.PERCENTAGE,
  //     discountValue: 10,
  //     quantity: 8,
  //     upperBound: 50000,
  //     expiredDate: formatDate(new Date("2024-03-25T12:30:00")),
  //     code: "BIENVENUE",
  //   },
  // ];

  // var

  const [promotions, setPromotions] = useState<PromotionType[]>();

  const element = props.widget.element as PromotionElement;

  // call api
  useEffect(() => {
    handleGetPromotionList(element.promotionIdList);
  }, [element, element.promotionIdList]);

  const handleGetPromotionList = async (ids: string[]) => {
    const response = await POST_GetPromotionList(ids);
    if (response.status == 200) {
      if (response.data) {
        setPromotions(response.data);
        console.log("promotion", response.data);
      }
    }
  };

  return (
    <div className="bg-white my-5 py-5 px-10 rounded-xl">
      {/* <Typography.Text className="text-xl font-semibold w-full">
        {element.title}
      </Typography.Text> */}

      {element.title && (
        <div className="w-full flex align-middle justify-center items-center">
          <div className="w-1/2">
            <Divider
              style={{
                border: "2px solid silver",
                borderTop: 0,
                borderBottom: 0,
                borderLeft: 0,
                borderRight: 0,
                paddingBottom: 0,
                marginBottom: 40,
              }}
            >
              <div className="px-5 text-lg uppercase">{element.title}</div>
            </Divider>
          </div>
        </div>
      )}

      <div className="flex align-middle justify-center items-center">
        <List
          grid={{
            gutter: 16,
            xs: 0,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={promotions}
          locale={{
            emptyText: <CustomEmpty />,
          }}
          renderItem={(item, i) => (
            <div key={i}>
              <List.Item>
                <MiniPromotionTicket item={item} />
              </List.Item>
            </div>
          )}
        />
      </div>
    </div>
  );
}
