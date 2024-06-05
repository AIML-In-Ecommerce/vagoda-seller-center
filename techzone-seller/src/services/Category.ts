import { CategoryAPI } from "@/apis/CategoryAPI";
import { _CategoryType } from "@/model/CategoryType";

export const CategoryService = {
  getAllCategories: async (): Promise<_CategoryType[]> => {
    try {
      const response: any = await CategoryAPI.getAllCategories();

      if (response.data && Array.isArray(response.data)) {
        const formatedData: _CategoryType[] = response.data;
        return formatedData;
      }

      return [];
    } catch (error) {
      console.log("@SERVICE_getAllCategories: ", error);

      return [];
    }
  },
  getCategoryById: async (id: string): Promise<_CategoryType> => {
    try {
      const response: any = await CategoryAPI.getCategoryById(id);

      if (response.data) {
        const formatedData: _CategoryType = response.data;
        return formatedData;
      }

      return { _id: "", name: "", image: "", subCategories: [] };
    } catch (error) {
      console.log("@SERVICE_getCategoryById: ", error);

      return { _id: "", name: "", image: "", subCategories: [] };
    }
  },
  getSubCategoryById: async (id: string): Promise<_CategoryType> => {
    try {
      const response: any = await CategoryAPI.getSubCategoryById(id);

      if (response.data) {
        const formatedData: _CategoryType = response.data;
        return formatedData;
      }

      return { _id: "", name: "", image: "", subCategories: [] };
    } catch (error) {
      console.log("@SERVICE_getSubCategoryById: ", error);

      return { _id: "", name: "", image: "", subCategories: [] };
    }
  },
  getSubCategoryTypeById: async (id: string): Promise<_CategoryType> => {
    try {
      const response: any = await CategoryAPI.getSubCategoryTypeById(id);

      if (response.data) {
        const formatedData: _CategoryType = response.data;
        return formatedData;
      }

      return { _id: "", name: "", image: "", subCategories: [] };
    } catch (error) {
      console.log("@SERVICE_getSubCategoryTypeById: ", error);

      return { _id: "", name: "", image: "", subCategories: [] };
    }
  },
};
