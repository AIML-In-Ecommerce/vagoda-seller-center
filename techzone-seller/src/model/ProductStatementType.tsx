export type ProductStatementType = {
  _id: string;
  product_name: string;
  product_avatar: string;
  amount: number;
  price: number | null;
  system_fee: number | null;
  revenue: number;
};
