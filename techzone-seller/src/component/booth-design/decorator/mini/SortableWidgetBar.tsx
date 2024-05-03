import { DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle,
} from "react-sortable-hoc";

// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";
import { WidgetCategoryType, WidgetType } from "@/model/WidgetType";
import { Card } from "antd";
import CustomSwitch from "./CustomSwitch";
import WidgetTypeIcon, { WidgetTypeName } from "./WidgetTypeIcon";
import { Link } from "react-scroll";

interface SortableListProps {
  items: WidgetType[];
  setWidgets: (widgets: WidgetType[]) => void;
  setSelectedWidget: (widget: WidgetType) => void;

  toggleInvisibilityWidget: (widget: WidgetType) => void;
  deleteWidget: (widget: WidgetType) => void;
}

interface SortableItemProps {
  widget: WidgetType;
  setWidgets: (widgets: WidgetType[]) => void;
  handleUpdate: (updatedRubric: WidgetType) => void;
  setSelectedWidget: (widget: WidgetType) => void;

  toggleInvisibilityWidget: (widget: WidgetType) => void;
  deleteWidget: (widget: WidgetType) => void;
}
const DragHandle = SortableHandle(() => <MenuOutlined />);

const SortableItem: React.ComponentClass<
  WidgetType & SortableElementProps & SortableItemProps
> = SortableElement((props: SortableItemProps) => {
  //   const auth = useAuth();

  return (
    <div>
      <Link
        activeClass="active"
        to={props.widget._id}
        spy={true}
        smooth={true}
        offset={-80}
        duration={500}
      >
        <div className="ml-7 text-xs uppercase font-semibold text-gray-500">
          widget {props.widget.order + 1}
        </div>
        <div className="px-5 pb-2 flex flex-row justify-center align-middle z-20">
          <Card
            hoverable
            style={{ width: "100%", height: "70%" }}
            onClick={() => props.setSelectedWidget(props.widget)}
          >
            <div className="m-2 grid grid-cols-9">
              <WidgetTypeIcon
                type={props.widget.type}
                element={props.widget.element}
              />

              <div className="col-span-4 max-w-[100px] text-center ml-1">
                <WidgetTypeName
                  type={props.widget.type}
                  element={props.widget.element}
                  order={props.widget.order}
                />
              </div>

              <div
                className="col-span-2 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <CustomSwitch
                  isSwitched={props.widget.visibility}
                  setIsSwitched={() =>
                    props.toggleInvisibilityWidget(props.widget)
                  }
                />
              </div>
              <div
                className="col-span-1 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <DeleteOutlined
                  onClick={() => props.deleteWidget(props.widget)}
                  style={{ fontSize: "14px", marginLeft: "10px" }}
                />
              </div>
              <div
                className="col-span-1 cursor-grab z-30"
                style={{ fontSize: "14px" }}
              >
                <DragHandle />
              </div>
            </div>
          </Card>
        </div>
      </Link>
    </div>
  );
});

const SortableList: React.ComponentClass<
  SortableListProps & SortableItemProps & SortableContainerProps
> = SortableContainer((props: SortableListProps) => {
  console.log("Sort List Item", props.items);
  const handleUpdate = (updatedRubric: WidgetType) => {
    const updatedItems = props.items.map((item) =>
      item._id === updatedRubric._id ? updatedRubric : item
    );

    props.setWidgets(updatedItems);
  };
  return (
    <div className="overflow-y-auto overflow-x-hidden max-h-[400px]">
      <ul>
        {props.items &&
          props.items.length > 0 &&
          props.items
            .sort((a, b) => a.order - b.order)
            .map((value, index) => (
              <div key={index}>
                <SortableItem
                  key={`item-${value._id}`}
                  index={index}
                  widget={value}
                  setWidgets={props.setWidgets}
                  handleUpdate={handleUpdate}
                  element={undefined}
                  _id={""}
                  type={WidgetCategoryType.PRODUCT}
                  order={0}
                  visibility={true}
                  setSelectedWidget={props.setSelectedWidget}
                  toggleInvisibilityWidget={props.toggleInvisibilityWidget}
                  deleteWidget={props.deleteWidget}
                />
              </div>
            ))}
      </ul>
    </div>
  );
});

export default SortableList;
