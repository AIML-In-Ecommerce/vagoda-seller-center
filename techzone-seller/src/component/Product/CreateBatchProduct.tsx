"use client";
import { FileInfoInput } from "@/apis/ProductAPI";
import { _ProductType, ImportInfoType } from "@/model/ProductType";
import { ProductService } from "@/services/Product";
import { CaretRightOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  CollapseProps,
  ConfigProvider,
  DatePicker,
  Empty,
  Input,
  message,
  Modal,
  Popconfirm,
  Result,
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
import { SearchProps } from "antd/es/input";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import FormData from "form-data";
import moment from "moment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { CSSProperties, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { HiOutlineDownload, HiOutlineInformationCircle } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { read, utils } from "xlsx";
import { formatPrice } from "../utils/formatPrice";
const { RangePicker } = DatePicker;
const { Search } = Input;

export type OptionType = { label: string; value: string };

export default function CreateBatchProduct() {
  const query = useSearchParams();
  const { token } = theme.useToken();
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);
  const [isDisplayProductsModalOpen, setIsDisplayProductsModalOpen] =
    useState(false);
  const { Dragger } = Upload;
  const [currentStep, setCurrentStep] = useState(0);
  const [allImportInfos, setAllImportInfos] = useState<ImportInfoType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRow, setSelectedRow] = useState<_ProductType[]>();
  const convertDataTable = (data: ImportInfoType[]) => {
    const result = data.map((record: ImportInfoType, index) => ({
      ...record,
      index: index + 1,
      productNumber: record.products.length,
    }));
    return result;
  };

  const deleteProduct = async (product_id: string) => {
    const response: { status: number; message: string } =
      await ProductService.deleteProductById(product_id);

    if (response.status == 200) {
      message.success("Xóa sản phẩm thành công");
    } else {
      message.error("Không thể xóa sản phẩm");
    }
  };

  const displayProductcolumns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      render: (text: string, record: _ProductType) => (
        <a
          href={`list/update/${record._id}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={record.images ? record.images[0] : ""}
            alt={text}
            style={{ marginRight: "8px", width: "32px", height: "32px" }}
          />
          {text ? text : ""}
        </a>
      ),
      width: "30%",
    },
    {
      title: () => (
        <div className="flex space-x-1 items-center">
          <p>Tồn có thể bán</p>
          <Tooltip
            className="flex space-x-1 items-center"
            title={
              <div className="tooltip-content">
                <p className="mb-4">
                  Mô hình FBT: Tồn có thể bán = Tổng tồn kho Tiki hiện tại -
                  Tổng số lượng đã đặt hàng, đang xử lý.
                </p>
                <p>
                  Mô hình khác FBT: Tồn có thể bán = Tổng tồn kho Nhà bán hiện
                  tại - Tổng số lượng đã đặt hàng, đang xử lý.
                </p>
              </div>
            }
            overlayClassName="tooltip-overlay"
          >
            <HiOutlineInformationCircle />
          </Tooltip>
        </div>
      ),
      dataIndex: "inventoryAmount",
      defaultSortOrder: "descend" as const,
      sorter: (a: _ProductType, b: _ProductType) =>
        a.inventoryAmount - b.inventoryAmount,
      width: "14%",
    },
    {
      title: "Giá bán",
      dataIndex: "finalPrice",
      render: (text: number) => formatPrice(text),
      sorter: (a: _ProductType, b: _ProductType) => a.finalPrice - b.finalPrice,
      width: "10%",
    },
    {
      title: () => (
        <div className="flex space-x-1 items-center">
          <p>Phí Techzone thu</p>
          <Tooltip
            title={
              <div className="tooltip-content">
                <p className="mb-4">
                  Các khoản phí Nhà bán sẽ bị trừ trên từng sản phẩm được bán ra
                </p>
              </div>
            }
            overlayClassName="tooltip-overlay"
          >
            <HiOutlineInformationCircle />
          </Tooltip>
        </div>
      ),
      dataIndex: "platformFee",
      render: (text: number) => formatPrice(text),
      sorter: (a: _ProductType, b: _ProductType) =>
        a.platformFee - b.platformFee,
      width: "17%",
    },
    {
      title: () => (
        <div className="flex space-x-1 items-center">
          <p>Lợi nhuận</p>
          <Tooltip
            title={
              <div className="tooltip-content">
                <p className="mb-4">
                  Số tiền (tạm tính) Nhà bán thu được trên từng sản phẩm bán ra
                  sau khi trừ các phí:
                </p>
                <p className="text-green-500">
                  · Số dương: Techzone sẽ trả cho Nhà bán
                </p>
                <p className="text-amber-400">
                  · Số âm: Nhà bán phải trả cho Techzone
                </p>
              </div>
            }
            overlayClassName="tooltip-overlay"
          >
            <HiOutlineInformationCircle />
          </Tooltip>
        </div>
      ),
      dataIndex: "profit",
      sorter: (a: _ProductType, b: _ProductType) => a.profit - b.profit,
      width: "15%",
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: _ProductType) => {
        return (
          <div className="xl:space-x-1 space-x-2">
            <Button
              type="primary"
              className="bg-sky-100 text-black"
              // onClick={() => showDrawer(record)}
            >
              <Link href={`list/update/${record._id}`}>
                <BiEditAlt />
              </Link>
            </Button>
            <Popconfirm
              title="Bạn chắc chắn muốn xóa sản phẩm này không ?"
              description="Sản phẩm sẽ bị xóa hoàn toàn và không thể hồi phục lại được."
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => deleteProduct(record._id)}
            >
              <Button type="primary" danger>
                <RiDeleteBinLine />
              </Button>
            </Popconfirm>
          </div>
        );
      },
      width: "14%",
    },
  ];

  const createBatchcolumns = [
    { title: "STT", dataIndex: "index", width: "5%" },
    {
      title: "Thời gian gửi file",
      dataIndex: "createdAt",
      width: "25%",
      render: (_: any, record: ImportInfoType) => (
        <div>
          {record.createdAt
            ? moment(record.createdAt).format("DD/MM/YYYY HH:mm:ss")
            : ""}
        </div>
      ),
    },
    { title: "Kết quả import", dataIndex: "status", width: "15%" },
    { title: "Tên file import", dataIndex: "name", width: "25%" },
    { title: "Số lượng sản phẩm", dataIndex: "productNumber" },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: ImportInfoType) => (
        <div className="space-x-2 flex">
          <Tooltip placement="topLeft" title={"Xem sản phẩm import"}>
            <Button
              type="primary"
              className="bg-sky-100 text-black"
              onClick={() => {
                setSelectedRow(record.products);
                showDisplayProductsModal();
              }}
            >
              <GrView />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title={"Tải xuống"}>
            <Button
              type="primary"
              className="bg-sky-100 text-black"
              onClick={() => handleDownload(record.url, record.name)}
            >
              <HiOutlineDownload />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleDownload = async (url: string, fileName: string) => {
    try {
      FileSaver.saveAs(url, fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const validateFile = async (file: File) => {
    setCurrentStep(1);
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!validTypes.includes(file.type)) {
      message.error("Chỉ chấp nhận tập tin có định dạng .xls hoặc .xlsx.");
      return false;
    }

    let check = true;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      var range = utils.decode_range(sheet["!ref"]!);
      range.s.r = 0;
      sheet["!ref"] = utils.encode_range(range);
      const jsonData = utils.sheet_to_json(sheet, { header: 1 });

      const headerRow = jsonData[0] as string[];

      const dataRows = jsonData
        .slice(1)
        .filter((row) => Array.isArray(row) && row.length > 0);
      console.log("EXCEL", headerRow, dataRows);

      if (dataRows.length > 1000) {
        message.error("Không được import quá 1000 sản phẩm");
        check = false;
        return false;
      } else {
        message.success("Tải dữ liệu thành công");
        return true;
      }
    };

    return check;
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".xls,.xlsx",
    beforeUpload: async (file) => {
      const isValid = await validateFile(file);
      if (isValid) {
        setSelectedFile(file);
        setCurrentStep(2);

        return true;
      }
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "removed") {
        setCurrentStep(0);
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
            current={currentStep}
            items={[{ title: "Chọn file" }, { title: "Kiểm tra dữ liệu" }]}
          />
          {currentStep != 0 ? (
            <ConfigProvider
              theme={{
                components: {
                  Result: {
                    iconFontSize: 64,
                    extraMargin: 0,
                    titleFontSize: 16,
                  },
                },
              }}
            >
              <Result
                status={currentStep === 2 ? "success" : "error"}
                title={
                  currentStep === 2 ? "Tập tin hợp lệ" : "Tập tin không hợp lệ"
                }
                extra={[
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => setCurrentStep(0)}
                  >
                    Chọn tập tin khác
                  </Button>,
                ]}
              />
            </ConfigProvider>
          ) : (
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
                  Chỉ chấp nhận tập tin có định dạng .xls hoặc .xlsx, tối đa
                  1000 dòng và kích cỡ tập tin không quá 10MB.
                </p>
              </div>
            </Dragger>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Tập tin mẫu",
      children: (
        <div className=" flex flex-col space-y-2 items-center justify-center mx-auto">
          <div className="font-sembold">Bấm để tải tập tin mẫu</div>
          <Button
            type="primary"
            icon={<HiOutlineDownload />}
            onClick={() =>
              handleDownload(
                `${process.env.NEXT_PUBLIC_SAMPLE_FILE}`,
                "sample.xlsx"
              )
            }
          >
            Tập tin mẫu
          </Button>
        </div>
      ),
    },
  ];

  const showCreateBatchModal = () => {
    setIsCreateBatchModalOpen(true);
  };

  const handleCreateBatchOk = async () => {
    if (selectedFile) {
      console.log("Creating", selectedFile as File);
      const formData = new FormData();
      formData.append("file", selectedFile as File);
      console.log("File selected", formData);

      try {
        const { status } = await ProductService.createBatchProduct(formData);
        if (status == 200) {
          message.success("File imported successfully");
        }

        setIsCreateBatchModalOpen(false);
        setCurrentStep(0);
        setSelectedFile(null);
      } catch (error) {
        message.error("Error importing file");
        console.error("Error importing file:", error);
      }
    }
  };

  const resetFilter = () => {
    setSearchValue("");
    setStartDate(null);
    setEndDate(null);
    setFilterStatus("");
    window.history.pushState({}, "", `${window.location.pathname}`);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (value.length != 0) {
      const updatedQuery = new URLSearchParams(query);
      updatedQuery.set("name", value);
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${updatedQuery.toString()}`
      );
    }
  };

  const handleDisplayProductsCancel = () => {
    setIsDisplayProductsModalOpen(false);
  };

  const showDisplayProductsModal = () => {
    setIsDisplayProductsModalOpen(true);
  };

  //const handleDisplayProductsOk = async () => {};

  const onStatusFilter = (value: string) => {
    setFilterStatus(value);
    const updatedQuery = new URLSearchParams(query);

    if (value.length != 0) {
      updatedQuery.set("status", value);
    } else {
      updatedQuery.delete("status");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const onDateChange = (value: any, dateString: string[]) => {
    const updatedQuery = new URLSearchParams(query);
    if (value && value.length === 2) {
      console.log(`${dateString}`);
      setStartDate(dateString[0]);
      setEndDate(dateString[1]);

      updatedQuery.set("startDate", dateString[0]);
      updatedQuery.set("endDate", dateString[1]);
    } else {
      setStartDate(null);
      setEndDate(null);

      updatedQuery.delete("startDate");
      updatedQuery.delete("endDate");
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const handleCreateBatchCancel = () => {
    setIsCreateBatchModalOpen(false);
  };
  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: <div className="">Tìm kiếm</div>,
      children: (
        <div className="flex space-x-8 items-center mx-auto">
          <div className="">
            <p className="font-semibold">Tìm kiếm tên file</p>
            <Search
              placeholder={`Nhập tên file`}
              style={{
                borderRadius: "5px",
                width: 300,
              }}
              onSearch={onSearch}
              type="primary"
              enterButton
              className="theme-button "
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </div>
          <div className="">
            <p className="font-semibold">Ngày gửi file</p>
            <RangePicker
              onChange={onDateChange}
              placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              value={[
                startDate ? dayjs(startDate) : null,
                endDate ? dayjs(endDate) : null,
              ]}
            />
          </div>
          <div className="">
            <div className="font-semibold">Kết quả import</div>
            <Select
              onChange={onStatusFilter}
              defaultValue="Tất cả"
              style={{ width: 160 }}
              options={[
                { value: "", label: "Tất cả" },
                { value: "SUCCESS", label: "Thành công" },
                { value: "FALURE", label: "Có lỗi" },
              ]}
              value={filterStatus}
            />
          </div>
          <Button
            type="text"
            className="mt-5 text-sky-400"
            onClick={resetFilter}
          >
            Xóa bộ lọc
          </Button>
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

  const loadFilteredFileInfos = async () => {
    console.log("Loading", query.get("name"));
    const input: FileInfoInput = {
      shop: "65f1e8bbc4e39014df775166",
      name: query.get("name") || undefined,
      startDate: query.get("startDate") || undefined,
      endDate: query.get("endDate") || undefined,
      status: query.get("status") || undefined,
    };
    const response: ImportInfoType[] = await ProductService.getFileInfoByFilter(
      input
    );
    setAllImportInfos(response);
    console.log("Result: " + response);
  };

  useEffect(() => {
    console.log("QUANG", query.get("name"));
    loadFilteredFileInfos();
  }, [query]);

  return (
    <div>
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
      <div className="flex flex-row-reverse">
        <Button
          type="primary"
          size="large"
          className="bg-sky-500 rounded-lg text-sm"
          onClick={showCreateBatchModal}
        >
          + Tạo mới hàng loạt
        </Button>
      </div>
      <div className="flex justify-between mt-2">
        <p className="uppercase font-semibold"> danh sách</p>

        <Modal
          width={700}
          title="IMPORT TẠO MỚI SẢN PHẨM"
          cancelText="Hủy"
          open={isCreateBatchModalOpen}
          onOk={handleCreateBatchOk}
          onCancel={handleCreateBatchCancel}
          okButtonProps={{ disabled: currentStep < 2 }}
        >
          <Tabs defaultActiveKey="1" items={items} className="mt-4" />
        </Modal>

        {selectedRow && (
          <Modal
            centered
            width={1100}
            title="DANH SÁCH SẢN PHẨM ĐƯỢC IMPORT"
            cancelText="Hủy"
            open={isDisplayProductsModalOpen}
            onCancel={handleDisplayProductsCancel}
            footer={null}
          >
            <div className="scroll-auto " style={{ minHeight: "400px" }}>
              <Table
                pagination={{
                  pageSize: 20,
                  pageSizeOptions: ["20", "10", "5"],
                  showSizeChanger: true,
                  total: selectedRow?.length,
                }}
                bordered
                columns={displayProductcolumns}
                dataSource={selectedRow}
                locale={{
                  emptyText: <Empty description={<span>Trống</span>} />,
                }}
                className=""
              />
            </div>
          </Modal>
        )}
      </div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            // onClick: (event) => {
            //   () => showDrawer(record);
            // },
          };
        }}
        pagination={{
          pageSizeOptions: ["10", "5"],
          showSizeChanger: true,
          total: allImportInfos.length,
          // onChange: (page, pageSize) => {
          //   fetchRecords(page, pageSize);
          // }
        }}
        bordered
        columns={createBatchcolumns}
        dataSource={convertDataTable(allImportInfos)}
        locale={{
          emptyText: <Empty description={<span>Trống</span>} />,
        }}
        className=""
      />
    </div>
  );
}
