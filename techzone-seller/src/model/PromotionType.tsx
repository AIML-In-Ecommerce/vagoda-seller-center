export enum DiscountType {
  PERCENTAGE,
  DIRECT_PRICE,
}

export type PromotionType = {
  _id: string;
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue?: number;
  upperBound?: number;
  lowerBound?: number;
  quantity: number;
  activeDate?: string;
  expiredDate?: string;
  // saleCategory: [ObjectId, ...]
  createdAt?: string;
  code: string;
};
