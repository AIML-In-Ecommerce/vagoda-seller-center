export type ShopInfoDesignType = {
  color: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
};

export type ShopDetailType = {
  cancelPercentage: number;
  refundPercentage: number;
  sinceYear: number;
  totalProductNumber: number;
  description: string;
  rating: number;
  replyPercentage: number;
  address: string;
};

export type ShopType = {
  _id: string;
  account: string;
  name: string;
  location: string;
  description: string;
  design: string[];
  shopInfoDesign: ShopInfoDesignType;
  shopDetail: ShopDetailType;
  createAt: Date;
};
