"use client";

import { Affix, Breadcrumb, Button, FloatButton, Tabs } from "antd";
import { useState } from "react";
import Banner from "@/component/booth-design/decorator/mini/Banner";
import Search from "antd/es/transfer/search";
import WidgetEditorBar from "@/component/booth-design/decorator/WidgetEditorBar";
import WidgetList from "@/component/booth-design/decorator/WidgetList";
import {
  WidgetType,
  WidgetCategoryType,
  CategoryPatternType,
  BannerPatternType,
  ProductPatternType,
  PromotionPatternType,
  CollectionPatternType,
} from "@/model/WidgetType";
import WidgetDrawer from "@/component/booth-design/decorator/WidgetDrawer";
import { AddWidgetHandle } from "@/component/booth-design/decorator/widgetUtils/AddWidgetHandle";
import DeleteWidgetModal from "@/component/booth-design/decorator/modal/DeleteWidgetModal";
import { HiOutlineHome } from "react-icons/hi2";

export default function BoothDecoratorPage() {
  // mock data
  const shopInfo = { color: "white", name: "TechZone Shop", avatarUrl: "" };

  const [widgets, setWidgets] = useState<WidgetType[]>([
    {
      _id: "collection_ID1",
      type: WidgetCategoryType.COLLECTION,
      order: 7,
      visibility: true,
      element: {
        pattern: CollectionPatternType.GRID,
        collectionIdList: [],
      },
    },
    {
      _id: "collection_ID2",
      type: WidgetCategoryType.COLLECTION,
      order: 8,
      visibility: true,
      element: {
        pattern: CollectionPatternType.CAROUSEL,
        collectionIdList: [],
      },
    },
    {
      _id: "category_ID",
      type: WidgetCategoryType.CATEGORY,
      order: 1,
      visibility: false,
      element: {
        pattern: CategoryPatternType.GRID,
        title: "Danh mục nổi bật",
        categoryIdList: [],
      },
    },
    {
      _id: "product_ID",
      type: WidgetCategoryType.PRODUCT,
      order: 2,
      visibility: true,
      element: {
        pattern: ProductPatternType.GRID,
        title: "Sản phẩm mới",
        collectionId: "",
      },
    },
    {
      _id: "product_ID2",
      type: WidgetCategoryType.PRODUCT,
      order: 4,
      visibility: true,
      element: {
        pattern: ProductPatternType.CAROUSEL,
        title: "Sản phẩm giá hời",
        collectionId: "",
      },
    },
    {
      _id: "product_ID3",
      type: WidgetCategoryType.PRODUCT,
      order: 5,
      visibility: true,
      element: {
        pattern: ProductPatternType.GRID,
        title: "Sản phẩm nổi bật",
        collectionId: "",
      },
    },
    {
      _id: "product_ID4",
      type: WidgetCategoryType.PRODUCT,
      order: 6,
      visibility: true,
      element: {
        pattern: ProductPatternType.CAROUSEL,
        title: "Sản phẩm cho bạn",
        collectionId: "",
      },
    },
    {
      _id: "promotion_ID",
      type: WidgetCategoryType.PROMOTION,
      order: 3,
      visibility: false,
      element: {
        pattern: PromotionPatternType.GRID,
        title: "Voucher trao tay",
        promotionIdList: [],
      },
    },
    {
      _id: "banner_ID",
      type: WidgetCategoryType.BANNER,
      order: 0,
      visibility: true,
      element: {
        pattern: BannerPatternType.CAROUSEL,
        images: [],
      },
    },
  ]);

  // variables n methods
  const tabItems = [
    "Cửa Hàng",
    "Tất Cả Sản Phẩm",
    "Bộ Sưu Tập",
    "Hồ Sơ Cửa Hàng",
  ];

  // widget drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  // add widget
  const addWidget = (type: number, pattern: number, order: number) => {
    // console.log("addWidget", type, pattern, order);
    let newWidget = AddWidgetHandle({ type, pattern, order });
    setWidgets([...widgets, newWidget]);
    setOpenDrawer(false);
  };

  // update widget's visibility
  const toggleInvisibilityWidget = (widget: WidgetType) => {
    widget.visibility = !widget.visibility;
    setWidgets([...widgets]);
    // TODO: toast update successfully
  };

  // delete widget
  const tempWidget = {
    _id: "",
    type: 0,
    order: 0,
    visibility: false,
    element: undefined,
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletableWidget, setDeletableWidget] =
    useState<WidgetType>(tempWidget);

  const handleDeleteWidget = (widget: WidgetType) => {
    setDeletableWidget(widget);
    setOpenDeleteModal(true);
  };

  const deleteWidget = () => {
    let newList = widgets.filter((w) => w._id !== deletableWidget._id);
    setWidgets(newList);

    setOpenDeleteModal(false);
    setDeletableWidget(tempWidget);

    // TODO: toast update successfully
  };

  return (
    <div className="m-5 grid grid-cols-3 h-fit">
      <div className="col-span-2">
        <div className="bg-white p-2 mb-1">
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
                href: "/product/list",
                title: "Trang trí gian hàng",
              },
            ]}
          />
        </div>

        <Banner
          color={shopInfo.color}
          name={shopInfo.name}
          avatarUrl={shopInfo.avatarUrl}
        />
        <Tabs
          defaultActiveKey="0"
          size="middle"
          style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
          items={tabItems.map((item, i) => {
            return {
              label: item,
              key: i.toString(),
              children: <div />,
              disabled: true,
            };
          })}
          tabBarExtraContent={
            <Search disabled placeholder="Tìm tại cửa hàng" />
          }
        />
        <div className="m-2">
          <WidgetList widgets={widgets} />
        </div>

        <Button
          block
          onClick={() => {
            setOpenDrawer(true);
          }}
        >
          + Thêm widget
        </Button>
      </div>

      <div className="col-span-1">
        {/* <div className="sticky top-50"> */}
        <Affix offsetTop={80}>
          <WidgetEditorBar
            widgets={widgets}
            setWidgets={setWidgets}
            toggleInvisibilityWidget={toggleInvisibilityWidget}
            deleteWidget={handleDeleteWidget}
          />

          <Button
            className="mt-2 ml-2"
            block
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            + Thêm widget
          </Button>
        </Affix>
        {/* </div> */}
      </div>

      <WidgetDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        addWidget={addWidget}
        order={widgets.length}
      />

      <FloatButton.BackTop tooltip={<div>Lướt lên đầu</div>} />

      <DeleteWidgetModal
        open={openDeleteModal}
        handleOk={() => deleteWidget()}
        handleCancel={() => setOpenDeleteModal(false)}
      />
    </div>
  );
}
