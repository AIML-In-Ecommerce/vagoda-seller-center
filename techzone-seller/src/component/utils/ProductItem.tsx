'use client'

import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
import { Button, Image, Rate, Tooltip } from "antd";

export const ProductItemScaleSize = 
{
  small: "small",
  medium: "medium",
  large: "large"
}

interface ScaleSize
{
  rootContainerHeight: string,
  innerContainerWeightHeight: string,
  lottieWidth: string,
  lottieHeight: string,
  infoBlockTop: string,
  cartButtonSize: number
}

interface ProductItemProps {
  size: string | undefined,
  imageLink: string;
  name: string;
  rating: number;
  soldAmount: number;
  price: number;
  isFlashSale: boolean;
  originalPrice: number;
  inWishlist: boolean;
}
import { PiShoppingCart } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiHeart } from "react-icons/hi2";


export default function ProductItem(props: ProductItemProps) {

  const SmallScaleSize: ScaleSize = 
  {
    rootContainerHeight: "h-60",
    innerContainerWeightHeight: "w-48 h-48",
    lottieWidth: "240px",
    lottieHeight: "240px",
    infoBlockTop: "top-32",
    cartButtonSize: 16,
  }

  const MediumScaleSize: ScaleSize = 
  {
    rootContainerHeight: "h-72",
    innerContainerWeightHeight: "h-56 w-56",
    lottieWidth: "26px",
    lottieHeight: "260px",
    infoBlockTop: "top-40",
    cartButtonSize: 16,
  }

  const LargeScaleSize: ScaleSize = 
  {
    rootContainerHeight: "h-96",
    innerContainerWeightHeight: "w-64 h-64",
    lottieWidth: "300px",
    lottieHeight: "300px",
    infoBlockTop: "top-48",
    cartButtonSize: 16,
  }

  const [showAnimation, setShowAnimation] = useState(false);
  const [scaleSize, setScaleSize] = useState<ScaleSize>(LargeScaleSize)

  const ref = useRef(null);
  React.useEffect(() => {
    require("@lottiefiles/lottie-player");
  });

  useEffect(() =>
  {
    if(props.size == ProductItemScaleSize.small)
    {
      setScaleSize(SmallScaleSize)
    }
    else if(props.size == ProductItemScaleSize.medium)
    {
      setScaleSize(MediumScaleSize)
    }
    else if(props.size == ProductItemScaleSize.large)
    {
      setScaleSize(LargeScaleSize)
    }
    else //undefinded
    {
      setScaleSize(LargeScaleSize)
    }

  }, [props.size])

  const lottie = showAnimation ? (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/5372b19b-fb7f-40f5-90fc-a3ae60187b65/thLcXtFJQd.json"
      style={{ width: `${scaleSize.lottieWidth}`, height: `${scaleSize.lottieHeight}` }}
      className="absolute bottom-4"
    ></lottie-player>
  ) : null;

  function formatAmountSold(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "tr";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + "k";
    } else {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  }
  const animationDuration = 1000;

  const [isInWishlist, setIsInWishlist] = useState(props.inWishlist);
  const soldAmount = formatAmountSold(props.soldAmount);
  const discountPercentage = Math.round(
    ((props.originalPrice - props.price) / props.originalPrice) * 100
  );
  const handleAddWishlist = () => {
    setIsInWishlist(!isInWishlist);
    if (!isInWishlist) {
      setShowAnimation(true);
    }

    setTimeout(() => {
      setShowAnimation(false);
    }, animationDuration);
  };

  const price = props.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const originalPrice = props.originalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });


  return (
    <div className={`container ${scaleSize.rootContainerHeight}`}>
      <div className={`container relative ${scaleSize.innerContainerWeightHeight} rounded-lg shadow-xl border  transition-transform duration-300 hover:scale-105 hover:shadow-lg`}>
        {/* Hình ảnh sản phẩm */}
        {/* <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl border">
        <img
          src={props.imageLink}
          alt="Product"
          className="object-cover w-full h-full"
        />
      </div> */}
        <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl border">
          {showAnimation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {lottie}
            </div>
          )}
          {props.isFlashSale && (
            <div className="absolute top-0 left-0 z-20 py-2 px-4 bg-red-500 text-white font-bold text-xs  rounded-br-3xl ">
              Flash Sale
            </div>
          )}
          <Tooltip
            placement="topRight"
            title={`${
              isInWishlist ? "Add to Wishlist" : "Remove from Wishlist"
            }`}
            color={"gray"}
          >
            <div
              className={`absolute top-0 right-0 z-20 py-2 px-4  text font-bold text-xs ${
                props.inWishlist ? "bg-red" : ""
              }`}
            >
              {isInWishlist ? (
                <HiHeart
                  size={20}
                  className="text-red-500 "
                  onClick={() => handleAddWishlist()}
                />
              ) : (
                <HiOutlineHeart
                  size={20}
                  className=" hover:text-red-600"
                  onClick={() => handleAddWishlist()}
                />
              )}
            </div>
          </Tooltip>

          <img
            src={props.imageLink}
            alt="Product"
            className="object-cover w-full h-full"
          />
        </div>

        <div className={`absolute ${scaleSize.infoBlockTop} left-1/2 transform -translate-x-1/2 w-11/12 h-2/3 z-10 bg-white rounded-lg shadow-xl border`}>
          <div className="p-4 space-y-2 text-sm ">
            <p className="font-bold overflow-hidden line-clamp-2">
              {props.name}
            </p>
            <div className="flex  space-x-8">
              <div className="flex space-x-1 items-center">
                <span>{props.rating}</span>

                <Image
                  src="https://cdn-icons-png.flaticon.com/128/10134/10134048.png"
                  width={15}
                  height={15}
                  alt="Logo"
                />
              </div>
              <div>{soldAmount} sold</div>
            </div>
            <div className="flex  justify-between items-center">
              <div className="">
                <p className="font-semibold text-green-500 text-lg">
                  {/* <span className="text-sm underline mr-1 ">đ</span> */}
                  {price}{" "}
                </p>
                <div className="flex space-x-1 ">
                  <p className="font-semibold text-gray-500 line-through">
                    {/* <span className="text-sm underline mr-1">đ</span> */}
                    {originalPrice}{" "}
                  </p>
                  <p className="text-red-500 bg-red-200 text-xs px-1">
                    -{discountPercentage}%
                  </p>
                </div>
                {/* <Button type="primary" className="bg-theme flex items-center">
              <HiOutlineHeart size={16} />
            </Button> */}
              </div>
              <Button
                type="primary"
                className=" p-1 bg-theme flex items-center "
              >
                <PiShoppingCart size={scaleSize.cartButtonSize} />
                {props.size == ProductItemScaleSize.large || props.size == undefined ? <span className="ml-1">Cart</span> : undefined}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
