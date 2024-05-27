"use client";
import {
  ProductElement,
  ProductPatternType,
  WidgetType,
} from "@/model/WidgetType";
import { Button, Flex, Input, Select, Skeleton, Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon, { WidgetTypeName } from "../mini/WidgetTypeIcon";
import { InfoCircleOutlined, FieldStringOutlined } from "@ant-design/icons";
import { CollectionType } from "@/model/CollectionType";
import CustomEmpty from "../mini/CustomEmpty";
import { PUT_UpdateWidget } from "@/app/apis/widget/WidgetAPI";
import { GET_GetCollectionListByShop } from "@/app/apis/collection/CollectionAPI";
import { SaveStatusEnum } from "../WidgetEditorBar";

interface WidgetProps {
  widget: WidgetType;
  updateWidgets(): void;
  setSaveStatus(saveStatus: SaveStatusEnum): void;
}

export default function ProductWidget(props: WidgetProps) {
  // mock data
  const mockId = "65f1e8bbc4e39014df775166";

  // variables
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const [proxyProductWidget, setProxyProductWidget] = useState(props.widget);

  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  const element = useMemo(() => {
    return props.widget.element as ProductElement;
  }, [props.widget.element]);

  const [title, setTitle] = useState(element.title);
  const [collectionId, setCollectionId] = useState(element.collectionId);
  const [pattern, setPattern] = useState(element.pattern);

  useEffect(() => {
    let saveStatus: SaveStatusEnum =
      title === element.title &&
      pattern === element.pattern &&
      collectionId === element.collectionId &&
      isSwitched === props.widget.visibility
        ? SaveStatusEnum.NOCHANGE
        : SaveStatusEnum.UNSAVED;

    props.setSaveStatus(saveStatus);
  }, [pattern, title, collectionId, isSwitched]);

  // functions
  const handleSave = async () => {
    proxyProductWidget.visibility = isSwitched;

    element.title = title;
    element.collectionId = collectionId;
    element.pattern = pattern;

    proxyProductWidget.element = element;

    const response = await PUT_UpdateWidget(proxyProductWidget);

    if (response.status === 200) {
      setProxyProductWidget(proxyProductWidget);
      props.updateWidgets();
      alert("Cập nhật widget thành công!");
    } else {
      alert("Cập nhật widget thất bại...");
      // console.log(response.message);
    }
  };

  const handleChangePattern = (value: string) => {
    setPattern(value as ProductPatternType);
  };

  const handleChangeCollection = (value: string) => {
    setCollectionId(value);
  };

  // data
  const collectionOptions = useMemo(() => {
    let newData: any[] = [];

    collections.forEach((collection) => {
      newData.push({
        value: collection._id,
        label: collection.name,
      });
    });

    return newData;
  }, [collections]);

  // call api
  useEffect(() => {
    handleGetCollectionList();
  }, [mockId]);

  const handleGetCollectionList = async () => {
    const response = await GET_GetCollectionListByShop(mockId);
    if (response.status == 200) {
      if (response.data) {
        setCollections(response.data);
        // console.log("product", data);
      }
    }
  };

  return (
    <div className="m-5 pb-5">
      <div className="m-5 text-2xl font-semibold flex justify-between">
        <WidgetTypeName
          type={props.widget.type}
          element={props.widget.element}
          order={props.widget.order}
        />
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
        {(collections && (
          <Flex vertical gap="small">
            <div className="font-semibold">Bộ sưu tập</div>
            <Select
              value={collectionId}
              style={{ width: "100%" }}
              onChange={handleChangeCollection}
              notFoundContent={<CustomEmpty />}
              options={collectionOptions}
            />
          </Flex>
        )) || <Skeleton active />}

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
