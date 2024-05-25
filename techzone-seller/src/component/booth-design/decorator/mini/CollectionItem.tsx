"use client";
import { CollectionType } from "@/model/CollectionType";
import { AiOutlineRight } from "react-icons/ai";

export interface CollectionItemProps {
  collection: CollectionType;
}

export default function CollectionItem(props: CollectionItemProps) {
  return (
    <div className="relative h-36 w-36 lg:h-56 lg:w-56 md:shrink-0 overflow-hidden">
      {/* Overlay */}
      <img
        className="h-56 w-56 absolute inset-0 object-cover"
        // brightness-75
        src={props.collection.imageUrl}
        alt={props.collection.name}
      />

      {/* Content to overlay */}
      <div
        className="absolute inset-0 flex 
                    items-center justify-center
                    text-white z-20 p-5 lg:p-20"
      >
        <div
          className="bg-gray-800 p-3 
                        border-2 border-white
                        shadow-lg bg-opacity-50
                        flex flex-col items-center justify-center"
        >
          <div className="text-sm font-bold mb-4 uppercase text-center lg:w-32 line-clamp-2">
            {props.collection.name}
          </div>
          <div className="flex flex-row cursor-pointer hover:underline underline-offset-4 uppercase font-light text-[5px]">
            Xem Bộ sưu tập
            <div className="mb-1">
              <AiOutlineRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
