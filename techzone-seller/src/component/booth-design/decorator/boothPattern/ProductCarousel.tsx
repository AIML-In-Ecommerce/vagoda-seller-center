"use client";
import { Carousel, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { CarouselArrow } from "@/component/utils/CarouselArrow";
import { ProductType } from "@/model/ProductType";
import { ProductElement, WidgetType } from "@/model/WidgetType";
import ProductItem from "@/component/booth-design/decorator/mini/MiniProductItem";
import CustomEmpty from "../mini/CustomEmpty";

interface ProductCarouselProps {
  products: ProductType[]; // TODO: get this from collection id
  widget: WidgetType;
}

interface ProductItemProps {
  _id: string;
  imageLink: string;
  name: string;
  rating: number;
  soldAmount: number;
  price: number;
  isFlashSale: boolean;
  originalPrice: number;
}

enum WrapperType {
  paddingBlock,
  infoBlock,
}

interface ProductItemPropsWrapper {
  type: WrapperType;
  productInfo: ProductItemProps;
}

const paddingBlockProps: ProductItemProps = {
  _id: "",
  imageLink: "",
  name: "padding",
  rating: 0.0,
  soldAmount: 0,
  price: 0,
  isFlashSale: false,
  originalPrice: 0,
};

export default function ProductCarousel(props: ProductCarouselProps) {
  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const numberOfDisplayedProductPerScreen = 4;
  // const gridColumnSpan = 5;
  const SuggestionProductsMoreDetailHref = "#";
  const autoPlayCarouselSpeed = 5000; //ms

  useEffect(() => {
    //fetch data here

    const data = props.products;
    const tr_data: ProductItemProps[] = data.map((value) => {
      const tr_item: ProductItemProps = {
        _id: value._id,
        imageLink: value.imageLink,
        name: value.name,
        rating: value.rating,
        soldAmount: value.soldAmount,
        price: value.price,
        isFlashSale: value.flashSale,
        originalPrice: value.originalPrice,
      };

      return tr_item;
    });

    setProducts(tr_data);
  }, []);

  const productDisplay = () => {
    if (products.length < 1) {
      return <CustomEmpty />;
    }

    let result: JSX.Element[] = [];

    const max = products.length / numberOfDisplayedProductPerScreen;

    for (let i = 0; i <= max; i++) {
      const startIndex = i * numberOfDisplayedProductPerScreen;
      const endIndex =
        startIndex + numberOfDisplayedProductPerScreen > products.length
          ? products.length
          : startIndex + numberOfDisplayedProductPerScreen;
      let items = products
        .slice(startIndex, endIndex)
        .map((value: ProductItemProps) => {
          const item: ProductItemPropsWrapper = {
            type: WrapperType.infoBlock,
            productInfo: value,
          };

          return item;
        });

      if (items.length == 0) {
        continue;
      } else if (items.length < numberOfDisplayedProductPerScreen) {
        const paddingBlocks: ProductItemPropsWrapper[] =
          new Array<ProductItemProps>(
            numberOfDisplayedProductPerScreen - items.length
          )
            .fill(paddingBlockProps)
            .map((value: ProductItemProps) => {
              const item: ProductItemPropsWrapper = {
                type: WrapperType.paddingBlock,
                productInfo: value,
              };

              return item;
            });

        items = items.concat(paddingBlocks);
      }

      const row = items.map(
        (valueWrapper: ProductItemPropsWrapper, index: number) => {
          let isInvisible = "";
          if (valueWrapper.type == WrapperType.paddingBlock) {
            isInvisible = "invisible";
          }
          const value = valueWrapper.productInfo;

          return (
            <div key={value._id + index.toString()} className={isInvisible}>
              <ProductItem
                imageLink={value.imageLink}
                name={value.name}
                rating={value.rating}
                soldAmount={value.soldAmount}
                price={value.price}
                isFlashSale={value.isFlashSale}
                originalPrice={value.originalPrice}
              />
            </div>
          );
        }
      );

      const rowWrapper = (
        <Flex
          key={startIndex.toString() + endIndex.toString()}
          justify="center"
          align="center"
          gap={30}
        >
          {row}
        </Flex>
      );

      result = result.concat(
        <div
          key={i.toString() + startIndex.toString() + endIndex.toString()}
          className="my-3 lg:pl-10 w-max flex flex-row items-center"
        >
          {rowWrapper}
        </div>
      );
    }

    return result;
  };

  // var
  const element = props.widget.element as ProductElement;

  return (
    <div className="w-full flex justify-center items-center bg-white pt-5 my-5">
      <div className="w-full">
        <Flex className="w-full mb-4 px-8" align="center">
          <Typography.Text className="text-xl font-semibold w-full">
            {element.title}
          </Typography.Text>
          <Flex className="w-full px-4" justify="end" align="center" gap={6}>
            <Link href={SuggestionProductsMoreDetailHref} prefetch={false}>
              <Typography.Text className="text-base">Xem thêm</Typography.Text>
            </Link>
            <Typography.Text className="text-base">
              <AiOutlineRight size={"16px"} />
            </Typography.Text>
          </Flex>
        </Flex>
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
