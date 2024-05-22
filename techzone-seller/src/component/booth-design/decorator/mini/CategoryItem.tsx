"use client";
import { CategoryType } from "@/model/CategoryType";
import { Avatar } from "antd";

export interface CategoryItemProps {
  category: CategoryType;
}

export default function CategoryItem(props: CategoryItemProps) {
  return (
    <div
      className="flex gap-5 rounded-full bg-gradient-to-r from-slate-300 to-stone-500
    text-white font-bold items-center hover:border-2 hover:border-slate-200"
    >
      <Avatar src={props.category.image} />
      <div className="text-center text-lg line-clamp-2 pr-4">
        {props.category.name}
      </div>
    </div>
  );
}
