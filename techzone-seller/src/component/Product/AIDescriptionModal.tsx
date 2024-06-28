import { Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { HiLightBulb } from "react-icons/hi2";

interface AIDescriptionModalProp {
  isOpen: boolean;
  openModal: (isOpen: boolean) => void;
  setDescription: (text: string) => void;
}

const mockDescription = `<p class="QN2lPu">&Aacute;o sơ mi nam ngắn tay cổ vest form đẹp LADOS 8085 vải đũi thấm h&uacute;t, sang trọng dễ phối đồ</p>
<p class="QN2lPu">⏩ Th&ocirc;ng tin sản phẩm:</p>
<p class="QN2lPu">👉 Chất liệu: chất đũi thấm h&uacute;t tốt, tho&aacute;ng m&aacute;t</p>
<p class="QN2lPu">👉 &Aacute;o thấm h&uacute;t mồ h&ocirc;i tốt</p>
<p class="QN2lPu">👉 Form rộng vừa, đứng form &aacute;o cực kỳ trẻ trung năng động</p>
<p class="QN2lPu">👉 Chất vải d&agrave;y đẹp, kh&ocirc;ng x&ugrave; l&ocirc;ng, kh&ocirc;ng phai m&agrave;u</p>
<p class="QN2lPu">👉 Đường may cực tỉ mỉ cực đẹp</p>
<p class="QN2lPu">👉 C&oacute; thể mặc đi l&agrave;m, đi chơi, đặc biệt đi tiệc sự kiện , cực sang trọng</p>
<p class="QN2lPu">&nbsp;</p>
<p class="QN2lPu">⏩Được sản xuất v&agrave; bảo h&agrave;nh bởi C&ocirc;ng ty TNHH MTV LADOS VIỆT NAM</p>
<p class="QN2lPu"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ley33b4kzpmyac" alt="" width="573" height="573"></p>
<p class="QN2lPu"><video style="width: 612px; height: 306px; display: table; margin-left: auto; margin-right: auto;" controls="controls" width="612" height="306"> <source src="https://cvf.shopee.vn/file/api/v4/11110105/mms/vn-11110105-6ke15-lu7a25d0b1n547.16000081713323497.mp4" type="video/mp4"></video></p>
<p class="QN2lPu"><strong>TH&Ocirc;NG TIN THƯƠNG HIỆU</strong></p>
<p class="QN2lPu"><strong>LADOS </strong>l&agrave; Nh&agrave; ph&acirc;n phối chuy&ecirc;n sỉ &amp; lẻ c&aacute;c mặt h&agrave;ng thời trang chất lượng v&agrave; gi&aacute; cả phải chăng với thương hiệu LADOS. Ch&uacute;ng t&ocirc;i h&acirc;n hạnh v&agrave; lu&ocirc;n cố gắng để mang đến cho qu&yacute; kh&aacute;ch những sản phẩm chất lượng với gi&aacute; cả tốt nhất v&agrave; dịch vụ uy t&iacute;n. Tất cả c&aacute;c sản phẩm của shop đều được ch&uacute;ng t&ocirc;i tuyển chọn một c&aacute;ch kỹ lưỡng sao cho ph&ugrave; hợp với phong c&aacute;ch Ch&acirc;u &Aacute; v&agrave; bắt nhịp c&ugrave;ng xu hướng trẻ. Đến với ch&uacute;ng t&ocirc;i kh&aacute;ch h&agrave;ng c&oacute; thể y&ecirc;n t&acirc;m mua h&agrave;ng với nhiều mẫu m&atilde; được cập nhật thường xuy&ecirc;n v&agrave; nhiều khuyến mại hấp dẫn.</p>
<p class="QN2lPu">📣 CH&Iacute;NH S&Aacute;CH MUA H&Agrave;NG</p>
<p class="QN2lPu">👉 Cam kết chất lượng v&agrave; mẫu m&atilde; sản phẩm giống với h&igrave;nh ảnh.</p>
<p class="QN2lPu">👉 Ho&agrave;n tiền nếu sản phẩm kh&ocirc;ng giống với m&ocirc; tả.</p>
<p class="QN2lPu">👉 ĐỔI TRẢ TRONG 7 NG&Agrave;Y NẾU KH&Ocirc;NG Đ&Uacute;NG MI&Ecirc;U TẢ</p>
<p class="QN2lPu">👉 CAM KẾT H&Agrave;NG CH&Iacute;NH H&Atilde;NG 100%</p>
<p class="QN2lPu">👉 CAM KẾT ẢNH SHOP TỰ CHỤP</p>
<p class="QN2lPu">👉 freeship cho đơn h&agrave;ng tr&ecirc;n 150k</p>
<p class="QN2lPu">&nbsp;</p>`;

export default function AIDescriptionModal(props: AIDescriptionModalProp) {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ref = useRef(null);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

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

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDescription(mockDescription);
      setIsLoading(false);
    }, 3000);
  }, [props.isOpen]);

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
                className=" text-center ml-4"
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
