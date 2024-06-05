import { _CategoryType } from "@/model/CategoryType";
import { Alert, Cascader, ConfigProvider, Divider, GetProp } from "antd";
import type { CascaderProps } from "antd/es/cascader";
import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface CategoryDropdownProps {
  prevCategory: string[];
  setCategory: (category: string[]) => void;
  allCategory: _CategoryType[];
  getValueProps?: (value: any) => any;
}
type DefaultOptionType = GetProp<CascaderProps, "options">[number];

function convertToOptions(categories: _CategoryType[]): Option[] {
  return categories.map((category) => {
    const option: Option = {
      value: category._id,
      label: category.name,
    };

    if (category.subCategories && category.subCategories.length > 0) {
      option.children = convertToOptions(category.subCategories);
    }

    return option;
  });
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [categoryLine, setCategoryLine] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    props.prevCategory
  );
  const valueProps = props.getValueProps
    ? props.getValueProps(selectedCategory)
    : {};

  const [previousValue, setPreviousValue] = useState<string | number | null>(
    null
  );

  useEffect(() => {
    setOptions(convertToOptions(props.allCategory));
  }, [props.allCategory]);

  const onChange: CascaderProps<Option>["onChange"] = (
    value: any,
    selectedOptions: Option[] | undefined
  ) => {
    console.log("CHANGE", value, selectedOptions);
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedLabels = selectedOptions
        .map((option) => option.label)
        .join(" / ");
      setCategoryLine(selectedLabels);

      setSelectedCategory(value);
      console.log("Selected", value);
    } else {
      setCategoryLine(null);
    }
    setPreviousValue(value); // Lưu giá trị trước khi thay đổi
    props.setCategory(value);
  };

  const dropdownRender = (menus: React.ReactNode) => (
    <div className="p-2">
      <div className="flex w-full">
        <Alert
          className="w-full"
          message="Vui lòng chọn danh mục cấp cuối"
          type="info"
          showIcon
        />
      </div>
      <div className="flex pt-2"></div>
      <Divider style={{ margin: 0 }} />
      {menus}
      <Divider style={{ margin: 0 }} />
      {/* <div className="flex space-x-2 my-2">
        <div className="font-semibold">Đang chọn: </div>
        <div className="text-sky-500">
          {categoryLine ? categoryLine : "---"}
        </div>
      </div> */}
    </div>
  );

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
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
        value={selectedCategory}
        options={options}
        dropdownRender={dropdownRender}
        placeholder="Chọn danh mục"
        onChange={onChange}
        showSearch={{ filter }}
      />
    </ConfigProvider>
  );
}
