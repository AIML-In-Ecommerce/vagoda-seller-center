import axios from "axios";

// const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_REVIEW_PORT}`;
const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_GATEWAY_PREFIX}`


export interface ReviewInputType {
  shop: string;
  category?: string;
  product?: string;
  isResponse?: boolean;
  rating?: number;
  index?: number;
  amount?: number;
}

export type CommentInputType = {
  review: string;
  shop: string;
  content: string;
};

export const ReviewAPI = {
  getAllReview: async (input: ReviewInputType) => {
    const URL = `${BACKEND_SERVER_PREFIX}/reviews/filter`;
    try {
      const response = await axios.post(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ReviewAPI_getAllReview: ", error);
    }
  },
  getReviewById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/review/${id}`;

    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ReviewAPI_getReviewById: ", error);
    }
  },
  createComment: async (input: CommentInputType) => {
    const URL = `${BACKEND_SERVER_PREFIX}/comment`;
    try {
      const response = await axios.post(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ReviewAPI_createComment: ", error);
    }
  },
};
