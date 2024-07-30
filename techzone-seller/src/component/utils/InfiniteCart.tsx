import { CartItem, GET_getUserCartProducts } from "@/apis/cart/CartProductAPI";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import CartTable from "@/component/customer/cart/CartTable";
import { SimpleUserInfoType } from "@/model/UserInfoType";
const authLocalStorageID = "#auth-context-user-info-record-ID";

const InfiniteCart = () => {
  const [products, setProducts] = useState<CartItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  function initLoading() {
    const storageInfo = localStorage.getItem(authLocalStorageID);
    if (storageInfo != null) {
      return JSON.parse(storageInfo) as SimpleUserInfoType;
    } else {
      return null;
    }
  }

  const userInfo = initLoading();

  const fetchProducts = async () => {
    await GET_getUserCartProducts(userInfo?._id as string).then((response) => {
      console.log("Cart: ", response.data?.products);
      setProducts(response.data?.products || undefined);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 overflow-y-auto">
      {" "}
      <div className="text-3xl font-bold normal-case ">Giỏ hàng của bạn</div>
      <CartTable
        products={products}
        setProducts={setProducts}
        loading={loading}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
    </div>
  );
};

export default InfiniteCart;
