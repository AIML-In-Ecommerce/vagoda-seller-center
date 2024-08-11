import axios from "axios";

const BACKEND_SERVER_PREFIX = `${process.env.NEXT_PUBLIC_GATEWAY_PREFIX}`;

export interface StatementInput {
  shopId: string;
  index?: number;
  amount?: number;
}

export interface ProductStatementInput {
  id: string;
  index?: number;
  amount?: number;
}

export const SettlementAPI = {
  getAllStatements: async (input: StatementInput) => {
    const URL = `${BACKEND_SERVER_PREFIX}/settlement/statement/of_shop`;
    try {
      const response = await axios.post(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_SettlementAPI_getAllStatement: ", error);
    }
  },
  getStatementById: async (input: ProductStatementInput) => {
    const URL = `${BACKEND_SERVER_PREFIX}/settlement/statement/detail`;
    try {
      const response = await axios.post(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_SettlementAPI_getStatementById: ", error);
    }
  },
};
