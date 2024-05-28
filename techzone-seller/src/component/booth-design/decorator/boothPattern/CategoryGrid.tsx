"use client";
import { CategoryElement, WidgetType } from "@/model/WidgetType";
import { Divider, List } from "antd";
import CustomEmpty from "../mini/CustomEmpty";
import { CategoryType } from "@/model/CategoryType";
import { POST_GetCategoryList } from "@/apis/category/CategoryAPI";
import { useState, useEffect } from "react";
import CategoryItem from "../mini/CategoryItem";

interface CategoryGridProps {
  widget: WidgetType;
}

export default function CategoryGrid(props: CategoryGridProps) {
  // mock data
  // const categories: CategoryType[] = [
  //   {
  //     _id: "id1",
  //     key: "1",
  //     urlKey: "string",
  //     name: "Laptop",
  //     image: "string",
  //     subCategoryType: [],
  //   },
  //   {
  //     _id: "id2",
  //     key: "2",
  //     urlKey: "string",
  //     name: "Màn hình máy tính",
  //     image: "string",
  //     subCategoryType: [],
  //   },
  //   {
  //     _id: "id3",
  //     key: "3",
  //     urlKey: "string",
  //     name: "Ổ cứng",
  //     image: "string",
  //     subCategoryType: [],
  //   },
  // ];

  // var
  const [categories, setCategories] = useState<CategoryType[]>();
  const element = props.widget.element as CategoryElement;

  // call api
  useEffect(() => {
    handleGetCategoryList(element.categoryIdList);
  }, [element, element.categoryIdList]);

  const handleGetCategoryList = async (ids: string[]) => {
    const response = await POST_GetCategoryList(ids);
    if (response.status == 200) {
      if (response.data) {
        setCategories(response.data);
        console.log("category", response.data);
      }
    }
  };

  return (
    <div className="bg-white my-5 py-5 px-10 rounded-xl">
      {/* <Typography.Text className="text-xl font-semibold w-full">
        {element.title}
      </Typography.Text>
      <div className="invisible h-5">hidden block</div>
       */}

      {element.title && (
        <div className="w-full flex align-middle justify-center items-center">
          <div className="w-1/2">
            <Divider
              style={{
                border: "2px solid silver",
                borderTop: 0,
                borderBottom: 0,
                borderLeft: 0,
                borderRight: 0,
                paddingBottom: 0,
                marginBottom: 40,
              }}
            >
              <div className="px-5 text-lg uppercase">{element.title}</div>
            </Divider>
          </div>
        </div>
      )}

      <List
        grid={{
          gutter: 50,
          xs: 0,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={categories}
        locale={{
          emptyText: <CustomEmpty />,
        }}
        renderItem={(item) => (
          <List.Item>
            <CategoryItem category={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
