"use client";
import FilterDropdown from "@/component/Product/FilterDropdown";
import { _CategoryType } from "@/model/CategoryType";
import { _ReviewType } from "@/model/ReviewType";
import { CategoryService } from "@/services/Category";
import { ReviewService } from "@/services/Review";

import {
  Breadcrumb,
  Button,
  Divider,
  Empty,
  Input,
  MenuProps,
  Rate,
  Table,
  Tabs,
  TabsProps,
  Tooltip,
} from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { GoStarFill } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";

export interface FilterCriteria {
  key: string;
  value: any;
}

const { Search } = Input;

// const reviews: ReviewType[] = [
//   {
//     id: "1",
//     orderId: "ORD123",
//     productName: "Laptop Dell XPS 15",
//     SKU: "SKU123",
//     imageUrl:
//       "https://images.pexels.com/photos/1266982/pexels-photo-1266982.jpeg?auto=compress&cs=tinysrgb&w=600",
//     rating: 5,
//     content: "Sản phẩm tuyệt vời, vượt xa mong đợi!",
//     status: "Đã trả lời",
//   },
//   {
//     id: "2",
//     orderId: "ORD456",
//     productName: "Máy lạnh Panasonic Inverter 1.5HP ",
//     SKU: "SKU456",
//     imageUrl:
//       "https://images.pexels.com/photos/16592625/pexels-photo-16592625/free-photo-of-air-conditioner-in-a-house.jpeg?auto=compress&cs=tinysrgb&w=600",
//     rating: 4,
//     content: "Sản phẩm tốt, nhưng có thể cải thiện.",
//     status: "Chưa trả lời",
//   },
//   {
//     id: "3",
//     orderId: "ORD789",
//     productName: "Tai nghe Bluetooth Sony WH-1000XM4",
//     SKU: "SKU789",
//     imageUrl:
//       "https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=600",
//     rating: 3,
//     content: "Sản phẩm trung bình, không có gì đặc biệt.",
//     status: "Chưa trả lời",
//   },
//   {
//     id: "4",
//     orderId: "ORD101112",
//     productName: "Máy ảnh Canon EOS R6",
//     SKU: "SKU101112",
//     imageUrl:
//       "https://images.pexels.com/photos/18135362/pexels-photo-18135362/free-photo-of-nikon-camera-hanging-on-gray-background.jpeg?auto=compress&cs=tinysrgb&w=600",
//     rating: 2,
//     content: "Sản phẩm thất vọng, không như mô tả.",
//     status: "Chưa trả lời",
//   },
//   {
//     id: "5",
//     orderId: "ORD131415",
//     productName: "Smartphone Samsung Galaxy S21 Ultra",
//     SKU: "SKU131415",
//     imageUrl:
//       "https://images.pexels.com/photos/17944743/pexels-photo-17944743/free-photo-of-close-up-of-a-man-holding-a-green-samsung-galaxy-s21.jpeg?auto=compress&cs=tinysrgb&w=600",
//     rating: 1,
//     content: "Sản phẩm kinh khủng, không đề nghị.",
//     status: "Đã trả lời",
//   },
// ];

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

