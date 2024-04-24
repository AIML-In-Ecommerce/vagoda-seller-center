import {
  Button,
  Collapse,
  CollapseProps,
  GetProp,
  Image,
  Input,
  InputNumber,
  Select,
  Steps,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";

import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";

import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import CategoryDropdown_ from "./Cascader";
import {
  accessorySpecs,
  applianceSpecs,
  audioDeviceSpecs,
  computerAccessorySpecs,
  computerComponentSpecs,
  ConfigInfoType,
  desktopSpecs,
  gameStreamSpecs,
  laptopSpecs,
  monitorSpecs,
  officeDeviceSpecs,
  otherProductSpecs,
  phoneAccessorySpecs,
} from "./ExampleCategoryConfigField";

// import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface CreateNewProductProps {
  handleBack: () => void;
}

export default function CreateNewProduct(props: CreateNewProductProps) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<string[]>([]);
  const [isExpand, setIsExpand] = useState(true);
  const [collapseActiveKeys, setCollapseActiveKeys] = useState<string[]>([
    "1",
    "2",
    "3",
  ]);
  const [currentConfigInfoType, setCurrentConfigInfoType] = useState<
    ConfigInfoType[]
  >([]);
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  // const onEditorStateChange = (newEditorState: any) => {
  //   setEditorState(newEditorState);
  // };

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
  const editorRef = useRef("");

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

  const colors = [
    { value: "Đen", label: "Đen" },
    { value: "Trắng", label: "Trắng" },
    { value: "Xám", label: "Xám" },
    { value: "Bạc", label: "Bạc" },
    { value: "Vàng", label: "Vàng" },
    { value: "Xanh dương", label: "Xanh dương" },
    { value: "Xanh lá cây", label: "Xanh lá cây" },
    { value: "Xanh ngọc", label: "Xanh ngọc" },
    { value: "Xanh navy", label: "Xanh navy" },
    { value: "Đỏ", label: "Đỏ" },
    { value: "Hồng", label: "Hồng" },
    { value: "Cam", label: "Cam" },
    { value: "Tím", label: "Tím" },
    { value: "Nâu", label: "Nâu" },
    { value: "Vàng nâu", label: "Vàng nâu" },
    { value: "Hồng nâu", label: "Hồng nâu" },
    { value: "Bạch kim", label: "Bạch kim" },
    { value: "Hồng nhạt", label: "Hồng nhạt" },
    { value: "Xám nhạt", label: "Xám nhạt" },
    { value: "Xanh nhạt", label: "Xanh nhạt" },
    { value: "Da bò", label: "Da bò" },
    { value: "Nâu đỏ", label: "Nâu đỏ" },
    { value: "Xanh lục", label: "Xanh lục" },
    { value: "Hồng phấn", label: "Hồng phấn" },
    { value: "Đen huyền bí", label: "Đen huyền bí" },
    { value: "Xám đậm", label: "Xám đậm" },
    { value: "Bạc đậm", label: "Bạc đậm" },
    { value: "Xanh đậm", label: "Xanh đậm" },
    { value: "Đỏ rượu vang", label: "Đỏ rượu vang" },
    { value: "Xanh rêu", label: "Xanh rêu" },
  ];

  const otherInfo: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-center mx-auto items-center text-sky-500 font-semibold">
          Hiển thị thông tin khác
        </div>
      ),
      children: (
        <div className="grid grid-cols-2 gap-4">
          {" "}
          {currentConfigInfoType.map((item) => (
            <div className="">
              <div className="font-semibold">{item.name}</div>
              {item.name != "Màu sắc" ? (
                <Input placeholder={item.placeholderText} />
              ) : (
                <Select
                  defaultValue="Đen"
                  options={colors}
                  className="w-full"
                />
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];

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

  useEffect(() => {
    switch (category[0]) {
      case "1":
        setCurrentConfigInfoType(laptopSpecs);
        break;
      case "2":
        setCurrentConfigInfoType(applianceSpecs);
        break;
      case "3":
        setCurrentConfigInfoType(desktopSpecs);
        break;
      case "4":
        setCurrentConfigInfoType(monitorSpecs);
        break;
      case "5":
        setCurrentConfigInfoType(computerComponentSpecs);
        break;
      case "6":
        setCurrentConfigInfoType(computerAccessorySpecs);
        break;
      case "7":
        setCurrentConfigInfoType(gameStreamSpecs);
        break;
      case "8":
        setCurrentConfigInfoType(phoneAccessorySpecs);
        break;
      case "9":
        setCurrentConfigInfoType(accessorySpecs);
        break;
      case "10":
        setCurrentConfigInfoType(audioDeviceSpecs);
        break;
      case "11":
        setCurrentConfigInfoType(officeDeviceSpecs);
        break;
      case "12":
        setCurrentConfigInfoType(otherProductSpecs);
        break;
      default:
        setCurrentConfigInfoType(otherProductSpecs);
    }
  }, [category]);

  console.log("category: " + category);

  return (
    <div>
      <div className="flex items-center space-x-1">
        <div className="" onClick={() => props.handleBack()}>
          <MdOutlineKeyboardBackspace size={25} />
        </div>
        <p className="font-semibold">Tạo sản phẩm mới</p>
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
              <Input showCount maxLength={255} />

              <div className="grid grid-cols-2 gap-4">
                {" "}
                <div className="">
                  <div className="mt-2 flex items-center space-x-1 font-semibold text-sm">
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
                </div>
                <div className="">
                  <div className="mt-2 flex items-center space-x-1 font-semibold text-sm">
                    <div className="text-red-500 font-bold text-lg">*</div>{" "}
                    <div className="">Thương hiệu</div>
                  </div>
                  <Input showCount maxLength={255} />
                </div>
              </div>
              <div className="mt-2 flex items-center space-x-1 font-semibold text-sm">
                <div className="text-red-500 font-bold text-lg">*</div>{" "}
                <div className="">Danh mục</div>
              </div>
              {/* <Select
                defaultValue="Laptop"
                style={{ width: "100%" }}
                onChange={handleSelectChange}
                options={categories}
                className=""
              /> */}
              {/* <CategoryDropdown /> */}

              <CategoryDropdown_
                prevCategory={category}
                setCategory={setCategory}
              />
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
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
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
            <Button onClick={() => props.handleBack()}>Hủy</Button>
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
    </div>
  );
}
