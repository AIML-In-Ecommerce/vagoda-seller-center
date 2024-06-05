"use client";
import {
  Button,
  Collapse,
  CollapseProps,
  Form,
  FormProps,
  GetProp,
  Input,
  InputNumber,
  Select,
  SelectProps,
  Steps,
  UploadFile,
  UploadProps,
} from "antd";

import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import CategoryDropdown from "./Cascader";

import { _CategoryType } from "@/model/CategoryType";
import { _ProductType } from "@/model/ProductType";
import { CategoryService } from "@/services/Category";
import ColorImage from "./ColorImage";
import ColorOption from "./ColorOption";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type FieldType = {
  name: string;
  description: string;
  category: string[];
  brand: string;
  originalPrice: number;
  finalPrice: number;
  shop: string;
  status: string;
  inventoryAmount: number;
  images: {
    link: string;
    color: { label: string; value: string };
    type: string;
  }[];
  attribute: {
    key: string;
    value: any;
  }[];
  sizes: string[];
  material: string;
  warranty: string;
  origin: string;
  color: {
    link: string;
    color: { label: string; value: string };
  }[];
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface CreateNewProductProps {
  handleBack: () => void;
  isCreating: boolean;
  updatingProduct?: _ProductType | null;
}

const sizeOptions: SelectProps["options"] = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "2XL", value: "2XL" },
  { label: "3XL", value: "3XL" },
  { label: "4XL", value: "4XL" },
];

