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
    console.log("FLAG 1", fileList, "Thao", props.fileUrls);
  }, [props.fileUrls]);

  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    let updatedURL: string[] = [...props.fileUrls];
    const updatedFileList: UploadFile[] = [];

    for (const item of newFileList) {
      if (item.originFileObj) {
        const file = item.originFileObj as File;
        const formData = new FormData();
        formData.append("image", file);

        const imageUrl = await UploadService.getURLImage(formData);

        const updatedFile = {
          ...item,
          status: "done",
          url: imageUrl,
        };

        updatedFileList.push(updatedFile as UploadFile);

        if (imageUrl) {
          updatedURL.push(imageUrl);
        }
      } else {
        updatedFileList.push(item);
      }
    }

    console.log("FLAG 2");
    setFileList(updatedFileList as UploadFile[]);
    props.setFileString(updatedURL);
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

    const updatedFile = {
      ...value,
      status: "done",
      url: imageUrl,
    };

    const updatedUrls: string[] = [...props.fileUrls];
    updatedUrls.push(imageUrl);

    props.setFileString(updatedUrls);

    const updatedFiles = [...fileList];
    updatedFiles.push(updatedFile as UploadFile);

    console.log("FLAG 3");
    setFileList(updatedFiles as UploadFile[]);
  };

  const handleRemoveFile = async (file: UploadFile) => {
    console.log("Removing file", file.url);
    const response = await UploadService.deleteFile(file.url ?? "");
    console.log("THAP", response);
    if (response.status == 200) {
      message.success(response.message);

      const updateImageUrls: string[] = props.fileUrls.filter(
        (url) => url !== file.url
      );

      props.setFileString(updateImageUrls);
      console.log("List file", props.fileUrls, file);
      // const updatedFileList: UploadFile[] = fileList.filter(
      //   (item) => item.uid !== file.uid
      // );

      // console.log("Updated file list", updatedFileList);
      // console.log("FLAG 4");
      // setFileList([]);

      console.log("UPDATE", updateImageUrls, props.fileUrls, fileList);
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
    >
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
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
