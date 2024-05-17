"use client";
import { Carousel, Flex, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { CarouselArrow } from "@/component/utils/CarouselArrow";
import { ProductType } from "@/model/ProductType";
import { ProductElement, WidgetType } from "@/model/WidgetType";
import ProductItem from "@/component/booth-design/decorator/mini/MiniProductItem";
import CustomEmpty from "../mini/CustomEmpty";
import { GET_GetCollection } from "@/app/apis/collection/CollectionAPI";
import { POST_GetProductList } from "@/app/apis/product/ProductAPI";
import { CollectionType } from "@/model/CollectionType";

interface ProductCarouselProps {
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

export default function ProductCarousel(props: ProductCarouselProps) {
  const element = useMemo(() => {
    return props.widget.element as ProductElement;
  }, [props.widget.element]);

  const [collection, setCollection] = useState<CollectionType>();
  const [rawProducts, setRawProducts] = useState<ProductType[]>([]);

  const [products, setProducts] = useState<ProductItemProps[]>([]);
  const SuggestionProductsMoreDetailHref = "#";
  const autoPlayCarouselSpeed = 5000; //ms

  useEffect(() => {
    //process data here
    const data = rawProducts;
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
  }, [rawProducts]);

  // call api
  useEffect(() => {
    handleGetCollection();
  }, [element]);

  useEffect(() => {
    handleGetProductList();
  }, [collection]);

  const handleGetCollection = async () => {
    const response = await GET_GetCollection(element.collectionId);
    if (response.status == 200) {
      if (response.data) {
        setCollection(response.data);
        // console.log("collection", response.data);
      }
    }
  };

  const handleGetProductList = async () => {
    if (!collection) return;
    const response = await POST_GetProductList(collection.productIdList);
    if (response.status == 200) {
      if (response.data) {
        setRawProducts(response.data);
        // console.log("product", data);
      }
    }
  };

  return (
    <div>
      {products.length === 0 ? (
        <div className="bg-white p-10 my-5">
          <CustomEmpty />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center bg-white pt-5 my-5">
          <div className="w-full">
            <Flex className="w-full mb-4 px-8" align="center">
              <Typography.Text className="text-xl font-semibold w-full">
                {element.title}
              </Typography.Text>
              <Flex
                className="w-full px-4"
                justify="end"
                align="center"
                gap={6}
              >
                <Link href={SuggestionProductsMoreDetailHref} prefetch={false}>
                  <Typography.Text className="text-base hidden md:block lg:block">
                    Xem thêm
                  </Typography.Text>
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
              slidesToShow={4}
              slidesToScroll={4}
              initialSlide={0}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
              {products.length > 0 &&
                products.map((value, index) => (
                  <div key={index} className="pl-5">
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
                ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}
