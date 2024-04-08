"use client";
import AvatarForm from "@/component/booth-design/decorator/uploadImage/AvatarForm";
import { BannerPatternType, WidgetType } from "@/model/WidgetType";
import { Button, Flex, Select } from "antd";
import { useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon from "../mini/WidgetTypeIcon";

interface WidgetProps {
  widget: WidgetType;
}

export default function BannerWidget(props: WidgetProps) {
  // data
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  // variables
  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  // funtions
  const handleSave = () => {
    //
  };

  const handleChangePattern = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="m-5 pb-5">
      <div className="m-5 text-2xl font-semibold flex justify-between">
        <div>{props.widget._id}</div>
        <CustomSwitch isSwitched={isSwitched} setIsSwitched={setIsSwitched} />
      </div>

      <Flex vertical gap="large">
        {/* other */}
        <Select
          defaultValue={BannerPatternType.CAROUSEL.toString()}
          style={{ width: "100%" }}
          onChange={handleChangePattern}
          options={[
            {
              value: BannerPatternType.CAROUSEL.toString(),
              label: (
                <Flex gap="small">
                  <WidgetTypeIcon
                    type={props.widget.type}
                    element={{
                      pattern: BannerPatternType.CAROUSEL,
                      images: [],
                    }}
                  />
                  Băng chuyền
                </Flex>
              ),
            },
          ]}
          disabled
        />

        {/* avatar */}
        <Flex vertical gap="large">
          <div className="font-semibold">Thay đổi ảnh đại diện</div>
          <AvatarForm setImageUrl={setAvatarUrl} />
        </Flex>

        {/* Buttons */}
        <Flex gap="large">
          <Button size="large" onClick={handleSave}>
            Lưu thay đổi
          </Button>

          {/* test */}
          <Button size="large" onClick={() => setOpenUploadImage(true)}>
            Cropper
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
