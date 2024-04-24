import { Empty } from "antd";

export default function CustomEmpty() {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span>Không có</span>}
    />
  );
}
