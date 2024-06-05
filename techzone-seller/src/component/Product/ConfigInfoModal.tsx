import {
  Button,
  Checkbox,
  CheckboxProps,
  ConfigProvider,
  GetProp,
  Modal,
} from "antd";
import { useState } from "react";
import { ConfigInfoType } from "./ExampleCategoryConfigField";

interface ConfigInfoModalProp {
  configList: ConfigInfoType[];
  setSelectedConfigList: (configList: ConfigInfoType[]) => void;
}

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

export default function ConfigInfoModal(props: ConfigInfoModalProp) {
  const plainOptions = props.configList.map(
    (item) => item.name + ": " + item.placeholderText
  );
  const defaultCheckedList = [plainOptions[0]];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [selectedConfigList, setSelectedConfigList] = useState<
    CheckboxValueType[]
  >([]);

  const checkAll = () => {
    // setSelectedConfigList(props.configList);
  };

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addMoreConfigInfo = (configInfo: ConfigInfoType) => {
    setSelectedConfigList((prev) => ({ ...prev, configInfo }));
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultBg: "#E0F2FE",
            },
          },
        }}
      >
        <Button
          type="default"
          className="w-2/3 flex items-center mx-auto justify-center text-center my-4"
          onClick={showModal}
        >
          + Thêm thông tin khác
        </Button>
      </ConfigProvider>

      <Modal
        title="Thêm thông tin khác"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <div className="flex flex-col">
          <Checkbox onChange={checkAll}>Chọn tất cả</Checkbox>

          <Checkbox.Group value={checkedList} onChange={onChange}>
            {" "}
            <div className="flex flex-col">
              {/* {props.configList.map((option) => (
                <Checkbox onChange={addMoreConfigInfo(option)}>
                  <div className="grid grid-cols-2 w-full">
                    <div className=""> {option.name}</div>
                    <div className="text-slate-400">
                      vd: {option.placeholderText}
                    </div>
                  </div>
                </Checkbox>
              ))} */}
            </div>
          </Checkbox.Group>
        </div>
      </Modal>
    </>
  );
}
