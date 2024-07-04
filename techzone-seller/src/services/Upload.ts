import { UploadAPI } from "@/apis/UploadAPI";
import FormData from "form-data";

export const UploadService = {
  getURLImage: async (data: FormData): Promise<string> => {
    try {
      const response: any = await UploadAPI.getURLImage(data);

      if (response.data) {
        const { path } = response.data;
        return path;
      }

      return "";
    } catch (error) {
      console.log("@SERVICE_getURLImage: ", error);

      return "";
    }
  },
  deleteFile: async (
    url: string
  ): Promise<{
    status: number;
    message: string;
  }> => {
    try {
      const response: any = await UploadAPI.deleteFile(url);

      if (response.data) {
        const formatedData: { status: number; message: string } = response;
        return {
          status: formatedData.status,
          message: "Xóa file thành công",
        };
      }

      return { status: 500, message: "Không thể xóa file" };
    } catch (error) {
      console.log("@SERVICE_deleteFile: ", error);

      return { status: 500, message: "Không thể xóa file" };
    }
  },
};
