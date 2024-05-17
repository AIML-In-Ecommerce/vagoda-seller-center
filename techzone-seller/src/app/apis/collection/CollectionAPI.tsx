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
      createDate: props.createDate,
      isActive: props.isActive,
      shop: props.shop,
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

export async function DELETE_DeleteCollection(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    WIDGET_PORT?.toString() +
    "/collectionType/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.delete(url);
    const responseData: CollectionResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Delete collection successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to delete collection",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to delete collection",
      status: 500,
      data: undefined,
    };
  }
}

export async function PUT_UpdateCollection(props: CollectionType) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    WIDGET_PORT?.toString() +
    "/collectionType/" +
    props._id
  ).toString();

  try {
    // console.log(url);
    const requestBody = {
      name: props.name,
      imageUrl: props.imageUrl,
      productIdList: props.productIdList,
      createDate: props.createDate,
      isActive: props.isActive,
      shop: props.shop,
    };

    const response = await axios.put(url, requestBody);
    const responseData: CollectionResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Update collection successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update collection",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update collection",
      status: 500,
      data: undefined,
    };
  }
}
// /collectionTypes/shop/:id

interface CollectionListResponse {
  status: number;
  data: CollectionType[];
  message: string;
}

export async function GET_GetCollectionListByShop(shopId: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    WIDGET_PORT?.toString() +
    "/collectionTypes/shop/" +
    shopId
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: CollectionListResponse = response.data;

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

// export async function GET_GetCollectionList(ids: string[]) {
//   const url = (
//     BACKEND_PREFIX?.toString() +
//     ":" +
//     WIDGET_PORT?.toString() +
//     "/collectionTypes/shop/" +
//     shopId
//   ).toString();

//   try {
//     // console.log(url);
//     const response = await axios.get(url);
//     const responseData: CollectionListResponse = response.data;

//     if (responseData.status == 200) {
//       return {
//         isDenied: false,
//         message: "Get collection successfully",
//         status: responseData.status,
//         data: responseData.data,
//       };
//     } else {
//       return {
//         isDenied: true,
//         message: "Failed to get collection",
//         status: responseData.status,
//         data: responseData.data,
//       };
//     }
//   } catch (err) {
//     console.error(err);
//     return {
//       isDenied: true,
//       message: "Failed to get collection",
//       status: 500,
//       data: undefined,
//     };
//   }
// }
