"use client";
import { _ProductType } from "@/model/ProductType";
import { Button, Col, Divider, Drawer, Image as ImageAntd, Row } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { formatPrice } from "../utils/formatPrice";

interface ProductDetailProps {
  product: _ProductType;
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
  const router = useRouter();
  const [mainImage, setMainImage] = useState(props.product.images[0]);

  let status = "";

  let bgColor = "";
  switch (props.product.status) {
    case "AVAILABLE":
      bgColor = "bg-green-400";
      status = "Đang bán";
      break;
    case "SOLD_OUT":
      bgColor = "bg-red-400";
      status = "Hết bán";
      break;
    case "SALE":
      bgColor = "bg-orange-400";
      status = "Khuyến mãi";
      break;
    case "DRAFT":
      bgColor = "bg-sky-400";
      status = "Nháp";
      break;
    case "DISABLED":
      bgColor = "bg-gray-400";
      status = "Đã Tắt";
      break;
    default:
      bgColor = "bg-green-400";
  }

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={props.onClose}
      open={props.open}
    >
      <div className="p-4">
        <div className="flex justify-between">
          <p className="text-xl font-semibold uppercase mb-4">
            Thông tin chi tiết sản phẩm
          </p>
          <Button
            onClick={() => router.push(`list/update/${props.product._id}`)}
            className="flex space-x-2 items-center"
          >
            <p>Chỉnh sửa</p>
            <FiEdit />
          </Button>
        </div>

        <Row className="flex mx-auto justify-center">
          <ImageAntd
            className="rounded-xl mb-4"
            width={240}
            src={props.product.images[0]}
          />
        </Row>
        <p className="text-md font-semibold uppercase mt-4 mb-2">
          Thông tin chung
        </p>
        <Row className=" mb-1">
          <Col span={12}>
            <DescriptionItem title="ID" content={props.product._id} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Tên sản phẩm"
              content={props.product.name}
            />
          </Col>
        </Row>

        <Row className=" mb-1">
          <Col span={12}>
            <DescriptionItem
              title="Giá ban đầu"
              content={formatPrice(props.product.originalPrice)}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Giá sau khi giảm"
              content={formatPrice(props.product.finalPrice)}
            />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col span={12}>
            <DescriptionItem
              title="Danh mục"
              content={`${props.product.category.name} /${
                props.product.subCategory ? props.product.subCategory.name : ""
              } /${
                props.product.subCategoryType
                  ? props.product.subCategoryType.name
                  : ""
              }`}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Thương hiệu"
              content={props.product.brand}
            />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col span={12}>
            <DescriptionItem
              title="Số lượng trong kho"
              content={props.product.inventoryAmount}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phí hệ thống"
              content={props.product.platformFee}
            />
          </Col>
        </Row>

        <div className="flex items-center">
          <Col span={12}>
            <div className="flex space-x-2 items-center ">
              <p className="font-semibold">Trạng thái: </p>
              <p className={`text-white ${bgColor} border rounded-lg p-1`}>
                {status}
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className="flex space-x-2 items-center">
              <p className="font-semibold">Đánh giá: </p>
              <p className="flex space-x-1 items-center">
                <p>{props.product.avgRating}</p>
                <GoStarFill className="text-yellow-400" />
              </p>
            </div>
          </Col>
        </div>
        <Divider />
        <p className="text-md font-semibold uppercase">Mô tả</p>
        <div dangerouslySetInnerHTML={{ __html: props.product.description }} />

        <Divider />
        <p className="text-md font-semibold uppercase mb-2">
          Các thông số khác
        </p>
        <div className="space-y-1 flex items-center justify-center mx-auto w-full">
          <div className=" w-full">
            {/* {props.product.attribute.colors && (
              <div key={"color"} className={"bg-slate-50"}>
                <Row className="p-2">
                  <Col className="font-semibold" span={12}>
                    Màu sắc
                  </Col>
                  <Col span={12}>
                    {props.product.attribute.colors.map((color) => (
                      <div className="flex space-x-2 items-center">
                        <ColorPicker
                          defaultValue={color.color.value}
                          disabled
                        />
                        <p>{color.color.label}</p>
                      </div>
                    ))}
                  </Col>
                </Row>
              </div>
            )} */}
            {props.product.attribute.size && (
              <div key={"size"} className="">
                <Row className="p-2">
                  <Col className="font-semibold" span={12}>
                    Kích cỡ
                  </Col>
                  <Col span={12}>{props.product.attribute.size.join(", ")}</Col>
                </Row>
              </div>
            )}
            {props.product.attribute.material && (
              <div key={"material"} className={"bg-slate-50"}>
                <Row className="p-2">
                  <Col className="font-semibold" span={12}>
                    Chất liệu
                  </Col>
                  <Col span={12}>{props.product.attribute.material}</Col>
                </Row>
              </div>
            )}
            {props.product.attribute.manufacturingPlace && (
              <div key={"warranty"} className="">
                <Row className="p-2">
                  <Col className="font-semibold" span={12}>
                    Nơi sản xuất
                  </Col>
                  <Col span={12}>
                    {props.product.attribute.manufacturingPlace}
                  </Col>
                </Row>
              </div>
            )}
            {props.product.attribute.warranty && (
              <div key={"warranty"} className="bg-slate-50">
                <Row className="p-2">
                  <Col className="font-semibold" span={12}>
                    Bảo hành
                  </Col>
                  <Col span={12}>{props.product.attribute.warranty}</Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
}
