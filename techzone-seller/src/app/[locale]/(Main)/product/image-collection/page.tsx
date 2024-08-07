"use client";

import { GET_GetShop, PUT_RemoveImageCollection } from "@/apis/shop/ShopAPI";
import GenAiFormModal from "@/component/Product/GenAiFormModal";
import GenAiProgressModal from "@/component/Product/GenAiProgressModel";
import GenAiResultModal from "@/component/Product/GenAiResultModal";
import {
  Breadcrumb,
  Button,
  Divider,
  message,
  Modal,
  notification,
  NotificationArgsProps,
} from "antd";
import { ReactElement, useEffect, useRef, useState } from "react";
import { FaMagic } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import "./local.css";
import axios from "axios";
import { ShopInfoType } from "@/model/ShopInfoType";
const AI_DOMAIN = process.env.NEXT_PUBLIC_AI_DOMAIN;
const authLocalStorageID = "#auth-context-user-info-record-ID";

type NotificationPlacement = NotificationArgsProps["placement"];

const imgList = [
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
];

const mockResponse = {
  prompt:
    "hyperdetailed photography, soft light, head portrait, (white background:13, skin details, sharp and in focus,",
  context: "men is wearing shirt and standing in coffee shop",
  genaiProductImage: [
    "https://replicate.delivery/pbxt/6i9Pee4fj2fKfiUOJK5NVRC7BRdpOhhWkBSUCrJETV2X4hNYC/ComfyUI_00001_.webp",
  ],
};

const ImageCollection = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [genaiModalOpen, setGenAiModalOpen] = useState<boolean>(false);
  const previewModalRef = useRef<HTMLDivElement>(null);

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [genAiStatus, setGenAiStatus] = useState<string>("FORM");
  const [imageCollection, setImageCollection] = useState<string[]>([]);
  const [api, contextHolder] = notification.useNotification();

  function initLoading() {
    const storageInfo = localStorage.getItem(authLocalStorageID);
    if (storageInfo != null) {
      return JSON.parse(storageInfo) as ShopInfoType;
    } else {
      return null;
    }
  }

  const shopInfo = initLoading();

  const placement: NotificationPlacement = "topRight"; //topLeft, bottomRight, bottomLeft
  const openNotification = (title: string, content: ReactElement) => {
    api.info({
      message: `${title}`,
      description: content,
      placement,
    });
  };

  const handleFormSubmit = async (values: any) => {
    setGenAiStatus("IN_PROGRESS");
    console.log("Value: ", values);
    const promptTemplate = `hyperdetailed photography, soft light, head portrait, (white background:13, skin details, sharp and in focus,\n${values.gender} ${values.nationality} student,\n${values.bodyShape} body shape,\n${values.skinColor} skin,\n${values.hairColor} ${values.hairStyle},\nbig ${values.eyesColor} eyes,\nhigh nose,\nslim,\ncute,\nbeautiful`;
    const contextTemplate = `${values.gender} is wearing ${values.clothType} and ${values.posture} in ${values.background}`;
    const postBody = {
      prompt: promptTemplate,
      context: contextTemplate,
      garmentImgUrl: values.imageLink,
    };

    try {
      const apiEndpoint = `${AI_DOMAIN}/genai/generate-product-image`;
      console.log("API Endpoint: ", apiEndpoint);
      console.log("Post body:  ", postBody);
      const response = await axios.post(
        `${AI_DOMAIN}/genai/generate-product-image`,
        postBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status == 200) {
        console.log("Response: ", response);
        const imageUrl = response.data.data.genaiProductImage[0];
        setGeneratedImageUrl(imageUrl);
        setGenAiStatus("COMPLETED");
      }
    } catch (error) {
      console.error("Error fetching generate product image:", error);
    }

    // setTimeout(() => {
    //   setGeneratedImageUrl(
    //     "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg"
    //   );
    //   setGenAiStatus("COMPLETED");
    // }, 3000);
  };

  const openPreview = (image: string) => {
    setPreviewImage(image);
  };

  const renderModal = () => {
    switch (genAiStatus) {
      case "FORM":
        return (
          <GenAiFormModal
            onClose={() => setIsFormVisible(false)}
            onSubmit={handleFormSubmit}
          />
        );
      case "IN_PROGRESS":
        return <GenAiProgressModal />;
      case "COMPLETED":
        return (
          <GenAiResultModal
            tryAgainFnc={() => setGenAiStatus("FORM")}
            imageUrl={generatedImageUrl}
            isCreatingProductMode={false}
            addImage={function (image_link: string): void {}}
            closeModal={setGenAiModalOpen}
          />
        );
    }
  };

  const deleteImage = async (image_link: string) => {
    const response: { status: number; message: string } =
      await PUT_RemoveImageCollection(`${shopInfo?._id}`, image_link);

    if (response.status == 200) {
      message.success("Xóa sản phẩm thành công");
    } else {
      message.error("Không thể xóa sản phẩm");
    }

    loadImageCollection();
    setPreviewImage(null);
  };
  const loadImageCollection = async () => {
    const { data } = await GET_GetShop(`${shopInfo?._id}`);
    if (data) {
      setImageCollection(data.imageCollection);
    }
  };
  useEffect(() => {
    loadImageCollection();
  }, []);

  return (
    <div className="pt-4 pr-4 flex flex-col">
      <Breadcrumb
        className="text-xs"
        items={[
          {
            href: "/",
            title: (
              <div className="flex items-center">
                <HiOutlineHome size={15} />
              </div>
            ),
          },
          {
            href: "/product/image-collection",
            title: "Sản phẩm",
          },
          {
            title: "Bộ sưu tập hình ảnh",
          },
        ]}
      />
      <div className="w-full flex flex-row justify-between items-center">
        <p className="uppercase text-xl font-semibold ">Bộ sưu tập hình ảnh</p>
        <Button
          onClick={() => {
            setGenAiModalOpen(true);
          }}
          type="primary"
          className="py-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium flex flex-row gap-2 items-center hover:from-cyan-700 hover:to-blue-700 "
        >
          <FaMagic />
          Tạo hình ảnh bằng AI
        </Button>
      </div>
      <Divider className="my-4" />

      <div className="grid-wrapper">
        {imageCollection.map((image, index) => (
          <div key={index} onClick={() => openPreview(image)}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </div>

      {previewImage && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div
            ref={previewModalRef}
            className="max-w-full h-[80vh] overflow-auto space-x-4"
            // onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className=" max-w-full max-h-full"
            />
            <Button
              type="primary"
              danger
              className=""
              onClick={() => deleteImage(previewImage)}
            >
              <div className="flex space-x-2 items-center">
                <RiDeleteBinLine />
                <p>Xóa ảnh</p>
              </div>
            </Button>
          </div>
        </div>
      )}

      {genaiModalOpen && (
        <Modal
          centered
          open={genaiModalOpen}
          width={900}
          onCancel={() => {
            setGenAiModalOpen(false);
          }}
          footer={null}
        >
          {renderModal()}
        </Modal>
      )}
    </div>
  );
};

export default ImageCollection;
