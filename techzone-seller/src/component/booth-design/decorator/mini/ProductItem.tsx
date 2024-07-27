import { Rate } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";

interface ProductItemProps {
  imageLink: string;
  name: string;
  rating: number;
  soldAmount: number;
  price: number;
  isFlashSale: boolean;
  originalPrice: number;
}

export const formatPrice = (value: number | null): string => {
  if (value === null) {
    return ""; // Trả về một giá trị mặc định hoặc thông báo lỗi tùy bạn muốn
  }
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
};

export const formatAmountSold = (value: number | null): string => {
  if (value === null) {
    return ""; // Trả về một giá trị mặc định hoặc thông báo lỗi tùy bạn muốn
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "tr";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0) + "k";
  } else {
    return value.toString();
  }
};

export default function ProductItem(props: ProductItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({ opacity: 1, y: -50 });
    } else {
      controls.start({ opacity: 0, y: 0 });
    }
  }, [isHovered, controls]);

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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-32 m-5 relative"
    >
      <motion.div
        whileHover={{ scale: 1.1 }} // Hiệu ứng mờ khi di chuột qua
        className="w-32 "
      >
        <div
          className={`${
            isHovered ? "opacity-50" : ""
          } relative w-full h-full overflow-hidden rounded-tl-lg rounded-tr-lg`}
        >
          {props.isFlashSale && (
            <div className="absolute top-2 left-2 z-20 p-1 text-white font-bold text-[8px]">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1374/1374072.png"
                width={20}
              />
            </div>
          )}
          <img src={props.imageLink} alt="Product" className="w-full h-28" />
        </div>

        <motion.button
          initial={{ opacity: 0, y: 0 }}
          animate={controls}
          className={`flex space-x-1 justify-center ml-3 text-[8px] text-white absolute z-10 transform -translate-y-1/4 p-2 bg-[#797979] shadow-sm rounded-lg`}
        >
          <PiShoppingCart size={16} color="white" />
          <p>Thêm vào giỏ hàng</p>
        </motion.button>

        <div className="transform w-full bg-white rounded-bl-lg rounded-br-lg shadow-sm">
          <div className="p-3 text-xs">
            <p className="font-bold overflow-hidden line-clamp-2 text-xs">
              {props.name}
            </p>
            <div className="flex mt-1 justify-between items-center text-[8px]">
              <div>{soldAmount} sold</div>
              <Rate
                disabled
                defaultValue={props.rating}
                style={{ fontSize: 10 }}
              />
            </div>
            <div className="flex mt-2 space-x-2 items-center">
              <p className="font-semibold text-green-500 text-xs">{price}</p>
              <p className="font-semibold text-gray-500 line-through text-[8px]">
                {originalPrice}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
