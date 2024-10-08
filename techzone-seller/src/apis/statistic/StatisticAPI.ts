import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const STATISTICS_PORT = process.env.NEXT_PUBLIC_STATISTICS_PORT;
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;

// const publicAPIURL = `${BACKEND_PREFIX}:${STATISTICS_PORT}`
const publicAPIURL = `${GATEWAY_PREFIX}`

interface StatisticResponse {
  status: number;
  data: any;
  message: string;
}

export interface SalesInterval {
  count: number; // number of orders
  interval: Date[];
  profit: number;
  revenue: number;
  statisticsData: Order[];
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
  promotion: string[];
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

export interface ConversionRateStatistic {
  totalRevenue: number;
  totalProfit: number;
  avgRevenue: number;
  avgProfit: number;
  totalOrders: number;
  totalAccess: number;
  conversionRate: number;
  statisticsData: ConversionRateInterval[];
}

export interface ConversionRateInterval {
  interval: Date[];
  access: number;
  orders: number;
  revenue: number;
  profit: number;
  conversionRate: number | null;
  statisticsData: any[];
}

export interface OrderStatusStatistic {
  totalRevenue: number;
  totalProfit: number;
  avgRevenue: number;
  avgProfit: number;
  totalOrders: number;
  statisticsData: OrderStatusInterval[];
}

export interface OrderStatusInterval {
  interval: Date[];
  profit: number;
  avgRevenue: number;
  avgProfit: number;
  totalOrders: number;
  statisticsData: any[];
}

export interface ReturningRateStatistic {
  totalOrders: number;
  totalRevenue: number;
  totalProfit: number;
  totalReturningRevenue: number;
  totalReturningProfit: number;
  totalUsers: number;
  totalReturningUsers: number;
  returningRate: number;
  statisticsData: ReturningRateInterval[];
}

export interface ReturningRateInterval {
  interval: Date[];
  totalOrders: number;
  totalUsers: number;
  totalReturningUsers: number;
  returningRate: number;
  statisticsData: any[];
}

export interface ReviewRange {
  range: [number, number];
  totalReviews: number;
  statisticsData: any;
}

export interface ShopPerformanceDetail {
  cancelPercentage: number;
  refundPercentage: number;
  sinceYear: number;
  totalProductNumber: number;
  description: string;
  rating: number;
  replyPercentage: number;
  address: string;
  _id: string;
  operationalQuality: number;
}

export async function POST_getTopProductsInSales(
  shopId: string,
  startTime: Date,
  endTime: Date
) {
  const url = `${publicAPIURL}/statistics/product/top/in_sales?shopId=${shopId}`;
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

export async function POST_getTopCitiesInSales(
  shopId: string,
  startTime: Date,
  endTime: Date,
  amount?: number
) {
  const url = `${publicAPIURL}/statistics/shop/top_city_in_sales?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
      amount: amount,
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
  const url = `${publicAPIURL}/statistics/order/latest_status?shopId=${shopId}`;
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
  endTime: Date,
  step?: string
) {
  const url = `${publicAPIURL}/statistics/shop/sales/total?shopId=${shopId}`;
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
  const url = `${publicAPIURL}/statistics/order/received?shopId=${shopId}`;
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
  isAscending?: boolean,
  step?: string
) {
  const url = `${publicAPIURL}/statistics/order/late_pending_processing?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      startTime: startTime,
      endTime: endTime,
      isAscending: isAscending,
      step: step,
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
  const url = `${publicAPIURL}/statistics/order/on_time_pending_processing?shopId=${shopId}`;
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
  isAscending?: boolean,
  step?: string,
) {
  const url = `${publicAPIURL}/statistics/order/on_waiting_pending_processing?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      orderStatus: "PENDING", 
      startTime: startTime,
      endTime: endTime,
      isAscending: isAscending,
      step: step,
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
export async function POST_getConversionRateStats(
  shopId: string,
  startTime: Date,
  endTime: Date,
  step?: string
) {
  const url = `${publicAPIURL}/statistics/shop/conversion/view_and_sales?shopId=${shopId}`;
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
  const url = `${publicAPIURL}/statistics/product/reviews?shopId=${shopId}`;
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

//Shop performance
export async function GET_getShopPerformanceStatistics(shopId: string) {
  const url = `${publicAPIURL}/shop_info/shopDetail?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get shop performance details successfully`,
        status: responseData.status,
        data: responseData.data as ShopPerformanceDetail,
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

//Khách hàng quay lại
export async function POST_getReturnRateOfCustomers(
  shopId: string,
  startTime?: Date,
  endTime?: Date,
  step?: string
) {
  const url = `${publicAPIURL}/statistics/shop/returning_rate?shopId=${shopId}`;
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
        message: `Get the returning statistics successfully`,
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

//Người truy cập
export async function POST_getProductViewers(
  shopId: string,
  productIds: string[],
  startTime: Date | number,
  endTime: Date | number,
  accessType?: string,
  step?: string
) {
  const url = `${publicAPIURL}/statistics/product/views_viewers?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      productIds: productIds,
      accessType: accessType,
      startTime: startTime,
      endTime: endTime,
      step: step,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get the statistics successfully`,
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

//Tỉ lệ thêm vào giỏ hàng
export async function POST_getAddToCartRatio(
  shopId: string,
  productIds: string[],
  startTime: Date | number,
  endTime: Date | number
) {
  const url = `${publicAPIURL}/statistics/product/ratio/add_to_cart?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      productIds: productIds,
      startTime: startTime,
      endTime: endTime,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get add to cart statistics successfully`,
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

//Số lượng người thêm vào giỏ hàng
export async function POST_getAddToCartAmount(
  shopId: string,
  productIds: string[],
  startTime: Date | number,
  endTime: Date | number
) {
  const url = `${publicAPIURL}/statistics/product/ratio/add_to_cart?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      productIds: productIds,
      startTime: startTime,
      endTime: endTime,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get add to cart statistics successfully`,
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

//Số lượng đơn hàng đã xác nhận của sản phẩm
export async function POST_getSoldAmountOfProducts(
  shopId: string,
  productIds: string[],
  startTime: Date | number,
  endTime: Date | number,
  step?: string
) {
  const url = `${publicAPIURL}/statistics/product/sold_amount/detail?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      productIds: productIds,
      startTime: startTime,
      endTime: endTime,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get sold amount of products successfully`,
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

//Số lượng đơn hàng đã xác nhận của sản phẩm
export async function POST_getOrderStatisticsWithStatus(
  shopId: string,
  orderStatus: OrderStatusType,
  startTime: Date | number,
  endTime: Date | number,
  step?: string,
  isAscending?: boolean
) {
  const url = `${publicAPIURL}/statistics/order/status?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      orderStatus: orderStatus,
      startTime: startTime,
      endTime: endTime,
      step: step,
      isAscending: isAscending,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get sold amount of products successfully`,
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

//Hiệu quả sản phẩm
export async function POST_getAmountBuyerOfProducts(
  shopId: string,
  productIds: string[],
  startTime: Date | number,
  endTime: Date | number,
  step?: string
) {
  const url = `${publicAPIURL}/statistics/product/amount_of_buyers?shopId=${shopId}`;
  try {
    // console.log(url);
    const response = await axios.post(url, {
      productIds: productIds,
      startTime: startTime,
      endTime: endTime,
      step: step,
    });
    const responseData: StatisticResponse = response.data;

    if (response.status === 200) {
      return {
        isDenied: false,
        message: `Get amount of buyers statistics successfull`,
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
