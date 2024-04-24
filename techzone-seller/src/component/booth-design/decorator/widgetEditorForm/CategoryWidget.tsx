"use client";
import {
  CategoryElement,
  CategoryPatternType,
  WidgetType,
} from "@/model/WidgetType";
import { Button, Flex, Input, Select, Tooltip } from "antd";
import { useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon from "../mini/WidgetTypeIcon";
import { InfoCircleOutlined, FieldStringOutlined } from "@ant-design/icons";
import { CategoryType } from "@/model/CategoryType";
import CustomEmpty from "../mini/CustomEmpty";

interface WidgetProps {
  widget: WidgetType;
  updateWidgets(): void;
}

export default function CategoryWidget(props: WidgetProps) {
  // mock data
  const categories: CategoryType[] = [
    {
      _id: "id1",
      key: "1",
      urlKey: "string",
      name: "Laptop",
      image: "string",
      subCategoryType: [],
    },
    {
      _id: "id2",
      key: "2",
      urlKey: "string",
      name: "Màn hình máy tính",
      image: "string",
      subCategoryType: [],
    },
    {
      _id: "id3",
      key: "3",
      urlKey: "string",
      name: "Ổ cứng",
      image: "string",
      subCategoryType: [],
    },
  ];

  // data
  const categoryOptions = useMemo(() => {
    let newData: any[] = [];

    categories.forEach((category) => {
      newData.push({
        value: category._id,
        label: category.name,
      });
    });

    return newData;
  }, [categories]);

  const [proxyCategory, setProxyCategory] = useState<Array<string>>(
    Array.from(" ".repeat(4))
  );

  // variables
  const [proxyCategoryWidget, setProxyCategoryWidget] = useState(props.widget);

  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  const element = useMemo(() => {
    return props.widget.element as CategoryElement;
  }, [props.widget.element]);

  const [title, setTitle] = useState(element.title);

  // functions
  const handleSave = () => {
    proxyCategoryWidget.visibility = isSwitched;

    element.title = title;
    element.categoryIdList = proxyCategory;

    proxyCategoryWidget.element = element;
    setProxyCategoryWidget(proxyCategoryWidget);

    props.updateWidgets();
  };

  const handleChangePattern = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeCategory = (value: string, index: number) => {
    proxyCategory[index] = value;
    setProxyCategory(proxyCategory);
  };

  return (
    <div className="m-5 pb-5">
      <div className="m-5 text-2xl font-semibold flex justify-between">
        <div>{props.widget._id}</div>
        <CustomSwitch isSwitched={isSwitched} setIsSwitched={setIsSwitched} />
      </div>

      <Flex vertical gap="large">
        {/* other */}
        <Select
          defaultValue={CategoryPatternType.GRID.toString()}
          style={{ width: "100%" }}
          onChange={handleChangePattern}
          options={[
            {
              value: CategoryPatternType.GRID.toString(),
              label: (
                <Flex gap="small">
                  <WidgetTypeIcon
                    type={props.widget.type}
                    element={{
                      pattern: CategoryPatternType.GRID,
                      title: "",
                      categoryIdList: [],
                    }}
                  />
                  Danh mục dạng lưới
                </Flex>
              ),
            },
          ]}
          disabled
        />

        {/* title */}
        <Flex vertical gap="small">
          <div className="font-semibold">
            <a className="text-red-600">*</a>
            Tiêu đề
          </div>
          <div className="w-full">
            <Input
              placeholder="Điền tiêu đề"
              prefix={<FieldStringOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Giới hạn n kí tự">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </Flex>

        {/* select category from id */}
        <Flex vertical gap="small">
          <div className="font-semibold">Danh mục</div>
          <div className="font-light text-sm">
            Chọn tối đa 4 danh mục để hiển thị ở trang gian hàng
          </div>

          {proxyCategory.map((item, index) => (
            <div key={index}>
              <Select
                defaultValue={element.categoryIdList[index]}
                style={{ width: "100%" }}
                onChange={(value: string) => handleChangeCategory(value, index)}
                notFoundContent={<CustomEmpty />}
                options={categoryOptions}
              />
            </div>
          ))}
        </Flex>

        {/* Buttons */}
        <Flex gap="large">
          <Button size="large" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
