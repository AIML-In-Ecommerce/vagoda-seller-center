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
  Skeleton,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import CustomSwitch from "@/component/booth-design/decorator/mini/CustomSwitch";
import ProductSelect from "@/component/booth-design/collection/custom/ProductSelect";
import { CollectionType } from "@/model/CollectionType";
import { HiOutlineHome } from "react-icons/hi2";
import BannerForm from "@/component/booth-design/decorator/uploadImage/BannerForm";
import { FaRegHandPointer } from "react-icons/fa";
import { ProductType } from "@/model/ProductType";
import { POST_CreateCollection } from "@/app/apis/collection/CollectionAPI";
import { POST_GetProductList } from "@/app/apis/product/ProductAPI";

export default function NewCollectionPage() {
  //var
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(
    // TODO: save image upload
    "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg"
  );
  const [productIdList, setProductIdList] = useState<string[]>([]);
  const [isSwitched, setIsSwitched] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  // function
  const handleSave = async () => {
    const newCollection: CollectionType = {
      _id: "",
      name: name,
      imageUrl: imageUrl,
      productIdList: productIdList,
      createDate: new Date(),
      isActive: isSwitched,
    };

    // use api to create
    console.log(newCollection);
    const response = await POST_CreateCollection(newCollection);

    if (response.status === 200) {
      // push router to collection
      console.log(response.message);
      console.log(response.data);
    } else console.log(response.message);
  };

  // call api
  useEffect(() => {
    handleGetProductList();
  }, []);

  const handleGetProductList = async () => {
    // mock data
    const mockIds = ["663da8175f77ea6b8f5b2e1d", "6640f13927725b50d70c0579"];

    const response = await POST_GetProductList(mockIds);
    if (response.status == 200) {
      let data = response.data as ProductType[];
      if (data) {
        setProducts(data);
        // console.log("product", data);
      }
    }
  };

  return (
    <Layout>
      {(products && (
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
              <div className="m-5 text-2xl font-semibold">
                1. Thông tin chung
              </div>
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
                products={products}
                selectedProductId={[]}
                setSelectedProductId={setProductIdList}
              />
            </div>
          </div>
          <FloatButton.Group>
            <FloatButton.BackTop tooltip={<div>Lướt lên đầu</div>} />
          </FloatButton.Group>
        </div>
      )) || <Skeleton active style={{ margin: 10 }} />}
    </Layout>
  );
}
