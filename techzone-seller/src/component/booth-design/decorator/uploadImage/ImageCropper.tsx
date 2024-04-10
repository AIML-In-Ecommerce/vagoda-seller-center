import getCroppedImg from "@/utils/CropImage";
import { Button, Flex, InputNumber, Modal, Select, Slider, Typography } from "antd";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface ImageCropperProps {
    imageUrl: string | undefined;
    setImageUrl: (value: string) => void;
    isOpen: boolean;
    onCrop: () => void;
    onCancel: () => void;
}

//define some aspect ratios for cropping
const aspectRatios = [
    {
        label: '1:1', value: 1
    },
    {
        label: '3:2', value: 3 / 2
    },
    {
        label: '4:3', value: 4 / 3
    },
    {
        label: '16:9', value: 16 / 9
    },
]

export default function ImageCropper(props: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspectRatio, setAspectRatio] = useState({
        label: '1:1', value: 1 / 1
    });
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
    const [croppedImage, setCroppedImage] = useState<string | null>(null)


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
                aspectRatio.value
            )
            setCroppedImage(croppedImage);
            props.setImageUrl(croppedImage!);
        } catch (e) {
            console.error(e)
        }
    }

    const { Text } = Typography;

    return (
        <Modal
            className="z-50 container"
            title="ImageCropperModal"
            open={props.isOpen}
            onOk={props.onCrop}
            onCancel={props.onCancel} centered
            footer={[
                <Button onClick={() => props.onCancel()}>Hủy thay đổi</Button>,
                <Button onClick={() => {
                    handleCroppedImage();
                    props.onCrop();
                }}>Chỉnh sửa</Button>]
            }>

            {/* // I have no idea about this className. but the visual looks good enough */}
            <div className="absolute w-11/12 h-1/2">
                <Cropper
                    image={props.imageUrl}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={aspectRatio.value}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                />
                <div className="mt-[50vh] grid grid-cols-2 gap-5">
                    <div className="gap-5 z-50">
                        <Text>Phóng to: <span className="font-semibold">{zoom}x</span></Text>
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
                        <Text>Xoay: <span className="font-semibold">{rotation}&deg;</span></Text>
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
                        <Text>Tỉ lệ mẫu: <span className="font-semibold">{aspectRatio.label}</span></Text>
                        <div className="flex gap-2 mt-1">
                            {
                                aspectRatios.map((item, index) => {
                                    return (
                                        <Button key={index}
                                            onClick={() => setAspectRatio(item)}>
                                            {item.label}
                                        </Button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Some how i have to put ImageCropper to recognize as absolute component, make it inside the body of antd Modal
          Therefore the solution is very stupid and that's why we have a div to have some space. Ugh! ~w~ */}
            <div className="h-[70vh]">&nbsp;</div>
        </Modal>


    );
}