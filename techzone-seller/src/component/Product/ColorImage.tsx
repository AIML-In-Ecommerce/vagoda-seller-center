import { UploadService } from "@/services/Upload";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { ConfigProvider, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import FormData from "form-data";
import { useEffect, useState } from "react";
import { BsPersonBoundingBox } from "react-icons/bs";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ColorImageProps {
  initialUrl: string | null;
  setFileString: (fileString: string) => void;
  maxNumber: number;
  isDisplayLarge: boolean;
}

export default function ColorImage(props: ColorImageProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadStyle = props.isDisplayLarge ? { width: 260, height: 260 } : {};

  const onChange: UploadProps["onChange"] = async (value: any) => {
    const { fileList: newFileList } = value;
    if (
      (newFileList.length > 0 && newFileList[0].originFileObj) ||
      fileList.length < newFileList.length
    ) {
      const file = newFileList[0].originFileObj as File;
      const formData = new FormData();
      formData.append("image", file);

      const imageUrl = await UploadService.getURLImage(formData);

      const updatedFile = {
        ...newFileList[0],
        status: "done",
        url: imageUrl,
      };

      if (imageUrl) {
        props.setFileString(imageUrl);
        setFileList([updatedFile] as UploadFile[]);
      }
    } else {
      setFileList(newFileList);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleModalOk = async (value: any) => {
    if (value) {
      const file = value as File;
      const formData = new FormData();
      formData.append("image", file);

      const imageUrl = await UploadService.getURLImage(formData);

      const updatedFile = {
        ...value,
        status: "done",
        url: imageUrl,
      };

      if (imageUrl) {
        props.setFileString(imageUrl);
        setFileList([updatedFile] as UploadFile[]);
      }
    } else {
      setFileList([value]);
    }
  };

  useEffect(() => {
    // Initialize fileList with existing file URLs
    if (props.initialUrl) {
      const initialFile = {
        uid: props.initialUrl,
        name: `image-${props.initialUrl}`,
        status: "done",
        url: props.initialUrl,
      };
      setFileList([initialFile] as UploadFile[]);
    }
  }, [props.initialUrl]);

  return (
    <div>
      <ImgCrop
        rotationSlider
        quality={1}
        showGrid
        showReset
        modalTitle={"Chỉnh sửa ảnh"}
        onModalOk={handleModalOk}
      >
        <ConfigProvider
          theme={
            props.isDisplayLarge
              ? {
                  token: {
                    colorFillAlter: "rgba(25,24,25, 0.58)",
                    lineWidth: 2,
                    paddingXS: 0,
                    borderRadiusXS: 8,
                    borderRadiusOuter: 8,
                    colorBorder: "#fdfdfd94",
                    colorPrimaryHover: "rgba(25,24,25, 0.58)",
                    colorBgMask: "rgba(25,24,25, 0.58)",
                    colorPrimary: "rgba(25,24,25, 0.58)",
                    fontSize: 16,

                    controlHeightLG: 100,
                  },
                }
              : {}
          }
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            maxCount={props.maxNumber}
            itemRender={(originNode, file) => (
              <div
                style={{
                  ...uploadStyle,
                  borderRadius: "5%",
                  overflow: "hidden",
                  padding: 0,
                }}
              >
                {originNode}
              </div>
            )}
            style={{ padding: 0 }}
          >
            {fileList.length < props.maxNumber &&
              (props.isDisplayLarge ? (
                <div className="flex flex-col items-center justify-center mx-auto space-y-2">
                  <div className="text-white">
                    <BsPersonBoundingBox size={100} />
                  </div>
                  <p className="italic text-white text-xs">
                    Bấm để tải ảnh sản phẩm lên
                  </p>
                </div>
              ) : (
                "+ Tải lên"
              ))}
          </Upload>
        </ConfigProvider>
      </ImgCrop>
    </div>
  );
}
