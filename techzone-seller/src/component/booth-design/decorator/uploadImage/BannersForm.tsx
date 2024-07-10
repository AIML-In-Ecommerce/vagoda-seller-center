"use client";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Upload } from "antd";
import type { UploadProps } from "antd";
import { getBase64, FileType, beforeUpload } from "./AvatarForm";
import FixedRatioCropper from "./FixedRatioCropper";
import { RiImageEditLine } from "react-icons/ri";

interface FormProps {
  setImageUrl: (url: string) => void;
}

export default function BannersForm(formProps: FormProps) {
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

  const dummyRequest = async (options: any) => {
    setTimeout(() => {
      options.onSuccess("ok");
    }, 0);
  };

  return (
    <>
      <Flex gap="small">
        {imageUrl ? (
          <div className="mt-20">
            <Upload
              customRequest={dummyRequest}
              listType="picture"
              className="background-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
          </div>
        ) : null}
        <Upload
          customRequest={dummyRequest}
          listType="picture"
          className="background-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <div className="m-10 max-w-[200px] max-h-[150px] overflow-hidden">
              {/* TODO: show image file name? or full image? how to display it? */}
              <img
                src={imageUrl}
                alt="banner"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      </Flex>
      <FixedRatioCropper
        imageUrl={imageUrl}
        setImageUrl={function (value: string): void {
          setImageUrl(value);
          formProps.setImageUrl(value);
        }}
        onCrop={handleOk}
        onCancel={handleCancel}
        isOpen={isModalOpen}
        aspectRatio={{
          label: "16:9",
          value: 16 / 9,
        }}
      />

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
    </>
  );
}
