import { Button, Modal } from "antd";

interface ModalProps {
  open: boolean;
  handleOk(): void;
  handleCancel(): void;
}
export default function DeleteWidgetModal(props: ModalProps) {
  return (
    <Modal
      title="Xác nhận"
      open={props.open}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button key="cancel" onClick={props.handleCancel}>
          Hủy
        </Button>,
        <Button key="ok" type="primary" danger onClick={props.handleOk}>
          Tiếp tục
        </Button>,
      ]}
      width={200}
    >
      <p>Xoá Widget?</p>
    </Modal>
  );
}
