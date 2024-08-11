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
      console.log("Statements", response);
      if (response.data) {
        const formatedData: StatementType[] = response.data.statements;
        return {
          total: response.data.total,
          totalPages: response.data.totalPages,
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
    period: string;
    productStatements: ProductStatementType[];
  }> => {
    try {
      const response: any = await SettlementAPI.getStatementById(input);

      if (response.data) {
        console.log("STTT: ", response.data.productStatements);
        return {
          total: response.data.total,
          totalPages: response.data.totalPages,
          totalAmount: response.data.totalAmount,
          totalRevenue: response.data.totalRevenue,
          period: response.data.statementPeriod,
          productStatements: response.data.productStatements,
        };
      }

      return {
        total: 0,
        totalPages: 0,
        totalAmount: 0,
        totalRevenue: 0,
        period: "-",
        productStatements: [],
      };
    } catch (error) {
      console.log("@SERVICE_getProductById: ", error);

      return {
        total: 0,
        totalPages: 0,
        totalAmount: 0,
        totalRevenue: 0,
        period: "-",
        productStatements: [],
      };
    }
  },
};
