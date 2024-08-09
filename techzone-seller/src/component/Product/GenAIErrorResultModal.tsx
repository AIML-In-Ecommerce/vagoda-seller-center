"use client";
import { Button } from "antd";
// import fs from "fs-extra";
import React, { useEffect, useRef } from "react";
import "../../app/[locale]/(Main)/product/image-collection/local.css";

interface GenAIErrorResultModalProps {
  tryAgainFnc: () => void;
}

const GenAIErrorResultModal: React.FC<GenAIErrorResultModalProps> = ({
  tryAgainFnc,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const lottie = (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/10e2f813-52c5-4014-b8bf-0591d8d9eb55/7vcvIB5FbV.json"
      style={{ width: "300px", height: "300px" }}
      className="absolute top-12 "
    />
  );

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

      <div className=" flex flex-col justify-center items-center">
        <div className="">{lottie}</div>
        <p className="text-[16px] font-semibold absolute bottom-32">
          Đã xảy ra sự cố khi tạo ảnh, vui lòng thử lại sau.{" "}
        </p>
        <Button
          type="primary"
          style={{ width: "20%" }}
          onClick={() => {
            tryAgainFnc();
          }}
        >
          Tạo lại
        </Button>
      </div>
    </div>
  );
};

export default GenAIErrorResultModal;
