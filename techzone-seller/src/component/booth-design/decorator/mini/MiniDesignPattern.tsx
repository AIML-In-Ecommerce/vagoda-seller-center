"use client";
import { Card } from "antd";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  icon: ReactNode;
  previewImageUrl: string;
}

export default function MiniDesignPattern(cardProps: CardProps) {
  return (
    <div className="m-2 flex flex-col justify-center align-middle w-[100px]">
      {/* onFocus show image */}
      <Card
        hoverable
        style={{ width: 100, height: 100 }}
        // cover={cardProps.icon}
      >
        {cardProps.icon}
      </Card>
      <div className="m-2 text-sm">{cardProps.title}</div>
    </div>
  );
}
