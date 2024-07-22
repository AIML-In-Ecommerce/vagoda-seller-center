"use client";
import { ProductFilterInput } from "@/apis/ProductAPI";
import { OptionType } from "@/component/Product/CreateBatchProduct";
import FilterDropdown from "@/component/Product/FilterDropdown";
import ProductDetail from "@/component/Product/ProductDetail";
import { formatPrice } from "@/component/utils/formatPrice";
import { AuthContext } from "@/context/AuthContext";
import { _CategoryType } from "@/model/CategoryType";
import { _ProductType } from "@/model/ProductType";
import { CategoryService } from "@/services/Category";
import { ProductService } from "@/services/Product";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  Divider,
  Empty,
  Input,
  MenuProps,
  message,
  Popconfirm,
  Table,
  Tabs,
  TabsProps,
  Tooltip,
} from "antd";
import type { SearchProps } from "antd/es/input/Search";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineHome, HiOutlineInformationCircle } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";

export interface FilterCriteria {
  key: string;
  value: any;
}

const { Search } = Input;
export interface ProductType {
  key: string;
  name: string;
  inventory_number: number;
  price: number;
  system_fee: number;
  profit: number;
  avatar_url: string[];
  id: string;
  SKU: string;
  category: string;
  brand: string;
  status: string;
  rating: number;
  description: string;
  otherDescriptions: OptionType[];
}

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: _ProductType[]) => {},
  getCheckboxProps: (record: _ProductType) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};

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

