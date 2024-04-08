import { Modal, Button } from "antd";
import ImageCropper from "./ImageCropper";

interface UploadImageProps {
  imageUrl: string | undefined;
  setImageUrl: (value: string) => void;
  open: boolean;
  setOpen(value: boolean): void;
}

export default function UploadImageModal(props: UploadImageProps) {
  return (
    <Modal
      title="Chỉnh sửa ảnh"
      centered
      open={props.open}
      // onOk={() => props.setOpen(false)}
      onCancel={() => props.setOpen(false)}
      width={1000}
      footer={[
        <Button key="back" onClick={() => props.setOpen(false)}>
          {/* Return */}
          Quay về
        </Button>,
      ]}
    >
      <div className="border-2 border-black m-10 h-[600px]">
        <ImageCropper
          imageUrl={props.imageUrl}
          setImageUrl={props.setImageUrl}
        />
      </div>
    </Modal>
  );
}
