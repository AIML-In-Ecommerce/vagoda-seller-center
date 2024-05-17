export type ProductType = {
  _id: string;
  name: string;
  imageLink: string;
  rating: number;
  soldAmount: number;
  price: number;
  originalPrice: number;
  flashSale: boolean;
  category: string;
};

export type ProductDetailType = {
  _id: string;
  name: string;
  // attribute: {
  //   ....
  // }
  description: string;
  originalPrice: number;
  finalPrice: number;
  category: string;
  shopId: string;
  status: ProductStatus;
  images: string[];
  avgRating: number;
  soldQuantity: number;
};

export enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  SOLD_OUT = "SOLD_OUT",
  SALE = "SALE",
}
