"use client";
import CreateNewProduct from "@/component/Product/CreateNewProduct";
import { _ProductType } from "@/model/ProductType";
import { ProductService } from "@/services/Product";
import { Breadcrumb } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";

export default function UpdateProductInfo({
  params,
}: {
  params: { id: string };
}) {
  const ref = useRef(null);
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
  const [loading, setLoading] = useState<boolean>(false);

  const handleBack = () => {
    router.push("/product/list");
  };
  useEffect(() => {
    const loadFilteredProducts = async () => {
      const response: _ProductType | null = await ProductService.getProductById(
        params.id
      );
      setProduct(response);
      setLoading(false);
    };

    setLoading(true);
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

      {!loading && (
        <div>
          {product ? (
            <CreateNewProduct
              handleBack={handleBack}
              isCreating={false}
              updatingProduct={product}
            />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="">{lottie}</div>
              <p className="text-sm font-semibold pb-40">
                Không thể tải sản phẩm
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
