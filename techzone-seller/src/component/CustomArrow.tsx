import Image from "next/image";
import { useState } from "react";
import arrow_close from "../../public/asset/arrow_close.png";
import arrow_open from "../../public/asset/arrow_open.png";
import bold_arrow_close from "../../public/asset/bold_arrow_close.png";
import bold_arrow_open from "../../public/asset/bold_arrow_open.png";

interface CustomArrrowProp {
  handleClick: () => void;
  collapse: boolean;
}

const CustomArrow = (props: CustomArrrowProp) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  return (
    <div>
      <Image
        src={
          hovered
            ? props.collapse
              ? bold_arrow_open
              : bold_arrow_close
            : props.collapse
            ? arrow_open
            : arrow_close
        }
        alt="Logo"
        width={50}
        height={30}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={props.handleClick}
      />
    </div>
  );
};

export default CustomArrow;
