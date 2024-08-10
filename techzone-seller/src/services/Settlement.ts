import {
  ProductStatementInput,
  SettlementAPI,
  StatementInput,
} from "@/apis/SettlementAPI";
import { ProductStatementType } from "@/model/ProductStatementType";
import { StatementType } from "@/model/StatementType";

export const SettlementService = {
  getAllStatements: async (
    input: StatementInput
  ): Promise<{
    total: number;
    totalPages: number;
    statements: StatementType[];
  }> => {
    try {
      const response: any = await SettlementAPI.getAllStatements(input);

      if (response.data && Array.isArray(response.data)) {
        const formatedData: StatementType[] = response.data;
        return {
          total: response.total,
          totalPages: response.totalPages,
          statements: formatedData,
        };
      }

      return {
        total: 0,
        totalPages: 0,
        statements: [],
      };
    } catch (error) {
      console.log("@SERVICE_getAllStatements: ", error);

      return {
        total: 0,
        totalPages: 0,
        statements: [],
      };
    }
  },
  getStatementById: async (
    input: ProductStatementInput
  ): Promise<{
    total: number;
    totalPages: number;
    totalAmount: number;
    totalRevenue: number;
    productStatements: ProductStatementType[];
  }> => {
    try {
      const response: any = await SettlementAPI.getStatementById(input);

      if (response.data && Array.isArray(response.data)) {
        const formatedData: ProductStatementType[] = response.data;
        return {
          total: response.total,
          totalPages: response.totalPages,
          totalAmount: response.totalAmount,
          totalRevenue: response.totalRevenue,
          productStatements: formatedData,
        };
      }

      return {
        total: 0,
        totalPages: 0,
        totalAmount: 0,
        totalRevenue: 0,
        productStatements: [],
      };
    } catch (error) {
      console.log("@SERVICE_getProductById: ", error);

      return {
        total: 0,
        totalPages: 0,
        totalAmount: 0,
        totalRevenue: 0,
        productStatements: [],
      };
    }
  },
};
