"use client";
import { Button, Modal } from "antd";
import Banner from "./mini/Banner";

interface BannerProps {
  color: string;
  name: string;
  avatarUrl: string | undefined;
  bannerUrl: string | undefined;
  open: boolean;
  setOpen(value: boolean): void;
}

export default function BannerModal(bannerProps: BannerProps) {
  return (
    <Modal
      title="Thông tin chung"
      centered
      open={bannerProps.open}
      // onOk={() => bannerProps.setOpen(false)}
      onCancel={() => bannerProps.setOpen(false)}
      width={1000}
      footer={[
        <Button key="back" onClick={() => bannerProps.setOpen(false)}>
          {/* Return */}
          Quay về
        </Button>,
      ]}
    >
      <div className="border-2 border-black m-10">
        <Banner
          color={bannerProps.color}
          name={bannerProps.name}
          avatarUrl={bannerProps.avatarUrl}
          bannerUrl={bannerProps.bannerUrl}
        />
      </div>
    </Modal>
  );
}
