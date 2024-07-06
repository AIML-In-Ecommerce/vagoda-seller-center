"use client";
import { ShopInfoDesignType, ShopType } from "@/model/ShopType";
import axios from "axios";
import { POST_GetPath } from "../widget/WidgetAPI";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const SHOP_PORT = process.env.NEXT_PUBLIC_SHOP_PORT;

interface ShopResponse {
  status: number;
  data: ShopType;
  message: string;
}

export async function GET_GetShop(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    SHOP_PORT?.toString() +
    "/shop/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: ShopResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get shop successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get shop",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get shop",
      status: 500,
      data: undefined,
    };
  }
}

// update widgets
export async function PUT_UpdateShopDesign(id: string, design: string[]) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    SHOP_PORT?.toString() +
    "/shop/" +
    id
  ).toString();

  try {
    // console.log(url);
    const requestBody = {
      design: design,
    };

    const response = await axios.put(url, requestBody);
    const responseData: ShopResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Update shop successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update shop",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update shop",
      status: 500,
      data: undefined,
    };
  }
}

// update shop info summary banner
export async function PUT_UpdateShopInfoDesign(
  id: string,
  shopInfoDesign: ShopInfoDesignType
) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    SHOP_PORT?.toString() +
    "/shop/" +
    id
  ).toString();

  try {
    // console.log(url);

    const path1Response = await POST_GetPath(shopInfoDesign.avatarUrl);
    const path2Response = await POST_GetPath(shopInfoDesign.bannerUrl);

    if (
      path1Response.status == 200 &&
      path1Response.data &&
      path2Response.status == 200 &&
      path2Response.data
    ) {
      // console.log(response);
      // alert("Upload successfully! " + pathResponse.data);

      let avatarUrl = path1Response.data;
      let bannerUrl = path2Response.data;

      const requestBody = {
        shopInfoDesign: {
          color: shopInfoDesign.color,
          avatarUrl: avatarUrl,
          bannerUrl: bannerUrl,
        },
        name: shopInfoDesign.name,
      };

      const response = await axios.put(url, requestBody);
      const responseData: ShopResponse = response.data;

      if (responseData.status == 200) {
        return {
          isDenied: false,
          message: "Update shop successfully",
          status: responseData.status,
          data: responseData.data,
        };
      } else {
        return {
          isDenied: true,
          message: "Failed to update shop",
          status: responseData.status,
          data: responseData.data,
        };
      }
    } else {
      console.log(path1Response.message + " : " + path2Response.message);
      return {
        isDenied: true,
        message: "Failed to update collection",
        status: path1Response.status,
        data: path1Response.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update shop",
      status: 500,
      data: undefined,
    };
  }
}

export async function PUT_AddImageCollection(id: string, image_link: string) {
  const URL = (
    BACKEND_PREFIX?.toString() +
    ":" +
    SHOP_PORT?.toString() +
    "/shop/addImgCollection/" +
    id
  ).toString();

  try {
    const response = await axios.put(URL, { imageUrls: [image_link] });
    console.log("RESULT", response);
    return response.data;
  } catch (error) {
    console.log("API_ERROR_ShopAPI_addImageCollection: ", error);
  }
}

export async function PUT_RemoveImageCollection(
  id: string,
  image_link: string
) {
  const URL = (
    BACKEND_PREFIX?.toString() +
    ":" +
    SHOP_PORT?.toString() +
    "/shop/removeImgCollection/" +
    id
  ).toString();

  try {
    const response = await axios.put(URL, { imageUrls: [image_link] });
    console.log("RESULT", response);
    return response.data;
  } catch (error) {
    console.log("API_ERROR_ShopAPI_removeImageCollection: ", error);
  }
}
