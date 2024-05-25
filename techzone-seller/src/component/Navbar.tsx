"use client";
import { Badge, Dropdown, Input, MenuProps } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineLogout } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  IoChatbubbleEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import logo from "../../public/asset/logo.png";
import mall_logo from "../../public/asset/mall_logo.png";
import LanguageOption from "./LanguageOption";

const { Search } = Input;

export default function Navbar() {
  const [countItemsCart, setCountItemsCart] = useState(0);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex w-full">
          <Image
            src={mall_logo}
            width={15}
            height={15}
            alt="Logo"
            className="rounded-full w-1/4 m-1"
          />
          <div className="w-3/4 ml-2">
            <p className="font-bold text-sm"> Thảo Lăng</p>
            <p className="text-xs"> langthao200243@gmail.com</p>
          </div>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className="flex space-x-2">
          <RxPerson size={20} />
          <p> Hồ sơ nhà bán</p>
        </div>
      ),
    },

    {
      key: "2",
      label: (
        <div className="flex space-x-2">
          <AiOutlineEdit size={20} />
          <p> Thay đổi mật khẩu</p>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div className="flex space-x-2">
          <IoIosAddCircleOutline size={20} />
          <p> Thêm tài khoản khác</p>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="flex space-x-2">
          <AiOutlineLogout size={20} />
          <p> Đăng xuất</p>
        </div>
      ),
    },
  ];

  const languageOptions = [
    { value: "vi", label: "Vietnamese" },
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "ge", label: "German" },
    { value: "sp", label: "Spanish" },
  ];

  const renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: "right" }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span>
          <GoSearch /> {count}
        </span>
      </div>
    ),
  });
  const options = [
    {
      label: renderTitle("Tìm kiếm phổ biến"),
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: renderTitle("Solutions"),
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: renderTitle("Articles"),
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];
  return (
    <>
      <header className="navbar border-bottom shadow-lg bg-white items-center space-x-8 w-full border-2 z-50">
        <header className="flex items-center h-30 space-x-4 justify-between ">
          <div className="flex items-center space-x-1">
            <div className="mb-0 mx-5">
              <Image src={logo} width={50} height={30} alt="Logo" />
            </div>
            <p className="uppercase font-bold text-md">seller center</p>
          </div>

          <div className="right-0 flex space-x-4 mt-1">
            <div className="right-0 justify-end flex space-x-4">
              <div className="flex items-center justify-center hover:text-sky-600 hover:bg-sky-200 p-1 rounded-lg m-1">
                <IoChatbubbleEllipsesOutline
                  size={40}
                  className=" border rounded-full p-2"
                />
              </div>

              <div className="flex items-center justify-center hover:text-sky-600 hover:bg-sky-200 p-1 rounded-lg m-1">
                <Badge
                  className="site-badge-count-109"
                  count={countItemsCart > 100 ? 109 : 10}
                  style={{ backgroundColor: "#f32c2c" }}
                >
                  <IoNotificationsOutline
                    size={40}
                    className=" border rounded-full p-2 hover:text-sky-600"
                  />
                </Badge>
              </div>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <div className="flex items-center hover:text-sky-600 hover:bg-sky-200 p-1 rounded-xl border m-2">
                  <Image
                    src={mall_logo}
                    width={25}
                    height={25}
                    alt="Logo"
                    className="rounded-full"
                  />
                  <p className="ml-2 truncate text-sm">
                    langthao200243@gmail.com
                  </p>
                  <RiArrowDropDownLine size={20} />
                </div>
              </Dropdown>

              <LanguageOption />
            </div>
          </div>
        </header>
      </header>
    </>
  );
}
