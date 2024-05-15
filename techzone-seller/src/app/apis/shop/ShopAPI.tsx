"use client";
import { ShopInfoDesignType, ShopType } from "@/model/ShopType";
import axios from "axios";

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
    const requestBody = {
      shopInfoDesign: shopInfoDesign,
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
