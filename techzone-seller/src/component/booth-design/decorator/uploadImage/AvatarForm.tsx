"use client";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import FixedRatioCropper from "./FixedRatioCropper";
import { RiImageEditLine } from "react-icons/ri";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

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

export default function AvatarForm(formProps: FormProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
        formProps.setImageUrl(url);

        setIsModalOpen(true);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Đăng tải</div>
    </button>
  );

  return (
    <>
      <div className="w-[300px]">
        <Flex gap="small">
          <Flex gap="small" vertical>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
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
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
          ) : null}
        </Flex>
      </div>
      <FixedRatioCropper
        imageUrl={imageUrl}
        setImageUrl={function (value: string): void {
          setImageUrl(value);
          formProps.setImageUrl(value);
        }}
        isOpen={isModalOpen}
        onCrop={handleOk}
        onCancel={handleCancel}
        aspectRatio={{
          label: "1:1",
          value: 1 / 1,
        }}
      />
    </>
  );
}
