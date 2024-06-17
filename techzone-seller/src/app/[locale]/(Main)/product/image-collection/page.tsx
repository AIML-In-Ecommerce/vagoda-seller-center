"use client";

import GenAiFormModal from "@/component/Product/GenAiFormModal";
import GenAiResultModal from "@/component/Product/GenAiResultModal";
import { Breadcrumb, Button, Divider, Modal } from "antd";
import { useRef, useState } from "react";
import { FaMagic } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";
import "./local.css";

const imgList = [
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/%C3%A1o_thun_cppclk.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716348420/virtual_try_on_welcome_img_jppgbr.png",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/dressing_room_c9bl2n.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/master_room_torso8.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/living_room_k9tpqt.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/master_living_room_fjwzlm.png",
];

// interface ImageGridProps {
//   imgList: string[];
// }

const ImageCollection = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [genaiModalOpen, setGenAiModalOpen] = useState<boolean>(false);
  const previewModalRef = useRef<HTMLDivElement>(null);

  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  const handleFormSubmit = async (values: any) => {
    console.log("Form submitted:", values);
    const imageUrl = "URL_ẢNH_TẠO_BỞI_AI";
    setGeneratedImageUrl(imageUrl);
  };

  const openPreview = (image: string) => {
    setPreviewImage(image);
  };

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
        {imgList.map((image, index) => (
          <div key={index} onClick={() => openPreview(image)}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}
      </div>

      {previewImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={previewModalRef}
            className="max-w-full h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Preview"
              className=" max-w-full max-h-full"
            />
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
            setIsFormVisible(true);
          }}
          footer={null}
        >
          {isFormVisible ? (
            <GenAiFormModal
              onClose={() => setIsFormVisible(false)}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <GenAiResultModal
              onClose={() => setIsFormVisible(true)}
              imageUrl={generatedImageUrl}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default ImageCollection;
