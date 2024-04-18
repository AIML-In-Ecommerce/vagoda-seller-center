"use client";
import { Button, Card } from "antd";
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

interface WidgetEditorBarProps {
  widgets: WidgetType[];
  setWidgets(widgets: WidgetType[]): void;

  toggleInvisibilityWidget: (widget: WidgetType) => void;
  deleteWidget: (widget: WidgetType) => void;
}

export default function WidgetEditorBar(props: WidgetEditorBarProps) {
  // var
  const [currentForm, setCurrentForm] = useState("");
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>();

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
  const updateWidgets = () => {
    props.setWidgets([...props.widgets]);
    // TODO: toast update successfully
  };

  return (
    <div className="bg-white mx-2 min-w-80 z-0 pb-5">
      {/* general */}
      {currentForm === "" && (
        <div className="p-5">
          <div className="mb-5">Widget đang dùng</div>
          {/* <Button block onClick={() => setCurrentForm("general_info")}>
            Thông tin chung
          </Button> */}

          <Card
            hoverable
            style={{ width: "100%", height: "70%" }}
            onClick={() => setCurrentForm("general_info")}
          >
            <div className="m-2 grid grid-cols-8">
              <TbLayoutNavbarCollapseFilled style={{ fontSize: "20px" }} />
              <div className="col-span-5">Thông tin chung</div>
            </div>
          </Card>
        </div>
      )}
      {currentForm !== "" && (
        <Button
          style={{ marginTop: "10px", marginLeft: "10px" }}
          onClick={returnToAll}
        >
          Quay về
        </Button>
      )}

      {/* forms when widget bar is clicked */}
      {currentForm === "general_info" && <ShopInfo />}

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
