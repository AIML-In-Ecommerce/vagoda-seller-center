export type ReviewType = {
  id: string;
  orderId: string;
  productName: string;
  imageUrl: string;
  rating: number;
  SKU: string;
  content: string;
  status: string;
};

export type _ReviewType = {
  _id: string;
  product: string;
  user: string;
  imageUrl: string;
  rating: number;
  content: string;
  asset: string[];
  conservation: string[];
  like: string[];
};
