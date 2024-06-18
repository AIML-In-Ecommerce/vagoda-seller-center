"use client";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Avatar, Button, Flex, message, Upload } from "antd";
import { useState } from "react";
import { RiImageEditLine } from "react-icons/ri";
import CustomProductImageCropper from "./CustomProductImageCropper";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// export const getBase64 = (img: FileType, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

interface FormProps {
  setImageUrl: (url: string) => void;
}

export default function UploadProductImage(formProps: FormProps) {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
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

  //   const handleChange: UploadProps["onChange"] = (info) => {
  //     if (info.file.status === "uploading") {
  //       setLoading(true);
  //       return;
  //     }
  //     if (info.file.status === "done") {
  //       // Get this url from response in real world.
  //       getBase64(info.file.originFileObj as FileType, (url) => {
  //         setLoading(false);
  //         setImageUrl(url);
  //         formProps.setImageUrl(url);
  //       });
  //     }
  //   };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <div className="w-[300px]">
        <Flex gap="small">
          <Flex gap="small" vertical>
            <Upload
              name="avatar"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <Avatar
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            {imageUrl ? (
              <Button
                className="mt-5 rounded-xl"
                icon={<RiImageEditLine />}
                onClick={showModal}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <></>
            )}
          </Flex>
          {imageUrl ? (
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
          ) : null}
        </Flex>
      </div>
      <CustomProductImageCropper
        imageUrl={imageUrl}
        setImageUrl={function (value: string): void {
          setImageUrl(value);
          formProps.setImageUrl(value);
        }}
        isOpen={isModalOpen}
        onCrop={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
}
