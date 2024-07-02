import { RawCommentType } from "./CommentType";
import { _ProductType } from "./ProductType";
import { UserType } from "./UserType";

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
  product: _ProductType;
  user: UserType;
  imageUrl: string;
  rating: number;
  content: string;
  asset: string[];
  conversation: RawCommentType[];
  like: string[];
  isResponse: boolean;
  createdAt: string;
};
