"use client";
import { Card, Popover, Image } from "antd";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  icon: ReactNode;
  previewImageUrl: string;
  description: string;
  usage: number;
}

export default function MiniDesignPattern(cardProps: CardProps) {
  return (
    <div className="m-2 flex flex-col justify-center align-middle w-[100px] cursor-pointer">
      {/* onFocus show image */}
      <Popover
        // open
        className="w-fit"
        placement="bottomLeft"
        title={cardProps.description}
        content={
          <div className="w-fit h-fit max-h-[300px] max-w-[200px] overflow-x-auto">
            {/* <div className="w-fit h-fit max-h-[300px] max-w-[200px] flex items-center align-middle justify-center"> */}
            <Image
              className="pointer-events-none"
              preview={false}
              // height={300}
              src={cardProps.previewImageUrl}
            />
          </div>
        }
      >
        <Card hoverable style={{ width: 100, height: 100 }}>
          {cardProps.icon}
        </Card>
        <div className="m-2 text-sm font-semibold">{cardProps.title}</div>
        <div className="m-2 text-xs font-extralight">
          Lượt dùng: {cardProps.usage}
        </div>
      </Popover>
    </div>
  );
}
