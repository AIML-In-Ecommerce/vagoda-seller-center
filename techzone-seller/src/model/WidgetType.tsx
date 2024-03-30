export type WidgetType = {
  _id: string;
  pattern: string;
  type: string; // "banner", "product", "category", "promotion"
  order: number;
  visibility: boolean; // true
  // element: object
};

export type BannerElement = {
  //
};

export type ProductElement = {
  //
  title: string;
  image: string;
};

export type CategoryElement = {
  //
};

export type PromotionElement = {
  //
};