export default function ReviewProductPage() {
  const [filterOptions, setFilterOptions] = useState<FilterCriteria[]>([]);

  const [searchValue, setSearchValue] = useState("");
  const query = useSearchParams();
  const [allCategories, setAllCategories] = useState<_CategoryType[]>([]);

  const router = useRouter();

  const [allReviews, setAllReviews] = useState<_ReviewType[]>([]);
  const [filteredReviews, setFilteredReviews] =
    useState<_ReviewType[]>(allReviews);
  const [currentTab, setCurrentTab] = useState("");
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const [tabReviews, setTabReviews] = useState<_ReviewType[]>([]);
  const [totalReview, setTotalReview] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleFilterDropdownChange = (
    value: { id: string; label: string }[],
    key: string
  ) => {
    const updatedFilterOptions = filterOptions.filter(
      (option) => option.key !== key
    );

    const newFilterCriteria: FilterCriteria = {
      key,
      value,
    };

    updatedFilterOptions.push(newFilterCriteria);
    setFilterOptions(updatedFilterOptions);
  };

  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "product",
      render: (text: string, record: _ReviewType) => (
        <div className="">
          <Tooltip placement="topLeft" title="Xem chi tiết sản phẩm">
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
      title: "Người đánh giá",
      dataIndex: "user",
      render: (text: string, record: _ReviewType) => (
        <div className="">
          <p
            className="text-xs text-sky-500 underline"
            style={{ display: "flex", alignItems: "center" }}
          >
            {text}
          </p>
        </div>
      ),
      width: "10%",
    },
    // {
    //   title: "Sản phẩm",
    //   dataIndex: "productName",
    //   render: (text: string, record: _ReviewType) => (
    //     <a style={{ display: "flex", alignItems: "center" }}>
    //       <img
    //         src={record.imageUrl}
    //         alt={text}
    //         style={{ marginRight: "8px", width: "32px", height: "32px" }}
    //       />
    //       {text}
    //     </a>
    //   ),
    //   width: "30%",
    // },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      render: (rating: number, record: _ReviewType) => (
        <div className="flex space-x-2 items-center ">
          {" "}
          <Rate disabled value={rating} className="small-rating" />
          <p>{rating}</p>
        </div>
      ),
      defaultSortOrder: "descend",
      sorter: (a: _ReviewType, b: _ReviewType) => a.rating - b.rating,
      width: "15%",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      width: "20%",
    },
    {
      title: "Số lượt thích",
      dataIndex: "like",
      render: (likes: string[], record: _ReviewType) => (
        <div className="flex space-x-2 ">
          {" "}
          <p>{likes.length}</p>
        </div>
      ),
      defaultSortOrder: "descend",
      sorter: (a: _ReviewType, b: _ReviewType) => a.like.length - b.like.length,
      width: "12%",
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: _ReviewType) => {
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

  const tabItems: TabsProps["items"] = [
    {
      key: "0",
      label: <div className="">Tất cả</div>,
    },
    {
      key: "1",
      label: (
        <div className="flex space-x-1 items-center ">
          <p>1</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex space-x-1 items-center ">
          <p>2</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex space-x-1 items-center ">
          <p>3</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="flex space-x-1 items-center ">
          <p>4</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div className="flex space-x-1 items-center ">
          <p>5</p>
          <GoStarFill className="text-yellow-400" />
        </div>
      ),
    },
  ];

  // const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
  //   const updatedFilterOptions = filterOptions.filter((option) => {
  //     return (
  //       option.key !== "Tên sản phẩm" &&
  //       option.key !== "SKU" &&
  //       option.key !== "Mã sản phẩm"
  //     );
  //   });

  //   const newFilterCriteria: FilterCriteria = {
  //     key: `${searchOption.charAt(0).toUpperCase() + searchOption.slice(1)}`,
  //     value,
  //   };

  //   updatedFilterOptions.push(newFilterCriteria);
  //   setFilterOptions(updatedFilterOptions);
  // };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (value.length != 0) {
      const updatedFilterOptions = filterOptions.filter((option) => {
        return option.key !== "Tên sản phẩm";
      });
      const newFilterCriteria: FilterCriteria = {
        key: `Tên sản phẩm`,
        value,
      };

      const updatedQuery = new URLSearchParams(query);
      updatedQuery.set("keyword", value);

      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${updatedQuery.toString()}`
      );

      updatedFilterOptions.push(newFilterCriteria);
      setFilterOptions(updatedFilterOptions);
      setSearchValue("");
    }
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
  };

  // useEffect(() => {
  //   const filterProducts = () => {
  //     let tempFilteredProducts = [...tabReviews];

  //     filterOptions.forEach((filter) => {
  //       if (filter.key === "Tên sản phẩm") {
  //         tempFilteredProducts = tempFilteredProducts.filter((product) =>
  //           product.name.toLowerCase().includes(filter.value.toLowerCase())
  //         );
  //       } else if (filter.key === "Danh mục") {
  //         tempFilteredProducts = tempFilteredProducts.filter((product) =>
  //           filter.value.some((category: { id: string; label: string }) =>
  //             category.label
  //               .toLowerCase()
  //               .includes(category.label.toLowerCase())
  //           )
  //         );
  //       }
  //     });

  //     //setFilteredProducts((prev) => tempFilteredProducts);
  //   };

  //   filterProducts();
  // }, [filterOptions]);

  // const filters: ProductFilterInput = {
  //   keyword: query.get("keyword") || undefined,
  //   category: query.get("category")
  //     ? decodeURIComponent(query.get("category")!)!.split(",")
  //     : undefined,
  //   status: query.get("status") || undefined,
  //   index: query.get("index") ? Number(query.get("index")) : undefined,
  //   amount: query.get("amount") ? Number(query.get("amount")) : undefined,
  // };

  // useEffect(() => {
  //   setFilter(filters);
  // }, [query]);

  // useEffect(() => {
  //   handleFilterChange();
  // }, []);

  const loadFilteredReviews = async () => {
    const response: _ReviewType[] = await ReviewService.getAllReview();
    setAllReviews(response);
    setTabReviews(response);
    setFilteredReviews(response);
  };

  useEffect(() => {
    loadFilteredReviews();
  }, []);

  useEffect(() => {
    const loadAllCategories = async () => {
      const data: _CategoryType[] = await CategoryService.getAllCategories();
      setAllCategories(data);
    };

    loadAllCategories();
  }, []);

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

      <Tabs type="card" items={tabItems}></Tabs>
      <div className="flex items-center">
        <Search
          placeholder={`Nhập tên sản phẩm`}
          style={{
            borderRadius: "5px",
            width: 800,
          }}
          onSearch={onSearch}
          type="primary"
          enterButton
          className="theme-button "
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />

        <FilterDropdown
          initialSelectedOptions={
            filterOptions.find((item) => item.key === "Danh mục")?.value || []
          }
          name={"Danh mục"}
          options={allCategories.map((c) => {
            return { id: c._id, label: c.name };
          })}
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
        <p className="font-semibold text-lg m-4">
          Sản phẩm: {allReviews.length}
        </p>
      </div>
      <div>
        <Table
          bordered
          columns={columns}
          dataSource={allReviews}
          locale={{
            emptyText: <Empty description={<span>Trống</span>} />, // Hiển thị Empty nếu không có dữ liệu
          }}
          className=""
        />
      </div>
    </div>
  );
}
