"use client";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, Upload } from "antd";
import type { UploadProps } from "antd";
import { getBase64, FileType, beforeUpload } from "./AvatarForm";

interface FormProps {
  setImageUrl: (url: string) => void;
}

export default function BannerForm(formProps: FormProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex gap="small">
      {imageUrl ? (
        <div className="mt-20">
          <Upload
            name="avatar"
            listType="picture"
            className="background-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
        </div>
      ) : null}
      <Upload
        name="avatar"
        listType="picture"
        className="background-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <div className="m-10 w-[800px] h-[200px]">
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
  );
}
