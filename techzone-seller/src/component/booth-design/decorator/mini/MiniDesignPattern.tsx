"use client";
import { Card, Popover, Image } from "antd";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  icon: ReactNode;
  previewImageUrl: string;
  description: string;
}

export default function MiniDesignPattern(cardProps: CardProps) {
  return (
    <div className="m-2 flex flex-col justify-center align-middle w-[100px] cursor-pointer">
      {/* onFocus show image */}
      <Popover
        placement="rightTop"
        title={cardProps.description}
        content={
          <Image
            className="pointer-events-none"
            preview={false}
            height={120}
            src={cardProps.previewImageUrl}
          />
        }
      >
        <Card hoverable style={{ width: 100, height: 100 }}>
          {cardProps.icon}
        </Card>
        <div className="m-2 text-sm">{cardProps.title}</div>
      </Popover>
    </div>
  );
}
