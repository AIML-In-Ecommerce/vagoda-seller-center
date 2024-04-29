"use client";
import { Carousel, Empty, Flex } from "antd";
import { useEffect, useState } from "react";
import { CarouselArrow } from "@/component/utils/CarouselArrow";
import { CollectionType } from "@/model/CollectionType";
import { CollectionElement, WidgetType } from "@/model/WidgetType";
import CollectionItem from "../mini/CollectionItem";

interface CollectionCarouselProps {
  widget: WidgetType;
}

interface CollectionItemProps {
  _id: string;
  name: string;
  imageUrl: string;
  productIdList: string[];
  createDate: string;
  isActive: boolean;
}

enum WrapperType {
  paddingBlock,
  infoBlock,
}

interface CollectionItemPropsWrapper {
  type: WrapperType;
  productInfo: CollectionItemProps;
}

const paddingBlockProps: CollectionItemProps = {
  _id: "",
  name: "",
  imageUrl: "",
  productIdList: [],
  createDate: "",
  isActive: true,
};

export default function CollectionCarousel(props: CollectionCarouselProps) {
  // mock data
  const collectionsData = [
    {
      _id: "1",
      name: "collection 1",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "2",
      name: "collection 2",
      imageUrl:
        "https://www.slaters-schoolwear.co.uk/wp-content/uploads/2020/06/Millbrook-38Slaters_SchoolWear-edit.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "3",
      name: "collection 3",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "4",
      name: "collection 4",
      imageUrl:
        "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRx-nSw4YqscTmqs9LRjWLgFvPkAOI91FKycAh0hjOlJ2CZVjkatnoPMIsxyYRvInkV51GfvU_RpDB_2EOEjuk",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
  ] as CollectionType[];

  // var
  const [products, setCollections] = useState<CollectionItemProps[]>([]);
  const numberOfDisplayedCollectionPerScreen = 3;
  // const gridColumnSpan = 5;
  const autoPlayCarouselSpeed = 5000; //ms

  useEffect(() => {
    //fetch data here
    // TODO: get data from element.collectionIdList
    const data = collectionsData;
    const tr_data: CollectionItemProps[] = data.map((value) => {
      const tr_item: CollectionItemProps = {
        _id: value._id,
        name: value.name,
        imageUrl: value.imageUrl,
        productIdList: value.productIdList,
        createDate: value.createDate,
        isActive: value.isActive,
      };
      return tr_item;
    });

    setCollections(tr_data);
  }, []);

  const productDisplay = () => {
    if (products.length < 1) {
      // return <Skeleton active />;
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>Không có</span>}
        />
      );
    }

    let result: JSX.Element[] = [];

    const max = products.length / numberOfDisplayedCollectionPerScreen;

    for (let i = 0; i <= max; i++) {
      const startIndex = i * numberOfDisplayedCollectionPerScreen;
      const endIndex =
        startIndex + numberOfDisplayedCollectionPerScreen > products.length
          ? products.length
          : startIndex + numberOfDisplayedCollectionPerScreen;
      let items = products
        .slice(startIndex, endIndex)
        .map((value: CollectionItemProps) => {
          const item: CollectionItemPropsWrapper = {
            type: WrapperType.infoBlock,
            productInfo: value,
          };

          return item;
        });

      if (items.length == 0) {
        continue;
      } else if (items.length < numberOfDisplayedCollectionPerScreen) {
        const paddingBlocks: CollectionItemPropsWrapper[] =
          new Array<CollectionItemProps>(
            numberOfDisplayedCollectionPerScreen - items.length
          )
            .fill(paddingBlockProps)
            .map((value: CollectionItemProps) => {
              const item: CollectionItemPropsWrapper = {
                type: WrapperType.paddingBlock,
                productInfo: value,
              };

              return item;
            });

        items = items.concat(paddingBlocks);
      }

      const row = items.map(
        (valueWrapper: CollectionItemPropsWrapper, index: number) => {
          let isInvisible = "";
          if (valueWrapper.type == WrapperType.paddingBlock) {
            isInvisible = "invisible";
          }
          const value = valueWrapper.productInfo;

          return (
            <div key={value._id + index.toString()} className={isInvisible}>
              <CollectionItem collection={value} />
            </div>
          );
        }
      );

      const rowWrapper = (
        <Flex
          key={startIndex.toString() + endIndex.toString()}
          justify="center"
          align="center"
          gap={5}
        >
          {row}
        </Flex>
      );

      result = result.concat(
        <div
          key={i.toString() + startIndex.toString() + endIndex.toString()}
          className="py-3 px-6"
        >
          {rowWrapper}
        </div>
      );
    }

    return result;
  };

  // var
  const element = props.widget.element as CollectionElement;

  return (
    <div className="w-full flex justify-center items-center bg-white py-10 my-5">
      <div className="w-full px-10">
        <Carousel
          autoplay
          autoplaySpeed={autoPlayCarouselSpeed}
          arrows
          prevArrow={<CarouselArrow direction="left" />}
          nextArrow={<CarouselArrow direction="right" />}
        >
          {productDisplay()}
        </Carousel>
      </div>
    </div>
  );
}
