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

export interface FileInfoInput {
  shop: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_PRODUCT_PORT}`;

export const ProductAPI = {
  getProductByFilter: async (input: ProductFilterInput) => {
    const URL = `${BACKEND_SERVER_PREFIX}/products/filter`;
    try {
      const response = await axios.post(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_getProductByFilter: ", error);
    }
  },
  getProductById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/product/${id}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_getProductById: ", error);
    }
  },
  deleteProductById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/product/${id}`;
    try {
      const response = await axios.delete(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_deleteProductById: ", error);
    }
  },
  createProduct: async (input: ProductCreatedInput) => {
    const URL = `${BACKEND_SERVER_PREFIX}/product`;
    try {
      const response = await axios.post(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_createProduct: ", error);
    }
  },
  createBatchProduct: async (fileData: FormData) => {
    const URL = `${BACKEND_SERVER_PREFIX}/import`;

    try {
      const response = await axios.post(URL, fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_createBatchProduct: ", error);
    }
  },
  updateProduct: async (input: ProductCreatedInput, product_id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/product/${product_id}`;
    try {
      const response = await axios.put(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_updateProduct: ", error);
    }
  },
  getFileInfoByFilter: async (input: FileInfoInput) => {
    let URL = `${BACKEND_SERVER_PREFIX}/files/filter?shop=${input.shop}`;
    const params = new URLSearchParams();

    if (input.name) {
      params.append("name", input.name);
    }
    if (input.status) {
      params.append("status", input.status);
    }
    if (input.startDate) {
      params.append("startDate", input.startDate);
    }
    if (input.endDate) {
      params.append("endDate", input.endDate);
    }

    const fullURL = `${URL}&${params.toString()}`;

    try {
      const response = await axios.get(fullURL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_getFileInfoByFilter: ", error);
    }
  },
};
