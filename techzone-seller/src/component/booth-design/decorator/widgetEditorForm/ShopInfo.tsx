"use client";
import AvatarForm from "@/component/booth-design/decorator/uploadImage/AvatarForm";
import BannerForm from "@/component/booth-design/decorator/uploadImage/BannerForm";
import {
  Badge,
  Button,
  Flex,
  Input,
  Radio,
  RadioChangeEvent,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import BannerModal from "@/component/booth-design/decorator/BannerModal";
import UploadImageModal from "../uploadImage/UploadImageModal";

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

export default function ShopInfo() {
  //banner mode
  const [mode, setMode] = useState<TabPosition>("default");
  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  //banner color
  const [color, setColor] = useState<Colors>("white");
  const handleColorChange = (e: RadioChangeEvent) => {
    setColor(e.target.value);
  };

  // data
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [bannerUrl, setBannerUrl] = useState<string>(""); // ?
  const [name, setName] = useState("");

  const [openPreview, setOpenPreview] = useState(false);

  const [openUploadImage, setOpenUploadImage] = useState(false);

  // funtions
  const handleSave = () => {
    //
  };

  const handlePreview = () => {
    setOpenPreview(true);
  };

  return (
    <div className="m-5 pb-5">
      <div className="m-5 text-2xl font-semibold flex justify-center">
        Thông tin chung
      </div>
      <Flex vertical gap="large">
        {/* avatar */}
        <Flex vertical gap="large">
          <div className="font-semibold">Thay đổi ảnh đại diện</div>
          <AvatarForm setImageUrl={setAvatarUrl} />
        </Flex>

        {/* banner */}
        <Flex vertical gap="small">
          <div className="font-semibold">Thay đổi ảnh nền</div>
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

        {/* name */}
        <Flex gap="large">
          <div className="font-semibold">Chỉnh sửa tên</div>
          <div className="w-1/2">
            <Input
              placeholder="Điền tên"
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

        {/* Preview Booth */}
        <Flex gap="large">
          <Button size="large" onClick={handlePreview}>
            Xem trước
          </Button>
          <Button size="large" onClick={handleSave}>
            Lưu thay đổi
          </Button>

          {/* test */}
          <Button size="large" onClick={() => setOpenUploadImage(true)}>
            Cropper
          </Button>
        </Flex>
      </Flex>

      <BannerModal
        color={color}
        name={name}
        avatarUrl={avatarUrl}
        open={openPreview}
        setOpen={setOpenPreview}
      />

      <UploadImageModal
        imageUrl={avatarUrl}
        setImageUrl={setAvatarUrl}
        open={openUploadImage}
        setOpen={setOpenUploadImage}
      />
    </div>
  );
}
