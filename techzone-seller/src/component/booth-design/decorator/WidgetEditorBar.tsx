"use client";
import { Button, Card } from "antd";
import { useState } from "react";
import ShopInfo from "./widgetEditorForm/ShopInfo";
import { InsertRowBelowOutlined, PicLeftOutlined } from "@ant-design/icons";
import { TbLayoutNavbarCollapseFilled } from "react-icons/tb";

import { arrayMove } from "react-sortable-hoc";
import SortableList from "@/component/booth-design/decorator/mini/SortableBar";
import { WidgetType } from "@/model/WidgetType";

export default function WidgetEditorBar() {
  // mock data
  const widgetData = [
    {
      title: "Băng chuyền",
      icon: <InsertRowBelowOutlined style={{ fontSize: "20px" }} />,
    },
    {
      title: "Hình & chữ",
      icon: <PicLeftOutlined style={{ fontSize: "20px" }} />,
    },
  ];

  const [widgets, setWidgets] = useState<WidgetType[]>([
    {
      _id: "string",
      pattern: "Băng chuyền",
      type: "banner",
      order: 0,
      visibility: true,
      // icon: <InsertRowBelowOutlined style={{ fontSize: "20px" }} />,
    },
    {
      _id: "string",
      pattern: "Hình & chữ",
      type: "banner",
      order: 0,
      visibility: false,
      // icon: <PicLeftOutlined style={{ fontSize: "20px" }} />,
    },
    {
      _id: "string",
      pattern: "Băng chuyền",
      type: "banner",
      order: 0,
      visibility: true,
      // icon: <InsertRowBelowOutlined style={{ fontSize: "20px" }} />,
    },
    {
      _id: "string",
      pattern: "Hình & chữ",
      type: "banner",
      order: 0,
      visibility: false,
      // icon: <PicLeftOutlined style={{ fontSize: "20px" }} />,
    },
    {
      _id: "string",
      pattern: "Băng chuyền",
      type: "banner",
      order: 0,
      visibility: true,
      // icon: <InsertRowBelowOutlined style={{ fontSize: "20px" }} />,
    },
    {
      _id: "string",
      pattern: "Hình & chữ",
      type: "banner",
      order: 0,
      visibility: false,
      // icon: <PicLeftOutlined style={{ fontSize: "20px" }} />,
    },
  ]);

  // var
  const [currentForm, setCurrentForm] = useState("");

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
          onClick={() => setCurrentForm("")}
        >
          Quay về
        </Button>
      )}

      {/* forms when widget bar is clicked */}
      {currentForm === "general_info" && <ShopInfo />}

      {/* widgets */}
      {currentForm === "" && (
        <SortableComponent widgets={widgets} setWidgets={setWidgets} />
      )}
    </div>
  );
}

interface SortableComponentProps {
  widgets: WidgetType[];
  setWidgets: (rubrics: WidgetType[]) => void;
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
        pattern: "",
        type: "",
        order: 0,
        visibility: true,
      }}
      handleUpdate={function (updatedWidget: WidgetType): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
