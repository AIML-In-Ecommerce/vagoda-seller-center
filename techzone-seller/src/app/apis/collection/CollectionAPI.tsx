"use client";

import { CollectionType } from "@/model/CollectionType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const WIDGET_PORT = process.env.NEXT_PUBLIC_WIDGET_PORT;

// interface Data {
//   name: string;
//   imageUrl: string;
//   productIdList: string[];
//   createDate: string;
//   isActive: boolean;
// }

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

    // const processedData: CollectionType = {
    //   _id: id,
    //   name: responseData.data.name,
    //   imageUrl: responseData.data.imageUrl,
    //   productIdList: responseData.data.productIdList,
    //   createDate: responseData.data.createDate.toString(),
    //   isActive: responseData.data.isActive,
    // };

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get collection successfully",
        status: responseData.status,
        data: response.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get collection",
        status: responseData.status,
        data: response.data,
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
    console.log(url);
    console.log("props", props);

    const requestBody = {
      name: props.name,
      imageUrl: props.imageUrl,
      productIdList: props.productIdList,
      createDate: props.createDate, // check this
      isActive: props.isActive,
    };

    const response = await axios.post(url, {
      name: props.name,
      imageUrl: props.imageUrl,
      productIdList: props.productIdList,
      createDate: props.createDate, // check this
      isActive: props.isActive,
    });
    const responseData: CollectionResponse = response.data;

    // return id??

    const processedData: CollectionType = responseData.data as CollectionType;
    // {
    //   _id: "", // TODO?
    //   name: responseData.data.name,
    //   imageUrl: responseData.data.imageUrl,
    //   productIdList: responseData.data.productIdList,
    //   createDate: responseData.data.createDate.toString(),
    //   isActive: responseData.data.isActive,
    // };

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Create collection successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to create collection",
        status: responseData.status,
        data: processedData,
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
