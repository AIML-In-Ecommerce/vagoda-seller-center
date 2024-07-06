"use client";
import CreateBatchProduct from "@/component/Product/CreateBatchProduct";
import CreateNewProduct from "@/component/Product/CreateNewProduct";
import { Breadcrumb, Button, Divider } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineTable } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi2";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function CreateProductPage() {
  const [showCreateProduct, setShowCreateProduct] = useState(true);
  const [showBatchCreateProduct, setShowBatchCreateProduct] = useState(true);

  const handleCreateProduct = () => {
    setShowCreateProduct(false);
  };

  const handleBatchCreateProduct = () => {
    setShowBatchCreateProduct(false);
  };

  const handleBack = () => {
    setShowCreateProduct(true);
    setShowBatchCreateProduct(true);
  };

  useEffect(() => {
    window.history.pushState({}, "", `${window.location.pathname}`);
  }, []);

  return (
    <div className="mt-4 mx-4 space-y-2">
      <div>
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
              title: "Tạo sản phẩm",
            },
          ]}
        />
      </div>
      {showCreateProduct && showBatchCreateProduct && (
        <>
          <p className="uppercase text-xl font-semibold">Tạo sản phẩm</p>
          <div className="flex grid grid-cols-2 justify-between">
            {showCreateProduct && (
              <div className="my-4 mr-4 bg-white font-semibold p-4 pb-8 border  rounded-xl border-slate-300">
                <p>Tạo sản phẩm</p>
                <Divider />
                <div className="flex justify-between">
                  <div className=" flex space-x-2">
                    <FiEdit size={30} />
                    <div className="">
                      <div className="font-semibold">Tạo sản phẩm mới</div>
                      <div className="text-xs font-light">
                        Bạn có thể nhập tất cả thông tin về sản phẩm của bạn
                      </div>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    className="bg-sky-500 rounded-lg "
                    onClick={handleCreateProduct}
                  >
                    Bắt đầu
                  </Button>
                </div>
              </div>
            )}
            {showBatchCreateProduct && (
              <div className="my-4 mr-4 bg-white font-semibold p-4 pb-8 border  rounded-xl border-slate-300">
                <p>Tạo / Cập Nhật Sản Phẩm Hàng Loạt</p>
                <Divider />
                <div className="flex justify-between">
                  <div className=" flex space-x-2">
                    <AiOutlineTable size={30} />
                    <div className="">
                      <div className="font-semibold">Tạo sản phẩm mới</div>
                      <div className="text-xs font-light">
                        Sử dụng lưới dữ liệu để tạo hoặc cập nhật một lúc nhiều
                        sản phẩm
                      </div>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    className="bg-sky-500 rounded-lg "
                    onClick={handleBatchCreateProduct}
                  >
                    Bắt đầu
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {!showCreateProduct && (
        <CreateNewProduct handleBack={handleBack} isCreating={true} />
      )}
      {!showBatchCreateProduct && (
        <div>
          <div className="flex items-center space-x-1">
            <div className="" onClick={handleBack}>
              <MdOutlineKeyboardBackspace size={25} />
            </div>
            <p className="font-semibold">
              Tạo mới / Cập nhật sản phẩm hàng loạt
            </p>
          </div>
          <CreateBatchProduct />
        </div>
      )}
    </div>
  );
}