export default function CreateNewProduct(props: CreateNewProductProps) {
  const [form] = Form.useForm();
  const [fileString, setFileString] = useState<string>();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [imageUrls, setImageUrls] = useState([]);
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<string[]>([]);
  const [isExpand, setIsExpand] = useState(true);
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>([
    "1",
    "2",
    "3",
  ]);
  const [allCategories, setAllCategories] = useState<_CategoryType[]>([]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);

    const attributes = [];

    if (values.sizes && values.sizes.length > 0) {
      attributes.push({ key: "Kích cỡ", value: values.sizes });
    }
    if (values.material) {
      attributes.push({ key: "Chất liệu", value: values.material });
    }
    if (values.origin) {
      attributes.push({ key: "Nơi sản xuất", value: values.origin });
    }
    if (values.warranty) {
      attributes.push({ key: "Bảo hành", value: values.warranty });
    }

    const finalValues = {
      ...values,
      attribute: attributes,
      description: descriptionText,
      category: category,
    };

    console.log("Formatted Values:", finalValues);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo, category);
  };

  let bgColor = "";
  switch (props.updatingProduct?.status) {
    case "AVAILABLE":
      bgColor = "bg-green-400";
      break;
    case "SOLD_OUT":
      bgColor = "bg-red-400";
      break;
    case "SALE":
      bgColor = "bg-orange-400";
      break;
    case "Đã tắt":
      bgColor = "bg-gray-400";
      break;
    default:
      bgColor = "bg-blue-400";
  }

  const handleExpandInfo = () => {
    setIsExpand(true);
    setCollapseActiveKeys(["1", "2", "3"]);
  };

  const handleCollapseInfo = () => {
    setIsExpand(false);
    setCollapseActiveKeys([]);
  };
  const [descriptionText, setDescriptionText] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [currentProduct, setCurrentProduct] = useState<_ProductType | null>(
    props.updatingProduct ?? null
  );
  const editorRef = useRef<Editor | null>(null);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <FiPlusCircle className="flex-col item-center justify-center mx-auto my-auto " />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleStepChange = (currentStep: number) => {
    setStep(currentStep);
    setCollapseActiveKeys([`${currentStep + 1}`]);
  };

  const otherInfo: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-center mx-auto items-center text-sky-500 font-semibold">
          Hiển thị thông tin khác
        </div>
      ),
      children: (
        <div className="">
          <p className="font-semibold">Màu sắc</p>
          <ColorOption />

          <div className="">
            <p className="font-semibold">Kích thước</p>
            <Form.Item<FieldType> name="sizes">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Có thể chọn một hoặc nhiều kích cỡ "
                options={sizeOptions}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="">
              <p className="font-semibold">Chất liệu</p>
              <Form.Item<FieldType> name="material">
                <Input placeholder="vải cotton" />
              </Form.Item>
            </div>
            <div className="">
              <p className="font-semibold">Nơi sản xuất</p>
              <Form.Item<FieldType> name="origin">
                <Input placeholder="Pháp" />
              </Form.Item>
            </div>
            <div className="">
              <p className="font-semibold">Bảo hành</p>
              <Form.Item<FieldType> name="warranty">
                <Input placeholder="đổi trả trong vòng 7 ngày" />
              </Form.Item>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const items = [
    { title: "Thông tin chung" },
    { title: "Mô tả sản phẩm" },
    { title: "Thêm hình ảnh" },
  ];

  const getValueProps = (value: any) => {
    return {
      value: value, // Trả về giá trị là một mảng các ID
    };
  };

  useEffect(() => {
    const loadAllCategories = async () => {
      const data: _CategoryType[] = await CategoryService.getAllCategories();
      console.log("CATEGORY", data);
      setAllCategories(data);
    };

    loadAllCategories();
  }, []);

  return (
    <Form
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div>
        <div className="flex items-center space-x-1">
          <div className="" onClick={() => props.handleBack()}>
            <MdOutlineKeyboardBackspace size={25} />
          </div>
          {props.updatingProduct ? (
            <p className="font-semibold flex space-x-2 items-center">
              <p>{props.updatingProduct.name}</p>
              <p
                className={`text-white ${bgColor} border rounded-lg p-1 text-xs`}
              >
                {props.updatingProduct.status}
              </p>
            </p>
          ) : (
            <p className="font-semibold">Tạo sản phẩm mới</p>
          )}
        </div>
        <div className="flex m-2 mt-6 justify-between">
          <div className="w-3/4 bg-white rounded-lg border border-slate-300 ">
            <Collapse
              activeKey={collapseActiveKeys}
              onChange={(keys) => setCollapseActiveKeys(keys)}
            >
              <Collapse.Panel
                key="1"
                header={<p className="font-bold">1. Thông tin chung</p>}
              >
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold text-lg">*</div>{" "}
                  <div className="">Tên sản phẩm</div>
                </div>
                <Form.Item<FieldType>
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên sản phẩm" },
                  ]}
                >
                  <Input
                    showCount
                    maxLength={255}
                    placeholder="Nhập tên sản phẩm"
                  />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <div className="mt-2 flex items-center space-x-1 font-semibold text-sm">
                      <div className="text-red-500 font-bold text-lg">*</div>{" "}
                      <div className="">Danh mục</div>
                    </div>
                    {/* <Form.Item
                      name="category"
                      getValueFromEvent={({ value }) => {
                        console.log("hhh", value);
                        return value;
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn danh mục",
                        },
                      ]}
                    >
                      <CategoryDropdown
                        allCategory={allCategories}
                        prevCategory={category}
                        setCategory={setCategory}
                        getValueProps={getValueProps}
                      />
                    </Form.Item> */}
                    <CategoryDropdown
                      allCategory={allCategories}
                      prevCategory={category}
                      setCategory={setCategory}
                      getValueProps={getValueProps}
                    />
                  </div>
                  <div className="">
                    <div className="mt-2 flex items-center space-x-1 font-semibold text-sm">
                      <div className="text-red-500 font-bold text-lg">*</div>{" "}
                      <div className="">Thương hiệu</div>
                    </div>
                    <Form.Item<FieldType>
                      name="brand"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thương hiệu",
                        },
                      ]}
                    >
                      <Input placeholder="Celine" />
                    </Form.Item>
                  </div>

                  <div className="">
                    <div className="mt-2 flex items-center space-x-1 font-semibold text-sm">
                      <div className="text-red-500 font-bold text-lg">*</div>{" "}
                      <div className="">Giá ban đầu</div>
                    </div>
                    <Form.Item<FieldType>
                      name="originalPrice"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập giá ban đầu",
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full mb-4"
                        defaultValue={100000}
                        formatter={(value) =>
                          `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className="">
                    <div className="mt-2 flex items-center space-x-1 font-semibold text-sm">
                      <div className="text-red-500 font-bold text-lg">*</div>{" "}
                      <div className="">Giá sau khi giảm giá</div>
                    </div>
                    <Form.Item<FieldType>
                      name="finalPrice"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập giá sau khi giảm giá",
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full mb-4"
                        defaultValue={100000}
                        formatter={(value) =>
                          `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                    </Form.Item>
                  </div>
                </div>

                <Collapse
                  items={otherInfo}
                  defaultActiveKey={["1"]}
                  className="mt-2"
                />
              </Collapse.Panel>

              <Collapse.Panel
                key="2"
                header={<p className="font-bold">2. Mô tả sản phẩm</p>}
              >
                <div className="flex items-center space-x-1 font-semibold text-sm">
                  <div className="text-red-500 font-bold text-lg">*</div>{" "}
                  <div className="">Mô tả</div>
                </div>
                <Form.Item<FieldType>
                  name="description"
                  rules={[
                    { required: true, message: "Vui lòng nhập mô tả sản phẩm" },
                  ]}
                >
                  <Editor
                    onEditorChange={(content, editor) => {
                      setDescriptionText(content);

                      console.log("DESCRIPTION", descriptionText);
                    }}
                    apiKey="z34ywiojqhkcw0gkzqfv1wf2cvba4graf9pk4w88ttj0tqd4"
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>Thêm mô tả sản phẩm ở đây</p>"
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help" +
                        "removeformat | help | table" +
                        "image",
                      image_list: [
                        {
                          title: "My image 1",
                          value: "https://www.example.com/my1.gif",
                        },
                        {
                          title: "My image 2",
                          value: "http://www.moxiecode.com/my2.gif",
                        },
                      ],
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </Form.Item>
              </Collapse.Panel>
              <Collapse.Panel
                key="3"
                header={<p className="font-bold">3. Thêm hình ảnh</p>}
              >
                <div className="mb-2 flex items-center space-x-1 font-semibold text-xs font-light">
                  Tối đa 12 ảnh, cho phép loại file: .png, .jpg
                </div>
                {/* <Form.Item
                  {...restField}
                  name={[name, "image"]}
                  valuePropName="fileString"
                  getValueFromEvent={() => {
                    console.log("FILE", fileString);
                    return fileString;
                  }}
                >
                  <div className="space-y-1 mr-4">
                    <p className="font-semibold">
                      <span className="text-red-400 font-bold">*</span> Ảnh minh
                      họa(theo màu sắc vừa chọn)
                    </p>
                    <div className="ml-2">
                      <ColorImage
                        setFileString={setFileString}
                        maxNumber={12}
                      />
                    </div>
                  </div>
                </Form.Item> */}
                <ColorImage setFileString={setFileString} maxNumber={12} />
              </Collapse.Panel>
            </Collapse>
            <div className="flex flex-row-reverse space-x-2 p-4">
              {props.isCreating ? (
                <div>
                  <Button
                    type="primary"
                    className="bg-theme mx-2"
                    htmlType="submit"
                  >
                    Tạo mới
                  </Button>

                  <Button className="border-cyan-500 text-cyan-500">
                    Lưu nháp
                  </Button>
                  <Button className="mx-2" onClick={() => props.handleBack()}>
                    Hủy
                  </Button>
                </div>
              ) : (
                <Button className="mx-2" onClick={() => props.handleBack()}>
                  Hủy
                </Button>
              )}
            </div>
          </div>
          <div className="w-64 fixed right-4 bg-white rounded-lg border border-slate-300 p-4 h-48 ">
            <Button
              type="link"
              onClick={isExpand ? handleCollapseInfo : handleExpandInfo}
              className="text-xs"
            >
              {isExpand ? "Thu gọn " : "Mở rộng "}thông tin
            </Button>
            <Steps
              className="text-xs "
              direction="vertical"
              size="small"
              current={step}
              onChange={handleStepChange}
              items={items}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}
