import axios from "axios";

const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_GATEWAY_PREFIX}`

export const TransactionAPI = {
  getAllTransaction: async () => {
    const URL = `${BACKEND_SERVER_PREFIX}/transaction`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_TransactionAPI_getAllTransaction: ", error);
    }
  },
  getTransactionById: async (id: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/transaction/${id}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_TransactionAPI_getTransactionById: ", error);
    }
  },
  getTransactionByShopId: async (shopId: string) => {
    const URL = `${BACKEND_SERVER_PREFIX}/transaction/shop/${shopId}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_TransactionAPI_getTransactionByShopId: ", error);
    }
  },
  filterTransaction: async (shopId: string, category?: string, startDate?: Date, endDate?: Date) => {
    const URL = `${BACKEND_SERVER_PREFIX}/transaction/filter`;
    try {
      const response = await axios.get(URL, {
        params: {
            shopId: shopId,
            category: category,
            startDate: startDate,
            endDate: endDate,
        }
      });
      return response.data;
    } catch (error) {
      console.log("API_ERROR_TransactionAPI_filterTransaction: ", error);
    }
  },
};
