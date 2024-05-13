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
  image: string[];
  avgRating: number;
  soldQuantity: number;
};

enum ProductStatus {
  AVAILABLE,
  SOLD_OUT,
  SALE,
}
