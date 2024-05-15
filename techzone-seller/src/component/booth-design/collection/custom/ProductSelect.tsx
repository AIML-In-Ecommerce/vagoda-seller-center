"use client";
import { useMemo, useState } from "react";
import { Transfer } from "antd";
import type { TransferProps } from "antd";
import { ProductType } from "@/model/ProductType";

interface ProductSelectProps {
  products: ProductType[];
  selectedProductId: string[];
  setSelectedProductId(list: string[]): void;
}

interface DataType {
  key: string;
  name: string;
}

export default function ProductSelect(props: ProductSelectProps) {
  const processedSourceData: DataType[] = useMemo(() => {
    return props.products.map((item) => {
      const data: DataType = {
        key: item._id,
        name: item.name,
      };
      return data;
    });
  }, [props.products]);

  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>(
    props.selectedProductId ? props.selectedProductId : []
  );
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>(
    []
  );

  const onChange: TransferProps["onChange"] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    console.log("targetKeys:", nextTargetKeys);
    console.log("direction:", direction);
    console.log("moveKeys:", moveKeys);
    setTargetKeys(nextTargetKeys);

    props.setSelectedProductId(nextTargetKeys);
  };

  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    console.log("sourceSelectedKeys:", sourceSelectedKeys);
    console.log("targetSelectedKeys:", targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll: TransferProps["onScroll"] = (direction, e) => {
    console.log("direction:", direction);
    console.log("target:", e.target);
  };

  return (
    <Transfer
      dataSource={processedSourceData}
      titles={["Tất cả sản phẩm", "Cho vào bộ sưu tập"]}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onScroll={onScroll}
      render={(item) => item.name}
      listStyle={{
        width: 500,
        height: 500,
      }}
    />
  );
}
