"use client";
import { CategoryElement, WidgetType } from "@/model/WidgetType";
import { Empty, List, Typography } from "antd";
import Link from "next/link";

interface CategoryGridProps {
  widget: WidgetType;
}

export default function CategoryGrid(props: CategoryGridProps) {
  const tempData = ["example 1", "example 2", "example 3", "example 4"];

  // var
  const element = props.widget.element as CategoryElement;

  return (
    <div className="bg-white my-5 py-5 px-10 ">
      <Typography.Text className="text-2xl font-semibold w-full">
        {element.title}
      </Typography.Text>
      <div className="invisible h-5">hidden block</div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={tempData}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>Không có</span>}
            />
          ),
        }}
        renderItem={(item) => (
          <List.Item>
            <Link href={""}>
              <div className="text-center text-xl text-semibold line-clamp-2">
                {item}
              </div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