export default function ProductListPage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [filterOptions, setFilterOptions] = useState<FilterCriteria[]>([]);

  const [filter, setFilter] = useState<ProductFilterInput>({});
  const [allProducts, setAllProducts] = useState<_ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] =
    useState<_ProductType[]>(allProducts);
  const [currentTab, setCurrentTab] = useState("");
  const [openProductDetail, setOpenProductDetail] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<_ProductType | null>(
    null
  );
  const [tabProducts, setTabProducts] = useState<_ProductType[]>([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allCategories, setAllCategories] = useState<_CategoryType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<_ProductType[]>([]);

  const query = useSearchParams();

  const showDrawer = (product: _ProductType) => {
    setSelectedProduct(product);
    setOpenProductDetail(true);
  };

  const onClose = () => {
    setOpenProductDetail(false);
  };

  const deleteProduct = async (product_id: string) => {
    const response: { status: number; message: string } =
      await ProductService.deleteProductById(product_id);

    if (response.status == 200) {
      message.success("Xóa sản phẩm thành công");
    } else {
      message.error("Không thể xóa sản phẩm");
    }
    await loadFilteredProducts();
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "",
      label: <span style={{ fontWeight: "620" }}>Tất cả </span>,
      children: (
        <Alert
          className="text-xs"
          message={
            <>
              <strong>Tất cả:</strong> Mục này chứa các sản phẩm đã được duyệt
              để bán hàng, không bao gồm sản phẩm ở trạng thái Nháp và Khóa vĩnh
              viễn.
            </>
          }
          type="info"
          showIcon
        />
      ),
    },
    {
      key: "AVAILABLE",
      label: <span style={{ fontWeight: "620" }}>Đang bán</span>,
      children: (
        <Alert
          className="text-xs"
          message={
            <>
              <strong>Đang bán:</strong> Mục này chứa các sản phẩm có thể bán.
              Bao gồm sản phẩm đang hiển thị và bị hạn chế hiển thị trong kết
              quả tìm kiếm.
            </>
          }
          type="info"
          showIcon
        />
      ),
    },
    {
      key: "SOLD_OUT",
      label: <span style={{ fontWeight: "620" }}>Hết hàng</span>,
      children: (
        <Alert
          className="text-xs"
          message={
            <>
              <strong>Hết hàng:</strong> Mục này chứa các sản phẩm có lựa chọn
              đã hết hàng hoặc hết hàng toàn bộ. Cập nhật giá trị ở cột Tồn có
              thể bán &gt; 0 để bán lại.
            </>
          }
          type="info"
          showIcon
        />
      ),
    },
    {
      key: "DRAFT",
      label: <span style={{ fontWeight: "620" }}>Nháp</span>,
      children: (
        <Alert
          className="text-xs"
          message={
            <>
              <strong>Nháp:</strong> Mục này chứa các sản phẩm đang lưu nháp
              hoặc được tạo bằng tính năng Tạo mới / Sao chép hàng loạt nhưng
              chưa đính kèm tài liệu yêu cầu.
            </>
          }
          type="info"
          showIcon
        />
      ),
    },
    {
      key: "SALE",
      label: <span style={{ fontWeight: "620" }}>Khuyến mãi</span>,
      children: (
        <Alert
          className="text-xs"
          message={
            <>
              <strong>Khuyến mãi:</strong> Mục này chứa các sản phẩm mà Nhà bán
              đang bán giảm giá.
            </>
          }
          type="info"
          showIcon
        />
      ),
    },
    {
      key: "DISABLED",
      label: <span style={{ fontWeight: "620" }}>Đã tắt</span>,
      children: (
        <Alert
          className="text-xs"
          message={
            <>
              <strong>Đã tắt:</strong> Mục này chứa các sản phẩm mà Nhà bán đã
              tắt toàn bộ lựa chọn Khách hàng không thể xem và đặt hàng.
            </>
          }
          type="info"
          showIcon
        />
      ),
    },
  ];

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
      title: "Sản phẩm",
      dataIndex: "name",
      render: (text: string, record: _ProductType) => (
        <a
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => showDrawer(record)}
        >
          <img
            src={record.images ? record.images[0] : ""}
            alt={text}
            style={{ marginRight: "8px", width: "32px", height: "32px" }}
          />
          {text ? text : ""}
        </a>
      ),
      width: "30%",
    },
    {
      title: () => (
        <div className="flex space-x-1 items-center">
          <p>Tồn có thể bán</p>
          <Tooltip
            className="flex space-x-1 items-center"
            title={
              <div className="tooltip-content">
                <p className="mb-4">
                  Mô hình FBT: Tồn có thể bán = Tổng tồn kho Tiki hiện tại -
                  Tổng số lượng đã đặt hàng, đang xử lý.
                </p>
                <p>
                  Mô hình khác FBT: Tồn có thể bán = Tổng tồn kho Nhà bán hiện
                  tại - Tổng số lượng đã đặt hàng, đang xử lý.
                </p>
              </div>
            }
            overlayClassName="tooltip-overlay"
          >
            <HiOutlineInformationCircle />
          </Tooltip>
        </div>
      ),
      dataIndex: "inventoryAmount",
      defaultSortOrder: "descend" as const,
      sorter: (a: _ProductType, b: _ProductType) =>
        a.inventoryAmount - b.inventoryAmount,
      width: "14%",
    },
    {
      title: "Giá bán",
      dataIndex: "finalPrice",
      render: (text: number) => formatPrice(text),
      sorter: (a: _ProductType, b: _ProductType) => a.finalPrice - b.finalPrice,
      width: "10%",
    },
    {
      title: () => (
        <div className="flex space-x-1 items-center">
          <p>Phí Techzone thu</p>
          <Tooltip
            title={
              <div className="tooltip-content">
                <p className="mb-4">
                  Các khoản phí Nhà bán sẽ bị trừ trên từng sản phẩm được bán ra
                </p>
              </div>
            }
            overlayClassName="tooltip-overlay"
          >
            <HiOutlineInformationCircle />
          </Tooltip>
        </div>
      ),
      dataIndex: "platformFee",
      render: (text: number) => formatPrice(text),
      sorter: (a: _ProductType, b: _ProductType) =>
        a.platformFee - b.platformFee,
      width: "16%",
    },
    {
      title: () => (
        <div className="flex space-x-1 items-center">
          <p>Lợi nhuận</p>
          <Tooltip
            title={
              <div className="tooltip-content">
                <p className="mb-4">
                  Số tiền (tạm tính) Nhà bán thu được trên từng sản phẩm bán ra
                  sau khi trừ các phí:
                </p>
                <p className="text-green-500">
                  · Số dương: Techzone sẽ trả cho Nhà bán
                </p>
                <p className="text-amber-400">
                  · Số âm: Nhà bán phải trả cho Techzone
                </p>
              </div>
            }
            overlayClassName="tooltip-overlay"
          >
            <HiOutlineInformationCircle />
          </Tooltip>
        </div>
      ),
      dataIndex: "profit",
      sorter: (a: _ProductType, b: _ProductType) => a.profit - b.profit,
      width: "12%",
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: _ProductType) => {
        return (
          <div className="xl:space-x-1 space-x-2">
            <Button
              type="primary"
              className="bg-sky-100 text-black"
              // onClick={() => showDrawer(record)}
            >
              <Link href={`list/update/${record._id}`}>
                <BiEditAlt />
              </Link>
            </Button>
            <Popconfirm
              title="Bạn chắc chắn muốn xóa sản phẩm này không ?"
              description="Sản phẩm sẽ bị xóa hoàn toàn và không thể hồi phục lại được."
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => deleteProduct(record._id)}
            >
              <Button type="primary" danger>
                <RiDeleteBinLine />
              </Button>
            </Popconfirm>
          </div>
        );
      },
      width: "14%",
    },
  ];

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
    router.push(`/product/list`);
    setFilterOptions((prevFilterCriterias) => []);
    setCurrentTab("");
  };

  const updateURL = (key: string, value: any) => {
    const updatedQuery = new URLSearchParams(query.toString());
    if (key == "Danh mục") {
      const categoryValues = query.get("category")
        ? decodeURIComponent(query.get("category")!)!.split(",")
        : undefined;
      if (categoryValues) {
        const updatedCategoryValues = categoryValues.filter(
          (item) => item != value.id
        );
        if (updatedCategoryValues.length > 0) {
          updatedQuery.set(
            "category",
            encodeURIComponent(updatedCategoryValues.join(","))
          );
        } else {
          updatedQuery.delete("category");
        }
      }
    } else {
      updatedQuery.delete("keyword");
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const removeFilterCriteria = (key: string, value: any) => {
    let updatedFilterCriterias: FilterCriteria[] = [...filterOptions];

    const index = updatedFilterCriterias.findIndex(
      (criteria) => criteria.key === key
    );

    if (index !== -1) {
      const valueFilterCriterias = updatedFilterCriterias[index].value;

      if (Array.isArray(valueFilterCriterias)) {
        updatedFilterCriterias[index].value = valueFilterCriterias.filter(
          (criteriaValue: { id: string; label: string }) =>
            criteriaValue.id !== value.id
        );

        if (updatedFilterCriterias[index].value.length === 0) {
          updatedFilterCriterias.splice(index, 1);
        }
      } else {
        if (valueFilterCriterias.toLowerCase() === value.toLowerCase()) {
          updatedFilterCriterias.splice(index, 1);
        }
      }

      setFilterOptions((prevFilterCriterias) => updatedFilterCriterias);
      updateURL(key, value);
    }
  };

  const loadFilteredProducts = async () => {
    if (!authContext.shopInfo) {
      return;
    }

    const response: {
      total: number;
      totalPages: number;
      products: _ProductType[];
    } = await ProductService.getProductByFilter(
      filter,
      authContext.shopInfo._id ?? ""
    );
    setAllProducts(response.products);
    setTotalProduct(response.total);
    setTotalPages(response.totalPages);
    setTabProducts(response.products);
    setFilteredProducts(response.products);
  };

  // const handleFilterChange = async () => {
  //   const updatedFilterCriterias: FilterCriteria[] = [];

  //   const categoryPromises: Promise<{
  //     id: string;
  //     name: string;
  //   }>[] = [];

  //   if (filters.category) {
  //     filters.category.forEach((id) => {
  //       categoryPromises.push(
  //         CategoryService.getCategoryById(id).then((categoryInfo) => ({
  //           id,
  //           name: categoryInfo.name,
  //         }))
  //       );
  //     });
  //   }

  //   const categories = await Promise.all(categoryPromises);

  //   if (categories.length > 0) {
  //     updatedFilterCriterias.push({
  //       key: "Danh mục",
  //       value: categories,
  //     });
  //   }

  //   if (filters.status) {
  //     setCurrentTab(filters.status);
  //   }

  //   if (filters.keyword) {
  //     updatedFilterCriterias.push({
  //       key: "Tên sản phẩm",
  //       value: filters.keyword,
  //     });
  //   }

  //   setFilterOptions(updatedFilterCriterias);
  // };

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

  const handleTabChange = async (activeKey: string) => {
    setCurrentTab(activeKey);
    const updatedQuery = new URLSearchParams(query);
    if (activeKey == "") {
      updatedQuery.delete("status");
    } else {
      updatedQuery.set("status", activeKey);
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const filters: ProductFilterInput = {
    keyword: query.get("keyword") || undefined,
    category: query.get("category")
      ? decodeURIComponent(query.get("category")!)!.split(",")
      : undefined,
    status: query.get("status") || undefined,
    index: query.get("index") ? Number(query.get("index")) : undefined,
    amount: query.get("amount") ? Number(query.get("amount")) : undefined,
  };

  useEffect(() => {
    setFilter(filters);
  }, [query]);

  useEffect(() => {
    loadFilteredProducts();
  }, [filter]);

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
            title: "Danh sách sản phẩm",
          },
        ]}
      />
      <p className="uppercase text-xl font-semibold">Danh sách sản phẩm</p>
      <div className="flex flex-row-reverse ">
        <Button
          onClick={() => router.push("/product/create")}
          type="primary"
          className="bg-sky-500 rounded-lg "
        >
          + Tạo sản phẩm
        </Button>
      </div>
      <Tabs
        type="card"
        activeKey={currentTab}
        onChange={(activeKey) => handleTabChange(activeKey)}
        items={tabItems}
      ></Tabs>
      <div className="flex items-center space-x-6 mt-4">
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
          <div className="flex flex-wrap items-center">
            {filterOptions.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-wrap items-center  text-xs max-w-4/5 "
                >
                  {Array.isArray(item.value) ? (
                    item.value.map(
                      (value: { id: string; label: string }, idx: number) => (
                        <div
                          key={value.id}
                          className=" flex  rounded-2xl p-2 space-x-2 items-center bg-sky-200  mx-2 my-1 "
                        >
                          <p>
                            {item.key}: {value.label}
                          </p>
                          <div
                            className=""
                            onClick={() =>
                              removeFilterCriteria(item.key, value)
                            }
                          >
                            <CiCircleRemove size={15} />
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div
                      key={index}
                      className="flex flex-wrap  rounded-2xl p-2 space-x-2 items-center  bg-sky-200 mx-2  my-1"
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
        <p className="font-semibold text-lg m-4">Sản phẩm: {totalProduct}</p>
      </div>
      <div>
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                () => showDrawer(record);
              },
            };
          }}
          pagination={{
            defaultPageSize: 20,
            pageSizeOptions: ["20", "10", "5"],

            showSizeChanger: true,
            total: totalProduct,
            onChange: (page, pageSize) => {
              fetchRecords(page, pageSize);
            },
          }}
          bordered
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={filteredProducts}
          locale={{
            emptyText: <Empty description={<span>Trống</span>} />,
          }}
          className=""
        />
      </div>
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={onClose}
          open={openProductDetail}
        />
      )}
    </div>
  );
}
