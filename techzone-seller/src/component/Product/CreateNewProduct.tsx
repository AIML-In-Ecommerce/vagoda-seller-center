import {
  Button,
  Collapse,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
  Steps,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function CreateNewProduct() {
  const [step, setStep] = useState(0);
  const [isExpand, setIsExpand] = useState(true);
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>([
    "1",
    "2",
    "3",
  ]);

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
            <Input showCount maxLength={255} />
            <div className="mt-4 flex items-center space-x-1 font-semibold text-sm">
              <div className="text-red-500 font-bold text-lg">*</div>{" "}
              <div className="">Danh mục</div>
            </div>
            <Select
              defaultValue="Laptop"
              style={{ width: "100%" }}
              onChange={handleSelectChange}
              options={categories}
              className=""
            />
            <div className="mt-4 flex items-center space-x-1 font-semibold text-sm">
              <div className="text-red-500 font-bold text-lg">*</div>{" "}
              <div className="">Giá</div>
            </div>
            <InputNumber
              className="w-full mb-4"
              defaultValue={1000}
              formatter={(value) =>
                `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              // parser={(value: number) => value!.replace(/\$\s?|(,*)/g, "")}
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
            <TextArea
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 10 }}
            />
            <div className="mt-4 mb-2 flex items-center space-x-1 font-semibold text-sm">
              Mô tả khác
            </div>
            <Form
              className="items-center justify-center mx-auto"
              name="dynamic_form_nest_item"
              style={{ maxWidth: 600 }}
              autoComplete="off"
            >
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "first"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing configuration label",
                            },
                          ]}
                        >
                          <Input placeholder="Label" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "last"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing configuration value",
                            },
                          ]}
                        >
                          <Input placeholder="Value" />
                        </Form.Item>
                        <FiMinusCircle onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<FiPlusCircle />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item> */}
            </Form>
          </Collapse.Panel>
          <Collapse.Panel
            key="3"
            header={<p className="font-bold">3. Thêm hình ảnh</p>}
          >
            <div className="mb-2 flex items-center space-x-1 font-semibold text-xs font-light">
              Tối đa 12 ảnh, cho phép loại file: .png, .jpg
            </div>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Collapse.Panel>
        </Collapse>
        <div className=" flex flex-row-reverse space-x-2 p-4">
          <Button type="primary" className="bg-theme mx-2">
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
