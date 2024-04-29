"use client";
import {
  Anchor,
  Breadcrumb,
  Button,
  Divider,
  Flex,
  FloatButton,
  Input,
  Layout,
  Tooltip,
} from "antd";
import { useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import CustomSwitch from "@/component/booth-design/decorator/mini/CustomSwitch";
import ProductSelect from "@/component/booth-design/collection/custom/ProductSelect";
import { CollectionType } from "@/model/CollectionType";
import { formatDate } from "@/utils/DateFormatter";
import { HiOutlineHome } from "react-icons/hi2";
import BannerForm from "@/component/booth-design/decorator/uploadImage/BannerForm";
import { FaRegHandPointer } from "react-icons/fa";

export default function NewCollectionPage() {
  // mock data
  const MockData = [
    {
      _id: "sp-01",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Lenovo 15i",
      rating: 4.5,
      soldAmount: 20,
      price: 15000000,
      flashSale: true,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-02",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell Vostro",
      rating: 4.5,
      soldAmount: 32,
      price: 17000000,
      flashSale: false,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-03",
      imageLink:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell SuperLight",
      rating: 4.5,
      soldAmount: 10,
      price: 18000000,
      flashSale: true,
      originalPrice: 20000000,
      category: "",
    },
    {
      _id: "sp-04",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Lenovo 15i",
      rating: 4.5,
      soldAmount: 20,
      price: 15000000,
      flashSale: true,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-05",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell Vostro",
      rating: 4.5,
      soldAmount: 32,
      price: 17000000,
      flashSale: false,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-06",
      imageLink:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell SuperLight",
      rating: 4.5,
      soldAmount: 10,
      price: 18000000,
      flashSale: true,
      originalPrice: 20000000,
      category: "",
    },
    {
      _id: "sp-07",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Lenovo 15i",
      rating: 4.5,
      soldAmount: 20,
      price: 15000000,
      flashSale: true,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-08",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell Vostro",
      rating: 4.5,
      soldAmount: 32,
      price: 17000000,
      flashSale: false,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-09",
      imageLink:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell SuperLight",
      rating: 4.5,
      soldAmount: 10,
      price: 18000000,
      flashSale: true,
      originalPrice: 20000000,
      category: "",
    },
    {
      _id: "sp-10",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Lenovo 15i",
      rating: 4.5,
      soldAmount: 20,
      price: 15000000,
      flashSale: true,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-11",
      imageLink:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell Vostro",
      rating: 4.5,
      soldAmount: 32,
      price: 17000000,
      flashSale: false,
      originalPrice: 17000000,
      category: "",
    },
    {
      _id: "sp-12",
      imageLink:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Dell SuperLight",
      rating: 4.5,
      soldAmount: 10,
      price: 18000000,
      flashSale: true,
      originalPrice: 20000000,
      category: "",
    },
  ];

  //var
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productIdList, setProductIdList] = useState<string[]>([]);
  const [isSwitched, setIsSwitched] = useState(true);

  // function
  const handleSave = () => {
    const newCollection: CollectionType = {
      _id: "",
      name: name,
      imageUrl: imageUrl,
      productIdList: productIdList,
      createDate: formatDate(new Date()),
      isActive: isSwitched,
    };

    // use api to create

    // push router to collection
  };

  return (
    <Layout>
      <div className="m-5 grid grid-cols-6 lg:grid-cols-8 h-fit">
        <div className="col-span-1">
          <Anchor
            items={[
              {
                key: "part-1",
                href: "#part-1",
                title: "Thao tác",
              },
              {
                key: "part-2",
                href: "#part-2",
                title: "Thông tin chung",
              },
              {
                key: "part-3",
                href: "#part-3",
                title: "Danh sách sản phẩm",
              },
            ]}
            offsetTop={80}
          />
        </div>
        <div className="col-span-5 lg:col-span-7 mx-20 flex flex-col">
          <div id="part-1">
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
                  title: "Thiết kế gian hàng",
                },
                {
                  href: "/booth-design/collection",
                  title: "Bộ sưu tập",
                },
                {
                  title: "Tạo Bộ sưu tập",
                },
              ]}
            />
          </div>
          <div className="lg:flex lg:flex-row gap-5">
            <Button href="./"> Trở về danh sách </Button>
            <Button disabled={!name || name === ""} onClick={handleSave}>
              Tạo bộ sưu tập
            </Button>
          </div>
          <div>
            <div id="part-2" className="invisible">
              <Divider />
            </div>
            <div className="m-5 text-2xl font-semibold">1. Thông tin chung</div>
            <Divider />
            {/* name */}
            <div className="sm:w-full md:w-full lg:w-1/2">
              <Tooltip title="Tên bộ sưu tập">
                <Input
                  placeholder="Điền tên bộ sưu tập"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="Giới hạn n kí tự">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Tooltip>
            </div>

            {/* status */}
            <Flex gap="large" className="my-5">
              <div className="font-semibold">Trạng thái</div>
              <CustomSwitch
                isSwitched={isSwitched}
                setIsSwitched={setIsSwitched}
              />
            </Flex>

            {/* avatar */}
            <Flex
              vertical
              gap="large"
              className="overflow-hidden sm:w-full md:w-full lg:w-1/2"
            >
              <div className="font-semibold">Ảnh đại diện</div>

              {imageUrl && imageUrl !== " " && (
                <Tooltip
                  title={
                    <img
                      src={imageUrl}
                      alt="banner"
                      style={{ width: "100%", height: "100%" }}
                    />
                  }
                >
                  <Flex
                    className="text-slate-500 w-max cursor-pointer"
                    gap="small"
                  >
                    <FaRegHandPointer />
                    Ảnh mới cập nhật
                  </Flex>
                </Tooltip>
              )}

              <BannerForm setImageUrl={setImageUrl} />
            </Flex>
          </div>

          <div className="mb-20">
            <div id="part-3" className="invisible">
              <Divider />
            </div>
            <div className="m-5 text-2xl font-semibold">
              2. Danh sách sản phẩm
            </div>
            <Divider />

            <ProductSelect
              products={MockData}
              selectedProductId={[]}
              setSelectedProductId={setProductIdList}
            />
          </div>
        </div>
        <FloatButton.Group>
          <FloatButton.BackTop tooltip={<div>Lướt lên đầu</div>} />
        </FloatButton.Group>
      </div>
    </Layout>
  );
}
