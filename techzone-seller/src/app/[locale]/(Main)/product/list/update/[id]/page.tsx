"use client";
import CreateNewProduct from "@/component/Product/CreateNewProduct";
import { _ProductType } from "@/model/ProductType";
import { ProductService } from "@/services/Product";
import { Breadcrumb } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";

// interface UpdateProductInfoProp {
//   handleBack: () => void;
// }

export default function UpdateProductInfo({
  params,
}: {
  params: { id: string };
}) {
  const ref = useRef(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const lottie = (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/10e2f813-52c5-4014-b8bf-0591d8d9eb55/7vcvIB5FbV.json"
      style={{ width: "300px", height: "300px" }}
      className="absolute top-8"
    />
  );
  const router = useRouter();
  const [product, setProduct] = useState<_ProductType | null>(null);
  const sampleProduct = {
    key: "1",
    name: "Laptop Dell XPS 15",
    inventory_number: 20,
    price: 45000000,
    system_fee: 2000000,
    profit: 43000000,
    avatar_url: [
      "https://images.pexels.com/photos/1266982/pexels-photo-1266982.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/16592625/pexels-photo-16592625/free-photo-of-air-conditioner-in-a-house.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/16592625/pexels-photo-16592625/free-photo-of-air-conditioner-in-a-house.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    id: "001",
    SKU: "SKU001",
    category: "Laptop",
    brand: "Dell",
    status: "Đang bán",
    rating: 4.5,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    otherDescriptions: [
      { label: "Màn hình", value: "15.6 inch 4K UHD+" },
      { label: "CPU", value: "Intel Core i7-11800H" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "SSD", value: "512GB SSD" },
      {
        label: "Cổng kết nối",
        value: "3 x Thunderbolt 4 , 1 x HDMI, 1 x SDXC Card Slot",
      },
      {
        label: "Kết nối không dây",
        value: "Wi-Fi 6E (802.11ax) , Bluetooth 5.3",
      },
      { label: "Hệ điều hành", value: "Windows 10 Home" },
      { label: "Công suất pin", value: "86 Wh" },
      {
        label: "Kích thước, khối lượng",
        value: "1.8 kg | 35.11 x 23.45 x 1.7 cm",
      },
      // Thêm các thông số kỹ thuật khác tương tự cho Laptop Dell XPS 15
    ],
  };

  const handleBack = () => {
    router.push("/product/list");
  };
  useEffect(() => {
    const loadFilteredProducts = async () => {
      const response: _ProductType | null = await ProductService.getProductById(
        params.id
      );
      setProduct(response);
    };

    loadFilteredProducts();
  }, []);
  return (
    <div className="pt-4 pr-4 space-y-2 h-full">
      <Breadcrumb
        className="text-xs"
        items={[
          {
            href: "/",
            title: (
              <div className="flex items-center">
                <HiOutlineHome size={15} />
              </div>
            ),
          },
          {
            href: "/product/list",
            title: "Sản phẩm",
          },
          {
            title: "Chi tiết sản phẩm",
          },
        ]}
      />
      {product ? (
        <CreateNewProduct
          handleBack={handleBack}
          isCreating={false}
          updatingProduct={product}
        />
      ) : (
        <div className="flex flex-col  justify-center items-center ">
          <div className="">{lottie}</div>
          <p className=" text-sm font-semibold pb-40">Không thể tải sản phẩm</p>
        </div>
      )}
    </div>
  );
}
