import axios from "axios";
import FormData from "form-data";

export interface ProductFilterInput {
  keyword?: string;
  shopId?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string[];
  subCategory?: string[];
  subCategoryType?: string[];
  avgRating?: number;
  sortBy?: string;
  index?: number;
  amount?: number;
  status?: string;
}

export interface ProductCreatedInput {
  name: string;
  description: string;
  category: string;
  subCategory: string;
  subCategoryType: string | null;
  brand: string;
  originalPrice: number;
  finalPrice: number;
  shop: string;
  status: string;
  inventoryAmount: number;
  images: string[];
  attribute: {
    colors: {
      link: string;
      color: { label: string; value: string };
    }[];
    size: string[];
    material: string;
    warranty: string;
    manufacturingPlace: string;
  };
}

const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_PRODUCT_PORT}`;

export const ProductAPI = {
  getProductByFilter: async (input: ProductFilterInput) => {
    console.log("INPUT", BACKEND_SERVER_PREFIX);
    const URL = `${BACKEND_SERVER_PREFIX}/products/filter`;
    try {
      const response = await axios.post(URL, input);
      console.log("RESULT", response);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_getProductByFilter: ", error);
    }
  },
  getProductById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/product/${id}`;
    try {
      const response = await axios.get(URL);
      console.log("RESULT", response);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_getProductById: ", error);
    }
  },
  deleteProductById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/product/${id}`;
    try {
      const response = await axios.delete(URL);
      console.log("RESULT", response);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_deleteProductById: ", error);
    }
  },
  createProduct: async (input: ProductCreatedInput) => {
    console.log("INPUT", BACKEND_SERVER_PREFIX);
    const URL = `${BACKEND_SERVER_PREFIX}/product`;
    try {
      const response = await axios.post(URL, input);
      console.log("RESULT", response);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_createProduct: ", error);
    }
  },
  createBatchProduct: async (fileData: FormData) => {
    console.log("INPUT", BACKEND_SERVER_PREFIX);
    const URL = `${BACKEND_SERVER_PREFIX}/product`;
    try {
      const response = await axios.post(URL, { shopId: "" });
      console.log("RESULT", response);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_createProduct: ", error);
    }
  },
  updateProduct: async (input: ProductCreatedInput, product_id: string) => {
    console.log("INPUT", BACKEND_SERVER_PREFIX);
    const URL = `${BACKEND_SERVER_PREFIX}/product/${product_id}`;
    try {
      const response = await axios.put(URL, input);
      console.log("RESULT", response);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_updateProduct: ", error);
    }
  },
};
