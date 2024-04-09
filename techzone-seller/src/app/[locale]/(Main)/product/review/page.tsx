"use client";
import FilterDropdown from "@/component/Product/FilterDropdown";
import { ReviewType } from "@/model/ReviewType";

import {
  Breadcrumb,
  Button,
  Divider,
  Empty,
  Input,
  MenuProps,
  Rate,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { GoStarFill } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";

export interface FilterCriteria {
  key: string;
  value: any;
}

const { Search } = Input;

const reviews: ReviewType[] = [
  {
    id: "1",
    orderId: "ORD123",
    productName: "Laptop Dell XPS 15",
    SKU: "SKU123",
    imageUrl:
      "https://images.pexels.com/photos/1266982/pexels-photo-1266982.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    content: "Sản phẩm tuyệt vời, vượt xa mong đợi!",
    status: "Đã trả lời",
  },
  {
    id: "2",
    orderId: "ORD456",
    productName: "Máy lạnh Panasonic Inverter 1.5HP ",
    SKU: "SKU456",
    imageUrl:
      "https://images.pexels.com/photos/16592625/pexels-photo-16592625/free-photo-of-air-conditioner-in-a-house.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
    content: "Sản phẩm tốt, nhưng có thể cải thiện.",
    status: "Chưa trả lời",
  },
  {
    id: "3",
    orderId: "ORD789",
    productName: "Tai nghe Bluetooth Sony WH-1000XM4",
    SKU: "SKU789",
    imageUrl:
      "https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 3,
    content: "Sản phẩm trung bình, không có gì đặc biệt.",
    status: "Chưa trả lời",
  },
  {
    id: "4",
    orderId: "ORD101112",
    productName: "Máy ảnh Canon EOS R6",
    SKU: "SKU101112",
    imageUrl:
      "https://images.pexels.com/photos/18135362/pexels-photo-18135362/free-photo-of-nikon-camera-hanging-on-gray-background.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 2,
    content: "Sản phẩm thất vọng, không như mô tả.",
    status: "Chưa trả lời",
  },
  {
    id: "5",
    orderId: "ORD131415",
    productName: "Smartphone Samsung Galaxy S21 Ultra",
    SKU: "SKU131415",
    imageUrl:
      "https://images.pexels.com/photos/17944743/pexels-photo-17944743/free-photo-of-close-up-of-a-man-holding-a-green-samsung-galaxy-s21.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 1,
    content: "Sản phẩm kinh khủng, không đề nghị.",
    status: "Đã trả lời",
  },
];

const exportOptions: MenuProps["items"] = [
  {
    key: "0",
    label: "CSV",
  },
  {
    key: "1",
    label: "Excel",
  },
];

const options: FilterCriteria[] = [{ key: "Tên sản phẩm", value: "Máy tính" }];

export default function ReviewProductPage() {
  const router = useRouter();
  const { Option } = Select;
  const [searchOption, setSearchOption] = useState("Tên sản phẩm");
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterCriteria[]>(options);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleFilterDropdownChange = (value: string[], key: string) => {
    const updatedFilterOptions = filterOptions.filter((option) => {
      return option.key !== key;
    });

    const newFilterCriteria: FilterCriteria = {
      key,
      value,
    };

    updatedFilterOptions.push(newFilterCriteria);
    setFilterOptions(updatedFilterOptions);

    console.log("Filter", filterOptions);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      render: (text: string, record: ReviewType) => (
        <div className="">
          <Tooltip placement="topLeft" title="Xem chi tiết đơn hàng">
            <a
              className="text-xs text-sky-500 underline"
              style={{ display: "flex", alignItems: "center" }}
            >
              {text}
            </a>
          </Tooltip>
        </div>
      ),
      width: "10%",
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      render: (text: string, record: ReviewType) => (
        <a style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.imageUrl}
            alt={text}
            style={{ marginRight: "8px", width: "32px", height: "32px" }}
          />
          {text}
        </a>
      ),
      width: "30%",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      render: (rating: number, record: ReviewType) => (
        <div className="flex space-x-2 ">
          {" "}
          <Rate disabled value={rating} className="small-rating" />
          <p>{rating}</p>
        </div>
      ),
      defaultSortOrder: "descend",
      sorter: (a: ReviewType, b: ReviewType) => a.rating - b.rating,
      width: "12%",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: ReviewType) => {
        return (
          <div className="space-x-2">
            <Button type="primary" className="bg-sky-100 text-black">
              Xem chi tiết
            </Button>
          </div>
        );
      },
    },
  ];

  const tabItems = [
    {
      label: <div className="">Tất cả</div>,
      number: 0,
    },
    {
      label: (
        <div className="flex space-x-1 items-center ">
          <p>1</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
      number: 0,
    },
    {
      label: (
        <div className="flex space-x-1 items-center ">
          <p>2</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
      number: 0,
    },
    {
      label: (
        <div className="flex space-x-1 items-center ">
          <p>3</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
      number: 0,
    },
    {
      label: (
        <div className="flex space-x-1 items-center ">
          <p>4</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),

      number: 0,
    },
    {
      label: (
        <div className="flex space-x-1 items-center ">
          <p>5</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
      number: 0,
    },
  ];
  const handleChangeSearchOption = (value: string) => {
    setSearchOption(value);
  };
  const handleCategorySearch = (e: any) => {
    setCategorySearch(e.target.value);
  };
  const handleBrandSearch = (e: any) => {
    setBrandSearch(e.target.value);
  };

  const categories = [
    "Laptop",
    "PC- Máy tính bộ",
    "Điện máy - Điện gia dụng",
    "Điện thoại & Phụ kiện",
    "Màn hình máy tính",
    "Linh kiện máy tính",
    "Phụ kiện máy tính",
    "Game & Stream",

    "Phụ kiện",
    "Thiết bị âm thanh",
    "Thiết bị văn phòng",
    "Khác",
  ];
  const brands = [
    "Apple (Macbook)",
    "Acer",
    "ASUS",
    "Dell",
    "HP",
    "Lenovo",
    "LG",
    "MSI",
    "Gigabyte",
    "Microsoft",
    "Sharp",
    "Samsung",
    "Panasonic",
    "Toshiba",
    "AQUA",
    "Casper",
    "AOC",
    "Viewsonic",
    "Philips",
    "VSP",
  ];

  const selectBefore = (
    <Select
      defaultValue="Tên sản phẩm"
      style={{ width: 130 }}
      onChange={handleChangeSearchOption}
      className=""
    >
      <Option value="tên sản phẩm">Tên sản phẩm</Option>
      <Option value="mã sản phẩm">Mã sản phẩm</Option>
      <Option value="SKU">SKU</Option>
    </Select>
  );
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    const updatedFilterOptions = filterOptions.filter((option) => {
      return (
        option.key !== "Tên sản phẩm" &&
        option.key !== "SKU" &&
        option.key !== "Mã sản phẩm"
      );
    });

    const newFilterCriteria: FilterCriteria = {
      key: `${searchOption.charAt(0).toUpperCase() + searchOption.slice(1)}`,
      value,
    };

    updatedFilterOptions.push(newFilterCriteria);
    setFilterOptions(updatedFilterOptions);
  };

  const clearAllFilterCriterias = () => {
    setFilterOptions([]);
  };

  const removeFilterCriteria = (key: string, value: any) => {
    let updatedFilterCriterias: FilterCriteria[] = [...filterOptions];

    updatedFilterCriterias = updatedFilterCriterias.filter(
      (criteria) => criteria.key !== key
    );

    setFilterOptions(updatedFilterCriterias);
    console.log(updatedFilterCriterias);
  };

  return (
    <div className="pt-4 pr-4 space-y-2">
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
            href: "/product/list",
            title: "Sản phẩm",
          },
          {
            href: "/product/review",
            title: "Quản lý đánh giá",
          },
        ]}
      />
      <p className="uppercase text-xl font-semibold">Quản lý đánh giá</p>

      <Tabs type="card">
        {tabItems.map((tab, index) => (
          <Tabs.TabPane
            tab={
              <span style={{ fontWeight: "620" }}>
                {tab.label} ({tab.number})
              </span>
            }
            key={index}
            className="mb-2"
          ></Tabs.TabPane>
        ))}
      </Tabs>
      <div className="flex items-center">
        <Search
          addonBefore={selectBefore}
          placeholder={`Nhập ${searchOption}`}
          style={{
            borderRadius: "5px",
            width: 800,
          }}
          onSearch={onSearch}
          type="primary"
          enterButton
          className="theme-button "
        />

        <FilterDropdown
          name={"Danh mục"}
          options={categories}
          onSelection={handleFilterDropdownChange}
        />
        <FilterDropdown
          name={"Thương hiệu"}
          options={brands}
          onSelection={handleFilterDropdownChange}
        />
      </div>
      {filterOptions.length > 0 && (
        <div className="flex items-center">
          <div className="text-sm mr-4 w-1/10">Đang lọc:</div>
          <div className="flex flex-wrap  items-center">
            {filterOptions.map((item, index) => {
              return (
                <div
                  // key={index}
                  className="flex items-center  text-xs max-w-4/5 "
                >
                  {Array.isArray(item.value) ? (
                    item.value.map((value: string, idx: number) => (
                      <div
                        key={index}
                        className=" flex  rounded-2xl p-2 space-x-2 items-center bg-sky-200  mx-2 my-1 "
                      >
                        <p>
                          {item.key}: {value}
                        </p>
                        <div
                          className=""
                          onClick={() => removeFilterCriteria(item.key, value)}
                        >
                          <CiCircleRemove size={15} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      key={index}
                      className=" flex  rounded-2xl p-2 space-x-2 items-center  bg-sky-200 mx-2  my-1"
                    >
                      <p>
                        {item.key}: {item.value}
                      </p>
                      <div
                        className=""
                        onClick={() =>
                          removeFilterCriteria(item.key, item.value)
                        }
                      >
                        <CiCircleRemove size={15} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Button
            type="link"
            onClick={() => clearAllFilterCriterias()}
            className="w-1/10"
          >
            {" "}
            Xóa tất cả
          </Button>
        </div>
      )}
      <Divider />
      <div className="flex">
        <p className="font-semibold text-lg m-4">Sản phẩm: {reviews.length}</p>
      </div>
      <div>
        <Table
          bordered
          columns={columns}
          dataSource={reviews}
          locale={{
            emptyText: <Empty description={<span>Trống</span>} />, // Hiển thị Empty nếu không có dữ liệu
          }}
          className=""
        />
      </div>
    </div>
  );
}
