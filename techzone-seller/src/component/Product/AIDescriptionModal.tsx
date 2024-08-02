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

const mockdata = `<p class="QN2lPu"><strong>Áo thun thương hiệu YODY mùa hè mát mẻ</strong></p>
<p class="QN2lPu">⏩ Thông tin sản phẩm:</p>
<p class="QN2lPu">👉 Chất liệu: Áo thun co giãn tốt, thấm hút mồ hôi hiệu quả</p>
<p class="QN2lPu">👉 Kiểu dáng: Thiết kế thời thượng, phù hợp với mọi lứa tuổi</p>
<p class="QN2lPu">👉 Màu sắc: Đa dạng, phong phú đáp ứng nhu cầu của mọi người</p>
<p class="QN2lPu">👉 Bảo hành: 1 tháng</p>
<p class="QN2lPu">&nbsp;</p>
<p class="QN2lPu"><strong>THÔNG TIN THƯƠNG HIỆU</strong></p>
<p class="QN2lPu"><strong>YODY </strong>được biết đến như một thương hiệu uy tín trong lĩnh vực thời trang. Các sản phẩm của YODY luôn đảm bảo chất lượng, kiểu dáng đa dạng và giá cả phải chăng. Chúng tôi luôn cố gắng mang đến cho quý khách hàng những sản phẩm tốt nhất với giá cả cạnh tranh nhất.</p>
<p class="QN2lPu">📣 CHÍNH SÁCH MUA HÀNG</p>
<p class="QN2lPu">👉 Cam kết chất lượng và mẫu mã sản phẩm giống với hình ảnh.</p>
<p class="QN2lPu">👉 Hoàn tiền nếu sản phẩm không giống với mô tả.</p>
<p class="QN2lPu">👉 ĐỔI TRẢ TRONG THỜI GIAN BẢO HÀNH NẾU SẢN PHẨM GẶP LỖI</p>
<p class="QN2lPu">&nbsp;</p>`;
export default function AIDescriptionModal(props: AIDescriptionModalProp) {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ref = useRef(null);

  const AI_DOMAIN = process.env.NEXT_PUBLIC_AI_DOMAIN;

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
        `${AI_DOMAIN}/genai/generate-product-description`,
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
    // setDescription(mockdata);
    // setIsLoading(false);
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
