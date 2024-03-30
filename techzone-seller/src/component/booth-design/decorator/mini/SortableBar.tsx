import React, { useMemo, useState } from "react";
import {
  DeleteOutlined,
  MenuOutlined,
  InsertRowBelowOutlined,
} from "@ant-design/icons";
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableElementProps,
  SortableHandle,
} from "react-sortable-hoc";

// import DeleteWidgetModal from "./DeleteWidgetModal";

// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";
import { WidgetType } from "@/model/WidgetType";
import { Card, Switch } from "antd";

interface SortableListProps {
  items: WidgetType[];
  setWidgets: (widgets: WidgetType[]) => void;
}

interface SortableItemProps {
  widget: WidgetType;
  setWidgets: (widgets: WidgetType[]) => void;
  handleUpdate: (updatedRubric: WidgetType) => void;
}
const DragHandle = SortableHandle(() => <MenuOutlined />);

const SortableItem: React.ComponentClass<
  WidgetType & SortableElementProps & SortableItemProps
> = SortableElement((props: SortableItemProps) => {
  const [showEditModal, setEditShowModal] = React.useState(false);
  const [showDeleteModal, setDeleteShowModal] = React.useState(false);
  //   const auth = useAuth();

  const handleEditModal = () => {
    console.log("Editting modal", props.widget);
    setEditShowModal(!showEditModal);
  };

  const handleDeleteModal = () => {
    setDeleteShowModal(!showDeleteModal);
  };
  const handleDeleteGrade = async (widget_id: string) => {
    // try {
    //   const response = await axios.delete(
    //     `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}widget/${widget_id}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${auth.user?.access_token}`,
    //       },
    //     }
    //   );
    //   if (response.status === 200) {
    //     const newWidgets = response.data;

    //     props.setWidgets(newWidgets);
    //     axios
    //       .delete(
    //         `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}grade/delete/${widget_id}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${auth.user?.access_token}`,
    //           },
    //         }
    //       )
    //       .then((response) => {
    //         console.log("Delete grade success", response.data);
    //       })
    //       .catch((error) => {
    //         console.error("Error deleting grade:", error);
    //       });
    //   }
    // } catch (error: any) {
    //   console.error("Failed to delete widget:", error);
    // }
    handleDeleteModal();
  };

  const handleEditGrade = async (gradeName: string, gradeScale: number) => {
    // const newRubric: WidgetType = {
    //   _id: props.widget._id,
    //   classId: props.widget.classId,
    //   gradeName: gradeName,
    //   gradeScale: gradeScale,
    //   order: props.widget.order,
    //   status: props.widget.status,
    // };
    // props.handleUpdate(newRubric);
    handleEditModal();
  };

  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);
  const onChangeSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setIsSwitched(checked);
  };

  const switchColor = useMemo(() => {
    if (isSwitched) {
      return "#1677ff";
    } else return "lightGray";
  }, [isSwitched]);

  return (
    <div className="px-5 pb-2 flex flex-row justify-center align-middle">
      <Card hoverable style={{ width: "100%", height: "70%" }}>
        <div className="m-2 grid grid-cols-9">
          {/* TODO: use icon based on type */}
          <InsertRowBelowOutlined style={{ fontSize: "20px" }} />
          <div className="col-span-4">{props.widget.pattern}</div>
          <div className="col-span-2">
            <Switch
              checked={isSwitched}
              checkedChildren="Hiện"
              unCheckedChildren="Ẩn"
              style={{ borderColor: "black", backgroundColor: switchColor }}
              onChange={onChangeSwitch}
            />
          </div>
          <div className="col-span-1">
            <DeleteOutlined
              onClick={handleDeleteModal}
              style={{ fontSize: "20px" }}
            />
          </div>
          <div
            className="col-span-1 cursor-grab z-10"
            style={{ fontSize: "20x" }}
          >
            <DragHandle />
          </div>
        </div>
      </Card>
    </div>
  );
  //   return (
  //     <div className="flex flex-row items-center my-2 p-2 bg-gray-100 rounded mx-auto max-w-3xl">
  //       <div className="flex-shrink-0 cursor-grab">
  //         <DragHandle />
  //       </div>

  //       <div className="flex-1 max-w-64 mx-4">
  //         <div>{props.widget.pattern}</div>
  //       </div>

  //       <div className="flex flex-row space-x-4">
  //         <div className="" onClick={handleEditModal}>
  //           <MdOutlineModeEditOutline />
  //         </div>
  //         <div className="" onClick={handleDeleteModal}>
  //           <RiDeleteBinLine color="red" />
  //         </div>
  //       </div>

  //       {/* Delete Modal */}
  //       <dialog className={`modal ${showDeleteModal ? "modal-open" : ""}`}>
  //         <div className="modal-box">
  //           <div className="flex flex-row justify-between">
  //             <p className="text-sm text-gray-500">
  //               {/* Press X or click outside to close */}
  //             </p>
  //             <button onClick={handleEditModal}>
  //               <IoMdClose />
  //             </button>
  //           </div>
  //           {/* <DeleteWidgetModal
  //             name={props.widget.gradeName}
  //             scale={props.widget.gradeScale}
  //             id={props.widget._id}
  //             deleteFunc={handleDeleteGrade}
  //             cancelFunc={() => setDeleteShowModal(!showDeleteModal)}
  //           /> */}
  //         </div>
  //         <form method="dialog" className="modal-backdrop">
  //           <button onClick={handleDeleteModal}>close</button>
  //         </form>
  //       </dialog>
  //     </div>
  //   );
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
          props.items.map((value, index) => (
            <SortableItem
              key={`item-${value._id}`}
              index={index}
              widget={value}
              setWidgets={props.setWidgets}
              handleUpdate={handleUpdate}
              _id={""}
              pattern={""}
              type={""}
              order={0}
              visibility={true}
            />
          ))}
      </ul>
    </div>
  );
});

export default SortableList;
