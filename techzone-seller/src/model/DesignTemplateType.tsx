import { ReactNode } from "react";
import { WidgetType } from "./WidgetType";

export type DesignTemplateType = {
  _id: string;
  name: string;
  category: string;
  usage: number;
  design: WidgetType[];
};

export type DetailedDesignTemplateType = {
  _id: string;
  name: string;
  category: string;
  usage: number;
  design: WidgetType[];
  icon: ReactNode;
  image: string;
  description: string;
};
