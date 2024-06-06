"use client";

import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb, Button, Divider } from "antd";
import { HiOutlineHome, HiOutlineInformationCircle } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { FaMagic } from "react-icons/fa";
import Image from "next/image";
import "./local.css";
import { color } from "chart.js/helpers";

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

interface ImageGridProps {
  imgList: string[];
}

const ImageCollection = () => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [genaiModalOpen, setGenAiModalOpen] = useState<boolean>(false);
  const previewModalRef = useRef<HTMLDivElement>(null);
  const aiModalRef = useRef<HTMLDivElement>(null);

  const gender = useRef<string>();
  const country = useRef<string>();
  const stature = useState<string>();

  const openPreview = (image: string) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  const openModal = () => {
    setGenAiModalOpen(true);
  };

  const closeModal = () => {
    setGenAiModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      previewModalRef.current &&
      !previewModalRef.current.contains(event.target as Node)
    ) {
      closePreview();
    }

    if (
      aiModalRef.current &&
      !aiModalRef.current.contains(event.target as Node)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={aiModalRef}
            className="w-[80vw] h-[90vh] overflow-auto bg-white px-10 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Divider style={{ borderColor: "#cbd5e1" }}>
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="text-3xl font-medium">
                  Tạo hình ảnh sản phẩm
                </div>
                <div className="text-base font-semibold text-slate-400">
                  Sản sàng tạo hình ảnh sản phẩm sử dụng AI hoàn toàn miễn phí
                </div>
              </div>
            </Divider>
            <div className="w-full h-[50%] grid grid-cols-2 gap-4">
              <div className="col-span-1 rounded-2xl border-2 border-slate-200  "></div>
              <div className="col-span-1 rounded border-slate-300 "></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCollection;
