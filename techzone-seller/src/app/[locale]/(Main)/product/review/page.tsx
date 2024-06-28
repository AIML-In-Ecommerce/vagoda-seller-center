"use client";
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
  Select,
  Table,
  Tabs,
  TabsProps,
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
  const [filterResponseStatus, setFilterResponseStatus] = useState<string>("");

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
  const convertDataTable = (data: _ReviewType[]) => {
    const result = data.map((record: _ReviewType, index) => ({
      ...record,
      index: index + 1,
    }));
    return result;
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      width: "5%",
      render: (text: string, record: _ReviewType) => (
        <div className="text-xs">{text}</div>
      ),
    },

    {
      title: "Người đánh giá",
      dataIndex: "user",
      render: (text: string, record: _ReviewType) => (
        <div className="">
          <p
            className="text-xs"
            style={{ display: "flex", alignItems: "center" }}
          >
            {record.user.fullName}
          </p>
        </div>
      ),
      width: "10%",
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      render: (text: string, record: _ReviewType) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="text-xs"
        >
          <img
            src={record.product.images ? record.product.images[0] : ""}
            alt={text}
            style={{ marginRight: "8px", width: "32px", height: "32px" }}
          />
          {record.product.name ? record.product.name : ""}
        </div>
      ),
      width: "20%",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      render: (rating: number, record: _ReviewType) => (
        <div className="flex space-x-2 items-center ">
          {" "}
          <Rate disabled value={rating} className="small-rating" />
          <p className="text-xs">{rating}</p>
        </div>
      ),
      // defaultSortOrder: "descend",
      sorter: (a: _ReviewType, b: _ReviewType) => a.rating - b.rating,
      width: "15%",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      width: "20%",
      render: (text: string, record: _ReviewType) => (
        <div className="text-xs">{text}</div>
      ),
    },
    {
      title: "Số lượt thích",
      dataIndex: "like",
      render: (likes: string[], record: _ReviewType) => (
        <div className="flex space-x-2 text-xs ">
          {" "}
          <p>{likes.length}</p>
        </div>
      ),
      // defaultSortOrder: "descend",
      sorter: (a: _ReviewType, b: _ReviewType) => a.like.length - b.like.length,
      width: "10%",
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: _ReviewType) => {
        return (
          <div className="space-x-2 ">
            <Button type="primary" className="bg-sky-100 text-black text-xs">
              Phản hồi
            </Button>
          </div>
        );
      },
      width: "10%",
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

  const onStatusFilter = (value: string) => {
    setFilterResponseStatus(value);
    const updatedQuery = new URLSearchParams(query);

    if (value.length != 0) {
      updatedQuery.set("status", value);
    } else {
      updatedQuery.delete("status");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

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

      <div className="flex items-center space-x-8">
        <div className="">
          <p className="font-semibold">Tìm kiếm sản phẩm</p>
          <Search
            placeholder={`Nhập tên sản phẩm`}
            style={{
              borderRadius: "5px",
              width: 300,
            }}
            onSearch={onSearch}
            type="primary"
            enterButton
            className="theme-button pt-2"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>

        <div className="">
          <p className="font-semibold">Tìm kiếm người đánh giá</p>
          <Search
            placeholder={`Nhập tên người đánh giá`}
            style={{
              borderRadius: "5px",
              width: 300,
            }}
            onSearch={onSearch}
            type="primary"
            enterButton
            className="theme-button pt-2"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
        {/* <div className="">
          <p className="font-semibold">Danh mục</p>
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
        </div> */}
        <div className="">
          <div className="font-semibold">Kết quả import</div>
          <Select
            onChange={onStatusFilter}
            defaultValue="Tất cả"
            style={{ width: 160 }}
            options={[
              { value: "", label: "Tất cả" },
              { value: "SUCCESS", label: "Đã phản hồi" },
              { value: "FALURE", label: "Chưa phản hồi" },
            ]}
            value={filterResponseStatus}
          />
        </div>
        <Button type="text" className="mt-5 text-sky-400">
          Xóa bộ lọc
        </Button>
      </div>
      {filterOptions.length > 0 && (
        <div className="flex items-center">
          <div className="text-sm mr-4 w-1/10">Đang lọc:</div>
          <div className="flex flex-wrap  items-center">
            {filterOptions.map((item, index) => {
              return (
                <div
                  key={index}
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
          dataSource={convertDataTable(allReviews)}
          locale={{
            emptyText: <Empty description={<span>Trống</span>} />,
          }}
          className=""
        />
      </div>
    </div>
  );
}
