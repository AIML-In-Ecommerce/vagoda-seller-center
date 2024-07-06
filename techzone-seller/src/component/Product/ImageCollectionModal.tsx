import { GET_GetShop } from "@/apis/shop/ShopAPI";
import { Button, Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";

interface ImageCollectionModalProp {
  isOpen: boolean;
  openModal: (isOpen: boolean) => void;
  addImage: (image: string) => void;
}

export default function ImageCollectionModal(props: ImageCollectionModalProp) {
  const [imageCollection, setImageCollection] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleClick = () => {
    selectedImages.forEach((image) => props.addImage(image));
    props.openModal(false);
  };

  const handleChange = (e: any, image: any) => {
    if (e.target.checked) {
      setSelectedImages((prev) => [...prev, image]);
    } else {
      setSelectedImages((prev) => prev.filter((img) => img !== image));
    }
  };

  useEffect(() => {
    const loadImageCollection = async () => {
      const { data } = await GET_GetShop("65f1e8bbc4e39014df775166");
      if (data) {
        setImageCollection(data.imageCollection);
      }
    };

    loadImageCollection();
  }, []);

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
      <div
        className="flex flex-col  px-8 pt-8 pb-8"
        style={{ maxHeight: "500px" }}
      >
        <p className="text-xl font-bold uppercase ">Bộ sưu tập hình ảnh </p>
        {/* <div className="grid grid-cols-3 gap-1"></div> */}
        <div
          className="grid-wrapper mt-6 mb-2 overflow-y-auto"
          style={{ maxHeight: "460px" }}
        >
          {imageCollection.map((image, index) => (
            <Checkbox
              key={index}
              onChange={(e) => handleChange(e, image)}
              checked={selectedImages.includes(image)}
            >
              <img
                src={image}
                alt={`Image ${index}`}
                className={`rounded-xl  ${
                  selectedImages.includes(image)
                    ? "border-4 border-lime-500"
                    : ""
                }`}
              />
            </Checkbox>
          ))}
        </div>
        <div className="flex flex-row-reverse justify-self-end">
          <Button
            style={{ width: "15%" }}
            type="primary"
            onClick={() => handleClick()}
            className=" text-center "
          >
            Chọn ảnh
          </Button>
        </div>
      </div>
    </Modal>
  );
}
