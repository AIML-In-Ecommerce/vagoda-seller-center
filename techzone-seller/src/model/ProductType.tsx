import { CategoryType } from "./CategoryType";

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
  category: CategoryType;
  subCategory: CategoryType;
  subCategoryType: CategoryType;
  brand: string;
  inventoryAmount: number;
  attribute: {
    colors: {
      link: string;
      color: { label: string; value: string };
    }[];
    size: string[];
    material: string;
    warranty: string;
    manufacturingPlace: string;
  };
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

export type ImportInfoType = {
  _id: string;
  createdAt: string;
  url: string;
  products: _ProductType[];
  name: string;
  status: string;
};
