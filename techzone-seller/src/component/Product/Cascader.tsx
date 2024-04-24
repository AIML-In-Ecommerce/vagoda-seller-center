import { Alert, Cascader, ConfigProvider, Divider, Input } from "antd";
import type { CascaderProps } from "antd/es/cascader";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const optionLists = [
  { value: "1", label: "Laptop", isLeaf: false },
  { value: "2", label: "Điện máy - Điện gia dụng", isLeaf: false },
  { value: "3", label: "PC- Máy tính bộ", isLeaf: false },
  { value: "5", label: "Linh kiện máy tính", isLeaf: false },
  { value: "6", label: "Phụ kiện máy tính", isLeaf: false },
  { value: "7", label: "Game & Stream", isLeaf: false },
  { value: "8", label: "Điện thoại & Phụ kiện", isLeaf: false },
  { value: "9", label: "Phụ kiện", isLeaf: false },
  { value: "10", label: "Thiết bị âm thanh", isLeaf: false },
  { value: "11", label: "Thiết bị văn phòng", isLeaf: false },
  { value: "12", label: "Khác", isLeaf: false },
];

const subOptionLists = [
  { value: "1", label: "Thiết bị nhiệt" },
  { value: "2", label: "Máy giặt" },
  { value: "3", label: "Điều hòa" },
  { value: "4", label: "Tủ lạnh" },
  { value: "5", label: "TV" },
  { value: "6", label: "Thiết bị giặt" },
];

interface CategoryDropdown_Props {
  prevCategory: string[];
  setCategory: (category: string[]) => void;
}

export default function CategoryDropdown_(props: CategoryDropdown_Props) {
  const [applyClicked, setApplyClicked] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<Option[]>(optionLists);
  const [categoryLine, setCategoryLine] = useState<string | null>(null);
  const [isLeafSelected, setIsLeafSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    props.prevCategory
  );
  const [previousValue, setPreviousValue] = useState<string | number | null>(
    null
  );

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClearSelection = () => {
    setCategoryLine(null);
    setIsLeafSelected(false);
  };

  const onChange: CascaderProps<Option>["onChange"] = (
    value: any,
    selectedOptions: Option[] | undefined
  ) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedLabels = selectedOptions
        .map((option) => option.label)
        .join(" / ");
      setCategoryLine(selectedLabels);
      setIsLeafSelected(
        selectedOptions[selectedOptions.length - 1].isLeaf || false
      );
      setSelectedCategory((prev: string[]) => {
        if (selectedCategory.length > 0) return [...prev, value];
        else return [value];
      });
    } else {
      setCategoryLine(null);
      setIsLeafSelected(false);
    }
    setPreviousValue(value); // Lưu giá trị trước khi thay đổi
    console.log("Previous value", selectedCategory);
    props.setCategory(value);
  };

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // Load options lazily
    setTimeout(() => {
      targetOption.children = subOptionLists;
      setOptions([...options]);
    }, 3000);
  };

  const dropdownRender = (menus: React.ReactNode) => (
    <div className="p-2">
      <div className="flex w-full">
        <Alert
          className="w-full"
          message="Vui lòng chọn danh mục cấp cuối (có in đậm)"
          type="info"
          showIcon
        />
      </div>
      <div className="flex pt-2">
        <Input
          value={searchText}
          size="middle"
          placeholder="Tìm kiếm"
          suffix={<GoSearch />}
          className="rounded-full  m-1 w-full"
          onChange={handleCategorySearch}
        />
      </div>
      <Divider style={{ margin: 0 }} />
      {menus}
      <Divider style={{ margin: 0 }} />
      <div className="flex space-x-2 my-2">
        <div className="font-semibold">Đang chọn: </div>
        <div className="text-sky-500">
          {categoryLine ? categoryLine : "---"}
        </div>
      </div>
    </div>
  );

  return (
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
      <Cascader
        value={isLeafSelected ? null : previousValue}
        className="w-full"
        options={options}
        dropdownRender={dropdownRender}
        placeholder="Chọn danh mục"
        loadData={loadData}
        changeOnSelect
        onChange={onChange}
        onDropdownVisibleChange={(visible) => {
          if (!visible && !isLeafSelected) {
            setSelectedCategory(props.prevCategory);
          } else {
            props.setCategory(selectedCategory);
          }
        }}
      />
    </ConfigProvider>
  );
}
