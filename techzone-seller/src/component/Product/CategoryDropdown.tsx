"use client";
import {
  Alert,
  Button,
  Cascader,
  ConfigProvider,
  Dropdown,
  Input,
  List,
  MenuProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

export interface CategoryType {
  id: string;
  name: string;
  children: null | CategoryType[];
  order: number;
}

interface FilterDropdownProps {
  // name: string;
  // options: string[];
  // onSelection: (selectedCategories: string[], key: string) => void;
}

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const optionLists: Option[] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    isLeaf: false,
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    isLeaf: false,
  },
];

const categories = [
  { id: 1, name: "Laptop", isFinal: false, order: 1 },
  { id: 2, name: "Điện máy - Điện gia dụng", isFinal: false, order: 1 },
  { id: 3, name: "PC- Máy tính bộ", isFinal: false, order: 1 },
  { id: 5, name: "Linh kiện máy tính", isFinal: false, order: 1 },
  { id: 6, name: "Phụ kiện máy tính", isFinal: false, order: 1 },
  { id: 7, name: "Game & Stream", isFinal: false, order: 1 },
  { id: 8, name: "Điện thoại & Phụ kiện", isFinal: false, order: 1 },
  { id: 9, name: "Phụ kiện", isFinal: false, order: 1 },
  { id: 10, name: "Thiết bị âm thanh", isFinal: false, order: 1 },
  { id: 11, name: "Thiết bị văn phòng", isFinal: false, order: 1 },
  { id: 12, name: "Khác", isFinal: false, order: 1 },
];

const subCategories = [
  { id: 1, name: "Thiết bị nhiệt", isFinal: false, order: 2 },
  { id: 2, name: "Máy giặt", isFinal: false, order: 2 },
  { id: 3, name: "Điều hòa", isFinal: false, order: 2 },
  { id: 4, name: "Tủ lạnh", isFinal: false, order: 2 },
  { id: 4, name: "TV", isFinal: false, order: 2 },
  { id: 4, name: "Thiết bị giặt", isFinal: false, order: 2 },
];

