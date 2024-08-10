import { Button, Modal } from "antd";

interface ModalProps {
  open: boolean;
  handleOk(): void;
  handleCancel(): void;
}
export default function ApplyTemplateModal(props: ModalProps) {
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
          Áp dụng template
        </Button>,
      ]}
      width={400}
    >
      <p>Áp dụng template sẽ xóa tất cả widget đã tạo.</p>
      <p>Bạn có muốn tiếp tục?</p>
    </Modal>
  );
}
