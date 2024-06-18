import axios from "axios";

const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_REVIEW_PORT}`;

export const ReviewAPI = {
  getAllReview: async () => {
    console.log("INPUT", BACKEND_SERVER_PREFIX);
    const URL = `${BACKEND_SERVER_PREFIX}/reviews`;
    try {
      const response = await axios.get(URL);
      console.log("RESULT", response);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ReviewAPI_getAllReview: ", error);
    }
  },
};
