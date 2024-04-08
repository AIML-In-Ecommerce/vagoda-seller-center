"use client";
import {
  ProductElement,
  ProductPatternType,
  WidgetType,
} from "@/model/WidgetType";
import { Button, Empty, Flex, Input, Select, Tooltip } from "antd";
import { useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon from "../mini/WidgetTypeIcon";
import { InfoCircleOutlined, FieldStringOutlined } from "@ant-design/icons";

interface WidgetProps {
  widget: WidgetType;
}

export default function ProductWidget(props: WidgetProps) {
  // data

  // variables
  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  const [title, setTitle] = useState("");

  // funtions
  const handleSave = () => {
    //
  };

  const handleChangePattern = (value: string) => {
    console.log(`selected ${value}`);
  };

  const element = useMemo(() => {
    return props.widget.element as ProductElement;
  }, [props.widget.element]);

  return (
    <div className="m-5 pb-5">
      <div className="m-5 text-2xl font-semibold flex justify-between">
        <div>{props.widget._id}</div>
        <CustomSwitch isSwitched={isSwitched} setIsSwitched={setIsSwitched} />
      </div>

      <Flex vertical gap="large">
        {/* other */}
        <Select
          defaultValue={props.widget.element?.pattern.toString()}
          style={{ width: "100%" }}
          onChange={handleChangePattern}
          options={[
            {
              value: ProductPatternType.CAROUSEL.toString(),
              label: (
                <Flex gap="small">
                  <WidgetTypeIcon
                    type={props.widget.type}
                    element={{
                      pattern: ProductPatternType.CAROUSEL,
                      title: "",
                      collectionId: "",
                    }}
                  />
                  Sản phẩm dạng băng chuyền
                </Flex>
              ),
            },
            {
              value: ProductPatternType.GRID.toString(),
              label: (
                <Flex gap="small">
                  <WidgetTypeIcon
                    type={props.widget.type}
                    element={{
                      pattern: ProductPatternType.GRID,
                      title: "",
                      collectionId: "",
                    }}
                  />
                  Sản phẩm dạng lưới
                </Flex>
              ),
            },
            // { value: "disabled", label: "Disabled", disabled: true },
          ]}
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

        {/* select collection from id */}
        <Flex vertical gap="small">
          <div className="font-semibold">Bộ sưu tập</div>
          <Select
            defaultValue={element.collectionId}
            style={{ width: "100%" }}
            onChange={handleChangePattern}
            notFoundContent={
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>Không có</span>}
              />
            }
            options={
              [
                // { value: "disabled", label: "Disabled", disabled: true },
              ]
            }
          />
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
