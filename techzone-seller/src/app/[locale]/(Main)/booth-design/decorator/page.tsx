"use client";

import { Button, Drawer, Flex, Tabs } from "antd";
import { useState } from "react";
import {
  CloseOutlined,
  GroupOutlined,
  InsertRowBelowOutlined,
  PicLeftOutlined,
  PercentageOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Banner from "@/component/booth-design/decorator/mini/Banner";
import Search from "antd/es/transfer/search";
import MiniDesignPattern from "@/component/booth-design/decorator/mini/MiniDesignPattern";
import WidgetEditorBar from "@/component/booth-design/decorator/WidgetEditorBar";
// import ImageCropper from "@/component/booth-design/decorator/uploadImage/ImageCropper";
import WidgetList from "@/component/booth-design/decorator/WidgetList";
import {
  WidgetType,
  WidgetCategoryType,
  CategoryPatternType,
  ProductPatternType,
  PromotionPatternType,
  BannerPatternType,
} from "@/model/WidgetType";

export default function BoothDecoratorPage() {
  // mock data
  const shopInfo = { color: "white", name: "TechZone Shop", avatarUrl: "" };

  const [widgets, setWidgets] = useState<WidgetType[]>([
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
    {
      label: "Cửa Hàng",
    },
    {
      label: "Tất Cả Sản Phẩm",
    },
    {
      label: "Bộ Sưu Tập",
    },
    {
      label: "Hồ Sơ Cửa Hàng",
    },
  ];

  // widget drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerBannerItems = [
    {
      title: "Băng chuyền",
      icon: (
        <InsertRowBelowOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
    },
    // {
    //   title: "Hình & chữ",
    //   icon: (
    //     <PicLeftOutlined
    //       style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
    //     />
    //   ),
    // },
  ];
  const drawerCategoryItems = [
    {
      title: "Danh mục dạng lưới",
      icon: (
        <GroupOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
    },
    // {
    //   title: "Danh mục hình & chữ",
    //   icon: (
    //     <PicLeftOutlined
    //       style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
    //     />
    //   ),
    // },
  ];
  const drawerProductItems = [
    {
      title: "Sản phẩm dạng lưới",
      icon: (
        <GroupOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
    },
    {
      title: "Sản phẩm dạng băng chuyền",
      icon: (
        <InsertRowBelowOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
    },
    // {
    //   title: "Sản phẩm, hình & chữ",
    //   icon: (
    //     <PicLeftOutlined
    //       style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
    //     />
    //   ),
    // },
  ];
  const drawerPromotionItems = [
    {
      title: "Mã giảm giá",
      icon: (
        <PercentageOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
    },
  ];

  return (
    <div className="m-10 grid grid-cols-3">
      <div className="col-span-2">
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
              label: item.label,
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
          {/* <PlusOutlined style={{ marginBottom: "10px", fontSize: "12px" }} /> */}
          + Thêm widget
        </Button>
      </div>

      <div className="col-span-1">
        <WidgetEditorBar widgets={widgets} setWidgets={setWidgets} />
      </div>

      <Drawer
        title="Mẫu thiết kế"
        placement="left"
        width={400}
        closeIcon={false}
        open={openDrawer}
        extra={
          <CloseOutlined
            onClick={() => {
              setOpenDrawer(false);
            }}
            style={{ cursor: "pointer" }}
          />
        }
      >
        <div className="overflow-y-auto overflow-x-hidden">
          <div className="font-semibold uppercase">banner</div>
          <Flex>
            {drawerBannerItems.map((drawerItem, i) => (
              <div key={i}>
                <MiniDesignPattern
                  title={drawerItem.title}
                  icon={drawerItem.icon}
                  previewImageUrl={""}
                />
              </div>
            ))}
          </Flex>

          <div className="font-semibold uppercase">danh mục</div>
          <Flex>
            {drawerCategoryItems.map((drawerItem, i) => (
              <div key={i}>
                <MiniDesignPattern
                  title={drawerItem.title}
                  icon={drawerItem.icon}
                  previewImageUrl={""}
                />
              </div>
            ))}
          </Flex>

          <div className="font-semibold uppercase">sản phẩm</div>
          <Flex>
            {drawerProductItems.map((drawerItem, i) => (
              <div key={i}>
                <MiniDesignPattern
                  title={drawerItem.title}
                  icon={drawerItem.icon}
                  previewImageUrl={""}
                />
              </div>
            ))}
          </Flex>
          <div className="font-semibold uppercase">bộ sưu tập</div>

          <div className="font-semibold uppercase">khuyến mãi</div>
          <Flex>
            {drawerPromotionItems.map((drawerItem, i) => (
              <div key={i}>
                <MiniDesignPattern
                  title={drawerItem.title}
                  icon={drawerItem.icon}
                  previewImageUrl={""}
                />
              </div>
            ))}
          </Flex>
        </div>
      </Drawer>

      {/* <ImageCropper
        imageUrl={
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        setImageUrl={function (value: string): void {
          // throw new Error("Function not implemented.");
        }}
      /> */}
    </div>
  );
}
