import ColorImage from "@/component/Product/ColorImage";
import {
  Button,
  ColorPicker,
  ConfigProvider,
  Form,
  FormProps,
  Select,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const clothTypeList = [
  { value: "shirt", label: "Áo" },
  { value: "pants", label: "Quần" },
];

const nationalityList = [
  { value: "Vietnamese", label: "Việt Nam" },
  { value: "American", label: "Mĩ" },
  { value: "Chinese", label: "Trung Quốc" },
  { value: "Arab", label: "Ả Rập" },
];

const genderList = [
  { value: "men", label: "Nam" },
  { value: "woman", label: "Nữ" },
];

const skinColorList = [
  {
    value: "white",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#FFFFFF" disabled />
        <p>Trắng</p>
      </div>
    ),
  },
  {
    value: "yellow",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#EFD4B6" disabled />
        <p>Vàng</p>
      </div>
    ),
  },
  {
    value: "brown",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#AF895E" disabled />
        <p>Nâu</p>
      </div>
    ),
  },
  {
    value: "black",
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
    value: "brown",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#6B4226" disabled />
        <p>Nâu</p>
      </div>
    ),
  },
  {
    value: "blue",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#3487E4" disabled />
        <p>Xanh dương</p>
      </div>
    ),
  },
  {
    value: "green",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#2E8B57" disabled />
        <p>Xanh lục</p>
      </div>
    ),
  },
  {
    value: "gray",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#A9A9A9" disabled />
        <p>Xám</p>
      </div>
    ),
  },
  {
    value: "black",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#C19A6B" disabled />
        <p>Hổ phách</p>
      </div>
    ),
  },
];

const hairStyleList = [
  { value: "long hair", label: "Tóc dài" },
  { value: "short hair", label: "Tóc ngắn" },
  { value: "curly hair", label: "Tóc xoăn" },
  { value: "wavy hair", label: "Tóc gợn sóng" },
];

const hairColorList = [
  {
    value: "brown",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#6B4226" disabled />
        <p>Nâu</p>
      </div>
    ),
  },
  {
    value: "blue",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#3487E4" disabled />
        <p>Xanh dương</p>
      </div>
    ),
  },
  {
    value: "yellow",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#F4D613" disabled />
        <p>Xanh lục</p>
      </div>
    ),
  },
  {
    value: "smoky gray",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#A9A9A9" disabled />
        <p>Xám</p>
      </div>
    ),
  },
  {
    value: "black",
    label: (
      <div className="flex space-x-1">
        <ColorPicker defaultValue="#000000" disabled />
        <p>Đen</p>
      </div>
    ),
  },
];

const bodyShapeList = [
  { value: "fat", label: "Mập" },
  { value: "thin", label: "Gầy" },
  { value: "proportional", label: "Cân đối" },
  { value: "slender", label: "Mảnh mai" },
  { value: "burly", label: "Vạm vỡ" },
  { value: "muscular", label: "Có cơ bắp" },
];

const postureList = [
  { value: "standing", label: "Đứng" },
  { value: "sitting", label: "Ngồi" },
];

const backgroundList = [
  { value: "coffee shop", label: "Quán cà phê" },
  { value: "shopping mall", label: "Trung tâm thương mại" },
  { value: "restaurant", label: "Nhà hàng" },
  { value: "park", label: "Công viên" },
  { value: "stadium", label: "Sân vận động" },
];

