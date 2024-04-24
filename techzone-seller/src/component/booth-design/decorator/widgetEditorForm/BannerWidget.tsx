"use client";
import {
  BannerElement,
  BannerPatternType,
  WidgetType,
} from "@/model/WidgetType";
import {
  Badge,
  Button,
  Collapse,
  CollapseProps,
  Flex,
  Select,
  Tooltip,
} from "antd";
import { useMemo, useState } from "react";
import CustomSwitch from "../mini/CustomSwitch";
import WidgetTypeIcon from "../mini/WidgetTypeIcon";
import BannerForm from "../uploadImage/BannerForm";
import { FaRegHandPointer } from "react-icons/fa6";

interface WidgetProps {
  widget: WidgetType;
  updateWidgets(): void;
}

export default function BannerWidget(props: WidgetProps) {
  // mock data

  // variables
  const [proxyBanner, setProxyBanner] = useState<Array<string>>(
    Array.from(" ".repeat(4))
  );

  const [proxyBannerWidget, setProxyBannerWidget] = useState(props.widget);

  const [isSwitched, setIsSwitched] = useState(props.widget.visibility);

  const element = useMemo(() => {
    let temp = props.widget.element as BannerElement;

    temp.images.forEach((image, index) => {
      proxyBanner[index] = image;
    });
    setProxyBanner(proxyBanner);

    return temp;
  }, [props.widget.element]);

  // functions
  const handleSave = () => {
    proxyBannerWidget.visibility = isSwitched;

    // TODO: need experiment
    element.images = proxyBanner.filter((id) => id !== " ");
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

  const checkActive = (index: number) => {
    if (element.images[index] && element.images[index] !== " ") {
      return <Badge color="green" />;
    } else return <Badge color="gray" />;
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <div>Banner 1 {checkActive(0)}</div>,
      children: (
        <Flex vertical gap="large" className="overflow-hidden">
          {element.images[0] && element.images[0] !== " " && (
            <Tooltip
              title={
                <img
                  src={element.images[0]}
                  alt="banner"
                  style={{ width: "100%", height: "100%" }}
                />
              }
            >
              <Flex className="text-slate-500 w-max cursor-pointer" gap="small">
                <FaRegHandPointer />
                Ảnh hiện tại
              </Flex>
            </Tooltip>
          )}
          <BannerForm
            setImageUrl={function (url: string): void {
              handleChangeBanner(url, 0);
            }}
          />
        </Flex>
      ),
    },
    {
      key: "2",
      label: <div>Banner 2 {checkActive(1)}</div>,
      children: (
        <Flex vertical gap="large" className="overflow-hidden">
          {element.images[1] && element.images[1] !== " " && (
            <Tooltip
              title={
                <img
                  src={element.images[1]}
                  alt="banner"
                  style={{ width: "100%", height: "100%" }}
                />
              }
            >
              <Flex className="text-slate-500 w-max cursor-pointer" gap="small">
                <FaRegHandPointer />
                Ảnh hiện tại
              </Flex>
            </Tooltip>
          )}
          <BannerForm
            setImageUrl={function (url: string): void {
              handleChangeBanner(url, 1);
            }}
          />
        </Flex>
      ),
    },
    {
      key: "3",
      label: <div>Banner 3 {checkActive(2)}</div>,
      children: (
        <Flex vertical gap="large" className="overflow-hidden">
          {element.images[2] && element.images[2] !== " " && (
            <Tooltip
              title={
                <img
                  src={element.images[2]}
                  alt="banner"
                  style={{ width: "100%", height: "100%" }}
                />
              }
            >
              <Flex className="text-slate-500 w-max cursor-pointer" gap="small">
                <FaRegHandPointer />
                Ảnh hiện tại
              </Flex>
            </Tooltip>
          )}
          <BannerForm
            setImageUrl={function (url: string): void {
              handleChangeBanner(url, 2);
            }}
          />
        </Flex>
      ),
    },
    {
      key: "4",
      label: <div>Banner 4 {checkActive(3)}</div>,
      children: (
        <Flex vertical gap="large" className="overflow-hidden">
          {element.images[3] && element.images[3] !== " " && (
            <Tooltip
              title={
                <img
                  src={element.images[3]}
                  alt="banner"
                  style={{ width: "100%", height: "100%" }}
                />
              }
            >
              <Flex className="text-slate-500 w-max cursor-pointer" gap="small">
                <FaRegHandPointer />
                Ảnh hiện tại
              </Flex>
            </Tooltip>
          )}
          <BannerForm
            setImageUrl={function (url: string): void {
              handleChangeBanner(url, 3);
            }}
          />
        </Flex>
      ),
    },
  ];

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
