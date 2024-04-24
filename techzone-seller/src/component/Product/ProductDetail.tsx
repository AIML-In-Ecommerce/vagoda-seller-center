"use client";
import { ProductType } from "@/app/[locale]/(Main)/product/list/page";
import { Col, Divider, Drawer, Image as ImageAntd, Row } from "antd";
import React, { useState } from "react";
import { GoStarFill } from "react-icons/go";

interface ProductDetailProps {
  product: ProductType;
  onClose: () => void;
  open: boolean;
}

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="flex space-x-2">
    <p className="font-semibold">{title}: </p>
    <p className="text-slate-500">{content}</p>
  </div>
);

export default function ProductDetail(props: ProductDetailProps) {
  const [mainImage, setMainImage] = useState(props.product.avatar_url[0]);

  let bgColor = "";
  switch (props.product.status) {
    case "Đang bán":
      bgColor = "bg-green-400";
      break;
    case "Hết hàng":
      bgColor = "bg-red-400";
      break;
    case "Chờ duyệt":
      bgColor = "bg-yellow-400";
      break;
    case "Đã tắt":
      bgColor = "bg-gray-400";
      break;
    default:
      bgColor = "bg-blue-400";
  }

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={props.open}
    >
      <div className="p-4">
        <p className="text-xl font-semibold uppercase mb-4">
          Thông tin chi tiết sản phẩm
        </p>
        <Row className="flex mx-auto justify-center">
          <ImageAntd className="rounded-xl mb-4" width={240} src={mainImage} />
        </Row>
        {/* <div className="m-2 flex mx-auto justify-center">
          <div className="">
            <List
              grid={{ gutter: 16, column: 5 }}
              dataSource={props.product.avatar_url}
              renderItem={(item) => (
                <List.Item>
                  <div
                    className={`cursor-pointer ${
                      mainImage === item ? "border border-sky-500" : ""
                    }`}
                    onMouseEnter={() => setMainImage(item)}
                    onClick={() => setMainImage(item)}
                  >
                    <img
                      className=" rounded-sm mb-4 "
                      src={item}
                      alt="Product Thumbnail"
                    />
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div> */}
        <p className="text-md font-semibold uppercase mt-4 mb-2">
          Thông tin chung
        </p>
        <DescriptionItem title="ID" content={props.product.id} />
        <DescriptionItem title="Tên sản phẩm" content={props.product.name} />
        <Row>
          <Col span={12}>
            <DescriptionItem title="Giá" content={props.product.price} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Số lượng trong kho"
              content={props.product.inventory_number}
            />
          </Col>
        </Row>
        <DescriptionItem title="Danh mục" content={props.product.category} />
        <DescriptionItem title="Thương hiệu" content={props.product.brand} />
        <div className="flex items-center">
          <Col span={12}>
            <div className="flex space-x-2 items-center ">
              <p className="font-semibold">Trạng thái: </p>
              <p className={`text-white ${bgColor} border rounded-lg p-1`}>
                {props.product.status}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className="flex space-x-2 items-center">
              <p className="font-semibold">Đánh giá: </p>
              <p className="flex space-x-1 items-center">
                <p>{props.product.rating}</p>
                <GoStarFill className="text-yellow-400" />
              </p>
            </div>
          </Col>
        </div>
        <Divider />
        <p className="text-md font-semibold uppercase">Mô tả</p>
        <p>{props.product.description}</p>
        <Divider />
        <p className="text-md font-semibold uppercase mb-2">
          Các thông số khác
        </p>
        <div className="space-y-1 flex items-center justify-center mx-auto w-full">
          <div className=" w-full">
            {props.product.otherDescriptions.map((description, index) => (
              <div key={index} className={index % 2 === 0 ? "bg-slate-50" : ""}>
                <Row className="p-2">
                  <Col className="font-semibold" span={12}>
                    {description.label}
                  </Col>
                  <Col span={12}>{description.value}</Col>
                </Row>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
