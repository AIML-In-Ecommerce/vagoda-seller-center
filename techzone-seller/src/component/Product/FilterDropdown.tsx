"use client";
import { Button, Checkbox, Dropdown, Input, MenuProps } from "antd";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";

interface FilterDropdownProps {
  name: string;
  options: string[];
  onSelection: (selectedCategories: string[], key: string) => void;
}

export default function FilterDropdown(props: FilterDropdownProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);

    if (!flag) {
      props.onSelection(selectedOptions, props.name);
    }
  };

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySearch(e.target.value);
  };

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);
  };

  const categoryItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex ">
          <Input
            size="middle"
            placeholder="Tìm kiếm"
            suffix={<GoSearch />}
            className="rounded-full  m-1"
            onChange={handleCategorySearch}
          />
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className=" dropdown-menu custom-scrollbar">
          {props.options
            .filter((category) =>
              category.toLowerCase().includes(categorySearch.toLowerCase())
            )
            .map((category) => (
              <div key={category} className="">
                <Checkbox
                  checked={selectedOptions.includes(category)}
                  onChange={() => handleOptionChange(category)}
                >
                  {category}
                </Checkbox>
              </div>
            ))}
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div className="flex flex-row-reverse ">
          {/* <Button
            type="primary"
            className="theme-button ant-btn-primary dropdown-button"
            onClick={handleApplyFilter}
          >
            Áp dụng
          </Button> */}
          <Button onClick={handleClearSelection} className="mx-2">
            Bỏ chọn
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      visible={visible}
      onVisibleChange={handleVisibleChange}
      menu={{ items: categoryItems }}
      placement="bottomLeft"
      className="max-w-sm"
      trigger={["click"]}
      overlayStyle={{ maxHeight: 100, overflowY: "auto" }}
    >
      <div className="flex items-center hover:text-sky-600 hover:bg-sky-200 p-2 rounded-lg border m-2">
        <p className="ml-2 truncate text-sm">{props.name}</p>
        <RiArrowDropDownLine size={20} />
      </div>
    </Dropdown>
  );
}
