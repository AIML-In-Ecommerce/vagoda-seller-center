"use client";
import { CollectionType } from "@/model/CollectionType";
import { Card, Button } from "antd";
import { useEffect, useState } from "react";

interface CollectionCardProps {
  item: CollectionType;
  isSelected: boolean;
  addCollection: (item: CollectionType) => void;
  removeCollection: (item: CollectionType) => void;
}

export default function CollectionCard(props: CollectionCardProps) {
  const [isSelected, setIsSelected] = useState(props.isSelected);

  useEffect(() => {
    setIsSelected(props.isSelected);
  }, [props.isSelected]);

  useEffect(() => {
    if (isSelected) {
      props.addCollection(props.item);
    } else props.removeCollection(props.item);
  }, [isSelected]);

  return (
    <Card
      type="inner"
      className={`h-32 ${isSelected ? "border-2 border-blue-500" : ""}`}
      key={props.item._id}
    >
      <div className="grid grid-cols-3 grid-rows-3">
        <div className="row-span-3 overflow-hidden pr-2">
          <img
            className="h-24 w-20 object-cover"
            src={props.item.imageUrl}
            alt={props.item.name}
          />
        </div>

        <div className="col-span-2 col-start-2 row-start-1">
          <div className="text-lg font-semibold line-clamp-1 truncate">
            {props.item.name}
          </div>
        </div>

        <div className="col-span-2 col-start-2 row-start-2">
          <div className="text-xs">
            Số sản phẩm: {props.item.productIdList.length}
          </div>
        </div>

        <div className="col-start-3 row-start-3 z-10 text-xs">
          {!isSelected ? (
            <span>
              {props.item.isActive && (
                <Button
                  className="bg-sky-500 text-[9px] text-white font-semibold text-center"
                  onClick={() => setIsSelected(true)}
                >
                  Áp dụng
                </Button>
              )}
            </span>
          ) : (
            <Button
              className="bg-gray-500 text-white font-semibold text-center"
              onClick={() => setIsSelected(false)}
            >
              Hủy
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
