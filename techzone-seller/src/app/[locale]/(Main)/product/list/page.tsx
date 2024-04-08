"use client";
import FilterDropdown from "@/component/Product/FilterDropdown";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  Alert,
  Breadcrumb,
  Button,
  Divider,
  Dropdown,
  Empty,
  Input,
  MenuProps,
  Popconfirm,
  Select,
  Table,
  Tabs,
  Tooltip,
} from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { CiCircleRemove } from "react-icons/ci";
import { HiOutlineHome, HiOutlineInformationCircle } from "react-icons/hi2";
import { RiArrowDropDownLine, RiDeleteBinLine } from "react-icons/ri";

export interface FilterCriteria {
  key: string;
  value: any;
}

const { Search } = Input;
interface ProductType {
  key: string;
  name: string;
  inventory_number: number;
  price: number;
  system_fee: number;
  profit: number;
  avatar_url: string;
}

const products: ProductType[] = [
  {
    key: "1",
    name: "Laptop Dell XPS 15",
    inventory_number: 20,
    price: 45000000,
    system_fee: 2000000,
    profit: 43000000,
    avatar_url:
      "https://images.pexels.com/photos/1266982/pexels-photo-1266982.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "2",
    name: "Máy lạnh Panasonic Inverter 1.5HP ",
    inventory_number: 15,
    price: 12000000,
    system_fee: 1000000,
    profit: 11000000,
    avatar_url:
      "https://images.pexels.com/photos/16592625/pexels-photo-16592625/free-photo-of-air-conditioner-in-a-house.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "3",
    name: "Tai nghe Bluetooth Sony WH-1000XM4",
    inventory_number: 30,
    price: 8000000,
    system_fee: 500000,
    profit: 7500000,
    avatar_url:
      "https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "4",
    name: "Máy ảnh Canon EOS R6",
    inventory_number: 10,
    price: 60000000,
    system_fee: 3000000,
    profit: 57000000,
    avatar_url:
      "https://images.pexels.com/photos/18135362/pexels-photo-18135362/free-photo-of-nikon-camera-hanging-on-gray-background.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "5",
    name: "Smartphone Samsung Galaxy S21 Ultra",
    inventory_number: 25,
    price: 30000000,
    system_fee: 1500000,
    profit: 28500000,
    avatar_url:
      "https://images.pexels.com/photos/17944743/pexels-photo-17944743/free-photo-of-close-up-of-a-man-holding-a-green-samsung-galaxy-s21.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "6",
    name: "Quạt điện Mitsubishi Electric 5 cánh",
    inventory_number: 18,
    price: 5000000,
    system_fee: 800000,
    profit: 4500000,
    avatar_url:
      "https://images.pexels.com/photos/3675622/pexels-photo-3675622.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "7",
    name: "Laptop Asus ROG Zephyrus G14",
    inventory_number: 12,
    price: 35000000,
    system_fee: 2000000,
    profit: 33000000,
    avatar_url:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    key: "8",
    name: "Tai nghe AirPods Pro",
    inventory_number: 40,
    price: 6000000,
    system_fee: 1000000,
    profit: 5000000,
    avatar_url:
      "https://media.istockphoto.com/id/1346147559/photo/modern-wireless-bluetooth-headphones-with-charging-case-on-a-blue-background.jpg?b=1&s=612x612&w=0&k=20&c=LzlNQUIRWviMaqDo5gtbkmPUiy_ruH57MrZH7fQsRKc=",
  },
  {
    key: "9",
    name: "TV Sony Bravia OLED 4K 55 inch",
    inventory_number: 8,
    price: 45000000,
    system_fee: 3000000,
    profit: 42000000,
    avatar_url:
      "https://media.istockphoto.com/id/173240143/photo/tv-with-two-clipping-paths.jpg?b=1&s=612x612&w=0&k=20&c=FrmX0is8iAP4R9GTxuLXVRJ3u2WhbAQnOYwIjyRBHU8=",
  },
  {
    key: "10",
    name: "Máy giặt LG Inverter 10kg",
    inventory_number: 22,
    price: 15000000,
    system_fee: 1500000,
    profit: 13500000,
    avatar_url:
      "https://media.istockphoto.com/id/1310076735/photo/laundry-room-with-a-washing-machine.jpg?b=1&s=612x612&w=0&k=20&c=BVDtEWahh0HZndALgqBBjuVc5IefTRjTWbYdJed1zmM=",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ProductType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: ProductType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
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

const options: FilterCriteria[] = [{ key: "Tên sản phẩm", value: "Máy tính" }];

export default function ProductListPage() {
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
      title: "Sản phẩm",
      dataIndex: "name",
      render: (text: string, record: ProductType) => (
        <a style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.avatar_url}
            alt={text}
            style={{ marginRight: "8px", width: "32px", height: "32px" }}
          />
          {text}
        </a>
      ),
      width: "30%",
    },
    {
      title: () => (
        <div className="flex space-x-1 items-center">
          <p>Tồn có thể bán</p>
          <Tooltip
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
      dataIndex: "inventory_number",
      defaultSortOrder: "descend",
      sorter: (a: ProductType, b: ProductType) =>
        a.inventory_number - b.inventory_number,
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      sorter: (a: ProductType, b: ProductType) => a.price - b.price,
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
      dataIndex: "system_fee",
      sorter: (a: ProductType, b: ProductType) => a.system_fee - b.system_fee,
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
      sorter: (a: ProductType, b: ProductType) => a.profit - b.profit,
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: ProductType) => {
        return (
          <div className="space-x-2">
            <Button type="primary" className="bg-sky-100 text-black">
              <BiEditAlt />
            </Button>
            <Popconfirm
              title="Bạn chắc chắn muốn xóa sản phẩm này không ?"
              description="Sản phẩm sẽ bị xóa hoàn toàn và không thể hồi phục lại được."
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button type="primary" danger>
                <RiDeleteBinLine />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const tabItems = [
    {
      label: "Tất cả",
      description:
        "Mục này chứa các sản phẩm đã được duyệt để bán hàng, không bao gồm sản phẩm ở trạng thái Nháp, Chờ duyệt và Khóa vĩnh viễn.",
      number: 0,
    },
    {
      label: "Đang bán",
      description:
        "Mục này chứa các sản phẩm có thể bán. Bao gồm sản phẩm đang hiển thị và bị hạn chế hiển thị trong kết quả tìm kiếm.",
      number: 0,
    },
    {
      label: "Hết hàng",
      description:
        "Mục này chứa các sản phẩm có lựa chọn đã hết hàng hoặc hết hàng toàn bộ. Cập nhật giá trị ở cột Tồn có thể bán > 0 để bán lại.",
      number: 0,
    },
    {
      label: "Nháp",
      description:
        "Mục này chứa các sản phẩm đang lưu nháp hoặc được tạo bằng tính năng Tạo mới / Sao chép hàng loạt nhưng chưa đính kèm tài liệu yêu cầu.",
      number: 0,
    },
    {
      label: "Chờ duyệt",
      description:
        "Mục này chứa các sản phẩm đang chờ duyệt bởi Tiki. Duyệt thành công sẽ tự động chuyển qua mục Đang bán, bị từ chối chuyển qua mục Vi phạm.",
      number: 0,
    },
    {
      label: "Đã tắt",
      description:
        "Mục này chứa các sản phẩm mà Nhà bán đã tắt toàn bộ lựa chọn Khách hàng không thể xem và đặt hàng.",
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
          >
            <Alert
              className="text-xs"
              message={
                <>
                  <strong>{tab.label}:</strong> {tab.description}
                </>
              }
              type="info"
              showIcon
            />
          </Tabs.TabPane>
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
        <p className="font-semibold text-lg m-4">Sản phẩm: {products.length}</p>
        <Dropdown menu={{ items: exportOptions }} placement="bottomLeft">
          <div className="flex items-center hover:text-sky-600 hover:bg-sky-200 p-1 rounded-xl border m-2 theme-button">
            <p className="ml-2 truncate text-sm">Xuất sản phẩm</p>
            <RiArrowDropDownLine size={20} />
          </div>
        </Dropdown>
      </div>
      <div>
        <Table
          bordered
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={products}
          locale={{
            emptyText: <Empty description={<span>Trống</span>} />, // Hiển thị Empty nếu không có dữ liệu
          }}
          className=""
        />
      </div>
      {/* <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form> */}
    </div>
  );
}
