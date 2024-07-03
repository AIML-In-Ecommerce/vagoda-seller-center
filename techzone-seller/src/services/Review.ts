import { CommentInputType, ReviewAPI, ReviewInputType } from "@/apis/ReviewAPI";
import { CommentType } from "@/model/CommentType";
import { _ReviewType } from "@/model/ReviewType";

export const ReviewService = {
  getAllReview: async (input: ReviewInputType): Promise<_ReviewType[]> => {
    try {
      const response: any = await ReviewAPI.getAllReview(input);

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
  getReviewById: async (id: string): Promise<_ReviewType | null> => {
    try {
      const response: any = await ReviewAPI.getReviewById(id);

      if (response.data) {
        const formatedData: _ReviewType = response.data;
        return formatedData;
      }

      return null;
    } catch (error) {
      console.log("@SERVICE_getReviewById: ", error);

      return null;
    }
  },
  createComment: async (
    input: CommentInputType
  ): Promise<{
    status: number;
    message: string;
    data: CommentType | null;
  }> => {
    try {
      const response: any = await ReviewAPI.createComment(input);

      if (response.data) {
        const formatedData: {
          status: number;
          message: string;
          data: CommentType;
        } = response;
        return formatedData;
      }

      return { status: 500, message: "Không thể tạo phản hồi", data: null };
    } catch (error) {
      console.log("@SERVICE_updateProductById: ", error);

      return { status: 500, message: "Không thể tạo phản hồi", data: null };
    }
  },
};
