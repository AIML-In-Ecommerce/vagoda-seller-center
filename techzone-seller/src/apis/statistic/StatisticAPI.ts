import axios from "axios";

// const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
// const STATISTICS_PORT = process.env.NEXT_PUBLIC_STATISTICS_PORT;
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;

interface StatisticResponse {
  status: number;
  data: any;
  message: string;
}

export interface SalesInterval {
    count: number; // number of orders
    interval: Date[],
    profit: number;
    revenue: number;
    statisticsData: Order[]
}

export interface SalesStatistic {
  avgProfit: number;
  avgRevenue: number;
  totalOrders: number;
  totalRevenue: number;
  totalProfit: number;
  statisticsData: SalesInterval[];
}

export interface Order {
  _id: string;
  user: string;
  shop: string;
  products: Product[];
  promotion: null;
  paymentMethod: PaymentMethod;
  shippingFee: number;
  totalPrice: number;
  profit: number;
  shippingAddress: ShippingAddress;
  confirmedStatus: OrderStatus;
  __v: number;
}

export interface OrderStatus {
  _id: string;
  status: OrderStatusType;
  complete: Date;
  time: Date;
  deadline: Date | null;
}

export interface PaymentMethod {
  kind: string;
  name: string;
  isPaid: boolean;
  paidAt: null;
}

export interface Product {
  product: string;
  quantity: number;
  purchasedPrice: number;
  color: ProductColor;
  size: string;
  _id: string;
}

export interface ProductColor {
  link: string;
  color: ColorColor;
}

export interface ColorColor {
  label: string;
  value: string;
}

export interface ShippingAddress {
  coordinate: Coordinate;
  receiverName: string;
  street: string;
  idProvince: string;
  idDistrict: string;
  idCommune: string;
  country: string;
  phoneNumber: string;
  label: string;
  isDefault: boolean;
  _id: string;
}

export interface Coordinate {
  lng: number;
  lat: number;
  _id: string;
}

export enum OrderStatusType {
  WAITING_ONLINE_PAYMENT = "WAITING_ONLINE_PAYMENT",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface BusinessPerformanceStats {
  totalRevenue: number;
  totalProfit: number;
  avgRevenue: number;
  avgProfit: number;
  totalOrders: number;
  totalAccess: number;
  conversionRate: number;
  statisticData: StatisticInterval[];
}

export interface StatisticInterval {
  interval: Date[];
  access: number;
  orders: number;
  revenue: number;
  profit: number;
  conversionRate: number | null;
  statisticData: any[];
}

export interface ReviewRange {
  range: [number, number];
  totalReviews: number;
  statisticData: any;
}

export async function POST_getTopProductsInSales(
  shopId: string,
  startTime: Date,
  endTime: Date
) {
  const url = `${GATEWAY_PREFIX}/statistics/product/top/in_sales?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
    });
    const responseData: StatisticResponse = response.data;

    if (responseData.status === 200) {
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

export async function POST_getOrderStatistics(
  shopId: string,
  orderStatus: OrderStatusType,
  startTime: Date,
  endTime: Date
) {
  const url = `${GATEWAY_PREFIX}/statistics/order/latest_status?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      orderStatus: orderStatus,
      startTime: startTime,
      endTime: endTime,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get order status ${orderStatus} successfully`,
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

export async function POST_getTotalSales(
  shopId: string,
  startTime: Date,
  endTime: Date
) {
  const url = `${GATEWAY_PREFIX}/statistics/shop/sales/total?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get total sales successfully`,
        status: responseData.status,
        data: responseData.data as SalesStatistic,
      };
    } else {
      return {
        isDenied: true,
        message: "Cannot get total sales",
        status: responseData.status,
        data: undefined,
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

export async function POST_getTotalRecievedOrders(
  shopId: string,
  startTime: Date,
  endTime: Date,
  step?: string
) {
  const url = `${GATEWAY_PREFIX}/statistics/order/received?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
      step: step,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get total received order statistics successfully`,
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

export async function POST_getTotalLateTimeOrders(
  shopId: string,
  startTime: Date,
  endTime: Date,
  isAscending?: boolean
) {
  const url = `${GATEWAY_PREFIX}/statistics/order/late_in_process?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
      isAscending: isAscending,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get total late-time-process order statistics successfully`,
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

//Xử lý đúng hạn
export async function POST_getTotalOnTimeOrders(
  shopId: string,
  startTime: Date,
  endTime: Date,
  isAscending?: boolean
) {
  const url = `${GATEWAY_PREFIX}/statistics/order/on_time_process?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
      isAscending: isAscending,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get total on-time-process order statistics successfully`,
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

//Chờ xử lý
export async function POST_getTotalProcessOrders(
  shopId: string,
  startTime: Date,
  endTime: Date,
  isAscending?: boolean
) {
  const url = `${GATEWAY_PREFIX}/statistics/order/waiting_for_process?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
      isAscending: isAscending,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get total waiting-for-process order statistics successfully`,
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

//Hiệu quả kinh doanh
export async function POST_getBEStats(
  shopId: string,
  startTime: Date,
  endTime: Date,
  step?: string
) {
  const url = `${GATEWAY_PREFIX}/statistics/shop/conversion/view_and_sales?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
      step: step,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get conversion of view and sales successfully`,
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

//Đánh giá
export async function POST_getReviewStatistics(
  shopId: string,
  targetProductIds?: string[],
  ratingRanges?: Array<number[]>,
  startTime?: Date,
  endTime?: Date,
  useReviewInfo?: boolean,
  useProductInfo?: boolean
) {
  const url = `${GATEWAY_PREFIX}/statistics/product/reviews?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      targetProductIds: targetProductIds ?? [],
      ratingRanges: ratingRanges,
      startTime: startTime,
      endTime: endTime,
      useReviewInfo: useReviewInfo ?? false,
      useProductInfo: useProductInfo ?? false,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get review statistics successfully`,
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
