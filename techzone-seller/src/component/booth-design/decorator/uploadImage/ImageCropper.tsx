import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImageCropperProps {
  imageUrl: string | undefined;
  setImageUrl: (value: string) => void;
}

export default function ImageCropper(props: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);

    setCroppedAreaPixels(croppedAreaPixels);
    props.setImageUrl("cropped");
  };

  return (
    <div className="h-[200px] z-50">
      <Cropper
        image={props.imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
}
