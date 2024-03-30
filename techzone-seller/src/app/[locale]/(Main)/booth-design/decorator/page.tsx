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

export default function BoothDecoratorPage() {
  // mock data
  const shopInfo = { color: "white", name: "TechZone Shop", avatarUrl: "" };

  // variables n methods
  const tabItems = [
    {
      label: "Cửa Hàng",
    },
    {
      label: "Tất Cả Sản Phẩm",
    },
    {
      label: "Bộ sưu tập",
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
    {
      title: "Hình & chữ",
      icon: (
        <PicLeftOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
    },
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
    {
      title: "Danh mục hình & chữ",
      icon: (
        <PicLeftOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
    },
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
    {
      title: "Sản phẩm, hình & chữ",
      icon: (
        <PicLeftOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
    },
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
        <WidgetEditorBar />
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
    </div>
  );
}
