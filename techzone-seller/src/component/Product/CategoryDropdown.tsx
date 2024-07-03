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
  category: string[];
  prevCategory: string[];
  setCategory: (category: string[]) => void;
  allCategory: _CategoryType[];
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
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    props.prevCategory
  );

  // useEffect(() => {
  //   setOptions(convertToOptions(props.allCategory));
  // }, [props.allCategory]);
  useEffect(() => {
    setOptions(convertToOptions(props.allCategory));
  }, [props.allCategory]);

  useEffect(() => {
    setSelectedCategory(props.category);
  }, [props.category]);

  const onChange: CascaderProps<Option>["onChange"] = (
    value: any,
    selectedOptions: Option[] | undefined
  ) => {
    if (selectedOptions && selectedOptions.length > 0) {
      setSelectedCategory(value);
    } else {
    }

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
