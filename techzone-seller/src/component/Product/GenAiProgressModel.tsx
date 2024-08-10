"use client";
import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import "../../app/[locale]/(Main)/product/image-collection/local.css";

interface GenAiProgressModalProps {
  onClose: () => void;
}

const GenAiProgressModal: React.FC = () => {
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

      <div className=" flex  w-full h-full justify-center items-center my-auto">
        <span className="loader"></span>
        <span className="text-loader text-xl">Chờ xíu nhé</span>
      </div>
    </div>
  );
};

export default GenAiProgressModal;
