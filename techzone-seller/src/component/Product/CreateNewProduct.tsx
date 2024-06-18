import {
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  Steps,
  UploadFile,
  UploadProps
} from "antd";

import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

import { MdOutlineKeyboardBackspace } from "react-icons/md";
import CategoryDropdown from "./CategoryDropdown";

import { ProductCreatedInput } from "@/apis/ProductAPI";
import { _CategoryType } from "@/model/CategoryType";
import { _ProductType } from "@/model/ProductType";
import { ProductService } from "@/services/Product";
import ImageUploader from "./ImageUploader";

type FieldType = {
  name: string;
  description: string;
  category: string[];
  brand: string;
  originalPrice: number;
  finalPrice: number;
  shop: string;
  // status: string;
  inventoryAmount: number;
  images: string[];
  attribute: {
    key: string;
    value: any;
  }[];
  sizes: string[];
  material: string;
  warranty: string;
  manufacturingPlace: string;
  color: {
    image: string;
    colorCode: string;
    colorName: string;
  }[];
};

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

export default function CreateNewProduct() {
  const [step, setStep] = useState(0);
  const [isExpand, setIsExpand] = useState(true);
  const [status, setStatus] = useState<string>(
    props.updatingProduct ? props.updatingProduct.status : "AVAILABLE"
  );
  const [collapseActiveKeys, setCollapseActiveKeys] = useState(["1", "2", "3"]);
  const [allCategories, setAllCategories] = useState<_CategoryType[]>([]);
  const [colorData, setColorData] = useState<
    { colorCode: string; colorName: string; image: string }[]
  >([]);
  const [coverImageIndex, setCoverImageIndex] = useState<number | null>(null);
  const [creatingProductMessage, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const colorList: {
      link: string;
      color: { label: string; value: string };
    }[] = colorData.map((color) => ({
      link: color.image,
      color: {
        label: color.colorName,
        value: color.colorCode,
      },
    }));

    if (
      coverImageIndex !== null &&
      coverImageIndex >= 0 &&
      coverImageIndex < imageList.length
    ) {
      const [selectedImage] = imageList.splice(coverImageIndex, 1);
      imageList.unshift(selectedImage);
    }

    const createdProductData: ProductCreatedInput = {
      shop: "",
      name: values.name,
      description: descriptionText,
      category: category[0] ? category[0] : "",
      subCategory: category[1] ? category[1] : "",
      subCategoryType: category[2] ? category[2] : null,
      brand: values.brand,
      originalPrice: values.originalPrice,
      finalPrice: values.finalPrice,
      status: status,
      inventoryAmount: values.inventoryAmount,
      images: imageList,
      attribute: {
        colors: colorList,
        size: values.sizes,
        material: values.material,
        warranty: values.warranty,
        manufacturingPlace: values.manufacturingPlace,
      },
    };

    if (props.isCreating) {
      try {
        const { status, message } = await ProductService.createProduct(
          createdProductData
        );
        creatingProductMessage.open({
          type: status === 200 ? "success" : "error",
          content: message,
        });

        setTimeout(() => {
          router.push("/product/list");
        }, 500);
      } catch (error) {
        console.error("Error creating product:", error);
        creatingProductMessage.open({
          type: "error",
          content: "Không thể tạo sản phẩm",
        });
      }
    } else {
      try {
        const { status, message } = await ProductService.updateProduct(
          createdProductData,
          props.updatingProduct?._id ? props.updatingProduct._id.toString() : ""
        );
        creatingProductMessage.open({
          type: status === 200 ? "success" : "error",
          content: message,
        });

        setTimeout(() => {
          router.push("/product/list");
        }, 500);
      } catch (error) {
        console.error("Error updating product:", error);
        creatingProductMessage.open({
          type: "error",
          content: "Không thể cập nhật sản phẩm",
        });
      }
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {};

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
  const handleSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const categories = [
    { value: "Laptop", label: "Laptop" },
    { value: "PC- Máy tính bộ", label: "PC- Máy tính bộ" },
    { value: "Điện máy - Điện gia dụng", label: "Điện máy - Điện gia dụng" },
    { value: "Điện thoại & Phụ kiện", label: "Điện thoại & Phụ kiện" },
    { value: "Màn hình máy tính", label: "Màn hình máy tính" },
    { value: "Linh kiện máy tính", label: "Linh kiện máy tính" },
    { value: "Phụ kiện máy tính", label: "Phụ kiện máy tính" },
    { value: "Game & Stream", label: "Game & Stream" },
    { value: "Phụ kiện", label: "Phụ kiện" },
    { value: "Thiết bị âm thanh", label: "Thiết bị âm thanh" },
    { value: "Thiết bị văn phòng", label: "Thiết bị văn phòng" },
    { value: "Khác", label: "Khác" },
  ];

  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

  const items = [
    { title: "Thông tin chung" },
    { title: "Mô tả sản phẩm" },
    { title: "Thêm hình ảnh" },
  ];

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
          {currentProduct ? (
            <p className="font-semibold flex space-x-2 items-center">
              <p>{currentProduct.name}</p>
              <p
                className={`text-white ${bgColor} border rounded-lg p-1 text-xs`}
              >
                {currentProduct.status}
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
              onChange={(keys) => setCollapseActiveKeys(keys as string[])}
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
                    <Form.Item
                      name="category"
                      valuePropName="category"
                      getValueFromEvent={(value: any) => {}}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn danh mục sản phẩm",
                        },
                      ]}
                    >
                      <CategoryDropdown
                        category={category}
                        allCategory={allCategories}
                        prevCategory={category}
                        setCategory={(category: string[]) => {
                          form.setFieldValue("category", category);
                          setCategory(category);
                        }}
                      />{" "}
                    </Form.Item>
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
                      initialValue={200000}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập giá ban đầu",
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full mb-4"
                        defaultValue={200000}
                        step={1000}
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
                      initialValue={100000}
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
                        step={1000}
                        formatter={(value) =>
                          `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                    </Form.Item>
                  </div>
                  <div className="">
                    <div className="mt-2 flex items-center space-x-1 font-semibold text-sm">
                      <div className="text-red-500 font-bold text-lg">*</div>{" "}
                      <div className="">Số lượng hàng trong kho</div>
                    </div>
                    <Form.Item<FieldType>
                      name="inventoryAmount"
                      initialValue={100}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số lượng hàng trong kho",
                        },
                      ]}
                    >
                      <InputNumber
                        className="w-full mb-4"
                        defaultValue={100}
                        formatter={(value) =>
                          ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                    }}
                    apiKey="z34ywiojqhkcw0gkzqfv1wf2cvba4graf9pk4w88ttj0tqd4"
                    // onInit={(_evt, editor) => (editorRef.current = editor)}
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
                <div className="flex  space-x-1 font-semibold ">
                  <div className="text-red-500 font-bold text-sm">*</div>{" "}
                  <div className="mb-2 flex items-center space-x-1 font-semibold text-xs font-light">
                    Tối đa 12 ảnh, cho phép loại file: .png, .jpg. <hr />
                    Tick vào ô hình ảnh để đặt ảnh bìa (mặc định ảnh đầu tiên)
                  </div>
                </div>

                <Form.Item<FieldType>
                  name="images"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng tải lên ít nhất 1 ảnh",
                    },
                  ]}
                >
                  <ImageUploader
                    fileUrls={imageList}
                    setFileString={(images: string[]) => {
                      form.setFieldValue("images", images);
                      setImageList(images);
                    }}
                    setCoverImageIndex={setCoverImageIndex}
                    maxNumber={12}
                    minNumber={1}
                  />
                </Form.Item>
              </Collapse.Panel>
            </Collapse>
            <div className="flex flex-row-reverse space-x-2 p-4">
              {props.isCreating ? (
                <div>
                  <Button
                    type="primary"
                    className="bg-theme mx-2"
                    // htmlType="submit"
                    onClick={() => {
                      setStatus("AVAILABLE");
                      form.submit();
                    }}
                  >
                    Tạo mới
                  </Button>

          <Button className="border-cyan-500 text-cyan-500">Lưu nháp</Button>
          <Button>Hủy</Button>
        </div>
      </div>
      <div className="w-64 fixed right-8 bg-white rounded-lg border border-slate-300 p-4 h-48 ">
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
  );
}
