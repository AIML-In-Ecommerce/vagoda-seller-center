"use client";
import {
  PromotionElement,
  PromotionPatternType,
  WidgetType,
} from "@/model/WidgetType";
import { Button, Card, Flex, Input, Select, Space, Tooltip } from "antd";
import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon, { WidgetTypeName } from "../mini/WidgetTypeIcon";
import { InfoCircleOutlined, FieldStringOutlined } from "@ant-design/icons";
import { DiscountType, PromotionType } from "@/model/PromotionType";
import { formatDate } from "@/utils/DateFormatter";
import CustomEmpty from "../mini/CustomEmpty";
import Search from "antd/es/input/Search";
import PromotionCard from "../mini/PromotionCard";
import { PUT_UpdateWidget } from "@/apis/widget/WidgetAPI";
import { GET_GetPromotionListByShop } from "@/apis/promotion/PromotionAPI";
import { SaveStatusEnum } from "../WidgetEditorBar";
import { AuthContext } from "@/context/AuthContext";

interface WidgetProps {
  widget: WidgetType;
  updateWidgets(): void;
  setSaveStatus(saveStatus: SaveStatusEnum): void;

  notify(message: string, content: ReactElement): void;
}

export default function PromotionWidget(props: WidgetProps) {
  const authContext = useContext(AuthContext);
  const shopId = authContext.shopInfo?._id;

  // data
  const [proxyPromotionId, setProxyPromotionId] = useState<Array<string>>([]);

  // variables
  const [promotions, setPromotions] = useState<PromotionType[]>();

  const [proxyPromotionWidget, setProxyPromotionWidget] = useState(
    props.widget
  );

  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  const [searchText, setSearchText] = useState("");
  const handleSearch = (e: any) => {
    setSearchText(e.target.value ? e.target.value : "");
  };

  // functions
  const handleSave = async () => {
    proxyPromotionWidget.visibility = isSwitched;

    element.title = title;
    element.promotionIdList = proxyPromotionId;

    proxyPromotionWidget.element = element;

    const response = await PUT_UpdateWidget(proxyPromotionWidget);

    if (response.status === 200) {
      setProxyPromotionWidget(proxyPromotionWidget);
      props.updateWidgets();
      props.notify("Cập nhật widget thành công!", <></>);
    } else {
      props.notify("Cập nhật widget thất bại...", <></>);
      // console.log(response.message);
    }
  };

  const handleChangePattern = (value: string) => {
    console.log(`selected ${value}`);
  };

  const checkInclude = (value: string) => {
    let check = false;
    proxyPromotionId.forEach((promotion) => {
      if (promotion === value) {
        check = true;
      }
    });

    // console.log(`selected ${value}, ${check}`);
    return check;
  };

  const handleAddPromotion = (value: PromotionType, index: number) => {
    if (checkInclude(value._id)) return;

    proxyPromotionId.push(value._id);
    setProxyPromotionId(proxyPromotionId);

    props.updateWidgets();
  };

  const handleRemovePromotion = (value: PromotionType, index: number) => {
    setProxyPromotionId(proxyPromotionId.filter((id) => id !== value._id));

    props.updateWidgets();
  };

  // call api
  const handleGetPromotionList = async () => {
    if (!shopId) return;
    const response = await GET_GetPromotionListByShop(shopId);
    if (response.data) {
      setPromotions(response.data);
      console.log("promotions", response.data);
    }
  };

  const element = useMemo(() => {
    let temp = props.widget.element as PromotionElement;

    setProxyPromotionId(temp.promotionIdList);

    // call api to get promotion info
    handleGetPromotionList();

    return temp;
  }, [props.widget.element, shopId]);

  const [title, setTitle] = useState(element.title);

  useEffect(() => {
    let saveStatus: SaveStatusEnum =
      title === element.title &&
      proxyPromotionId.length === element.promotionIdList.length &&
      isSwitched === props.widget.visibility
        ? SaveStatusEnum.NOCHANGE
        : SaveStatusEnum.UNSAVED;

    props.setSaveStatus(saveStatus);
  }, [title, proxyPromotionId, isSwitched]);

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
          defaultValue={PromotionPatternType.GRID.toString()}
          style={{ width: "100%" }}
          onChange={handleChangePattern}
          options={[
            {
              value: PromotionPatternType.GRID.toString(),
              label: (
                <Flex gap="small">
                  <WidgetTypeIcon
                    type={props.widget.type}
                    element={{
                      pattern: PromotionPatternType.GRID,
                      title: "",
                      promotionIdList: [],
                    }}
                  />
                  Mã giảm giá
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
        {/* select promotions */}
        <Flex vertical gap="small">
          <div className="font-semibold">Mã giảm giá</div>

          <div className="font-light text-sm">Chọn giảm giá để hiển thị</div>

          {promotions && promotions.length > 0 && (
            <Space direction="vertical">
              <div className="flex gap-5 mt-5 border rounded bg-slate-100 p-5">
                <Search
                  placeholder="Nhập để tìm mã"
                  onChange={handleSearch}
                  onSearch={(e) => setSearchText(e)}
                />
                {/* <Button className="bg-blue-500 font-semibold text-white">
                  Áp dụng
                </Button> */}
              </div>
              {(!searchText && (
                <div className="font-light text-sm">
                  Tổng số mã: {promotions.length}
                </div>
              )) || (
                <div className="font-light text-sm">
                  Kết quả tìm kiếm:{" "}
                  {searchText && (
                    <span>
                      {
                        promotions.filter((p) =>
                          p.name
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                        ).length
                      }{" "}
                    </span>
                  )}
                  mã
                </div>
              )}

              <Card className="overflow-auto h-96">
                {promotions &&
                  promotions.map((item, index) => {
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
                        <PromotionCard
                          item={item}
                          isSelected={checkInclude(item._id)}
                          applyDiscount={(item: PromotionType) => {
                            handleAddPromotion(item, index);
                          }}
                          removeDiscount={(item: PromotionType) => {
                            handleRemovePromotion(item, index);
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
                    proxyPromotionId.length > 0 ? "text-red-500" : ""
                  } font-bold text-2xl`}
                >
                  {proxyPromotionId.length}
                </div>
                <div>&nbsp; mã giảm giá sản phẩm &nbsp;</div>
              </div>
            </Space>
          )}
          {(!promotions || promotions.length == 0) && <CustomEmpty />}
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
