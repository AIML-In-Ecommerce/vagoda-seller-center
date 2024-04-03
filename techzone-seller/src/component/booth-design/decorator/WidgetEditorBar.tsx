"use client";
import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import ShopInfo from "./widgetEditorForm/ShopInfo";
import { InsertRowBelowOutlined, PicLeftOutlined } from "@ant-design/icons";
import { TbLayoutNavbarCollapseFilled } from "react-icons/tb";

import { arrayMove } from "react-sortable-hoc";
import SortableList from "@/component/booth-design/decorator/mini/SortableWidgetBar";
import {
  BannerPatternType,
  CategoryPatternType,
  ProductPatternType,
  PromotionPatternType,
  WidgetCategoryType,
  WidgetType,
} from "@/model/WidgetType";
import BannerWidget from "./widgetEditorForm/BannerWidget";
import ProductWidget from "./widgetEditorForm/ProductWidget";
import CategoryWidget from "./widgetEditorForm/CategoryWidget";
import PromotionWidget from "./widgetEditorForm/PromotionWidget";

export default function WidgetEditorBar() {
  // mock data
  const [widgets, setWidgets] = useState<WidgetType[]>([
    {
      _id: "category_ID",
      type: WidgetCategoryType.CATEGORY,
      order: 1,
      visibility: false,
      element: {
        pattern: CategoryPatternType.GRID,
        title: "",
        categoryIdList: [],
      },
    },
    {
      _id: "product_ID",
      type: WidgetCategoryType.PRODUCT,
      order: 2,
      visibility: true,
      element: {
        pattern: ProductPatternType.GRID,
        title: "",
        collectionId: "",
      },
    },
    {
      _id: "product_ID2",
      type: WidgetCategoryType.PRODUCT,
      order: 4,
      visibility: true,
      element: {
        pattern: ProductPatternType.CAROUSEL,
        title: "",
        collectionId: "",
      },
    },
    {
      _id: "promotion_ID",
      type: WidgetCategoryType.PROMOTION,
      order: 3,
      visibility: false,
      element: {
        pattern: PromotionPatternType.GRID,
        title: "",
        promotionIdList: [],
      },
    },
    {
      _id: "banner_ID",
      type: WidgetCategoryType.BANNER,
      order: 0,
      visibility: true,
      element: {
        pattern: BannerPatternType.CAROUSEL,
        images: [],
      },
    },
  ]);

  // var
  const [currentForm, setCurrentForm] = useState("");

  const [selectedWidget, setSelectedWidget] = useState<WidgetType>();

  useEffect(() => {
    if (selectedWidget) {
      setCurrentForm(selectedWidget.type.toString());
    }
  }, [selectedWidget]);

  return (
    <div className="bg-white mx-2 lg:w-[450px] max-w-[450px] z-0 pb-5">
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
          onClick={() => {
            setCurrentForm("");
            setSelectedWidget(undefined);
          }}
        >
          Quay về
        </Button>
      )}

      {/* forms when widget bar is clicked */}
      {currentForm === "general_info" && <ShopInfo />}

      {currentForm === WidgetCategoryType.BANNER.toString() &&
        selectedWidget && <BannerWidget widget={selectedWidget} />}

      {currentForm === WidgetCategoryType.PRODUCT.toString() &&
        selectedWidget && <ProductWidget widget={selectedWidget} />}

      {currentForm === WidgetCategoryType.CATEGORY.toString() &&
        selectedWidget && <CategoryWidget widget={selectedWidget} />}

      {currentForm === WidgetCategoryType.PROMOTION.toString() &&
        selectedWidget && <PromotionWidget widget={selectedWidget} />}

      {/* widgets */}
      {currentForm === "" && (
        <SortableComponent
          widgets={widgets}
          setWidgets={setWidgets}
          setSelectedWidget={setSelectedWidget}
        />
      )}
    </div>
  );
}

interface SortableComponentProps {
  widgets: WidgetType[];
  setWidgets: (rubrics: WidgetType[]) => void;
  setSelectedWidget: (widget: WidgetType) => void;
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
    />
  );
};
