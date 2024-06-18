"use client";
import { WidgetCategoryType, WidgetType } from "@/model/WidgetType";

interface HandleProps {
  type: string;
  pattern: string;
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
      } as WidgetType;
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
      } as WidgetType;
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
      } as WidgetType;
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
      } as WidgetType;
    case WidgetCategoryType.COLLECTION:
      return {
        _id: "",
        type: props.type,
        order: props.order,
        visibility: true,
        element: {
          pattern: props.pattern,
          collectionIdList: [],
        },
      } as WidgetType;
    default:
      return {
        _id: "",
        type: props.type,
        order: props.order,
        visibility: true,
        element: undefined,
      } as WidgetType;
  }
};
