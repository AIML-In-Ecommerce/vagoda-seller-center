import axios from "axios";
import FormData from "form-data";

// const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_WIDGET_PORT}`;
const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_GATEWAY_PREFIX}`


export const UploadAPI = {
  getURLImage: async (data: FormData) => {
    const URL = `${BACKEND_SERVER_PREFIX}/upload`;
    try {
      const response = await axios.post(URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("API_ERROR_UploadAPI_getURLImage: ", error);
    }
  },
  deleteFile: async (url: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/deleteFile`;
    try {
      const response = await axios.post(URL, { url });
      return response.data;
    } catch (error) {
      console.log("API_ERROR_UploadAPI_deleteFile: ", error);
    }
  },
};
