"use client";
import { Input, Menu, MenuProps, theme, Tooltip } from "antd";
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

// type MenuItem = Required<MenuProps>['items'][number];

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
  items?: MenuItem[],
  url?: string
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

  const menuItems: MenuItem[] = [
    { key: "1", icon: <HiOutlineHome />, label: "Trang chủ", url: "/" },
    {
      key: "2",
      icon: <RiTodoLine />,
      label: "Đơn hàng",
      children: [
        { key: "2-1", label: "Danh sách đơn hàng", url: "/order" },
        // { key: "2-2", label: "Đổi trả bảo hành", url: "/order/return-order" },
        // { key: "2-3", label: "Quản lý hóa đơn", url: "/order/invoice" },
      ],
      url: null,
    },
    {
      key: "3",
      icon: <LiaBoxSolid />,
      label: "Sản phẩm",
      children: [
        { key: "3-1", label: "Danh sách sản phẩm", url: "/product/list" },
        { key: "3-2", label: "Tạo sản phẩm", url: "/product/create" },
        { key: "3-3", label: "Quản lý đánh giá", url: "/product/review" },
        { key: "3-4", label: "Lịch sử thay đổi", url: "/product/history" },
        {
          key: "3-5",
          label: "Bộ sưu tập hình ảnh",
          url: "/product/image-collection",
        },
      ],
      url: null,
    },
    // {
    //   key: "4",
    //   icon: <BsShop />,
    //   label: "Kho & hàng tồn",
    //   url: "/warehouse-management",
    // },
    {
      key: "5",
      icon: <AiOutlineLineChart />,
      label: "Trung tâm phát triển",
      children: [
        {
          key: "5-1",
          label: "Hiệu quả kinh doanh",
          url: "/report/business-performance",
        },
        {
          key: "5-2",
          label: "Chỉ số sản phẩm",
          url: "/report/product-sale-traffic",
        },
        // {
        //   key: "5-3",
        //   label: "Chỉ số khuyến mãi",
        //   url: "/report/coupon-insight",
        // },
        {
          key: "5-4",
          label: "Hiệu quả vận hành",
          url: "/report/seller-performance",
        },
      ],
      url: null,
    },
    {
      key: "6",
      icon: <TbSpeakerphone />,
      label: "Trung tâm marketing",
      children: [
        {
          key: "6-1",
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
      children: [
        { key: "7-1", label: "Quản lý tài sản", url: "/settlement/my-balance" },
        { key: "7-2", label: "Sao kê", url: "/settlement/statement" },
      ],
      url: null,
    },
    {
      key: "8",
      icon: <BsHouseHeart />,
      label: "Thiết kế gian hàng",
      children: [
        {
          key: "8-1",
          label: "Trang trí gian hàng",
          url: "/booth-design/decorator",
        },
        { key: "8-2", label: "Bộ sưu tập", url: "/booth-design/collection" },
      ],
      url: null,
    },
    // {
    //   key: "9",
    //   icon: <BsPersonVideo />,
    //   label: "Thông tin nhà bán",
    //   url: "/seller",
    // },
  ];

  const getNavigationUrl = (
    key: string,
    menuItems: MenuItem[]
  ): string | null => {
    for (const menuItem of menuItems) {
      // console.log(menuItem.key, key, menuItem.key === key);
      if (menuItem.key === key) {
        return menuItem.url;
      } else if (menuItem.children) {
        const result = getNavigationUrl(key, menuItem.children);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const getKeyFromNavigationUrl = (
    url: string,
    menuItems: MenuItem[]
  ): string[] => {
    if (url === "/") return ["1"];

    for (const menuItem of menuItems) {
      if (menuItem.url && url.includes(menuItem.url)) {
        if (menuItem.url === "/") continue;
        const keyPath = [menuItem.key];
        console.log("push key: ", menuItem.key);

        if (menuItem.children) {
          const childKeyPath = getKeyFromNavigationUrl(url, menuItem.children);
          if (childKeyPath.length > 0) {
            return keyPath.concat(childKeyPath);
          }
        }

        return keyPath;
      } else if (menuItem.children) {
        const result = getKeyFromNavigationUrl(url, menuItem.children);
        if (result.length > 0) {
          return [menuItem.key].concat(result);
        }
      }
    }
    return [];
  };

  const [option, setOption] = useState<string[]>([]);
  const [previousOption, setPreviousOption] = useState<string[]>([]);
  const pathname = usePathname();

  // useEffect(() => {
  //   if (pathname.includes("/order")) {
  //     option.push("2");
  //     setOption(option);
  //   } else if (pathname.includes("/product")) {
  //     option.push("3");
  //     if (pathname.includes("/product/list")) {
  //       option.push("3-0");
  //     } else if (pathname.includes("/product/create")) {
  //       option.push("3-1");
  //     } else if (pathname.includes("/product/review")) {
  //       option.push("3-2");
  //     } else if (pathname.includes("/product/history")) {
  //       option.push("3-3");
  //     }
  //     setOption(option);
  //   } else if (pathname.includes("/warehouse-management")) {
  //     setOption(["4"]);
  //   } else if (pathname.includes("/report")) {
  //     option.push("5");
  //     if (pathname.includes("/report/business-performance")) {
  //       option.push("5-0");
  //     } else if (pathname.includes("/report/product-sale-traffic")) {
  //       option.push("5-1");
  //     } else if (pathname.includes("/report/coupon-insight")) {
  //       option.push("5-2");
  //     } else if (pathname.includes("/report/seller-performance")) {
  //       option.push("5-3");
  //     }
  //     setOption(option);
  //   } else if (pathname.includes("/marketing-center/promotion-tool")) {
  //     setOption(["6", "6-0"]);
  //   } else if (pathname.includes("/fee-structure")) {
  //     setOption(["7"]);
  //   } else if (pathname.includes("/booth-design")) {
  //     option.push("8");
  //     if (pathname.includes("/booth-design/decorator")) {
  //       option.push("8-0");
  //     } else if (pathname.includes("/booth-design/collection")) {
  //       option.push("8-1");
  //     }
  //     setOption(option);
  //   } else if (pathname.includes("/seller")) {
  //     setOption(["9"]);
  //   } else setOption(["1"]);
  // }, []);

  useEffect(() => {
    // console.log('pathname: ', pathname);
    const keyPath = getKeyFromNavigationUrl(pathname, menuItems);
    // console.log('keyPath: ', keyPath);
    setOption(keyPath);
    setPreviousOption(keyPath);
  }, [pathname]);

  const onMenuClick: MenuProps["onClick"] = (e) => {
    const url = getNavigationUrl(e.key.toString(), menuItems);
    console.log(`onClick ${e.key} ${url}`);
    setOption(e.keyPath);
    handleMenuItemClick(url);
  };

  interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
  }

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => !option.includes(key));

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setOption(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      setOption(openKeys);
    }
    // console.log('openKeys', openKeys)
  };

  const filteredMenuItems = (
    <div className="ant-layout-sider-items bg-white">
      {/* <Menu
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
      </Menu> */}
      <Menu
        theme="light"
        mode="inline"
        onClick={onMenuClick}
        selectedKeys={previousOption}
        openKeys={option}
        onOpenChange={onOpenChange}
        style={{ height: "auto", overflowY: "auto", width: "100%" }}
        className="text-xs overflow-auto custom-scrollbar h-screen"
        items={menuItems}
      />
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
