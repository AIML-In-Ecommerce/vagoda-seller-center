"use client";

import { PromotionType } from "@/model/PromotionType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const PROMOTION_PORT = process.env.NEXT_PUBLIC_PROMOTION_PORT;
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;

interface PromotionListResponse {
  status: number;
  data: PromotionType[];
  message: string;
}

interface PromotionSingleResponse {
  status: number;
  data: PromotionType;
  message: string;
}

export async function POST_GetPromotionList(ids: string[]) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PROMOTION_PORT?.toString() +
    "/promotions/list"
  ).toString();

  try {
    // console.log(url);
    const requestBody = {
      promotionIds: ids,
    };

    const response = await axios.post(url, requestBody);
    const responseData: PromotionListResponse = response.data;

    if (responseData.data) {
      return {
        isDenied: false,
        message: "Get promotion successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get promotion",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get promotion",
      status: 500,
      data: undefined,
    };
  }
}

export async function GET_GetAllPromotions() {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PROMOTION_PORT?.toString() +
    "/promotions"
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: PromotionListResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get promotions successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get promotions",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get promotions",
      status: 500,
      data: undefined,
    };
  }
}

export async function GET_GetPromotionListByShop(shopId: string) {
  // const url = (
  //   BACKEND_PREFIX?.toString() +
  //   ":" +
  //   PROMOTION_PORT?.toString() +
  //   "/promotions/shop/" +
  //   shopId
  // ).toString();
  const url = (
    GATEWAY_PREFIX?.toString() +
    "/promotion/shop/all?shopId=" +
    shopId
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: PromotionListResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get promotion successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get promotion",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get promotion",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_CreatePromotion(
  shopId: string,
  promotion: PromotionType
) {
  const url = `${GATEWAY_PREFIX}/promotion/seller/create?shopId=${shopId}`;

  try {
    // console.log(url);
    const response = await axios.post(url, {
      name: promotion.name || "",
      description: promotion.description || "",
      discountTypeInfo: promotion.discountTypeInfo,
      activeDate: promotion.activeDate,
      expiredDate: promotion.expiredDate,
      targetProducts: [], //all products for now
      quantity: promotion.quantity || 2,
      redeemedTotal: 0,
      status: promotion.status,
      code: promotion.code,
    });
    const responseData: PromotionListResponse = response.data;

    if (responseData.status === 200) {
      return {
        isDenied: false,
        message: "Create promotion successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get promotion",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get promotion",
      status: 500,
      data: undefined,
    };
  }
}

export async function PUT_UpdatePromotion(
  shopId: string,
  promotionId: string,
  promotion: PromotionType
) {
  const url = `${GATEWAY_PREFIX}/promotion/seller/update?shopId=${shopId}&promotionId=${promotionId}`;

  try {
    // console.log(url);
    const response = await axios.put(url, {
      name: promotion.name || "",
      shopId: shopId,
      description: promotion.description || "",
      discountTypeInfo: promotion.discountTypeInfo,
      activeDate: promotion.activeDate,
      expiredDate: promotion.expiredDate,
      targetProducts: [], //all products for now
      quantity: promotion.quantity || 2,
      redeemedTotal: 0,
      status: promotion.status,
      code: promotion.code,
    });
    const responseData: PromotionListResponse = response.data;

    if (responseData.status === 200) {
      return {
        isDenied: false,
        message: "Update promotion successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update promotion",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update promotion",
      status: 500,
      data: undefined,
    };
  }
}

export async function DELETE_DeletePromotion(
  shopId: string,
  promotionId: string
) {
  const url = `${GATEWAY_PREFIX}/promotion/seller/delete?shopId=${shopId}&promotionId=${promotionId}`;

  try {
    // console.log(url);
    const response = await axios.delete(url);
    const responseData: PromotionListResponse = response.data;

    if (responseData.status === 200) {
      return {
        isDenied: false,
        message: "Delete promotion successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to delete promotion",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to delete promotion",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_GetPromotionByCode(shopId: string, code: string) {
  const url = `${GATEWAY_PREFIX}/promotion/codes?shopId=${shopId}`;

  try {
    // console.log(url);
    const response = await axios.post(url, {
      codes: [code],
    });
    const responseData: PromotionListResponse = response.data;

    if (responseData.status === 200) {
      return {
        isDenied: false,
        message: "Get promotion by code successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to Get promotion by code",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to Get promotion by code",
      status: 500,
      data: undefined,
    };
  }
}

export async function GET_GetPromotionById(
  shopId: string,
  promotionId: string
) {
  const url = `${GATEWAY_PREFIX}/promotion/info?promotionId=${promotionId}`;

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: PromotionSingleResponse = response.data;

    if (responseData.status === 200) {
      return {
        isDenied: false,
        message: "Get promotion by code successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to Get promotion by code",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to Get promotion by code",
      status: 500,
      data: undefined,
    };
  }
}
