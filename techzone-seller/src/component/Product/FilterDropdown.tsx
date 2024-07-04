"use client";
import { Button, Checkbox, Dropdown, Input, MenuProps } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";

interface FilterDropdownProps {
  name: string;
  options: { id: string; label: string }[];
  onSelection: (
    selectedCategories: { id: string; label: string }[],
    key: string
  ) => void;
  initialSelectedOptions: { id: string; label: string }[];
}

export default function FilterDropdown(props: FilterDropdownProps) {
  const query = useSearchParams();

  const [selectedOptions, setSelectedOptions] = useState<
    { id: string; label: string }[]
  >([]);
  const [visible, setVisible] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");

  const handleVisibleChange = (flag: boolean) => {
    if (flag) {
      setVisible(flag);
    }
  };

  const handleFilter = () => {
    setVisible(false);

    if (selectedOptions.length == 0) {
      return;
    }

    const updatedQuery = new URLSearchParams(query);
    if (props.name == "Danh mục") {
      updatedQuery.set(
        "category",
        encodeURI(selectedOptions.map((item) => item.id).join(","))
      );
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );

    props.onSelection(selectedOptions, props.name);
  };

  const handleCategorySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorySearch(e.target.value);
  };

  const handleOptionChange = (option: { id: string; label: string }) => {
    const isSelected = selectedOptions.find(
      (selected) => selected.id === option.id
    );
    const updatedOptions = isSelected
      ? selectedOptions.filter((item) => item.id !== option.id)
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
            size="small"
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
              category.label
                .toLowerCase()
                .includes(categorySearch.toLowerCase())
            )
            .map((category) => (
              <div key={category.id} className="">
                <Checkbox
                  checked={selectedOptions.some(
                    (option) => option.id === category.id
                  )}
                  onChange={() => handleOptionChange(category)}
                >
                  {category.label}
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
          <Button
            type="primary"
            className="theme-button ant-btn-primary dropdown-button"
            onClick={handleFilter}
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
    setSelectedOptions(props.initialSelectedOptions || []);
  }, [props.initialSelectedOptions]);

  return (
    <Dropdown
      open={visible}
      onOpenChange={handleVisibleChange}
      menu={{ items: categoryItems }}
      placement="bottomLeft"
      className="max-w-sm"
      trigger={["click"]}
      overlayStyle={{ maxHeight: 70 }}
    >
      <div className="flex items-center hover:text-sky-600 hover:bg-sky-200 p-2 rounded-lg border ">
        <p className="ml-2 truncate text-sm">{props.name}</p>
        <RiArrowDropDownLine size={20} />
      </div>
    </Dropdown>
  );
}
