import type { GetProp, UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import FormData from "form-data";
import { useState } from "react";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ColorImageProps {
  setFileString: (fileString: string) => void;
  maxNumber: number;
}

export default function ColorImage(props: ColorImageProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const onChange: UploadProps["onChange"] = async ({
  //   fileList: newFileList,
  // }) => {
  //   if (newFileList.length > 0 && newFileList[0].originFileObj) {
  //     const file = newFileList[0].originFileObj as File;
  //     const formData = new FormData();

  //     formData.append("image", file);

  //     try {
  //       const response = await axios.post(
  //         "http://14.225.218.109:3010/upload",

  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log("RESULT", response);
  //       if (response.status === 200) {
  //         const imageUrl = response.data.data.path;
  //         console.log("Image URL: " + imageUrl);
  //         props.setFileString(imageUrl);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading image");
  //     }
  //   }
  //   setFileList(newFileList);
  // };

  const onChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const file = newFileList[0].originFileObj as File;
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "http://14.225.218.109:3010/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          const imageUrl = response.data.data.path;
          props.setFileString(imageUrl);

          const updatedFile = {
            ...newFileList[0],
            status: "done",
            url: imageUrl,
          };

          setFileList([updatedFile] as UploadFile[]);
        }
      } catch (error) {
        console.error("Error uploading image", error);
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

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <ImgCrop
      rotationSlider
      quality={1}
      showGrid
      showReset
      modalTitle={"Chỉnh sửa ảnh"}
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
