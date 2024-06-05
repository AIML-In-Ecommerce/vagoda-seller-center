import Image from "next/image";
import { Button } from "antd";

interface ProductItemProps {
  imageLink: string;
  name: string;
  rating: number;
  soldAmount: number;
  price: number;
  isFlashSale: boolean;
  originalPrice: number;
}

import { PiShoppingCart } from "react-icons/pi";
export default function ProductItem(props: ProductItemProps) {
  function formatAmountSold(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "tr";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + "k";
    } else {
      return value.toString();
    }
  }

  const soldAmount = formatAmountSold(props.soldAmount);
  const discountPercentage = Math.round(
    ((props.originalPrice - props.price) / props.originalPrice) * 100
  );

  const price = props.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const originalPrice = props.originalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="container h-72 w-32 mx-4">
      <div className=" container relative w-44 h-44 rounded-lg shadow-xl border  transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl border">
          {props.isFlashSale && (
            <div className="absolute top-0 left-0 z-20 py-2 px-4 bg-red-500 text-white font-bold text-xs rounded-br-3xl ">
              Flash Sale
            </div>
          )}

          <img
            src={props.imageLink}
            alt="Product"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-11/12 h-2/3 z-10 bg-white rounded-lg shadow-xl border">
          <div className="p-4 space-y-2 text-sm ">
            <p className="font-bold overflow-hidden line-clamp-2">
              {props.name}
            </p>
            <div className="flex space-x-8 text-xs">
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
            <div className="flex justify-between items-center">
              <div className="">
                <p className="font-semibold text-green-500 text-xs">{price} </p>
                <div className="flex space-x-1 ">
                  <p className="font-semibold text-gray-500 line-through text-xs">
                    {originalPrice}
                  </p>
                  <p className="text-red-500 bg-red-200 text-[7px]">
                    -{discountPercentage}%
                  </p>
                </div>
              </div>
              <Button
                type="primary"
                className=" p-1 bg-theme flex items-center "
              >
                <PiShoppingCart size={12} />
                <span className="ml-1 text-xs">Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
