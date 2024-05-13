"use client";
import { ProductDetailType } from "@/model/ProductType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const PRODUCT_PORT = process.env.NEXT_PUBLIC_PRODUCT_PORT;

interface Data {
  _id: string;
  name: string;
  //   attributes: [
  //     attribute: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "ProductAttribute",
  //       required: true,
  //     },
  //     value: {
  //       type: String,
  //       required: true,
  //     }
  // ],
  description: string;
  originalPrice: number;
  finalPrice: number;
  category: string;
  subCategory: string[];
  shop: string;
  platformFee: number;
  status: string; // product status
  image: string[];
  avgRating: number;
  createdAt: Date;
  requiredAttribute: Object;
  soldQuantity: number;
}

interface ProductDetailResponse {
  status: number;
  data: Data;
  message: string;
}

export async function GET_GetProductDetail(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PRODUCT_PORT?.toString() +
    "/product/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: ProductDetailResponse = response.data;

    const processedData: ProductDetailType = {
      _id: id,
      name: responseData.data.name,
      // attribute: {
      //   ....
      // }
      description: responseData.data.description,
      originalPrice: responseData.data.originalPrice,
      finalPrice: responseData.data.finalPrice,
      category: responseData.data.category,
      shopId: responseData.data.shop,
      status: 0, //TODO
      image: responseData.data.image,
      avgRating: responseData.data.avgRating,
      soldQuantity: responseData.data.soldQuantity,
    };

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get product detail successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get product detail",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get product detail",
      status: 500,
      data: undefined,
    };
  }
}

interface ProductListResponse {
  status: number;
  data: Data[];
  message: string;
}

export async function POST_GetProductList(idList: string[]) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PRODUCT_PORT?.toString() +
    "/products/list"
  ).toString();

  try {
    console.log(url);
    // const requestBody = ids;

    const response = await axios.post(
      url,
      { ids: idList }
      // {
      //   headers: {
      //     Authorization: `Bearer ${auth.user?.access_token}`,
      //   },
      // }
    );
    const responseData: ProductListResponse = response.data;

    console.log(responseData.data);

    // TODO: convert data[] to producttype
    //   const processedData: ProductDetailType = {
    //     _id: id,
    //     name: responseData.data.name,
    //     // attribute: {
    //     //   ....
    //     // }
    //     description: responseData.data.description,
    //     originalPrice: responseData.data.originalPrice,
    //     finalPrice: responseData.data.finalPrice,
    //     category: responseData.data.category,
    //     shopId: responseData.data.shop,
    //     status: 0, //TODO
    //     image: responseData.data.image,
    //     avgRating: responseData.data.avgRating,
    //     soldQuantity: responseData.data.soldQuantity,
    //   };

    // const processedData: ProductDetailType[] = responseData.data as ProductDetailType[];

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get product list successfully",
        status: responseData.status,
        // data: processedData,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get product list",
        status: responseData.status,
        // data: processedData,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get product list",
      status: 500,
      data: undefined,
    };
  }
}
