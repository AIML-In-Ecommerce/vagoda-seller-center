"use client";
import {
  BannerElement,
  BannerPatternType,
  WidgetType,
} from "@/model/WidgetType";
import { Badge, Button, Collapse, CollapseProps, Flex, Select } from "antd";
import { useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon from "../mini/WidgetTypeIcon";
import BannerForm from "../uploadImage/BannerForm";

interface WidgetProps {
  widget: WidgetType;
  updateWidgets(): void;
}

export default function BannerWidget(props: WidgetProps) {
  // mock data

  // data
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          Banner 1 <Badge color="green" />
        </div>
      ),
      children: (
        <div>
          <BannerForm
            setImageUrl={function (url: string): void {
              // throw new Error("Function not implemented.");
            }}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          Banner 2 <Badge color="green" />
        </div>
      ),
      children: (
        <div>
          <BannerForm
            setImageUrl={function (url: string): void {
              // throw new Error("Function not implemented.");
            }}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          Banner 3 <Badge color="gray" />
        </div>
      ),
      children: (
        <div>
          <BannerForm
            setImageUrl={function (url: string): void {
              // throw new Error("Function not implemented.");
            }}
          />
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div>
          Banner 4 <Badge color="gray" />
        </div>
      ),
      children: (
        <div>
          <BannerForm
            setImageUrl={function (url: string): void {
              // throw new Error("Function not implemented.");
            }}
          />
        </div>
      ),
    },
  ];

  const [proxyBanner, setProxyBanner] = useState<Array<string>>(
    Array.from(" ".repeat(4))
  );

  // variables
  const [proxyBannerWidget, setProxyBannerWidget] = useState(props.widget);

  const [openUploadImage, setOpenUploadImage] = useState(false);
  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  const element = useMemo(() => {
    return props.widget.element as BannerElement;
  }, [props.widget.element]);

  // functions
  const handleSave = () => {
    proxyBannerWidget.visibility = isSwitched;

    // TODO: update this _ need experiment
    element.images = [];
    proxyBannerWidget.element = element;
    setProxyBannerWidget(proxyBannerWidget);

    props.updateWidgets();
  };

  const handleChangePattern = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeBanner = (value: string, index: number) => {
    proxyBanner[index] = value;
    setProxyBanner(proxyBanner);
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

        <Flex vertical gap="small">
          {/* title */}
          <div className="font-semibold">Ảnh banner</div>

          <div className="font-light text-sm">
            Chọn từ 2 đến 4 ảnh để hiển thị đẹp hơn trên gian hàng
          </div>

          {/* collapse */}
          <Collapse items={items} />
        </Flex>

        {/* Buttons */}
        <Flex gap="large">
          <Button size="large" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
