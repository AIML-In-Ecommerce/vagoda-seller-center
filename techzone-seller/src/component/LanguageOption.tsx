import { Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { GrLanguage } from "react-icons/gr";

export default function LanguageOption() {
  const [language, setLanguage] = useState("VI");
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setLanguage("VN")}
        >
          Tiếng Việt
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setLanguage("EN")}
        >
          Tiếng Anh
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setLanguage("FR")}
        >
          Tiếng Pháp
        </a>
      ),
    },
  ];
  return (
    <div className="flex items-center space-x-2  m-1 hover:text-sky-600 hover:bg-sky-200 items-center  p-2 rounded-lg">
      <Dropdown menu={{ items }} placement="bottomLeft">
        <div className="flex ">
          <GrLanguage className="" size={20} />
        </div>
      </Dropdown>
      <p className="">{language}</p>
    </div>
  );
}
