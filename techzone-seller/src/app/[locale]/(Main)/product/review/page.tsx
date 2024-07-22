"use client";
import { ReviewInputType } from "@/apis/ReviewAPI";
import ReviewInfoDrawer from "@/component/review/ReviewInfoDrawer";
import { AuthContext } from "@/context/AuthContext";
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
  Tag,
} from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
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
  const query = useSearchParams();
  const authContext = useContext(AuthContext);

  const [allCategories, setAllCategories] = useState<_CategoryType[]>([]);
  const [allReviews, setAllReviews] = useState<_ReviewType[]>([]);
  const [totalReview, setTotalReview] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedReview, setSelectedReview] = useState<_ReviewType | null>(
    null
  );
  const [openReviewModal, setOpenReviewDetail] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [filteredResponseStatus, setFilteredResponseStatus] =
    useState<string>("");
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  const [filteredRating, setFilteredRating] = useState<string>("0");

  const onClose = () => {
    setOpenReviewDetail(false);
  };

  const showDrawer = (review: _ReviewType) => {
    setSelectedReview(review);
    setOpenReviewDetail(true);
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
      title: "Trạng thái",
      dataIndex: "isResponse",
      render: (isResponse: boolean, record: _ReviewType) => (
        <div className="flex space-x-2 text-xs ">
          {isResponse ? (
            <Tag color="success">Đã phản hồi</Tag>
          ) : (
            <Tag color="warning">Chưa phản hồi</Tag>
          )}
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
            <Button
              type="primary"
              className="bg-sky-100 text-black text-xs"
              onClick={() => showDrawer(record)}
            >
              Phản hồi
            </Button>
          </div>
        );
      },
      width: "10%",
    },
  ];

  const fetchRecords = (page: number, pageSize: number) => {
    const updatedQuery = new URLSearchParams(query);
    updatedQuery.set("index", page.toString());
    updatedQuery.set("amount", pageSize.toString());

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const categoryOptions = () => {
    const options: { value: string; label: string }[] = [
      { value: "", label: "Tất cả" },
    ];

    allCategories.forEach((category) =>
      options.push({ value: category._id, label: category.name })
    );

    return options;
  };

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

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (value.length != 0) {
      const updatedQuery = new URLSearchParams(query);
      updatedQuery.set("product", value);

      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${updatedQuery.toString()}`
      );
    }
  };

  const onStatusFilter = (value: string) => {
    setFilteredResponseStatus(value);
    const updatedQuery = new URLSearchParams(query);

    if (value.length != 0) {
      updatedQuery.set("isResponse", value == "Đã phản hồi" ? "true" : "false");
    } else {
      updatedQuery.delete("isResponse");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const onCategoryFilter = (value: string) => {
    const updatedQuery = new URLSearchParams(query);

    if (value.length != 0) {
      updatedQuery.set("category", value);
    } else {
      const categoryName = allCategories.filter((c) => c._id === value)[0].name;
      setFilteredCategory(categoryName);
      updatedQuery.delete("category");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const loadFilteredReviews = async () => {
    if (!authContext.shopInfo) {
      return;
    }
    const filteredInput: ReviewInputType = {
      shop: authContext.shopInfo._id,
      category: query.get("category") || undefined,
      product: query.get("product") || undefined,
      isResponse: query.get("isResponse")
        ? query.get("isResponse") === "true"
        : undefined,
      rating: query.get("rating") ? Number(query.get("rating")) : undefined,
      index: query.get("index") ? Number(query.get("index")) : 1,
      amount: query.get("amount") ? Number(query.get("amount")) : 20,
    };

    const response: _ReviewType[] = await ReviewService.getAllReview(
      filteredInput
    );
    setAllReviews(response);
  };
  const clearFilter = () => {
    setFilteredCategory("");
    setSearchValue("");
    setFilteredResponseStatus("");
    setFilteredRating("0");

    window.history.pushState({}, "", `${window.location.pathname}`);
  };

  const updateFilter = () => {
    setFilteredCategory(query.get("category") ?? "");
    setSearchValue(query.get("product") ?? "");

    const isResponse = query.get("isResponse");
    setFilteredResponseStatus(
      isResponse === "true"
        ? "Đã phản hồi"
        : isResponse === "false"
        ? "Chưa phản hồi"
        : ""
    );

    setFilteredRating(query.get("rating") ?? "0");
  };

  const handleChangeTab = (activekey: string) => {
    setFilteredRating(activekey);
    const updatedQuery = new URLSearchParams(query);

    if (activekey != "0") {
      updatedQuery.set("rating", activekey);
    } else {
      updatedQuery.delete("rating");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  useEffect(() => {
    updateFilter();
    console.log(
      "FILTERRR",
      query.get("category"),
      query.get("product"),
      query.get("rating"),
      query.get("isResponse"),
      filteredCategory,
      filteredRating,
      filteredResponseStatus,
      searchValue
    );
    loadFilteredReviews();
  }, []);

  useEffect(() => {
    const loadAllCategories = async () => {
      const data: _CategoryType[] = await CategoryService.getAllCategories();
      setAllCategories(data);
    };

    loadAllCategories();
  }, []);

  useEffect(() => {
    loadFilteredReviews();
  }, [query]);

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

      <Tabs
        activeKey={filteredRating}
        type="card"
        items={tabItems}
        onChange={handleChangeTab}
      ></Tabs>

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
          <div className="font-semibold pb-2">Danh mục</div>
          <Select
            onChange={onCategoryFilter}
            // defaultValue="Tất cả"
            style={{ width: 160 }}
            options={categoryOptions()}
            value={filteredCategory}
          />
        </div>

        <div className="">
          <div className="font-semibold pb-2">Trạng thái phản hồi</div>
          <Select
            onChange={onStatusFilter}
            defaultValue="Tất cả"
            style={{ width: 160 }}
            options={[
              { value: "", label: "Tất cả" },
              { value: "Đã phản hồi", label: "Đã phản hồi" },
              { value: "Chưa phản hồi", label: "Chưa phản hồi" },
            ]}
            value={filteredResponseStatus}
          />
        </div>
        <Button type="text" className="mt-5 text-sky-400" onClick={clearFilter}>
          Xóa bộ lọc
        </Button>
      </div>
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
          pagination={{
            defaultPageSize: 20,
            pageSizeOptions: ["20", "10", "5"],

            showSizeChanger: true,
            total: totalReview,
            onChange: (page, pageSize) => {
              fetchRecords(page, pageSize);
            },
          }}
          className=""
        />
      </div>
      {selectedReview && (
        <ReviewInfoDrawer
          review={selectedReview._id}
          onClose={onClose}
          open={openReviewModal}
          reloadReview={loadFilteredReviews}
        />
      )}
    </div>
  );
}
