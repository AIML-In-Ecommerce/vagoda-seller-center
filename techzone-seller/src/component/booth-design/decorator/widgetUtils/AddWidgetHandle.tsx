"use client";
import { WidgetCategoryType } from "@/model/WidgetType";
import { Widget } from "../WidgetList";

interface HandleProps {
  type: number;
  pattern: number;
  order: number;
}

export const AddWidgetHandle = (props: HandleProps) => {
  switch (props.type) {
    case WidgetCategoryType.BANNER:
      return {
        _id: "",
        type: props.type,
        order: props.order,
        visibility: true,
        element: {
          pattern: props.pattern,
          images: [],
        },
      };
    case WidgetCategoryType.CATEGORY:
      return {
        _id: "",
        type: props.type,
        order: props.order,
        visibility: true,
        element: {
          pattern: props.pattern,
          title: "",
          categoryIdList: [],
        },
      };
    case WidgetCategoryType.PRODUCT:
      return {
        _id: "",
        type: props.type,
        order: props.order,
        visibility: true,
        element: {
          pattern: props.pattern,
          title: "",
          collectionId: "",
        },
      };
    case WidgetCategoryType.PROMOTION:
      return {
        _id: "",
        type: props.type,
        order: props.order,
        visibility: true,
        element: {
          pattern: props.pattern,
          title: "",
          promotionIdList: [],
        },
      };
    default:
      return {
        _id: "",
        type: props.type,
        order: props.order,
        visibility: true,
        element: undefined,
      };
  }
};

// export default function NewWidget(props: HandleProps) {
//   return <Widget widget={AddWidgetHandle(props)} />;
// }
