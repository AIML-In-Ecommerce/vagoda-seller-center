import { CaretRightOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  CollapseProps,
  DatePicker,
  Empty,
  message,
  Modal,
  Select,
  Steps,
  Table,
  Tabs,
  TabsProps,
  theme,
  Tooltip,
  Upload,
  UploadProps,
} from "antd";
import React, { CSSProperties, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { HiOutlineDownload } from "react-icons/hi";

export type ImportedFileType = {
  id: string;
  sendingTime: string;
  sender: string;
  fileName: string;
  status: string;
  productNumber: number;
  note: string;
};

const sampleSenders = [
  {
    value: "langthao@gmail.com",
    label: "langthao@gmail.com",
  },
  {
    value: "nguyen@gmail.com",
    label: "nguyen@gmail.com",
  },
  {
    value: "phuong@gmail.com",
    label: "phuong@gmail.com",
  },
  {
    value: "quang@gmail.com",
    label: "quang@gmail.com",
  },
];
export type OptionType = { label: string; value: string };
export default function CreateBatchProduct() {
  const { RangePicker } = DatePicker;
  const { token } = theme.useToken();
  const [senders, setSenders] = useState<OptionType[]>(sampleSenders);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Dragger } = Upload;
  const importedFiles: ImportedFileType[] = [
    {
      id: "1",
      sendingTime: "2024-03-28 10:30:00",
      sender: "nguyen@gmail.com",
      fileName: "data1.csv",
      status: "Đang xử lý",
      productNumber: 50,
      note: "Dữ liệu mới",
    },
    {
      id: "2",
      sendingTime: "2024-03-27 15:45:00",
      sender: "phuong@gmail.com",
      fileName: "data2.csv",
      status: "Hoàn thành",
      productNumber: 100,
      note: "Dữ liệu cũ",
    },
    // Thêm các object khác nếu cần
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Thời gian gửi file",
      dataIndex: "sendingTime",
    },
    {
      title: "Người gửi",
      dataIndex: "sender",
      width: "25%",
    },
    {
      title: "Tên file import",
      dataIndex: "fileName",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "productNumber",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: "20%",
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: ImportedFileType) => {
        return (
          <div className="space-x-2 flex">
            <Tooltip placement="topLeft" title={"Xem sản phẩm import"}>
              <Button type="primary" className="bg-sky-100 text-black">
                <GrView />
              </Button>
            </Tooltip>
            <Tooltip placement="topLeft" title={"Tải xuống"}>
              <Button type="primary" className="bg-sky-100 text-black">
                <HiOutlineDownload />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ImportedFileType[]
    ) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: ImportedFileType) => ({
      disabled: record.id === "Disabled User",
      name: record.id,
    }),
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đăng tải tập tin",
      children: (
        <div>
          <Steps
            className="mb-4"
            size="small"
            current={1}
            items={[
              {
                title: "Chọn file",
              },
              {
                title: "Kiểm tra dữ liệu",
              },
            ]}
          />
          <Dragger {...props}>
            <p className="ant-upload-drag-icon flex justify-center items-center">
              <FiUpload size={40} />
            </p>
            <p className="ant-upload-text">
              Nhấn hoặc kéo thả tập tin vào để tải lên
            </p>
            <div className="flex">
              {" "}
              <span className="text-red-500 mr-1 text-xs">*</span>
              <p className=" text-xs">
                Chỉ chấp nhận tập tin có định dạng .xls hoặc .xlsx, tối đa 10000
                dòng và kích cỡ tập tin không quá 10MB.
              </p>
            </div>
          </Dragger>
        </div>
      ),
    },
    {
      key: "2",
      label: "Tập tin mẫu",
      children: (
        <div>
          <div className="font-sembold">
            Chọn một danh mục để tải về tập tin mẫu
          </div>
        </div>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: <div className="">Tìm kiếm</div>,
      children: (
        <div className="flex space-x-2 items-center">
          <div className="">
            <p className="font-semibold">Ngày gửi file</p>
            <RangePicker />
          </div>
          <div className="">
            <div className="font-semibold">Người gửi</div>
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Nhập tên hay email để tìm kiếm"
              optionFilterProp="children"
              options={senders}
              filterOption={(input, option: OptionType[]) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </div>
          <div className="">
            <div className="font-semibold">Trạng thái</div>
            <Select
              defaultValue="Tất cả"
              style={{ width: 200 }}
              options={[
                { value: "Tất cả", label: "Tất cả" },
                { value: "Chưa xử lý", label: "Chưa xử lý" },
                { value: "Đang xử lý", label: "Đang xử lý" },
                { value: "Đã xử lý", label: "Đã xử lý" },
                { value: "Đã thất bại", label: "Đã thất bại" },
                { value: "Nháp", label: "Nháp" },
              ]}
            />
          </div>
          <div className="">
            <div className="font-semibold">Kết quả import</div>
            <Select
              defaultValue="Tất cả"
              style={{ width: 200 }}
              options={[
                { value: "Tất cả", label: "Tất cả" },
                { value: "Thành công", label: "Thành công" },
                { value: "Có lỗi", label: "Có lỗi" },
              ]}
            />
          </div>
        </div>
      ),
      style: panelStyle,
    },
  ];

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <div>
      {" "}
      {/* <FileDownloadButton
        templateCategory="ClassList"
        filename="ClassList_Template"
      /> */}
      <Collapse
        className="bg-slate-100 p-1 mt-4"
        bordered={false}
        defaultActiveKey={["1"]}
        items={getItems(panelStyle)}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
      />
      <div className="flex justify-between mt-2">
        <p className="uppercase"> danh sách</p>
        <Button
          type="primary"
          className="bg-sky-500 rounded-lg "
          onClick={showModal}
        >
          Tạo mới hàng loạt
        </Button>
        <Modal
          width={700}
          title="IMPORT TẠO MỚI SẢN PHẨM"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Tabs defaultActiveKey="1" items={items} />
        </Modal>
      </div>
      <Table
        bordered
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        columns={columns}
        dataSource={importedFiles}
        locale={{
          emptyText: <Empty description={<span>Trống</span>} />, // Hiển thị Empty nếu không có dữ liệu
        }}
        className="mt-4"
      />
    </div>
  );
}
