import {
  APIFunctionResponse,
  APIResponseSchema,
} from "@/apis/APIResponseSchema";
import { GET_getShopInfo } from "@/apis/info/shop_info.api";
import {
  PUT_AddImageCollection,
  PUT_RemoveImageCollection,
} from "@/apis/shop/ShopAPI";
import { ShopInfoType } from "@/model/ShopInfoType";

const defaultErrorResponse: APIFunctionResponse = {
  statusCode: 500,
  message: "Connection error",
  data: undefined,
};

const ShopService = {
  async getShopInfoByShopId(shopId: string) {
    const response = await GET_getShopInfo(shopId);
    if (response == null) {
      return defaultErrorResponse;
    }

    const statusCode = JSON.parse(JSON.stringify(response.status));

    if (statusCode != 200 && statusCode != 201) {
      const result: APIFunctionResponse = {
        statusCode: statusCode,
        message: "Internal Server error",
        data: undefined,
      };

      return result;
    }

    const data: APIResponseSchema = JSON.parse(JSON.stringify(response.data));
    const shopInfo = data.data as ShopInfoType;

    const result: APIFunctionResponse = {
      statusCode: statusCode,
      message: "Get shop's info successfully",
      data: shopInfo,
    };

    return result;
  },

  addImageCollection: async (
    image_link: string,
    shop_id: string
  ): Promise<{
    status: number;
    message: string;
  }> => {
    try {
      const response: any = await PUT_AddImageCollection(image_link, shop_id);

      if (response.data) {
        const formatedData: { status: number; message: string } = response;
        return {
          status: formatedData.status,
          message: "Thêm hình ảnh vào bộ sưu tập thành công",
        };
      }

      return { status: 500, message: "Không thể thêm hình ảnh vào bộ sưu tập" };
    } catch (error) {
      console.log("@SERVICE_addImageCollection: ", error);

      return { status: 500, message: "Không thể thêm hình ảnh vào bộ sưu tập" };
    }
  },
  removeImageCollection: async (
    image_link: string,
    shop_id: string
  ): Promise<{
    status: number;
    message: string;
  }> => {
    try {
      const response: any = await PUT_RemoveImageCollection(
        image_link,
        shop_id
      );

      if (response.data) {
        const formatedData: { status: number; message: string } = response;
        return {
          status: formatedData.status,
          message: "Xóa hình ảnh vào bộ sưu tập thành công",
        };
      }

      return { status: 500, message: "Không thể xóa hình ảnh vào bộ sưu tập" };
    } catch (error) {
      console.log("@SERVICE_removeImageCollection: ", error);

      return { status: 500, message: "Không thể xóa hình ảnh vào bộ sưu tập" };
    }
  },
};

export default ShopService;