export default function CategoryDropdown(props: FilterDropdownProps) {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [categoryLine, setCategoryLine] = useState<string | null>(null);
  const [applyClicked, setApplyClicked] = useState(false);
  const [options, setOptions] = useState<Option[]>(optionLists);

  const onChange = (value: (string | number)[], selectedOptions: Option[]) => {
    console.log(value, selectedOptions);
  };

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // load options lazily
    setTimeout(() => {
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1",
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2",
        },
      ];
      setOptions([...options]);
    }, 1000);
  };

  const [menuItems, setMenuItems] = useState<CategoryType[]>(
    categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      children: category.isFinal ? null : [],
      order: category.order,
    }))
  );
  const [currentCategoryList, setCurentCategoryList] =
    useState<CategoryType[]>(menuItems);
  const [selectedCategories, setSelectedCategories] = useState<
    { key: number; value: CategoryType }[]
  >([]);

  const handleSaveSelectedCategory = (category: CategoryType) => {
    setSelectedCategories((prevSelectedCategories) => {
      const categoryIndex = prevSelectedCategories.findIndex(
        (item) => item.key === category.order
      );
      if (categoryIndex !== -1) {
        const updatedSelectedCategories = [...prevSelectedCategories];
        updatedSelectedCategories[categoryIndex] = {
          key: category.order,
          value: category,
        };

        const filteredSelectedCategories = updatedSelectedCategories.filter(
          (item) => item.key <= category.order
        );

        return filteredSelectedCategories;
      } else {
        const newCategoryPair = { key: category.order, value: category };
        const filteredSelectedCategories = prevSelectedCategories.filter(
          (item) => item.key < category.order
        );
        return [...filteredSelectedCategories, newCategoryPair];
      }
    });

    console.log("Save", selectedCategories);
  };

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);

    if (!flag) {
      // props.onSelection(selectedOptions, props.name);
    }
  };

  const handleFetchCategory = (key: string) => {
    const selectedItem = currentCategoryList.find((item) => item.id === key);

    const selectedCategory = selectedCategories.find(
      (category) => category.value.id === key
    );

    if (selectedItem && selectedItem.children) {
      const updatedMenuItems = [...menuItems];

      const selectedItemIndex = updatedMenuItems.findIndex(
        (item) => item.id === key
      );

      selectedItem.children = subCategories.map((category: any) => ({
        id: category.id,
        name: category.name,
        order: category.order,
        children: category.isFinal
          ? null
          : subCategories.map((category: any) => ({
              id: category.id,
              name: category.name,
              order: 3,
              children: category.isFinal ? null : [],
            })),
      }));
      setCurentCategoryList(selectedItem.children);
      handleSaveSelectedCategory(selectedItem);

      console.log("Fetch", selectedCategories);
    }
  };

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClearSelection = () => {
    setSelectedCategories([]);
  };

  const SubCategoryList: React.FC<{ subcategories: CategoryType[] }> = ({
    subcategories,
  }) => (
    <div className="w-full">
      <List
        className="dropdown-category  w-full"
        dataSource={subcategories.filter((category) =>
          category.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        renderItem={(item: CategoryType) => (
          <List.Item
            key={item.id}
            onClick={() => handleFetchCategory(item.id)}
            className={
              selectedCategories.some(
                (category) => category.value.id === item.id
              )
                ? "bg-sky-100  px-2"
                : "  px-2"
            }
          >
            <div className={`{item.children==null?"font-semibold":""}`}>
              {item.name}
            </div>
            {item.children && (
              <div>
                <IoIosArrowForward size={12} />
              </div>
            )}
          </List.Item>
        )}
      />
    </div>
  );

  const categoryItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex w-full">
          <Alert
            className="w-full"
            message="Vui lòng chọn danh mục cấp cuối (có in đậm)"
            type="info"
            showIcon
          />
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className="flex ">
          <Input
            value={searchText}
            size="middle"
            placeholder="Tìm kiếm"
            suffix={<GoSearch />}
            className="rounded-full  m-1 w-full"
            onChange={handleCategorySearch}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: (
        // <div className="grid grid-cols-3 gap-x-2  space-x-2 max-w-full ">
        <div className="">
          {/* <List
            className="dropdown-category custom-scrollbar w-full p-2"
            dataSource={
              selectedCategories.length < 1
                ? menuItems.filter((category) =>
                    category.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                : menuItems
            }
            renderItem={(item) => (
              <List.Item
                key={item.id}
                onClick={() => handleFetchCategory(item.id)}
                className={
                  selectedCategories.some(
                    (category) => category.value.id === item.id
                  )
                    ? "bg-sky-100"
                    : ""
                }
              >
                <div>{item.name}</div>
                {item.children && (
                  <div>
                    <IoIosArrowForward size={12} />
                  </div>
                )}
              </List.Item>
            )}
          /> */}

          {/* {selectedCategories.map(
            (category) =>
              category.value.children !== null && (
                <SubCategoryList
                  key={category.value.id}
                  subcategories={category.value.children}
                />
              )
          )} */}

          <ConfigProvider
            theme={{
              components: {
                Cascader: {
                  controlWidth: 300,
                  controlItemWidth: 250,
                },
              },
            }}
          >
            <Cascader.Panel
              options={options}
              loadData={loadData}
              onChange={onChange}
              changeOnSelect
            />
          </ConfigProvider>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div className="flex space-x-2">
          <div className="font-semibold">Đang chọn: </div>
          <div className="text-sky-500">
            {categoryLine ? categoryLine : "---"}
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex flex-row-reverse ">
          <Button
            type="primary"
            className="theme-button ant-btn-primary dropdown-button"
            onClick={() => setApplyClicked(!applyClicked)}
          >
            Áp dụng
          </Button>
          <Button onClick={handleClearSelection} className="mx-2">
            Bỏ chọn
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const selectedCategoryNames = selectedCategories.map(
      (category) => category.value.name
    );
    setCategoryLine(selectedCategoryNames.join(" / "));
  }, [selectedCategories]);

  useEffect(() => {
    if (applyClicked) {
      setVisible(false); // Đóng dropdown khi nút "Áp dụng" được bấm
      setApplyClicked(false); // Đặt lại trạng thái của nút "Áp dụng"
    }
  }, [applyClicked]);

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={handleVisibleChange}
      menu={{ items: categoryItems }}
      placement="bottomLeft"
      className="w-full"
      trigger={["click"]}
      overlayStyle={{ maxHeight: 100, overflowY: "auto", maxWidth: 300 }}
    >
      <div className="flex items-center justify-between  hover:text-sky-600 hover:bg-sky-200 p-2 rounded-lg border m-2">
        {/* <p className="ml-2 truncate text-sm">{props.name}</p> */}
        <p>{applyClicked && categoryLine ? categoryLine : "Chọn danh mục"}</p>
        <RiArrowDropDownLine size={20} />
      </div>
    </Dropdown>
  );
}
