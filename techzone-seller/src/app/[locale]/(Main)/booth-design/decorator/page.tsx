"use client";
import AvatarForm from "@/component/booth-design/decorator/AvatarForm";
import BannerForm from "@/component/booth-design/decorator/BannerForm";
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
  | "magenta"
  | "purple";

export default function BoothDecoratorPage() {
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

  const [avatarUrl, setAvatarUrl] = useState();
  const [bannerUrl, setBannerUrl] = useState(); // ?
  const [name, setName] = useState("");

  return (
    <div className="m-10 z-0">
      <div className="m-5 text-2xl font-semibold flex justify-center">
        Trang trí gian hàng
      </div>
      <Flex vertical gap="large">
        {/* avatar */}
        <Flex vertical gap="large">
          <div className="font-semibold">Thay đổi ảnh đại diện</div>
          <AvatarForm />
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
            <Radio.Button value="default" onClick={() => setColor("white")}>
              Cơ bản
            </Radio.Button>
          </Radio.Group>

          {mode === "upload" && <BannerForm />}
          {mode === "color" && (
            <Radio.Group
              onChange={handleColorChange}
              value={color}
              style={{ marginBottom: 8 }}
            >
              <Radio.Button className="black" value="black">
                <Badge color="black" /> Đen
              </Radio.Button>
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
              <Radio.Button value="magenta">
                <Badge color="magenta" /> Màu cánh sen
              </Radio.Button>
              <Radio.Button value="purple">
                <Badge color="purple" /> Tím
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
          <Button size="large">Xem trước gian hàng</Button>
          <Button size="large">Lưu thay đổi</Button>
        </Flex>
      </Flex>
    </div>
  );
}
