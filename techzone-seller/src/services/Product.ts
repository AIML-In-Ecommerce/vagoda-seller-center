import {
  ProductAPI,
  ProductCreatedInput,
  ProductFilterInput,
} from "@/apis/ProductAPI";
import { _ProductType } from "@/model/ProductType";

export const ProductService = {
  getProductByFilter: async (
    input: ProductFilterInput
  ): Promise<{
    total: number;
    totalPages: number;
    products: _ProductType[];
  }> => {
    try {
      console.log("THANH", input);
      const response: any = await ProductAPI.getProductByFilter({
        ...input,
        shopId: "65f1e8bbc4e39014df775166",
      });

      if (response.data && Array.isArray(response.data)) {
        const formatedData: _ProductType[] = response.data;
        return {
          total: response.total,
          totalPages: response.totalPages,
          products: formatedData,
        };
      }

      return {
        total: 0,
        totalPages: 0,
        products: [],
      };
    } catch (error) {
      console.log("@SERVICE_getProductByFilter: ", error);

      return {
        total: 0,
        totalPages: 0,
        products: [],
      };
    }
  },
  getProductById: async (id: string): Promise<_ProductType | null> => {
    try {
      const response: any = await ProductAPI.getProductById(id);

      if (response.data) {
        const formatedData: _ProductType = response.data;
        return formatedData;
      }

      return null;
    } catch (error) {
      console.log("@SERVICE_getProductById: ", error);

      return null;
    }
  },
  deleteProductById: async (
    id: string
  ): Promise<{ status: number; message: string }> => {
    try {
      const response: any = await ProductAPI.deleteProductById(id);

      if (response.data) {
        const formatedData: { status: number; message: string } = response;
        return formatedData;
      }

      return { status: 500, message: "Không thể xóa sản phẩm" };
    } catch (error) {
      console.log("@SERVICE_deleteProductById: ", error);

      return { status: 500, message: "Không thể xóa sản phẩm" };
    }
  },
  createProduct: async (
    input: ProductCreatedInput
  ): Promise<{
    status: number;
    message: string;
  }> => {
    try {
      const response: any = await ProductAPI.createProduct({
        ...input,
        shop: "65f1e8bbc4e39014df775166",
      });

      if (response.data) {
        const formatedData: { status: number; message: string } = response;
        return formatedData;
      }

      return { status: 500, message: "Không thể tạo sản phẩm" };
    } catch (error) {
      console.log("@SERVICE_deleteProductById: ", error);

      return { status: 500, message: "Không thể tạo sản phẩm" };
    }
  },
};
