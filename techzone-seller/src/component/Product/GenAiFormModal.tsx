import ColorImage from "@/component/Product/ColorImage";
import { Button, ColorPicker, Form, FormProps, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const nationalityList = [
  { value: "Mĩ", label: "Mĩ" },
  { value: "Úc", label: "Úc" },
  { value: "Anh", label: "Anh" },
  { value: "Trung Quốc", label: "Trung Quốc" },
  { value: "Ả Rập", label: "Ả Rập" },
  { value: "Việt Nam", label: "Việt Nam" },
];

const genderList = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];

const skinColorList = [
  {
    value: "Trắng",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#FFFFFF" disabled />
        <p>Trắng</p>
      </div>
    ),
  },
  {
    value: "Da",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#F4E9DE" disabled />
        <p>Da</p>
      </div>
    ),
  },
  {
    value: "Vàng",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#EFD4B6" disabled />
        <p>Vàng</p>
      </div>
    ),
  },
  {
    value: "Nâu",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#AF895E" disabled />
        <p>Nâu</p>
      </div>
    ),
  },
  {
    value: "Đen",
    label: (
      <div className="flex space-x-1">
        <ColorPicker size="small" defaultValue="#403B35" disabled />
        <p>Đen</p>
      </div>
    ),
  },
];

const eyesColorList = [
  {
    value: "Nâu",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#6B4226" disabled />
        <p>Nâu</p>
      </div>
    ),
  },
  {
    value: "Xanh dương",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#3487E4" disabled />
        <p>Xanh dương</p>
      </div>
    ),
  },
  {
    value: "Xanh lục",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#2E8B57" disabled />
        <p>Xanh lục</p>
      </div>
    ),
  },
  {
    value: "Xám",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#A9A9A9" disabled />
        <p>Xám</p>
      </div>
    ),
  },
  {
    value: "Đen",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#C19A6B" disabled />
        <p>Hổ phách</p>
      </div>
    ),
  },
];

const hairStyleList = [
  { value: "Tóc đầu đinh", label: "Tóc đầu đinh" },
  { value: "Tóc đầu nấm", label: "Tóc đầu nấm" },
  { value: "Tóc hai mái", label: "Tóc hai mái" },
  { value: "Tóc bob", label: "Tóc bob" },
  { value: "Tóc mái ngố", label: "Tóc mái ngố" },
  { value: "Tóc thẳng dài", label: "Tóc thẳng" },
  { value: "Tóc dài xoăn", label: "Tóc xoăn" },
  { value: "Tóc gợn sóng", label: "Tóc gợn sóng" },
];

const hairColorList = [
  {
    value: "Nâu",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#6B4226" disabled />
        <p>Nâu</p>
      </div>
    ),
  },
  {
    value: "Xanh dương",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#3487E4" disabled />
        <p>Xanh dương</p>
      </div>
    ),
  },
  {
    value: "Vàng",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#F4D613" disabled />
        <p>Xanh lục</p>
      </div>
    ),
  },
  {
    value: "Xám khói ",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#A9A9A9" disabled />
        <p>Xám</p>
      </div>
    ),
  },
  {
    value: "Đen",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#000000" disabled />
        <p>Đen</p>
      </div>
    ),
  },
];

const bodyShapeList = [
  { value: "Mập", label: "Mập" },
  { value: "Gầy", label: "Gầy" },
  { value: "Tương đối", label: "Tương đối" },
  { value: "Mảnh khảnh", label: "Mảnh khảnh" },
  { value: "Vạm vỡ", label: "Vạm vỡ" },
  { value: "Có cơ bắp", label: "Có cơ bắp" },
];

const backgroundList = [
  { value: "Quán cà phê", label: "Quán cà phê" },
  { value: "Trung tâm thương mại", label: "Trung tâm thương mại" },
  { value: "Góc phố", label: "Góc phố" },
  { value: "Nhà hàng", label: "Nhà hàng" },
  { value: "Trong nhà", label: "Trong nhà" },
];

type FieldType = {
  image_link: string;
  nationality: string;
  gender: string[];
  skinColor: string;
  eyesColor: number;
  hairStyle: string;
  hairColor: string;
  bodyShape: string;
  background: string;
};

interface GenAiFormModalProps {
  onClose: () => void;
  onSubmit: (values: FieldType) => void;
}

