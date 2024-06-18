import getCroppedImg from "@/utils/CropImage";
import { Button, Modal, Slider, Typography } from "antd";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface FixedRatioCropperProps {
  imageUrl: string | undefined;
  setImageUrl: (value: string) => void;
  isOpen: boolean;
  onCrop: () => void;
  onCancel: () => void;
  aspectRatio: RatioType;
}

interface RatioType {
  label: string;
  value: number;
}

export default function FixedRatioCropper(props: FixedRatioCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        props.imageUrl!,
        croppedAreaPixels!,
        rotation,
        { horizontal: false, vertical: false },
        props.aspectRatio.value
      );
      props.setImageUrl(croppedImage!);
    } catch (e) {
      console.error(e);
    }
  };

  const { Text } = Typography;

  return (
    <Modal
      className="z-50 container"
      title="FixedRatioCropperModal"
      open={props.isOpen}
      onOk={props.onCrop}
      onCancel={props.onCancel}
      centered
      footer={[
        <Button onClick={() => props.onCancel()}>Hủy thay đổi</Button>,
        <Button
          onClick={() => {
            handleCroppedImage();
            props.onCrop();
          }}
        >
          Chỉnh sửa
        </Button>,
      ]}
    >
      {/* // I have no idea about this className. but the visual looks good enough */}
      <div className="absolute w-11/12 h-1/2">
        <Cropper
          image={props.imageUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={props.aspectRatio.value}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
        <div className="mt-[50vh] grid grid-cols-2 gap-5">
          <div className="gap-5 z-50">
            <Text>
              Phóng to: <span className="font-semibold">{zoom}x</span>
            </Text>
            <div>
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(value) => setZoom(value)}
              />
            </div>
          </div>
          <div className="gap-5 z-50">
            <Text>
              Xoay: <span className="font-semibold">{rotation}&deg;</span>
            </Text>
            <div>
              <Slider
                min={-180}
                max={180}
                step={10}
                value={rotation}
                onChange={(value) => setRotation(value)}
              />
            </div>
          </div>
          <div className="gap-5 z-50 col-span-2">
            <Text>
              Tỉ lệ mẫu:{" "}
              <span className="font-semibold">{props.aspectRatio.label}</span>
            </Text>
            <div className="flex gap-2 mt-1">
              <Button>{props.aspectRatio.label}</Button>
            </div>
          </div>
        </div>
      </div>
      {/* Some how i have to put FixedRatioCropper to recognize as absolute component, make it inside the body of antd Modal
          Therefore the solution is very stupid and that's why we have a div to have some space. Ugh! ~w~ */}
      <div className="h-[70vh]">&nbsp;</div>
    </Modal>
  );
}
