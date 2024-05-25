"use client";
import { CollectionType } from "@/model/CollectionType";
import { CollectionElement, WidgetType } from "@/model/WidgetType";
import { List } from "antd";
import CollectionItem from "../mini/CollectionItem";
import CustomEmpty from "../mini/CustomEmpty";
import { useEffect, useState } from "react";
import { POST_GetCollectionList } from "@/app/apis/collection/CollectionAPI";

interface CollectionGridProps {
  widget: WidgetType;
}

export default function CollectionGrid(props: CollectionGridProps) {
  // mock data
  // const collectionsData = [
  //   {
  //     _id: "1",
  //     name: "new arrivals",
  //     imageUrl:
  //       "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
  //     productIdList: [],
  //     createDate: new Date("2024-03-24T12:30:00"),
  //     isActive: true,
  //   },
  //   {
  //     _id: "2",
  //     name: "must have 2024",
  //     imageUrl:
  //       "https://www.slaters-schoolwear.co.uk/wp-content/uploads/2020/06/Millbrook-38Slaters_SchoolWear-edit.jpg",
  //     productIdList: [],
  //     createDate: new Date("2024-03-24T12:30:00"),
  //     isActive: true,
  //   },
  //   {
  //     _id: "3",
  //     name: "trending",
  //     imageUrl:
  //       "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
  //     productIdList: [],
  //     createDate: new Date("2024-03-24T12:30:00"),
  //     isActive: true,
  //   },
  //   {
  //     _id: "4",
  //     name: "best in store",
  //     imageUrl:
  //       "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRx-nSw4YqscTmqs9LRjWLgFvPkAOI91FKycAh0hjOlJ2CZVjkatnoPMIsxyYRvInkV51GfvU_RpDB_2EOEjuk",
  //     productIdList: [],
  //     createDate: new Date("2024-03-24T12:30:00"),
  //     isActive: true,
  //   },
  // ] as CollectionType[];

  // var
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const element = props.widget.element as CollectionElement;

  // call api
  useEffect(() => {
    handleGetCollectionList(element.collectionIdList);
  }, [element, element.collectionIdList]);

  const handleGetCollectionList = async (ids: string[]) => {
    const response = await POST_GetCollectionList(ids);
    if (response.status == 200) {
      if (response.data) {
        setCollections(response.data.filter((c) => c.isActive === true));
        // console.log("collection", response.data);
      }
    }
  };

  return (
    <div className="bg-white my-5 py-5 px-10 rounded-xl">
      <List
        grid={{
          gutter: 5,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={collections}
        locale={{
          emptyText: <CustomEmpty />,
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