const GenAiFormModal: React.FC<GenAiFormModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [enterInputOption, setEnterInputOption] = useState<boolean>(false);
  const [productImageLink, setProductImageLink] = useState<string>();

  const onFinish = async (values: FieldType) => {
    onSubmit({
      ...values,
      image_link: productImageLink ? productImageLink : "",
    });
    onClose();
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {};

  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="grid grid-cols-4 gap-2 px-8 pt-8 pb-8">
        <div className="col-span-2">
          <div className="flex flex-col mb-16">
            {" "}
            <p className="text-2xl font-bold uppercase">
              Tạo hình ảnh sản phẩm{" "}
            </p>
            <p className="text-slate-400">
              Chức năng tạo hình ảnh sản phẩm bằng AI
            </p>
          </div>
          <p className="font-semibold">Ảnh sản phẩm</p>
          <div>
            <Form.Item<FieldType>
              name="image_link"
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải ảnh sản phẩm lên",
                },
              ]}
              className="p-0 m-0"
            >
              <ColorImage
                isDisplayLarge={true}
                setFileString={(data) => {
                  setProductImageLink(data);
                  form.setFieldValue("image_link", data);
                }}
                maxNumber={1}
                initialUrl={null}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex items-center">
            <p className="font-bold text-xl mr-4">Đặc điểm người mẫu</p>
            <div className="flex-1 flex items-center">
              <hr className="w-full font-semibold border-t-1 border-gray-300" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            <div className="">
              <div className="flex items-center space-x-1 font-semibold text-sm">
                <div className="text-red-500 font-bold text-lg">*</div>{" "}
                <div className="">Quốc tịch</div>
              </div>
              <Form.Item<FieldType>
                name="nationality"
                initialValue={"Mĩ"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn quốc tịch",
                  },
                ]}
                className="p-0 m-0"
              >
                <Select
                  defaultValue="Mĩ"
                  style={{ width: "100%" }}
                  options={nationalityList}
                />
              </Form.Item>
            </div>
            <div className="">
              <div className="flex items-center space-x-1 font-semibold text-sm">
                <div className="text-red-500 font-bold text-lg">*</div>{" "}
                <div className="">Giới tính</div>
              </div>
              <Form.Item<FieldType>
                name="gender"
                initialValue={"Nam"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính",
                  },
                ]}
              >
                <Select
                  defaultValue="Nam"
                  style={{ width: "100%" }}
                  options={genderList}
                />
              </Form.Item>
            </div>
            <div className="">
              <div className="flex items-center space-x-1 font-semibold text-sm">
                <div className="text-red-500 font-bold text-lg">*</div>{" "}
                <div className="">Màu da</div>
              </div>
              <Form.Item<FieldType>
                initialValue={"Trắng"}
                name="skinColor"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn màu da",
                  },
                ]}
              >
                <Select
                  defaultValue="Trắng"
                  style={{ width: "100%" }}
                  options={skinColorList}
                />
              </Form.Item>
            </div>
            <div className="">
              <div className="flex items-center space-x-1 font-semibold text-sm">
                <div className="text-red-500 font-bold text-lg">*</div>{" "}
                <div className="">Màu mắt</div>
              </div>
              <Form.Item<FieldType>
                initialValue={"Nâu"}
                name="eyesColor"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn màu mắt",
                  },
                ]}
              >
                <Select
                  defaultValue="Nâu"
                  style={{ width: "100%" }}
                  options={eyesColorList}
                />
              </Form.Item>
            </div>

            <div className="">
              <div className="flex items-center space-x-1 font-semibold text-sm">
                <div className="text-red-500 font-bold text-lg">*</div>{" "}
                <div className="">Kiểu tóc</div>
              </div>
              <Form.Item<FieldType>
                initialValue={"Tóc đầu đinh"}
                name="hairStyle"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn kiểu tóc",
                  },
                ]}
              >
                <Select
                  defaultValue="Tóc đầu đinh"
                  style={{ width: "100%" }}
                  options={hairStyleList}
                />
              </Form.Item>
            </div>
            <div className="">
              <div className="flex items-center space-x-1 font-semibold text-sm">
                <div className="text-red-500 font-bold text-lg">*</div>{" "}
                <div className="">Màu tóc</div>
              </div>

              <Form.Item<FieldType>
                initialValue={"Nâu"}
                name="hairColor"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn màu tóc",
                  },
                ]}
              >
                <Select
                  defaultValue="Nâu"
                  style={{ width: "100%" }}
                  options={hairColorList}
                />
              </Form.Item>
            </div>
            <div className="">
              <div className="flex items-center space-x-1 font-semibold text-sm">
                <div className="text-red-500 font-bold text-lg">*</div>{" "}
                <div className="">Dáng người</div>
              </div>
              <Form.Item<FieldType>
                initialValue={"Mập"}
                name="bodyShape"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn dáng người",
                  },
                ]}
              >
                <Select
                  defaultValue="Mập"
                  style={{ width: "100%" }}
                  options={bodyShapeList}
                />
              </Form.Item>
            </div>
          </div>
          <div className="">
            <div className="flex  justify-between font-smibold">
              <div className="flex  space-x-1 items-center font-semibold text-sm">
                <div className="text-red-500  text-lg">*</div>{" "}
                <div className="">Khung cảnh</div>
              </div>
              <div className="flex space-x-2 text-xs items-center ">
                <p>Tự nhập mô tả</p>{" "}
                <Switch
                  size="small"
                  onClick={() => setEnterInputOption(!enterInputOption)}
                />
              </div>
            </div>
            <Form.Item<FieldType>
              initialValue={"Quán cà phê"}
              name="background"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn khung cảnh",
                },
              ]}
            >
              {enterInputOption ? (
                <TextArea
                  rows={4}
                  placeholder="Hãy chia sẻ những gì bạn muốn chúng tôi giúp đỡ "
                />
              ) : (
                <Select
                  defaultValue="Quán cà phê"
                  style={{ width: "50%" }}
                  options={backgroundList}
                />
              )}
            </Form.Item>
          </div>
          <Button
            type="primary"
            className=" bg-gradient-to-r from-cyan-500 to-blue-500 w-full"
            htmlType="submit"
          >
            Bắt đầu
          </Button>
        </div>
      </div>{" "}
    </Form>
  );
};

export default GenAiFormModal;
