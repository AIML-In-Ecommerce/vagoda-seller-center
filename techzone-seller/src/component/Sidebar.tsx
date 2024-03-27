"use client";
import { Button, Input, Layout, Menu, MenuProps, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { BsHouseHeart, BsPersonVideo, BsShop } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { LiaBoxSolid, LiaWalletSolid } from "react-icons/lia";
import { RiTodoLine } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setSearchVisible(false); // Ẩn thanh tìm kiếm khi thu gọn Sidebar
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "1", icon: <HiOutlineHome />, label: "Trang chủ" },
    {
      key: "2",
      icon: <RiTodoLine />,
      label: "Đơn hàng",
      children: ["Danh sách đơn hàng", "Đổi trả bảo hành", "Quản lý hóa đơn"],
    },
    {
      key: "3",
      icon: <LiaBoxSolid />,
      label: "Sản phẩm",
      children: [
        "Danh sách sản phẩm",
        "Tạo sản phẩm",
        "Quản lý đánh giá",
        "Lịch sử thay đổi",
      ],
    },
    {
      key: "4",
      icon: <BsShop />,
      label: "Kho & hàng tồn",
    },
    {
      key: "5",
      icon: <AiOutlineLineChart />,
      label: "Trung tâm phát triển",
      children: [
        "Hiệu quả kinh doanh",
        "Chỉ số sản phẩm",
        "Chỉ số khuyến mãi",
        "Hiệu quả vận hành",
      ],
    },
    {
      key: "6",
      icon: <TbSpeakerphone />,
      label: "Trung tâm marketing",
      children: ["Công cụ khuyến mãi"],
    },
    { key: "7", icon: <LiaWalletSolid />, label: "Quản lý tài chính" },
    {
      key: "8",
      icon: <BsHouseHeart />,
      label: "Thiết kế gian hàng",
      children: ["Trang trí gian hàng", "Bổ sưu tập"],
    },
    { key: "9", icon: <BsPersonVideo />, label: "Thông tin nhà bán" },
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
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ height: "75vh", overflowY: "auto" }}
      className=" text-xs overflow-auto custom-scrollbar"
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
              >
                {item.children.map((child, index) => (
                  <Menu.Item key={`${item.key}-${index}`}>{child}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )}
          </React.Fragment>
        ))}
    </Menu>
  );

  return (
    <div className="relative">
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
