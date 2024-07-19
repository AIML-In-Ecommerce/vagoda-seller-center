export interface ShopSmallInfo {
  _id: string;
  name: string;
  avatarUrl: string;
}

export interface PromotionType {
  _id: string;
  name: string;
  shop: ShopSmallInfo;
  description: string;
  discountTypeInfo: DiscountTypeInfo;
  activeDate: Date;
  expiredDate: Date;
  targetProducts: string[];
  quantity: number;
  redeemedTotal: number;
  status: PromotionStatus;
  code: string;
  createAt: Date;
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  DIRECT_PRICE = "DIRECT_PRICE",
}

export enum PromotionStatus {
  UPCOMMING = "UPCOMMING",
  IN_PROGRESS = "IN_PROGRESS",
  EXPIRED = "EXPIRED"
}

export interface DiscountTypeInfo {
  type: DiscountType;
  value: number;
  lowerBoundaryForOrder: number;
  limitAmountToReduce: number;
}

export interface ShopInfo {
  _id: string;
  name: string;
  account: string;
  avatar: string;
  location: string;
  description: string;
  design: string[];
  imageCollection: string[];
  shopInfoDesign: ShopInfoDesign;
  shopDetail: ShopDetail;
  createAt: Date;
}

export interface ShopDetail {
  cancelPercentage: number;
  refundPercentage: number;
  sinceYear: number;
  totalProductNumber: number;
  rating: number;
  replyPercentage: number;
  _id: string;
}

export interface ShopInfoDesign {
  color: string;
  avatarUrl: string;
  bannerUrl: string;
  _id: string;
}
