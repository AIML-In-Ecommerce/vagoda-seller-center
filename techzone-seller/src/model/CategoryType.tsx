export type CategoryType = {
  _id: string;
  key: string;
  urlKey: string;
  name: string; //ex: Laptop, Màn hình máy tính, Ổ cứng
  image: string;
  subCategoryType: string[]; // objectid []
};
