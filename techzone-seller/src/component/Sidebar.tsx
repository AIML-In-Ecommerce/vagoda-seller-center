"use client";
import { Input, Menu, theme, Tooltip } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { BsHouseHeart, BsPersonVideo, BsShop } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";
import {
  LiaBoxSolid,
  LiaGripLinesVerticalSolid,
  LiaWalletSolid,
} from "react-icons/lia";
import { RiTodoLine } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";

type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  url: string | null;
  items?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  items?: MenuItem[],
  url?: string,
): MenuItem {
  return {
    key,
    icon,
    items,
    label,
    url,
  } as MenuItem;
}

interface SidebarProps {
  noticeCollapsingCallback: any;
}

const Sidebar = ({ noticeCollapsingCallback }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const iconToShow = isHovered ? (
    collapsed ? (
      <FiChevronRight
        fontWeight={"bold"}
        height={96}
        size={22}
        className="text-slate-400 hover:text-black font-bold "
        onClick={() => setCollapsed(!collapsed)}
      />
    ) : (
      <FiChevronLeft
        fontWeight={"bold"}
        height={96}
        size={22}
        className="text-slate-400 hover:text-black font-bold "
        onClick={() => setCollapsed(!collapsed)}
      />
    )
  ) : (
    <LiaGripLinesVerticalSolid />
  );

  const handleMenuItemClick = (url: string | null) => {
    router.push(url ? url : "/");
  };

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
      items: [
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
      items: [
        { label: "Danh sách sản phẩm", url: "/product/list" },
        { label: "Tạo sản phẩm", url: "/product/create" },
        { label: "Quản lý đánh giá", url: "/product/review" },
        { label: "Lịch sử thay đổi", url: "/product/history" },
        {
          label: "Bộ sưu tập hình ảnh",
          url: "/product/image-collection",
        },
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
      items: [
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
      items: [
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
      items: [
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

  const [option, setOption] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/order")) {
      option.push("2");
      setOption(option);
    } else if (pathname.includes("/product")) {
      option.push("3");
      if (pathname.includes("/product/list")) {
        option.push("3-0");
      } else if (pathname.includes("/product/create")) {
        option.push("3-1");
      } else if (pathname.includes("/product/review")) {
        option.push("3-2");
      } else if (pathname.includes("/product/history")) {
        option.push("3-3");
      }
      setOption(option);
    } else if (pathname.includes("/warehouse-management")) {
      setOption(["4"]);
    } else if (pathname.includes("/report")) {
      option.push("5");
      if (pathname.includes("/report/business-performance")) {
        option.push("5-0");
      } else if (pathname.includes("/report/product-sale-traffic")) {
        option.push("5-1");
      } else if (pathname.includes("/report/coupon-insight")) {
        option.push("5-2");
      } else if (pathname.includes("/report/seller-performance")) {
        option.push("5-3");
      }
      setOption(option);
    } else if (pathname.includes("/marketing-center/promotion-tool")) {
      setOption(["6", "6-0"]);
    } else if (pathname.includes("/fee-structure")) {
      setOption(["7"]);
    } else if (pathname.includes("/booth-design")) {
      option.push("8");
      if (pathname.includes("/booth-design/decorator")) {
        option.push("8-0");
      } else if (pathname.includes("/booth-design/collection")) {
        option.push("8-1");
      }
      setOption(option);
    } else if (pathname.includes("/seller")) {
      setOption(["9"]);
    } else setOption(["1"]);
  }, []);

  const filteredMenuItems = (
    <div className="ant-layout-sider-items bg-white">
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={option}
        style={{ height: "auto", overflowY: "auto", width: "100%" }}
        className="text-xs overflow-auto custom-scrollbar h-screen"
      >
        {menuItems
          .filter((item) =>
            item.label.toLowerCase().includes(searchText.toLowerCase()),
          )
          .map((item) => (
            <React.Fragment key={item.key}>
              {item.items && item.items.length > 0 ? (
                <Menu.SubMenu
                  key={`${item.key}-submenu`}
                  title={item.label}
                  icon={item.icon}
                  className="bg-white"
                >
                  {item.items.map((child, index) => (
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
      <div className=" sm:w-0 relative z-50 h-full">
        <div className="flex">
          <div className="flex fixed h-full justify-center">
            <div className="bg-white pt-4"></div>
            <div>
              <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="h-full bg-white"
              >
                <div className="rounded-full bg-white">
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
                {filteredMenuItems}
              </Sider>
            </div>
            <div className="flex items-center  p-0 m-0 pb-24">
              <Tooltip
                placement="left"
                title={collapsed ? "Mở sidebar" : "Đóng sidebar"}
              >
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="text-slate-400 hover:text-black font-bold cursor-pointer"
                >
                  {iconToShow}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
