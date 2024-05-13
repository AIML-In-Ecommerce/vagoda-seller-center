"use client";
import { ShopType } from "@/model/ShopType";
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
    console.log(url);

    const response = await axios.get(url);
    const responseData: ShopResponse = response.data;

    console.log(responseData.data);

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
