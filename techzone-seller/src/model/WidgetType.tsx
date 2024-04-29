// enum categories / patterns
export enum WidgetCategoryType {
  BANNER,
  PRODUCT,
  CATEGORY,
  PROMOTION,
  COLLECTION,
}

export enum BannerPatternType {
  CAROUSEL,
}

export enum ProductPatternType {
  CAROUSEL,
  GRID,
}

export enum CategoryPatternType {
  GRID,
}

export enum PromotionPatternType {
  GRID,
}

export enum CollectionPatternType {
  CAROUSEL,
  GRID,
}

// types
export type WidgetType = {
  _id: string;
  type: WidgetCategoryType;
  order: number;
  visibility: boolean; // true
  element:
    | BannerElement
    | ProductElement
    | CategoryElement
    | PromotionElement
    | CollectionElement
    | undefined;
};

export type BannerElement = {
  pattern: BannerPatternType;

  images: string[];
};

export type ProductElement = {
  pattern: ProductPatternType;
  title: string;

  // collection of products:
  collectionId: string;
};

export type CategoryElement = {
  pattern: CategoryPatternType;
  title: string;

  // list of categories' id:
  categoryIdList: string[];
};

export type PromotionElement = {
  pattern: PromotionPatternType;
  title: string;

  // list of promotions' id:
  promotionIdList: string[];
};

export type CollectionElement = {
  pattern: CollectionPatternType;

  // list of collections' id:
  collectionIdList: string[];
};
