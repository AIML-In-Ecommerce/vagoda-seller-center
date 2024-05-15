"use client";

import { CollectionType } from "@/model/CollectionType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const WIDGET_PORT = process.env.NEXT_PUBLIC_WIDGET_PORT;

interface CollectionResponse {
  status: number;
  data: CollectionType;
  message: string;
}

export async function GET_GetCollection(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    WIDGET_PORT?.toString() +
    "/collectionType/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: CollectionResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get collection successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get collection",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get collection",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_CreateCollection(props: CollectionType) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    WIDGET_PORT?.toString() +
    "/collectionType"
  ).toString();

  try {
    // console.log(url);
    const requestBody = {
      name: props.name,
      imageUrl: props.imageUrl,
      productIdList: props.productIdList,
      createDate: props.createDate, // check this
      isActive: props.isActive,
    };

    const response = await axios.post(url, requestBody);
    const responseData: CollectionResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Create collection successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to create collection",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to create collection",
      status: 500,
      data: undefined,
    };
  }
}
