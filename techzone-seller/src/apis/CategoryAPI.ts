import axios from "axios";

const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_CATEGORY_PORT}`;

export const CategoryAPI = {
  getAllCategories: async () => {
    const URL = `${BACKEND_SERVER_PREFIX}/categories`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_CategoryAPI_getAllCategories: ", error);
    }
  },
  getCategoryById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/category/${id}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_CategoryAPI_getCategoryById: ", error);
    }
  },
  getSubCategoryById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/subCategory/${id}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_CategoryAPI_getSubCategoryById: ", error);
    }
  },
  getSubCategoryTypeById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/subCategoryType/${id}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("getSubCategoryTypeById: ", error);
    }
  },
};
