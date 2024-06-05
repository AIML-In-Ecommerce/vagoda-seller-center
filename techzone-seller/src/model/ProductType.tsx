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

export type AttributeProductType = {
  id: string;
  label: string;
  value: string;
};

export type _ProductType = {
  _id: string;
  name: string;
  images: string[];
  description: string;
  avgRating: number;
  soldQuantity: number;
  finalPrice: number;
  originalPrice: number;
  isFlashSale: boolean;
  status: string;
  category: { id: string; name: string };
  subCategory: { id: string; name: string };
  subCategoryType: { id: string; name: string };
  brand: string;
  inventoryAmount: number;
  attribute: AttributeProductType[];
  profit: number;
  platformFee: number;
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
