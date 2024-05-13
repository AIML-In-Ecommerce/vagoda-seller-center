"use client";

import {
  BannerElement,
  CategoryElement,
  CollectionElement,
  ProductElement,
  PromotionElement,
  WidgetCategoryType,
  WidgetType,
} from "@/model/WidgetType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const WIDGET_PORT = process.env.NEXT_PUBLIC_WIDGET_PORT;

interface Data {
  type: WidgetCategoryType;
  order: number;
  visibility: boolean; // true
  element:
    | BannerElement
    | ProductElement
    | CategoryElement
    | PromotionElement
    | CollectionElement
    | undefined;
}

interface WidgetResponse {
  status: number;
  data: Data;
  message: string;
}

export async function GET_GetWidget(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    WIDGET_PORT?.toString() +
    "/widget/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: WidgetResponse = response.data;

    const processedData: WidgetType = {
      _id: id,
      type: responseData.data.type,
      order: responseData.data.order,
      visibility: response.data.visibility,
      element: response.data.element, // TODO
    };

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get widget successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get widget",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get widget",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_CreateWidget(props: Data) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    WIDGET_PORT?.toString() +
    "/widget"
  ).toString();

  try {
    // console.log(url);
    const requestBody = {
      type: props.type,
      order: props.order,
      visibility: props.visibility,
      element: props.element,
    };

    const response = await axios.post(url, requestBody);
    // {
    //   headers: {
    //     Authorization: `Bearer ${auth.user?.access_token}`,
    //   },
    // }

    const responseData: WidgetResponse = response.data;

    // return id??

    const processedData: WidgetType = {
      _id: "", // TODO?
      type: responseData.data.type,
      order: responseData.data.order,
      visibility: response.data.visibility,
      element: undefined, // TODO
    };

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Create widget successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to create widget",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to create widget",
      status: 500,
      data: undefined,
    };
  }
}
