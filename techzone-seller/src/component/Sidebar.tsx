"use client";
import { Button, Input, Layout, Menu, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { BsHouseHeart, BsPersonVideo, BsShop } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { LiaBoxSolid, LiaWalletSolid } from "react-icons/lia";
import { RiTodoLine } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";

// type MenuItem = Required<MenuProps>["items"][number];
type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  url: string | null;
  children?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  url?: string
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    url,
  } as MenuItem;
}

interface SidebarProps {
  noticeCollapsingCallback: any;
}

const Sidebar = ({ noticeCollapsingCallback }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const handleMenuItemClick = (url: string | null) => {
    router.push(url ? url : "/");
  };

  //watch changes of the variable 'collapsed', if it changes, call the noticeCollapsingCallback function
  useEffect(() => {
    noticeCollapsingCallback(collapsed);
  }, [collapsed]);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "1", icon: <HiOutlineHome />, label: "Trang chủ", url: "/" },
    {
      key: "2",
      icon: <RiTodoLine />,
      label: "Đơn hàng",
      children: [
        { label: "Danh sách đơn hàng", url: "/order" },
        { label: "Đổi trả bảo hành", url: "/order/return-order" },
        { label: "Quản lý hóa đơn", url: "/order/invoice" },
      ],
      url: null,
    },
    {
      key: "3",
      icon: <LiaBoxSolid />,
      label: "Sản phẩm",
      children: [
        { label: "Danh sách sản phẩm", url: "/product/list" },
        { label: "Tạo sản phẩm", url: "/product/create" },
        { label: "Quản lý đánh giá", url: "/product/review" },
        { label: "Lịch sử thay đổi", url: "/product/history" },
      ],
      url: null,
    },
    {
      key: "4",
      icon: <BsShop />,
      label: "Kho & hàng tồn",
      url: "/warehouse-management",
    },
    {
      key: "5",
      icon: <AiOutlineLineChart />,
      label: "Trung tâm phát triển",
      children: [
        { label: "Hiệu quả kinh doanh", url: "/report/business-performance" },
        { label: "Chỉ số sản phẩm", url: "/report/product-sale-traffic" },
        { label: "Chỉ số khuyến mãi", url: "/report/coupon-insight" },
        { label: "Hiệu quả vận hành", url: "/report/seller-performance" },
      ],
      url: null,
    },
    {
      key: "6",
      icon: <TbSpeakerphone />,
      label: "Trung tâm marketing",
      children: [
        {
          label: "Công cụ khuyến mãi",
          url: "/marketing-center/promotion-tool",
        },
      ],
      url: null,
    },
    {
      key: "7",
      icon: <LiaWalletSolid />,
      label: "Quản lý tài chính",
      url: "/fee-structure",
    },
    {
      key: "8",
      icon: <BsHouseHeart />,
      label: "Thiết kế gian hàng",
      children: [
        { label: "Trang trí gian hàng", url: "/booth-design/decorator" },
        { label: "Bộ sưu tập", url: "/booth-design/collection" },
      ],
      url: null,
    },
    {
      key: "9",
      icon: <BsPersonVideo />,
      label: "Thông tin nhà bán",
      url: "/seller",
    },
  ];

  //   const menuItems: MenuItem[] = [
  //     getItem("Trang chủ", "1", <HiOutlineHome />),
  //     getItem("Đơn hàng", "sub1", <RiTodoLine />, [
  //       getItem("Danh sách đơn hàng", "2"),
  //       getItem("Đổi trả bảo hành", "3"),
  //       getItem("Quản lý hóa đơn", "4"),
  //     ]),
  //     getItem("Sản phẩm", "sub2", <LiaBoxSolid />, [
  //       getItem("Danh sách sản phẩm", "5"),
  //       getItem("Tạo sản phẩm", "6"),
  //       getItem("Quản lý đánh giá", "7"),
  //       getItem("Lịch sử thay đổi", "8"),
  //     ]),
  //     getItem("Kho & hàng tồn", "9", <BsShop />),
  //     getItem("Trung tâm phát triển", "sub3", <AiOutlineLineChart />, [
  //       getItem("Hiệu quả kinh doanh", "10"),
  //       getItem(" Chỉ số sản phẩm", "11"),
  //       getItem("Chỉ số khuyến mãi", "12"),
  //       getItem("Hiệu quả vận hành", "13"),
  //     ]),
  //     getItem("Trung tâm marketing", "sub4", <TbSpeakerphone />, [
  //       getItem("Công cụ khuyến mãi", "14"),
  //     ]),
  //     getItem("Quản lý tài chính", "15", <LiaWalletSolid />),
  //     getItem("Thiết kế gian hàng", "sub5", <BsHouseHeart />, [
  //       getItem("Trang trí gian hàng", "16"),
  //       getItem("Bổ sưu tập", "17"),
  //     ]),
  //     getItem("Thông tin nhà bán", "18", <BsPersonVideo />),
  //   ];

  const filteredMenuItems = (
    <div className="ant-layout-sider-children bg-white">
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "75vh", overflowY: "auto", width: "100%" }}
        className="text-xs overflow-auto custom-scrollbar"
      >
        {/* Filter menu items based on search text */}
        {menuItems
          .filter((item) =>
            item.label.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((item) => (
            <React.Fragment key={item.key}>
              {/* Hiển thị mục menu chính */}

              {/* Nếu mục menu có children, hiển thị chúng */}
              {item.children && item.children.length > 0 ? (
                <Menu.SubMenu
                  key={`${item.key}-submenu`}
                  title={item.label}
                  icon={item.icon}
                  className="bg-white"
                >
                  {item.children.map((child, index) => (
                    <Menu.Item
                      key={`${item.key}-${index}`}
                      onClick={() => handleMenuItemClick(child.url)}
                    >
                      {child.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => handleMenuItemClick(item.url)}
                >
                  {item.label}
                </Menu.Item>
              )}
            </React.Fragment>
          ))}
      </Menu>
    </div>
  );

  return (
    <div className="relative z-50">
      <div className="fixed h-full items-center justify-center bg-white shadow-lg">
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={
                collapsed ? <IoMenu className="" /> : <IoMdClose className="" />
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 48,
                height: 48,
              }}
              className="mx-5"
            />
          </Header>
        </Layout>
        <div className="rounded-full">
          {!collapsed && (
            <Input
              size="middle"
              placeholder="Tìm kiếm"
              suffix={<GoSearch />}
              className="rounded-full w-11/12 m-1"
              onChange={handleSearch}
            />
          )}
        </div>

        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="h-full"
        >
          {filteredMenuItems}
        </Sider>
      </div>
    </div>
  );
};

export default Sidebar;
