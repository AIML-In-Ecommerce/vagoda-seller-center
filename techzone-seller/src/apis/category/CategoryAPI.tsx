"use client";

import { CategoryType } from "@/model/CategoryType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const CATEGORY_PORT = process.env.NEXT_PUBLIC_CATEGORY_PORT;

// const publicAPIURL = `${BACKEND_PREFIX}:${CATEGORY_PORT}`
const publicAPIURL = `${process.env.NEXT_PUBLIC_GATEWAY_PREFIX}`

interface CategoryResponse {
  status: number;
  data: CategoryType;
  message: string;
}

export async function GET_GetCategory(id: string) {
  const url = (publicAPIURL +
    "/category/" +
    id
  ).toString();

  try {
    const response = await axios.get(url);
    const responseData: CategoryResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get Category successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get Category",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get Category",
      status: 500,
      data: undefined,
    };
  }
}

interface CategoryListResponse {
  status: number;
  data: CategoryType[];
  message: string;
}

export async function GET_GetAllCategories() {
  const url = (publicAPIURL +
    "/categories"
  ).toString();

  try {
    const response = await axios.get(url);
    const responseData: CategoryListResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get Category successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get Category",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get Category",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_GetCategoryList(ids: string[]) {
  const url = (publicAPIURL +
    "/categories/list"
  ).toString();

  try {
    const requestBody = {
      ids: ids,
    };

    const response = await axios.post(url, requestBody);
    const responseData: CategoryListResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get category successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get category",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get category",
      status: 500,
      data: undefined,
    };
  }
}
