"use client";
import { CollectionType } from "@/model/CollectionType";
import { CollectionElement, WidgetType } from "@/model/WidgetType";
import { Empty, List } from "antd";
import CollectionItem from "../mini/CollectionItem";

interface CollectionGridProps {
  widget: WidgetType;
}

export default function CollectionGrid(props: CollectionGridProps) {
  // mock data
  const collectionsData = [
    {
      _id: "1",
      name: "new arrivals",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "2",
      name: "must have 2024",
      imageUrl:
        "https://www.slaters-schoolwear.co.uk/wp-content/uploads/2020/06/Millbrook-38Slaters_SchoolWear-edit.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "3",
      name: "trending",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "4",
      name: "best in store",
      imageUrl:
        "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRx-nSw4YqscTmqs9LRjWLgFvPkAOI91FKycAh0hjOlJ2CZVjkatnoPMIsxyYRvInkV51GfvU_RpDB_2EOEjuk",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
  ] as CollectionType[];

  // var
  const element = props.widget.element as CollectionElement;

  return (
    <div className="bg-white my-5 py-5 px-10 ">
      <List
        grid={{ gutter: 5, column: 3 }}
        dataSource={collectionsData} // TODO: get data from element.collectionIdList
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
            <CollectionItem collection={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
