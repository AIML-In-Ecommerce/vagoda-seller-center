"use client";
import ProductSelect from "@/component/booth-design/collection/custom/ProductSelect";
import CustomSwitch from "@/component/booth-design/decorator/mini/CustomSwitch";
import {
  Layout,
  Button,
  Anchor,
  Divider,
  Tooltip,
  Flex,
  FloatButton,
  Input,
  Breadcrumb,
  Skeleton,
  notification,
  NotificationArgsProps,
} from "antd";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { CollectionType } from "@/model/CollectionType";
import { HiOutlineHome } from "react-icons/hi2";
import AvatarForm from "@/component/booth-design/decorator/uploadImage/AvatarForm";
import { FaRegHandPointer } from "react-icons/fa";
import { ProductType } from "@/model/ProductType";
import { POST_GetProductListByShop } from "@/apis/product/ProductAPI";
import {
  GET_GetCollection,
  PUT_UpdateCollection,
} from "@/apis/collection/CollectionAPI";

type NotificationPlacement = NotificationArgsProps["placement"];

export default function CollectionDetailPage() {
  // mock data
  // const collectionData: CollectionType = {
  //   _id: "",
  //   name: "",
  //   imageUrl: "",
  //   // "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
  //   productIdList: [],
  //   createDate: new Date("2024-03-24T12:30:00"),
  //   isActive: false,
  //   shop: "",
  // };

  //var
  const { collectionId } = useParams();
  const [collection, setCollection] = useState<CollectionType>();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productIdList, setProductIdList] = useState<string[]>([]);
  const [isSwitched, setIsSwitched] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (collection) {
      // update collection data
      console.log(collection.productIdList);

      setProductIdList(
        collection.productIdList ? collection.productIdList : []
      );
      setName(collection.name);
      setIsSwitched(collection.isActive);
      setImageUrl(collection.imageUrl);
    }
  }, [collection]);

  const isNotUpdatable = useMemo(() => {
    if (!collection || !collection.productIdList) return true;

    let isNewList = true;

    if (collection.productIdList.length == productIdList.length) {
      isNewList = false;

      productIdList.forEach((id) => {
        if (!collection.productIdList.includes(id)) {
          isNewList = true;
        }
      });
    }

    return (
      (name === "" || name.toString() === collection.name.toString()) &&
      isSwitched === collection.isActive &&
      !isNewList &&
      (imageUrl === "" ||
        imageUrl.toString() === collection.imageUrl.toString())
    );
  }, [name, isSwitched, productIdList, imageUrl]);

  // notification
  const [api, contextHolder] = notification.useNotification();

  const placement: NotificationPlacement = "topRight"; //topLeft, bottomRight, bottomLeft
  const openNotification = (title: string, content: ReactElement) => {
    api.info({
      message: `${title}`,
      description: content,
      placement,
    });
  };

  // function
  const handleSave = async () => {
    if (!collection) return;

    const updatedCollection: CollectionType = {
      _id: collection._id,
      name: name,
      imageUrl: imageUrl,
      productIdList: productIdList,
      createDate: collection.createDate,
      isActive: isSwitched,
      shop: collection.shop,
    };

    // use api to update
    console.log(updatedCollection);
    const response = await PUT_UpdateCollection(updatedCollection);

    if (response.status === 200) {
      openNotification("Cập nhật bộ sưu tập thành công!", <></>);

      // console.log(response.message);
      // console.log(response.data);
    } else {
      openNotification("Cập nhật bộ sưu tập thất bại!", <></>);

      // console.log(response.message);
    }
  };

  // call api
  useEffect(() => {
    handleGetProductList();
  }, [collection]);

  useEffect(() => {
    handleGetCollection();
  }, [collectionId]);

  const handleGetProductList = async () => {
    if (!collection) return;

    const response = await POST_GetProductListByShop(collection.shop);
    if (response.status == 200) {
      if (response.data) {
        setProducts(response.data);
        // console.log("product", data);
      }
    }
  };

  const handleGetCollection = async () => {
    const response = await GET_GetCollection(collectionId.toString());
    if (response.status == 200) {
      if (response.data) {
        setCollection(response.data);
        // console.log("collection", response.data);
      }
    }
  };

  return (
    <Layout>
      {contextHolder}
      {(collection && products && (
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
                    title: "Chi tiết Bộ sưu tập",
                  },
                ]}
              />
            </div>
            <div className="lg:flex lg:flex-row gap-5">
              <Button href="./"> Trở về danh sách </Button>
              <Button disabled={isNotUpdatable} onClick={handleSave}>
                Cập nhật
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
                    placeholder={collection.name}
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

                {collection.imageUrl && collection.imageUrl !== " " && (
                  <Tooltip
                    title={
                      <img
                        src={collection.imageUrl}
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
                      Ảnh hiện tại
                    </Flex>
                  </Tooltip>
                )}

                <AvatarForm setImageUrl={setImageUrl} />
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
                selectedProductId={productIdList}
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
