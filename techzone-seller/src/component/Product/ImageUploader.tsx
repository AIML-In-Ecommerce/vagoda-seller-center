"use client";
import { UploadService } from "@/services/Upload";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { message, Radio, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import FormData from "form-data";
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ImageUploaderProps {
  fileUrls: string[];
  setFileString: (imageList: string[]) => void;
  setCoverImageIndex: (index: number) => void;
  maxNumber: number;
  minNumber: number;
}

export default function ImageUploader(props: ImageUploaderProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const initialFileList = props.fileUrls.map((url, index) => ({
      uid: `${index}`,
      name: `image-${index}`,
      status: "done",
      url: url,
    }));
    setFileList(initialFileList as UploadFile[]);
  }, [props.fileUrls]);

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

  const handleRadioChange = (index: number) => {
    setCoverImageIndex(index);
    props.setCoverImageIndex(index);
  };

  const itemRender = (originNode: React.ReactElement, file: UploadFile) => (
    <div
      style={{
        position: "relative",
        borderRadius: "10px",
        border:
          coverImageIndex === fileList.indexOf(file)
            ? "2px solid #17B43A"
            : "none",
      }}
    >
      {originNode}
      <Radio
        style={{ position: "absolute", bottom: 5, left: 5 }}
        checked={coverImageIndex === fileList.indexOf(file)}
        onChange={() => handleRadioChange(fileList.indexOf(file))}
        className="text-xs mt-4"
      ></Radio>
    </div>
  );

  const handleModalOk = async (value: any) => {
    const file = value as File;
    const formData = new FormData();
    formData.append("image", file);

    const imageUrl = await UploadService.getURLImage(formData);

    const updatedUrls: string[] = [...props.fileUrls];
    updatedUrls.push(imageUrl);

    props.setFileString(updatedUrls);
  };

  const handleRemoveFile = async (file: UploadFile) => {
    const response = await UploadService.deleteFile(file.url ?? "");
    if (response.status == 200) {
      console.log("Response: " + response);
      const updateImageUrls: string[] = props.fileUrls.filter(
        (url) => url !== file.url
      );

      console.log("Update image list: " + updateImageUrls[1]);
      props.setFileString(updateImageUrls);
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  return (
    <ImgCrop
      rotationSlider
      quality={1}
      showGrid
      showReset
      modalTitle={"Chỉnh sửa ảnh"}
      onModalOk={handleModalOk}
      modalCancel={"Hủy"}
      modalOk={"Chọn"}
    >
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={onPreview}
        itemRender={itemRender}
        maxCount={props.maxNumber}
        onRemove={handleRemoveFile}
      >
        {fileList.length < props.maxNumber && "+ Tải ảnh"}
      </Upload>
    </ImgCrop>
  );
}
