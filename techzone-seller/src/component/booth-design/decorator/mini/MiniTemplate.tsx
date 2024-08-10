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
        placement="bottomLeft"
        title={cardProps.description}
        content={
          <Image
            className="pointer-events-none"
            preview={false}
            height={300}
            src={cardProps.previewImageUrl}
          />
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
