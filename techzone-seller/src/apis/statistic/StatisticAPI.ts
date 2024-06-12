import React from 'react'
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const STATISTICS_PORT = process.env.NEXT_PUBLIC_STATISTICS_PORT;

interface StatisticResponse {
  status: number;
  data: any;
  message: string;
}

export async function POST_getTopProductsInSales(shopId: string, startTime: Date, endTime: Date) {
    const url = `${BACKEND_PREFIX}:${STATISTICS_PORT}/statistics/product/top/in_sales`;

    try {
        // console.log(url);
        const response = await axios.post(url, {
            shopId: shopId,
            startTime: startTime,
            endTime: endTime
        });
        const responseData: StatisticResponse = response.data;
    
        if (responseData.status == 200) {
          return {
            isDenied: false,
            message: "Get top sales of products successfully",
            status: responseData.status,
            data: responseData.data,
          };
        } else {
          return {
            isDenied: true,
            message: "Cannot get the statistics",
            status: responseData.status,
            data: responseData.data,
          };
        }
      } catch (err) {
        console.error(err);
        return {
          isDenied: true,
          message: "Cannot get the statistics",
          status: 500,
          data: undefined,
        };
      }
} 