type FieldType = {
  clothType: string;
  imageLink: string;
  nationality: string;
  gender: string[];
  skinColor: string;
  eyesColor: number;
  hairStyle: string;
  hairColor: string;
  bodyShape: string;
  posture: string;
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
      imageLink: productImageLink ? productImageLink : "",
    });
    onClose();
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {};

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 12,
        },
        components: {
          Form: {
            paddingContentVertical: 0,
            verticalLabelPadding: "0 0 0px",
          },
        },
      }}
    >
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="grid grid-cols-4  px-8 pt-8 pb-8">
          <div className="col-span-2">
            <div className="flex flex-col mb-4">
              {" "}
              <p className="text-2xl font-bold uppercase">
                Tạo hình ảnh sản phẩm{" "}
              </p>
              <p className="text-slate-400">
                Chức năng tạo hình ảnh sản phẩm bằng AI
              </p>
            </div>

            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Loại sản phẩm</div>
                </div>
                <Form.Item<FieldType>
                  initialValue={"shirt"}
                  name="clothType"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại sản phẩm",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="shirt"
                    style={{ width: "100%" }}
                    options={clothTypeList}
                  />
                </Form.Item>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Ảnh sản phẩm</div>
                </div>
                {/* <p className="font-semibold">Ảnh sản phẩm</p> */}
                <Form.Item<FieldType>
                  name="imageLink"
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
                      form.setFieldValue("imageLink", data);
                    }}
                    maxNumber={1}
                    initialUrl={null}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex items-center">
              <p className="font-bold text-xl mr-4 mb-2">Đặc điểm người mẫu</p>
              <div className="flex-1 flex items-center">
                <hr className="w-full font-semibold border-t-1 border-gray-300" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-0">
              <div className="m-0 p-0">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Quốc gia</div>
                </div>
                <Form.Item<FieldType>
                  name="nationality"
                  initialValue={"Vietnamese"}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn quốc gia",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="Vietnamese"
                    style={{ width: "100%" }}
                    options={nationalityList}
                  />
                </Form.Item>
              </div>
              <div className="m-0 p-0">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Giới tính</div>
                </div>
                <Form.Item<FieldType>
                  name="gender"
                  initialValue={"men"}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn giới tính",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="men"
                    style={{ width: "100%" }}
                    options={genderList}
                  />
                </Form.Item>
              </div>
              <div className="">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Màu da</div>
                </div>
                <Form.Item<FieldType>
                  initialValue={"white"}
                  name="skinColor"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn màu da",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="white"
                    style={{ width: "100%" }}
                    options={skinColorList}
                  />
                </Form.Item>
              </div>
              <div className="">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Màu mắt</div>
                </div>
                <Form.Item<FieldType>
                  initialValue={"brown"}
                  name="eyesColor"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn màu mắt",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="brown"
                    style={{ width: "100%" }}
                    options={eyesColorList}
                  />
                </Form.Item>
              </div>

              <div className="">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Kiểu tóc</div>
                </div>
                <Form.Item<FieldType>
                  initialValue={"long hair"}
                  name="hairStyle"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn kiểu tóc",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="long hair"
                    style={{ width: "100%" }}
                    options={hairStyleList}
                  />
                </Form.Item>
              </div>
              <div className="">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Màu tóc</div>
                </div>

                <Form.Item<FieldType>
                  initialValue={"brown"}
                  name="hairColor"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn màu tóc",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="brown"
                    style={{ width: "100%" }}
                    options={hairColorList}
                  />
                </Form.Item>
              </div>
              <div className="">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Dáng người</div>
                </div>
                <Form.Item<FieldType>
                  initialValue={"fat"}
                  name="bodyShape"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn dáng người",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="fat"
                    style={{ width: "100%" }}
                    options={bodyShapeList}
                  />
                </Form.Item>
              </div>
              <div className="">
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold ">*</div>{" "}
                  <div className="text-xs">Tư thế</div>
                </div>
                <Form.Item<FieldType>
                  initialValue={"standing"}
                  name="posture"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tư thế",
                    },
                  ]}
                  style={{ margin: 4 }}
                >
                  <Select
                    defaultValue="standing"
                    style={{ width: "100%" }}
                    options={postureList}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="">
              <div className="flex  justify-between font-smibold">
                <div className="flex  space-x-1 items-center font-semibold text-sm">
                  <div className="text-red-500  ">*</div>{" "}
                  <div className="text-xs">Khung cảnh</div>
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
                initialValue={"coffee shop"}
                name="background"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn khung cảnh",
                  },
                ]}
                style={{ margin: 4 }}
              >
                {enterInputOption ? (
                  <TextArea
                    rows={4}
                    placeholder="Hãy chia sẻ những gì bạn muốn chúng tôi giúp đỡ "
                  />
                ) : (
                  <Select
                    defaultValue="coffee shop"
                    style={{ width: "47%" }}
                    options={backgroundList}
                  />
                )}
              </Form.Item>
            </div>
            <Button
              type="primary"
              className=" bg-gradient-to-r from-cyan-500 to-blue-500 w-full mt-8"
              htmlType="submit"
            >
              Bắt đầu
            </Button>
          </div>
        </div>{" "}
      </Form>
    </ConfigProvider>
  );
};

export default GenAiFormModal;
