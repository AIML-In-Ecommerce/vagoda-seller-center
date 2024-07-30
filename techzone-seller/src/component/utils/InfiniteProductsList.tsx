"use client";

import ProductItem from "@/component/customer/ProductItem";
import { ProductType } from "@/model/ProductType";
import { Button, Flex, message, Skeleton } from "antd";
import React, { ReactElement, useEffect, useRef, useState } from "react";
const authLocalStorageID = "#auth-context-user-info-record-ID";

export interface InfiniteScrollProductsProps {
  productsPerRow: number;
  overFlowMaxHeight: string;
  productItemSize: string;
}

interface ProductItemProps {
  _id: string;
  name: string;
  description: string;
  material: string;
  originalPrice: number;
  finalPrice: number;
  shop: string;
  brand: string;
  soldQuantity: number;
  avgRating: number;
  images: string[];
}

enum WrapperType {
  paddingBlock,
  infoBlock,
}

interface ProductItemPropsWrapper {
  type: WrapperType;
  productInfo: ProductItemProps;
}

const paddingBlockProps: ProductType = {
  _id: "",
  imageLink: "",
  name: "padding",
  rating: 0.0,
  soldAmount: 0,
  price: 0,
  flashSale: false,
  originalPrice: 0,
  category: "Unknown",
  shop: "",
};

const InfiniteProductsList: React.FC<{
  setupProps: InfiniteScrollProductsProps;
  additionalData: ProductItemProps[];
}> = ({ setupProps, additionalData }) => {
  const [products, setProducts] = useState<ProductItemProps[]>(additionalData);
  const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false);

  const ref = useRef(null);
  React.useEffect(() => {
    require("@lottiefiles/lottie-player");
  });

  const lottie = (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/db240567-c95f-4ada-816c-1edf9286f14e/0QXuCKuchC.json"
      style={{ height: "60px" }}
    ></lottie-player>
  );

  const LoadMoreButton =
    isLoadingItems == false ? (
      // <Button className="border-none" onClick={() => {}}>
      //   Xem thêm
      // </Button>
      <div> </div>
    ) : (
      <div>{lottie}</div>
    );

  return (
    <>
      <Flex
        className="w-full h-full bg-gray-100 p-4"
        vertical
        justify="center"
        align="center"
      >
        <div
          className="overflow-y-auto py-4 w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4"
          style={{ maxHeight: `${setupProps.overFlowMaxHeight}` }}
        >
          {additionalData.map((value, index) => (
            <div
              key={index}
              className="lg:col-span-1 md:col-span-1 sm:col-span-1 "
            >
              <ProductItem
                _id={value._id}
                imageLink={value.images[0]}
                name={value.name}
                rating={value.avgRating}
                shop={value.shop}
                soldAmount={value.soldQuantity}
                price={value.finalPrice}
                isFlashSale={true}
                originalPrice={value.originalPrice}
              />
            </div>
          ))}
        </div>
        <Flex className="w-full" justify="center" align="center">
          {LoadMoreButton}
        </Flex>
      </Flex>
    </>
  );
};

export default InfiniteProductsList;
