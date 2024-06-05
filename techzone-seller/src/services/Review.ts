import { ReviewAPI } from "@/apis/ReviewAPI";
import { _ReviewType } from "@/model/ReviewType";

export const ReviewService = {
  getAllReview: async (): Promise<_ReviewType[]> => {
    try {
      const response: any = await ReviewAPI.getAllReview();

      if (response.data && Array.isArray(response.data)) {
        const formatedData: _ReviewType[] = response.data;
        return formatedData;
      }

      return [];
    } catch (error) {
      console.log("@SERVICE_getAllReview: ", error);

      return [];
    }
  },
};
