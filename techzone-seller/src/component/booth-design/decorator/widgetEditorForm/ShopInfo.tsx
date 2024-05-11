"use client";
import AvatarForm from "@/component/booth-design/decorator/uploadImage/AvatarForm";
import BannerForm from "@/component/booth-design/decorator/uploadImage/BannerForm";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Input,
  Radio,
  RadioChangeEvent,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import BannerModal from "@/component/booth-design/decorator/BannerModal";
import { ShopInfoProps } from "@/app/[locale]/(Main)/booth-design/decorator/page";
import { FaRegHandPointer } from "react-icons/fa6";

type TabPosition = "upload" | "color" | "default";
type Colors =
  | "white"
  | "black"
  | "red"
  | "orange"
  | "yellow"
  | "cyan"
  | "blue"
  | "green"
  | "pink"
  | "purple";

interface ShopInfoWidgetProps {
  shopInfo: ShopInfoProps;
  setShopInfo(shopInfo: ShopInfoProps): void;
}

export default function ShopInfo(props: ShopInfoWidgetProps) {
  //banner mode
  const [mode, setMode] = useState<TabPosition>("default");
  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
    if (e.target.value === "color") setBannerUrl("");
  };

  //banner color
  const [color, setColor] = useState<Colors>("white");
  const handleColorChange = (e: RadioChangeEvent) => {
    setColor(e.target.value);
  };

  // data
  const [avatarUrl, setAvatarUrl] = useState<string>(props.shopInfo.avatarUrl);
  const [bannerUrl, setBannerUrl] = useState<string>(props.shopInfo.bannerUrl); // ?
  const [name, setName] = useState(props.shopInfo.name);

  const [openPreview, setOpenPreview] = useState(false);

  // functions
  const handleSave = () => {
    let newInfo = {
      color: color,
      name: name,
      avatarUrl: avatarUrl,
      bannerUrl: bannerUrl,
    } as ShopInfoProps;

    props.setShopInfo(newInfo);
  };

  const handlePreview = () => {
    setOpenPreview(true);
  };

  return (
    <div className="m-5 pb-5 h-[500px] overflow-y-auto overflow-x-hidden">
      <div className="m-5 text-2xl font-semibold flex justify-center">
        Thông tin chung
      </div>
      <Flex vertical>
        {/* avatar */}
        <Flex vertical gap="large">
          <div className="font-semibold">Thay đổi ảnh đại diện</div>

          {props.shopInfo.avatarUrl && props.shopInfo.avatarUrl !== " " && (
            <Tooltip
              title={
                <img
                  src={props.shopInfo.avatarUrl}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              }
            >
              <Flex className="text-slate-500 w-max cursor-pointer" gap="small">
                <FaRegHandPointer />
                Ảnh đại diện hiện tại
              </Flex>
            </Tooltip>
          )}

          <AvatarForm setImageUrl={setAvatarUrl} />
        </Flex>

        <Divider />

        {/* banner */}
        <Flex vertical gap="small">
          <div className="font-semibold">Thay đổi ảnh nền</div>

          {props.shopInfo.bannerUrl && props.shopInfo.bannerUrl !== " " && (
            <Tooltip
              title={
                <img
                  src={props.shopInfo.bannerUrl}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              }
            >
              <Flex className="text-slate-500 w-max cursor-pointer" gap="small">
                <FaRegHandPointer />
                Ảnh nền hiện tại
              </Flex>
            </Tooltip>
          )}

          <Radio.Group
            onChange={handleModeChange}
            value={mode}
            style={{ marginBottom: 8 }}
          >
            <Radio.Button value="upload" onClick={() => setColor("white")}>
              Đăng tải ảnh
            </Radio.Button>
            <Radio.Button value="color">Chọn màu</Radio.Button>
          </Radio.Group>

          {mode === "upload" && <BannerForm setImageUrl={setBannerUrl} />}
          {mode === "color" && (
            <Radio.Group
              onChange={handleColorChange}
              value={color}
              style={{ marginBottom: 8 }}
            >
              <Radio.Button value="white">Cơ bản</Radio.Button>
              <Radio.Button value="red">
                <Badge color="red" /> Đỏ
              </Radio.Button>
              <Radio.Button value="orange">
                <Badge color="orange" /> Cam
              </Radio.Button>
              <Radio.Button value="yellow">
                <Badge color="yellow" /> Vàng
              </Radio.Button>
              <Radio.Button value="cyan">
                <Badge color="cyan" /> Xanh da trời
              </Radio.Button>
              <Radio.Button value="blue">
                <Badge color="blue" /> Xanh nước biển
              </Radio.Button>
              <Radio.Button value="green">
                <Badge color="green" /> Xanh lá
              </Radio.Button>
              <Radio.Button value="pink">
                <Badge color="pink" /> Hồng
              </Radio.Button>
              <Radio.Button value="purple">
                <Badge color="purple" /> Tím
              </Radio.Button>
              <Radio.Button value="black">
                <Badge color="black" /> Đen
              </Radio.Button>
            </Radio.Group>
          )}
        </Flex>

        <Divider />

        {/* name */}
        <Flex gap="large">
          <div className="font-semibold mt-2">Chỉnh sửa tên</div>
          <div className="w-1/2">
            <Input
              placeholder={
                props.shopInfo.name && props.shopInfo.name !== ""
                  ? props.shopInfo.name
                  : "Điền tên"
              }
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Giới hạn n kí tự">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Flex>

        <Divider />

        {/* Preview Booth */}
        <Flex gap="large">
          <Button size="large" onClick={handlePreview}>
            Xem trước
          </Button>
          <Button size="large" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Flex>
      </Flex>

      <div className="overflow-hidden h-[10px]">
        <BannerModal
          color={color}
          name={name}
          avatarUrl={avatarUrl}
          bannerUrl={bannerUrl}
          open={openPreview}
          setOpen={setOpenPreview}
        />
      </div>
    </div>
  );
}
