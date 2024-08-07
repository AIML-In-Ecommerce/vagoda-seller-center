"use client";

import GenAiFormModal from "@/component/Product/GenAiFormModal";
import GenAiProgressModal from "@/component/Product/GenAiProgressModel";
import GenAiResultModal from "@/component/Product/GenAiResultModal";
import { Modal } from "antd";
import axios from "axios";
import { useRef, useState } from "react";

interface GenAiResultModalProp {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  addImage: (image_link: string) => void;
}
const GenAIImageModal = (props: GenAiResultModalProp) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const previewModalRef = useRef<HTMLDivElement>(null);

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
  const [genAiStatus, setGenAiStatus] = useState<string>("FORM");
  const AI_DOMAIN = process.env.NEXT_PUBLIC_AI_DOMAIN;

  const handleFormSubmit = async (values: any) => {
    setGenAiStatus("IN_PROGRESS");
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
            onClose={() => {
              setIsFormVisible(false);
              setGenAiStatus("FORM");
            }}
            onSubmit={handleFormSubmit}
          />
        );
      case "IN_PROGRESS":
        return <GenAiProgressModal />;
      case "COMPLETED":
        return (
          <GenAiResultModal
            closeModal={props.setOpenModal}
            tryAgainFnc={() => setGenAiStatus("FORM")}
            imageUrl={generatedImageUrl}
            isCreatingProductMode={true}
            addImage={props.addImage}
          />
        );
    }
  };

  return (
    <Modal
      centered
      open={props.openModal}
      width={900}
      onCancel={() => {
        props.setOpenModal(false);
        // setIsFormVisible(true);
      }}
      footer={null}
    >
      {renderModal()}
    </Modal>
  );
};

export default GenAIImageModal;
