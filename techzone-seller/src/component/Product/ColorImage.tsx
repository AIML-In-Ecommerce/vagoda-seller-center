import { UploadService } from "@/services/Upload";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import FormData from "form-data";
import { useState } from "react";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ColorImageProps {
  setFileString: (fileString: string) => void;
  maxNumber: number;
}

export default function ColorImage(props: ColorImageProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

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

  return (
    <ImgCrop
      rotationSlider
      quality={1}
      showGrid
      showReset
      modalTitle={"Chỉnh sửa ảnh"}
      onModalOk={handleModalOk}
      // onModalCancel={onChange}
    >
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        maxCount={props.maxNumber}
      >
        {fileList.length < props.maxNumber && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
}
