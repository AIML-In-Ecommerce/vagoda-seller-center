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
};
