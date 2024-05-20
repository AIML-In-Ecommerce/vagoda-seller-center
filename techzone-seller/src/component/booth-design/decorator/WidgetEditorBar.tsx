"use client";
import { Button, Card, Divider } from "antd";
import { useEffect, useState } from "react";
import ShopInfo from "./widgetEditorForm/ShopInfo";
import { TbLayoutNavbarCollapseFilled } from "react-icons/tb";

import { arrayMove } from "react-sortable-hoc";
import SortableList from "@/component/booth-design/decorator/mini/SortableWidgetBar";
import { WidgetCategoryType, WidgetType } from "@/model/WidgetType";
import BannerWidget from "./widgetEditorForm/BannerWidget";
import ProductWidget from "./widgetEditorForm/ProductWidget";
import CategoryWidget from "./widgetEditorForm/CategoryWidget";
import PromotionWidget from "./widgetEditorForm/PromotionWidget";
import CollectionWidget from "./widgetEditorForm/CollectionWidget";
import { Link } from "react-scroll";
import { ShopInfoDesignType } from "@/model/ShopType";

enum SaveStatusEnum {
  NOCHANGE,
  UNSAVED,
}

interface WidgetEditorBarProps {
  widgets: WidgetType[];
  setWidgets(widgets: WidgetType[]): void;

  toggleInvisibilityWidget: (widget: WidgetType) => void;
  deleteWidget: (widget: WidgetType) => void;

  shopInfo: ShopInfoDesignType;
  setShopInfo(shopInfo: ShopInfoDesignType): void;
}

export default function WidgetEditorBar(props: WidgetEditorBarProps) {
  // var
  const [currentForm, setCurrentForm] = useState("");
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>();
  const [saveStatus, setSaveStatus] = useState<SaveStatusEnum>(
    SaveStatusEnum.NOCHANGE
  );

  useEffect(() => {
    if (selectedWidget) {
      setCurrentForm(selectedWidget.type.toString());
    }
  }, [selectedWidget]);

  // functions
  const returnToAll = () => {
    setCurrentForm("");
    setSelectedWidget(undefined);
  };

  //update widgets visually
  const updateWidgets = async () => {
    props.setWidgets([...props.widgets]);
  };

  return (
    <div className="mx-2 min-w-80 pb-5 bg-white">
      {/* general */}
      {currentForm === "" && (
        <div className="p-5">
          <div className="mb-5 font-extralight uppercase">Widget đang dùng</div>
          {/* <Button block onClick={() => setCurrentForm("general_info")}>
            Thông tin chung
          </Button> */}

          <Link
            activeClass="active"
            to="general-info"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            <Card
              hoverable
              style={{ width: "100%", height: "70%" }}
              onClick={() => setCurrentForm("general_info")}
            >
              <div className="grid grid-cols-8">
                <TbLayoutNavbarCollapseFilled style={{ fontSize: "20px" }} />
                <div className="col-span-5 font-semibold">Thông tin chung</div>
              </div>
            </Card>
          </Link>
          <Divider style={{ marginBottom: -10 }} />
        </div>
      )}

      {currentForm !== "" && (
        <div className="flex flex-row justify-between">
          <Button
            style={{ marginTop: "10px", marginLeft: "10px" }}
            onClick={returnToAll}
          >
            Quay về
          </Button>
          {/* wip */}
          {/* {(saveStatus === SaveStatusEnum.NOCHANGE && (
            <div className="mt-5 mr-10 text-blue-400 font-semibold">
              Có thay đổi
            </div>
          )) || (
            <div className="mt-5 mr-10 text-slate-400 font-semibold">
              Đã cập nhật
            </div>
          )} */}
        </div>
      )}

      {/* forms when widget bar is clicked */}
      {currentForm === "general_info" && (
        <ShopInfo shopInfo={props.shopInfo} setShopInfo={props.setShopInfo} />
      )}

      {currentForm === WidgetCategoryType.BANNER.toString() &&
        selectedWidget && (
          <BannerWidget widget={selectedWidget} updateWidgets={updateWidgets} />
        )}

      {currentForm === WidgetCategoryType.PRODUCT.toString() &&
        selectedWidget && (
          <ProductWidget
            widget={selectedWidget}
            updateWidgets={updateWidgets}
          />
        )}

      {currentForm === WidgetCategoryType.CATEGORY.toString() &&
        selectedWidget && (
          <CategoryWidget
            widget={selectedWidget}
            updateWidgets={updateWidgets}
          />
        )}

      {currentForm === WidgetCategoryType.PROMOTION.toString() &&
        selectedWidget && (
          <PromotionWidget
            widget={selectedWidget}
            updateWidgets={updateWidgets}
          />
        )}

      {currentForm === WidgetCategoryType.COLLECTION.toString() &&
        selectedWidget && (
          <CollectionWidget
            widget={selectedWidget}
            updateWidgets={updateWidgets}
          />
        )}

      {/* widgets */}
      {currentForm === "" && (
        <SortableComponent
          widgets={props.widgets}
          setWidgets={props.setWidgets}
          setSelectedWidget={setSelectedWidget}
          toggleInvisibilityWidget={props.toggleInvisibilityWidget}
          deleteWidget={props.deleteWidget}
        />
      )}
    </div>
  );
}

interface SortableComponentProps {
  widgets: WidgetType[];
  setWidgets: (rubrics: WidgetType[]) => void;
  setSelectedWidget: (widget: WidgetType) => void;

  toggleInvisibilityWidget: (widget: WidgetType) => void;
  deleteWidget: (widget: WidgetType) => void;
}
const SortableComponent = (props: SortableComponentProps) => {
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const updatedWidgets: WidgetType[] = arrayMove(
      props.widgets,
      oldIndex,
      newIndex
    );

    const updatedWidgetsWithOrder = updatedWidgets.map((rubric, index) => ({
      ...rubric,
      order: index,
    }));

    props.setWidgets(updatedWidgetsWithOrder);
  };

  return (
    <SortableList
      items={props.widgets}
      setWidgets={props.setWidgets}
      onSortEnd={onSortEnd}
      useDragHandle
      widget={{
        _id: "",
        type: WidgetCategoryType.PRODUCT,
        order: 0,
        visibility: true,
        element: undefined,
      }}
      handleUpdate={function (updatedWidget: WidgetType): void {
        throw new Error("Function not implemented.");
      }}
      setSelectedWidget={props.setSelectedWidget}
      toggleInvisibilityWidget={props.toggleInvisibilityWidget}
      deleteWidget={props.deleteWidget}
    />
  );
};
