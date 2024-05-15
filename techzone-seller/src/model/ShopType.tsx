export type ShopInfoDesignType = {
  color: string;
  name: string; // optional
  avatarUrl: string;
  bannerUrl: string;
};

export type ShopDetailType = {
  cancelPercentage: number;
  refundPercentage: number;
  sinceYear: number;
  totalProductNumber: number;
  description: string; //optional
  rating: number;
  replyPercentage: number;
  address: string; //optional
};

export type ShopType = {
  _id: string;
  account: string;
  name: string;
  location: string; //optional
  description: string; //optional
  design: string[];
  shopInfoDesign: ShopInfoDesignType;
  shopDetail: ShopDetailType;
  createAt: Date;
};
