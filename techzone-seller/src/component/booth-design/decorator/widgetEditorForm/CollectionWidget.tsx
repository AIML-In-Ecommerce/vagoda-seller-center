"use client";
import {
  CollectionElement,
  CollectionPatternType,
  WidgetType,
} from "@/model/WidgetType";
import { Button, Card, Flex, Select, Space } from "antd";
import { useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon, { WidgetTypeName } from "../mini/WidgetTypeIcon";
import { CollectionType } from "@/model/CollectionType";
import CustomEmpty from "../mini/CustomEmpty";
import Search from "antd/es/transfer/search";
import CollectionCard from "../mini/CollectionCard";
import { PUT_UpdateWidget } from "@/app/apis/widget/WidgetAPI";

interface WidgetProps {
  widget: WidgetType;
  updateWidgets(): void;
}

export default function CollectionWidget(props: WidgetProps) {
  // mock data
  const collectionsData = [
    {
      _id: "1",
      name: "collection 1",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: new Date("2024-03-24T12:30:00"),

      isActive: true,
    },
    {
      _id: "2",
      name: "collection 2",
      imageUrl:
        "https://www.slaters-schoolwear.co.uk/wp-content/uploads/2020/06/Millbrook-38Slaters_SchoolWear-edit.jpg",
      productIdList: [],
      createDate: new Date("2024-03-24T12:30:00"),

      isActive: true,
    },
    {
      _id: "3",
      name: "collection 3",
      imageUrl:
        "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.002.223.23-11000032-bst-1_5.jpg",
      productIdList: [],
      createDate: new Date("2024-03-24T12:30:00"),

      isActive: true,
    },
    {
      _id: "4",
      name: "collection 4",
      imageUrl:
        "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRx-nSw4YqscTmqs9LRjWLgFvPkAOI91FKycAh0hjOlJ2CZVjkatnoPMIsxyYRvInkV51GfvU_RpDB_2EOEjuk",
      productIdList: [],
      createDate: new Date("2024-03-24T12:30:00"),

      isActive: true,
    },
  ] as CollectionType[];

  // data
  const [proxyCollectionId, setProxyCollectionId] = useState<Array<string>>([]);

  // variables
  const [collections, setCollections] = useState(collectionsData);

  const [proxyCollectionWidget, setProxyCollectionWidget] = useState(
    props.widget
  );

  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  const element = useMemo(() => {
    let temp = props.widget.element as CollectionElement;

    setProxyCollectionId(temp.collectionIdList);

    // call api to get collection info
    // setCollections([]);

    return temp;
  }, [props.widget.element]);

  const [pattern, setPattern] = useState(element.pattern);

  // functions
  const handleSave = async () => {
    proxyCollectionWidget.visibility = isSwitched;

    element.pattern = pattern;
    element.collectionIdList = proxyCollectionId;

    proxyCollectionWidget.element = element;

    const response = await PUT_UpdateWidget(proxyCollectionWidget);

    if (response.status === 200) {
      setProxyCollectionWidget(proxyCollectionWidget);
      props.updateWidgets();
    } else console.log(response.message);
  };

  const handleChangePattern = (value: string) => {
    setPattern(value as CollectionPatternType);
  };

  const checkInclude = (value: string) => {
    let check = false;
    proxyCollectionId.forEach((collection) => {
      if (collection === value) {
        check = true;
      }
    });

    // console.log(`selected ${value}, ${check}`);
    return check;
  };

  const handleAddCollection = (value: CollectionType, index: number) => {
    if (checkInclude(value._id)) return;

    proxyCollectionId.push(value._id);
    setProxyCollectionId(proxyCollectionId);

    props.updateWidgets();
  };

  const handleRemoveCollection = (value: CollectionType, index: number) => {
    setProxyCollectionId(proxyCollectionId.filter((id) => id != value._id));

    props.updateWidgets();
  };

  return (
    <div className="m-5 pb-5 h-[500px] overflow-y-auto overflow-x-hidden">
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
          defaultValue={element.pattern.toString()}
          style={{ width: "100%" }}
          onChange={handleChangePattern}
          options={[
            {
              value: CollectionPatternType.CAROUSEL.toString(),
              label: (
                <Flex gap="small">
                  <WidgetTypeIcon
                    type={props.widget.type}
                    element={{
                      pattern: CollectionPatternType.CAROUSEL,
                      collectionIdList: [],
                    }}
                  />
                  Bộ sưu tập dạng băng chuyền
                </Flex>
              ),
            },
            {
              value: CollectionPatternType.GRID.toString(),
              label: (
                <Flex gap="small">
                  <WidgetTypeIcon
                    type={props.widget.type}
                    element={{
                      pattern: CollectionPatternType.GRID,
                      collectionIdList: [],
                    }}
                  />
                  Bộ sưu tập dạng lưới
                </Flex>
              ),
            },
          ]}
        />

        {/* select collections */}
        <Flex vertical gap="small">
          <div className="font-semibold">Bộ sưu tập</div>

          <div className="font-light text-sm">Chọn bộ bưu tập để hiển thị</div>

          {/* TODO: select collections */}
          {collections.length > 0 && (
            <Space direction="vertical">
              <div className="flex gap-5 mt-5 border rounded bg-slate-100 p-5">
                <Search placeholder="Nhập để tìm bộ sưu tập"></Search>
                <Button className="bg-blue-500 font-semibold text-white">
                  Áp dụng
                </Button>
              </div>
              <Card className="overflow-auto h-96">
                {collections.map((item, index) => {
                  return (
                    <CollectionCard
                      item={item}
                      isSelected={checkInclude(item._id)}
                      addCollection={(item: CollectionType) => {
                        handleAddCollection(item, index);
                      }}
                      removeCollection={(item: CollectionType) => {
                        handleRemoveCollection(item, index);
                      }}
                    />
                  );
                })}
              </Card>
              <div className="my-5 flex flex-row justify-center items-center">
                <div>Bạn đã chọn &nbsp;</div>
                <div
                  className={`${
                    proxyCollectionId.length > 0 ? "text-red-500" : ""
                  } font-bold text-2xl`}
                >
                  {proxyCollectionId.length}
                </div>
                <div>&nbsp; bộ sưu tập &nbsp;</div>
              </div>
            </Space>
          )}
          {collections.length == 0 && <CustomEmpty />}
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
