import {
  CloseOutlined,
  RadarChartOutlined,
  CoffeeOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { Drawer, Flex } from "antd";
import MiniTemplate from "./mini/MiniTemplate";
import {
  DesignTemplateType,
  DetailedDesignTemplateType,
} from "@/model/DesignTemplateType";
import { useMemo, useState } from "react";

interface DrawerProps {
  templates: DesignTemplateType[];
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  setOpenDetail: (value: boolean, selectedTemplate: DesignTemplateType) => void;
}

export default function TemplateDrawer(props: DrawerProps) {
  const [templateItems, setTemplateItems] = useState<
    DetailedDesignTemplateType[]
  >([
    {
      _id: "66b742606b8854b1ddf72b5a",
      icon: (
        <RadarChartOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Template toàn diện",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723273527/template1_psw7od.png",
      name: "Toàn diện",
      usage: 0,
      design: [],
      category: "",
    },
    {
      _id: "66b742606b8854b1ddf72b5b",
      icon: (
        <CoffeeOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Template thoải mái",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723273527/template2_gkzfn9.png",
      name: "Thoải mái",
      usage: 0,
      design: [],
      category: "",
    },
    {
      _id: "66b742606b8854b1ddf72b5c",
      icon: (
        <CrownOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Template sang trọng",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723273527/template3_pozayw.png",
      name: "Sang trọng",
      usage: 0,
      design: [],
      category: "",
    },
  ]);

  useMemo(() => {
    let updatedItems = [...templateItems];
    props.templates.forEach((template) => {
      updatedItems.forEach((templateItem) => {
        if (template._id === templateItem._id) {
          templateItem.name = template.name;
          templateItem.usage = template.usage;
          templateItem.design = template.design;
        }
      });
    });

    setTemplateItems(updatedItems);
  }, [props.templates]);

  return (
    <Drawer
      title="Template gian hàng"
      placement="left"
      width={400}
      closeIcon={false}
      open={props.openDrawer}
      extra={
        <CloseOutlined
          onClick={() => {
            props.setOpenDrawer(false);
          }}
          style={{ cursor: "pointer" }}
        />
      }
    >
      <div className="overflow-y-auto overflow-x-hidden">
        <div className="ml-3 font-light">
          Nhấp vào để xem thông tin chi tiết
        </div>
        <Flex>
          {templateItems.map((drawerItem, i) => (
            <div
              key={i}
              onClick={() => {
                props.setOpenDrawer(false);
                props.setOpenDetail(true, drawerItem);
              }}
            >
              <MiniTemplate
                title={drawerItem.name}
                icon={drawerItem.icon}
                previewImageUrl={drawerItem.image}
                description={drawerItem.description}
                usage={drawerItem.usage}
              />
            </div>
          ))}
        </Flex>
      </div>
    </Drawer>
  );
}
