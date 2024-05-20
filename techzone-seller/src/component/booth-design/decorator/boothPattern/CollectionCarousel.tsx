"use client";
import { Carousel, List } from "antd";
import { useEffect, useState } from "react";
import { CarouselArrow } from "@/component/utils/CarouselArrow";
import { CollectionType } from "@/model/CollectionType";
import { CollectionElement, WidgetType } from "@/model/WidgetType";
import CollectionItem from "../mini/CollectionItem";
import CustomEmpty from "../mini/CustomEmpty";
import { POST_GetCollectionList } from "@/app/apis/collection/CollectionAPI";

interface CollectionCarouselProps {
  widget: WidgetType;
}

export default function CollectionCarousel(props: CollectionCarouselProps) {
  // mock data
  // const collectionsData = [
  //   {
  //     _id: "1",
  //     name: "collection 1",
  //     imageUrl:
  //       "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
  //     productIdList: [],
  //     createDate: new Date("2024-03-24T12:30:00"),
  //     isActive: true,
  //   },
  //   {
  //     _id: "2",
  //     name: "collection 2",
  //     imageUrl:
  //       "https://www.slaters-schoolwear.co.uk/wp-content/uploads/2020/06/Millbrook-38Slaters_SchoolWear-edit.jpg",
  //     productIdList: [],
  //     createDate: new Date("2024-03-24T12:30:00"),
  //     isActive: true,
  //   },
  //   {
  //     _id: "3",
  //     name: "collection 3",
  //     imageUrl:
  //       "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
  //     productIdList: [],
  //     createDate: new Date("2024-03-24T12:30:00"),
  //     isActive: true,
  //   },
  //   {
  //     _id: "4",
  //     name: "collection 4",
  //     imageUrl:
  //       "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRx-nSw4YqscTmqs9LRjWLgFvPkAOI91FKycAh0hjOlJ2CZVjkatnoPMIsxyYRvInkV51GfvU_RpDB_2EOEjuk",
  //     productIdList: [],
  //     createDate: new Date("2024-03-24T12:30:00"),
  //     isActive: true,
  //   },
  // ] as CollectionType[];

  // var
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const autoPlayCarouselSpeed = 5000; //ms
  const element = props.widget.element as CollectionElement;

  // call api
  useEffect(() => {
    handleGetCollectionList(element.collectionIdList);
  }, [element, element.collectionIdList]);

  useEffect(() => {
    //fetch data here
    const data = collections;

    const tr_data: CollectionType[] = data.map((value) => {
      const tr_item: CollectionType = {
        _id: value._id,
        name: value.name,
        imageUrl: value.imageUrl,
        productIdList: value.productIdList,
        createDate: value.createDate,
        isActive: value.isActive,
        shop: value.shop,
      };
      return tr_item;
    });

    setCollections(tr_data);
  }, [element.collectionIdList, collections]);

  const handleGetCollectionList = async (ids: string[]) => {
    const response = await POST_GetCollectionList(ids);
    if (response.status == 200) {
      if (response.data) {
        setCollections(response.data);
        console.log("collection", response.data);
      }
    }
  };

  return (
    <div>
      {collections.length === 0 ? (
        <div className="bg-white p-10 my-5">
          <CustomEmpty />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center bg-white py-10 my-5">
          <div className="w-full px-10">
            {collections.length < 4 ? (
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
                dataSource={collections} // TODO: get data from element.collectionIdList
                locale={{
                  emptyText: <CustomEmpty />,
                }}
                renderItem={(item) => (
                  <List.Item>
                    <CollectionItem collection={item} />
                  </List.Item>
                )}
              />
            ) : (
              <Carousel
                autoplay
                autoplaySpeed={autoPlayCarouselSpeed}
                arrows
                prevArrow={<CarouselArrow direction="left" />}
                nextArrow={<CarouselArrow direction="right" />}
                slidesToShow={3}
                slidesToScroll={1}
                initialSlide={0}
                responsive={[
                  {
                    breakpoint: 1280,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      initialSlide: 1,
                    },
                  },
                ]}
              >
                {collections.length > 0 &&
                  collections.map((collection, index) => (
                    <div key={index} className="pl-5">
                      <CollectionItem collection={collection} />
                    </div>
                  ))}
              </Carousel>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
