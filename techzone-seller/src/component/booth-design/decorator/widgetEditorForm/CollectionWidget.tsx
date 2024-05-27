"use client";
import {
  CollectionElement,
  CollectionPatternType,
  WidgetType,
} from "@/model/WidgetType";
import { Button, Card, Flex, Select, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon, { WidgetTypeName } from "../mini/WidgetTypeIcon";
import { CollectionType } from "@/model/CollectionType";
import CustomEmpty from "../mini/CustomEmpty";
import Search from "antd/es/input/Search";
import CollectionCard from "../mini/CollectionCard";
import { PUT_UpdateWidget } from "@/app/apis/widget/WidgetAPI";
import { GET_GetCollectionListByShop } from "@/app/apis/collection/CollectionAPI";
import { SaveStatusEnum } from "../WidgetEditorBar";

interface WidgetProps {
  widget: WidgetType;
  updateWidgets(): void;
  setSaveStatus(saveStatus: SaveStatusEnum): void;
}

export default function CollectionWidget(props: WidgetProps) {
  // mock data
  const mockId = "65f1e8bbc4e39014df775166";

  // data
  const [proxyCollectionId, setProxyCollectionId] = useState<Array<string>>([]);

  // variables
  const [collections, setCollections] = useState<CollectionType[]>();

  const [proxyCollectionWidget, setProxyCollectionWidget] = useState(
    props.widget
  );

  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  const handleGetCollectionList = async () => {
    const response = await GET_GetCollectionListByShop(mockId);
    if (response.status == 200) {
      if (response.data) {
        setCollections(response.data);
        // console.log("product", data);
      }
    }
  };

  const element = useMemo(() => {
    let temp = props.widget.element as CollectionElement;

    setProxyCollectionId(temp.collectionIdList);

    // call api to get collection info
    handleGetCollectionList();

    return temp;
  }, [props.widget.element]);

  const [pattern, setPattern] = useState(element.pattern);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: any) => {
    setSearchText(e.target.value ? e.target.value : "");
  };

  useEffect(() => {
    let saveStatus: SaveStatusEnum =
      pattern === element.pattern &&
      proxyCollectionId.length === element.collectionIdList.length &&
      isSwitched === props.widget.visibility
        ? SaveStatusEnum.NOCHANGE
        : SaveStatusEnum.UNSAVED;

    props.setSaveStatus(saveStatus);
  }, [pattern, proxyCollectionId, isSwitched]);

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
      alert("Cập nhật widget thành công!");
    } else {
      alert("Cập nhật widget thất bại...");
      // console.log(response.message);
    }
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

          {collections && collections.length > 0 && (
            <Space direction="vertical">
              <div className="flex gap-5 mt-5 border rounded bg-slate-100 p-5">
                <Search
                  placeholder="Nhập để tìm bộ sưu tập"
                  onChange={handleSearch}
                  onSearch={(e) => setSearchText(e)}
                />
                {/* <Button className="bg-blue-500 font-semibold text-white">
                  Áp dụng
                </Button> */}
              </div>
              {(!searchText && (
                <div className="font-light text-sm">
                  Tổng số bộ sưu tập: {collections.length}
                </div>
              )) || (
                <div className="font-light text-sm">
                  Kết quả tìm kiếm:{" "}
                  {searchText && (
                    <span>
                      {
                        collections.filter((c) =>
                          c.name
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                        ).length
                      }{" "}
                    </span>
                  )}
                  bộ sưu tập
                </div>
              )}

              <Card className="overflow-auto h-96">
                {collections.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        searchText === ""
                          ? ""
                          : searchText &&
                            !item.name
                              .toLowerCase()
                              .includes(searchText.toLowerCase())
                          ? "hidden"
                          : ""
                      }
                      `}
                    >
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
                    </div>
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
          {(!collections || collections.length == 0) && <CustomEmpty />}
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
