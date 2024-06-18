"use client";
import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import "../../app/[locale]/(Main)/product/image-collection/local.css";

interface GenAiResultModalProps {
  onClose: () => void;
  imageUrl: string;
}

const GenAiResultModal: React.FC<GenAiResultModalProps> = ({
  onClose,
  imageUrl,
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [imageLink, setImageLink] = useState<string>(imageUrl);

  useEffect(() => {
    setImageLink(
      "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg"
    );
    setTimeout(() => setIsRunning(false), 3000);
  }, []);

  return (
    <div
      className="flex flex-col  px-8 pt-8 pb-8"
      style={{ minHeight: "500px" }}
    >
      <div className="flex flex-col mb-8">
        {" "}
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-bold uppercase">Tạo hình ảnh sản phẩm </p>
          <div className="flex-1 flex items-center">
            <hr className="w-full font-semibold border-t-1 border-gray-300" />
          </div>
        </div>
        <p className="text-slate-400">
          Chức năng tạo hình ảnh sản phẩm bằng AI
        </p>
      </div>
      {isRunning ? (
        <div className=" flex  w-full h-full justify-center items-center my-auto">
          <span className="loader"></span>
          <span className="text-loader text-xl">Chờ xíu nhé</span>
        </div>
      ) : (
        <div className="space-y-2  flex flex-col justify-center items-center">
          <div className="rounded-lg overflow-hidden">
            <Image height={320} width={320} src={imageLink} />
          </div>

          <div className="flex justify-center w-full space-x-2 ">
            <Button
              type="primary"
              className="bg-slate-400 "
              style={{ width: "20%" }}
              onClick={() => onClose()}
            >
              Tạo lại
            </Button>
            <Button
              type="primary"
              className=" bg-gradient-to-r from-cyan-500 to-blue-500 "
              style={{ width: "20%" }}
            >
              Lưu vào bộ sưu tập
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenAiResultModal;
