import { Button, Modal } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HiLightBulb } from "react-icons/hi2";

interface AIDescriptionModalProp {
  isOpen: boolean;
  openModal: (isOpen: boolean) => void;
  setDescription: (text: string) => void;
  shortDescription: string;
}

export default function AIDescriptionModal(props: AIDescriptionModalProp) {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ref = useRef(null);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const getDescriptionFromAI = async (shortDescription: string) => {
    setIsLoading(true);
    const postBody = {
      prompt: shortDescription,
    };

    console.log("PostBody: ", postBody);

    try {
      const rawResponse = await axios.post(
        "http://54.255.29.11/genai/generate-product-description",
        postBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (rawResponse.status == 200) {
        setDescription(rawResponse.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error in conservation:", error);
    }
  };

  useEffect(() => {
    getDescriptionFromAI(props.shortDescription);
  }, [props.isOpen]);

  const displayLoading = (
    <div className="flex items-center justify-center h-full">
      <lottie-player
        id="firstLottie"
        ref={ref}
        autoPlay
        loop
        mode="normal"
        src="https://lottie.host/61922083-3a9f-44d9-9539-867b41b1a136/nZZZHwPDUY.json"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );

  const handleApplyClick = () => {
    console.log("handleApplyClick", description);
    props.setDescription(description);
    props.openModal(false);
  };

  return (
    <Modal
      centered
      open={props.isOpen}
      width={900}
      onCancel={() => {
        props.openModal(false);
      }}
      footer={null}
    >
      <div className="flex flex-col  p-4" style={{ height: "500px" }}>
        <div className="flex space-x-2 items-center">
          <HiLightBulb size={20} color="#FFDA35" />
          <p className="text-xl font-bold uppercase">Gợi ý từ trợ lý AI</p>
        </div>
        {isLoading ? (
          displayLoading
        ) : (
          <div className="flex flex-col h-full">
            <div
              className="border  border-1 p-2 rounded-lg mt-6 mb-4 overflow-y-auto"
              style={{ maxHeight: "460px" }}
            >
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="flex flex-row-reverse">
              <Button
                style={{ width: "15%" }}
                type="primary"
                onClick={() => handleApplyClick()}
                className=" text-center ml-4 bg-sky-400"
              >
                Chọn mô tả
              </Button>
              <Button
                style={{ width: "15%" }}
                type="default"
                onClick={() => props.openModal(false)}
                className=" text-center bg-slate-200"
              >
                Hủy
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
