import { ColorPicker } from "antd"; // Điều chỉnh theo thư viện bạn đang sử dụng
import { useState } from "react";

const ColorPickerComponent = () => {
  const [selectedColor, setSelectedColor] = useState("#1677ff");
  const [selectedPicker, setSelectedPicker] = useState(null);

  const handleColorChange = (color: any, pickerIndex: any) => {
    setSelectedColor(color.hex);
    setSelectedPicker(pickerIndex);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4].map((picker, index) => (
        <div
          key={index}
          className={`color-picker-container ${
            selectedPicker === index ? "selected" : ""
          }`}
        >
          <ColorPicker
            defaultValue="#1677ff"
            disabled={index % 2 === 0}
            onChange={
              index % 2 === 0
                ? () => {}
                : (color) => handleColorChange(color, index)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ColorPickerComponent;
