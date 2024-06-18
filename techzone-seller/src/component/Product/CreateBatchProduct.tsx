"use client";
import { CaretRightOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  CollapseProps,
  ConfigProvider,
  ConfigProviderProps,
  DatePicker,
  Empty,
  message,
  Modal,
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
import FileSaver from "file-saver";
import React, { CSSProperties, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { HiOutlineDownload } from "react-icons/hi";
import { read, utils } from "xlsx";

type SizeType = ConfigProviderProps["componentSize"];

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
  { value: "langthao@gmail.com", label: "langthao@gmail.com" },
  { value: "nguyen@gmail.com", label: "nguyen@gmail.com" },
  { value: "phuong@gmail.com", label: "phuong@gmail.com" },
  { value: "quang@gmail.com", label: "quang@gmail.com" },
];

export type OptionType = { label: string; value: string };

export default function CreateBatchProduct() {
  const { RangePicker } = DatePicker;
  const { token } = theme.useToken();
  const [senders, setSenders] = useState<OptionType[]>(sampleSenders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Dragger } = Upload;
  const [currentStep, setCurrentStep] = useState(0);

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
  ];

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Thời gian gửi file", dataIndex: "sendingTime", width: "15%" },
    { title: "Kết quả import", dataIndex: "result", width: "15%" },
    { title: "Tên file import", dataIndex: "fileName", width: "15%" },
    // { title: "Trạng thái", dataIndex: "status" },
    { title: "Số lượng sản phẩm", dataIndex: "productNumber" },
    { title: "Ghi chú", dataIndex: "note", width: "25%" },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: ImportedFileType) => (
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
      ),
    },
  ];

  const handleDownload = async () => {
    try {
      FileSaver.saveAs(`${process.env.NEXT_PUBLIC_SAMPLE_FILE}`, "sample.xlsx");
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

    // reader.onerror = (event) => {
    //   message.error("File upload failed.");
    // };

    // reader.readAsArrayBuffer(file);
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
        setCurrentStep(2);
        console.log("THong", currentStep);
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
            onClick={handleDownload}
          >
            Tập tin mẫu
          </Button>
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
          {/* <div className="">
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
          </div> */}
          {/* <div className="">
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
          </div> */}
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
          + Tạo mới hàng loạt
        </Button>
        <Modal
          width={700}
          title="IMPORT TẠO MỚI SẢN PHẨM"
          cancelText="Hủy"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: currentStep < 2 }}
        >
          <Tabs defaultActiveKey="1" items={items} />
        </Modal>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={importedFiles}
        locale={{
          emptyText: <Empty description={<span>Trống</span>} />,
        }}
        className="mt-4"
      />
    </div>
  );
}
// "use client";

// import { formatPrice } from "@/component/utils/formatPrice";
// import { _ProductType } from "@/model/ProductType";
// import { ProductService } from "@/services/Product";
// import { QuestionCircleOutlined } from "@ant-design/icons";
// import {
//   Button,
//   ConfigProvider,
//   ConfigProviderProps,
//   Empty,
//   Modal,
//   Popconfirm,
//   Result,
//   Steps,
//   Table,
//   Tabs,
//   TabsProps,
//   Tooltip,
//   Upload,
//   UploadProps,
//   message,
//   theme,
// } from "antd";
// import FileSaver from "file-saver";
// import Link from "next/link";
// import { useState } from "react";
// import { BiEditAlt } from "react-icons/bi";
// import { FiUpload } from "react-icons/fi";
// import { HiOutlineDownload } from "react-icons/hi";
// import { HiOutlineInformationCircle } from "react-icons/hi2";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { read, utils } from "xlsx";

// type SizeType = ConfigProviderProps["componentSize"];

// export type OptionType = { label: string; value: string };

// export default function CreateBatchProduct() {
//   const { token } = theme.useToken();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { Dragger } = Upload;
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState<_ProductType | null>(
//     null
//   );
//   const [openProductDetail, setOpenProductDetail] = useState(false);
//   const [allProducts, setAllProducts] = useState<_ProductType[]>([]);

//   const showDrawer = (product: _ProductType) => {
//     setSelectedProduct(product);
//     setOpenProductDetail(true);
//   };

//   const deleteProduct = async (product_id: string) => {
//     const response: { status: number; message: string } =
//       await ProductService.deleteProductById(product_id);

//     if (response.status == 200) {
//       message.success("Xóa sản phẩm thành công");
//     } else {
//       message.error("Không thể xóa sản phẩm");
//     }
//     const updatedProducts = { ...allProducts };
//     updatedProducts.filter((product) => product._id == product_id);
//     setAllProducts(updatedProducts);
//   };
//   const columns = [
//     {
//       title: "Sản phẩm",
//       dataIndex: "name",
//       render: (text: string, record: _ProductType) => (
//         <a
//           style={{ display: "flex", alignItems: "center" }}
//           onClick={() => showDrawer(record)}
//         >
//           <img
//             src={record.images ? record.images[0] : ""}
//             alt={text}
//             style={{ marginRight: "8px", width: "32px", height: "32px" }}
//           />
//           {text ? text : ""}
//         </a>
//       ),
//       width: "30%",
//     },
//     {
//       title: () => (
//         <div className="flex space-x-1 items-center">
//           <p>Tồn có thể bán</p>
//           <Tooltip
//             className="flex space-x-1 items-center"
//             title={
//               <div className="tooltip-content">
//                 <p className="mb-4">
//                   Mô hình FBT: Tồn có thể bán = Tổng tồn kho Tiki hiện tại -
//                   Tổng số lượng đã đặt hàng, đang xử lý.
//                 </p>
//                 <p>
//                   Mô hình khác FBT: Tồn có thể bán = Tổng tồn kho Nhà bán hiện
//                   tại - Tổng số lượng đã đặt hàng, đang xử lý.
//                 </p>
//               </div>
//             }
//             overlayClassName="tooltip-overlay"
//           >
//             <HiOutlineInformationCircle />
//           </Tooltip>
//         </div>
//       ),
//       dataIndex: "inventoryAmount",
//       defaultSortOrder: "descend" as const,
//       sorter: (a: _ProductType, b: _ProductType) =>
//         a.inventoryAmount - b.inventoryAmount,
//       width: "14%",
//     },
//     {
//       title: "Giá bán",
//       dataIndex: "finalPrice",
//       render: (text: number) => formatPrice(text),
//       sorter: (a: _ProductType, b: _ProductType) => a.finalPrice - b.finalPrice,
//       width: "10%",
//     },
//     {
//       title: () => (
//         <div className="flex space-x-1 items-center">
//           <p>Phí Techzone thu</p>
//           <Tooltip
//             title={
//               <div className="tooltip-content">
//                 <p className="mb-4">
//                   Các khoản phí Nhà bán sẽ bị trừ trên từng sản phẩm được bán ra
//                 </p>
//               </div>
//             }
//             overlayClassName="tooltip-overlay"
//           >
//             <HiOutlineInformationCircle />
//           </Tooltip>
//         </div>
//       ),
//       dataIndex: "platformFee",
//       render: (text: number) => formatPrice(text),
//       sorter: (a: _ProductType, b: _ProductType) =>
//         a.platformFee - b.platformFee,
//       width: "17%",
//     },
//     {
//       title: () => (
//         <div className="flex space-x-1 items-center">
//           <p>Lợi nhuận</p>
//           <Tooltip
//             title={
//               <div className="tooltip-content">
//                 <p className="mb-4">
//                   Số tiền (tạm tính) Nhà bán thu được trên từng sản phẩm bán ra
//                   sau khi trừ các phí:
//                 </p>
//                 <p className="text-green-500">
//                   · Số dương: Techzone sẽ trả cho Nhà bán
//                 </p>
//                 <p className="text-amber-400">
//                   · Số âm: Nhà bán phải trả cho Techzone
//                 </p>
//               </div>
//             }
//             overlayClassName="tooltip-overlay"
//           >
//             <HiOutlineInformationCircle />
//           </Tooltip>
//         </div>
//       ),
//       dataIndex: "profit",
//       sorter: (a: _ProductType, b: _ProductType) => a.profit - b.profit,
//       width: "15%",
//     },
//     {
//       title: "Thao tác",
//       dataIndex: "operation",
//       render: (_: any, record: _ProductType) => {
//         return (
//           <div className="xl:space-x-1 space-x-2">
//             <Button
//               type="primary"
//               className="bg-sky-100 text-black"
//               // onClick={() => showDrawer(record)}
//             >
//               <Link href={`list/update/${record._id}`}>
//                 <BiEditAlt />
//               </Link>
//             </Button>
//             <Popconfirm
//               title="Bạn chắc chắn muốn xóa sản phẩm này không ?"
//               description="Sản phẩm sẽ bị xóa hoàn toàn và không thể hồi phục lại được."
//               icon={<QuestionCircleOutlined style={{ color: "red" }} />}
//               onConfirm={() => deleteProduct(record._id)}
//             >
//               <Button type="primary" danger>
//                 <RiDeleteBinLine />
//               </Button>
//             </Popconfirm>
//           </div>
//         );
//       },
//       width: "14%",
//     },
//   ];

//   const onClose = () => {
//     setOpenProductDetail(false);
//   };
//   const handleDownload = async () => {
//     try {
//       FileSaver.saveAs(`${process.env.NEXT_PUBLIC_SAMPLE_FILE}`, "sample.xlsx");
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   };

//   const validateFile = async (file: File) => {
//     setCurrentStep(1);
//     const validTypes = [
//       "application/vnd.ms-excel",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     ];

//     if (!validTypes.includes(file.type)) {
//       message.error("Chỉ chấp nhận tập tin có định dạng .xls hoặc .xlsx.");
//       return false;
//     }

//     let check = true;
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const data = event.target?.result;
//       const workbook = read(data, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       var range = utils.decode_range(sheet["!ref"]!);
//       range.s.r = 0;
//       sheet["!ref"] = utils.encode_range(range);
//       const jsonData = utils.sheet_to_json(sheet, { header: 1 });

//       const headerRow = jsonData[0] as string[];

//       const dataRows = jsonData
//         .slice(1)
//         .filter((row) => Array.isArray(row) && row.length > 0);
//       console.log("EXCEL", headerRow, dataRows);

//       if (dataRows.length > 1000) {
//         message.error("Không được import quá 1000 sản phẩm");
//         check = false;
//         return false;
//       } else {
//         message.success("Tải dữ liệu thành công");
//         return true;
//       }
//     };

//     return check;
//   };

//   const rowSelection = {
//     onChange: (selectedRowKeys: React.Key[], selectedRows: _ProductType[]) => {
//       console.log(
//         `selectedRowKeys: ${selectedRowKeys}`,
//         "selectedRows: ",
//         selectedRows
//       );
//     },
//     getCheckboxProps: (record: _ProductType) => ({
//       disabled: record.name === "Disabled User",
//       name: record.name,
//     }),
//   };

//   const props: UploadProps = {
//     name: "file",
//     multiple: false,
//     maxCount: 1,
//     accept: ".xls,.xlsx",
//     beforeUpload: async (file) => {
//       const isValid = await validateFile(file);
//       if (isValid) {
//         setCurrentStep(2);
//         console.log("THong", currentStep);
//         return true;
//       }
//       return false;
//     },
//     onChange(info) {
//       const { status } = info.file;
//       if (status === "removed") {
//         setCurrentStep(0);
//       }
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   const items: TabsProps["items"] = [
//     {
//       key: "1",
//       label: "Đăng tải tập tin",
//       children: (
//         <div>
//           <Steps
//             className="mb-4"
//             size="small"
//             current={currentStep}
//             items={[{ title: "Chọn file" }, { title: "Kiểm tra dữ liệu" }]}
//           />
//           {currentStep != 0 ? (
//             <ConfigProvider
//               theme={{
//                 components: {
//                   Result: {
//                     iconFontSize: 64,
//                     extraMargin: 0,
//                     titleFontSize: 16,
//                   },
//                 },
//               }}
//             >
//               <Result
//                 status={currentStep === 2 ? "success" : "error"}
//                 title={
//                   currentStep === 2 ? "Tập tin hợp lệ" : "Tập tin không hợp lệ"
//                 }
//                 extra={[
//                   <Button
//                     type="primary"
//                     key="console"
//                     onClick={() => setCurrentStep(0)}
//                   >
//                     Chọn tập tin khác
//                   </Button>,
//                 ]}
//               />
//             </ConfigProvider>
//           ) : (
//             <Dragger {...props}>
//               <p className="ant-upload-drag-icon flex justify-center items-center">
//                 <FiUpload size={40} />
//               </p>
//               <p className="ant-upload-text">
//                 Nhấn hoặc kéo thả tập tin vào để tải lên
//               </p>
//               <div className="flex">
//                 {" "}
//                 <span className="text-red-500 mr-1 text-xs">*</span>
//                 <p className=" text-xs">
//                   Chỉ chấp nhận tập tin có định dạng .xls hoặc .xlsx, tối đa
//                   1000 dòng và kích cỡ tập tin không quá 10MB.
//                 </p>
//               </div>
//             </Dragger>
//           )}
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: "Tập tin mẫu",
//       children: (
//         <div className=" flex flex-col space-y-2 items-center justify-center mx-auto">
//           <div className="font-sembold">Bấm để tải tập tin mẫu</div>
//           <Button
//             type="primary"
//             icon={<HiOutlineDownload />}
//             onClick={handleDownload}
//           >
//             Tập tin mẫu
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-center mx-auto">
//         <Button
//           type="primary"
//           size="large"
//           className="bg-sky-500 rounded-lg uppercase  items-center justify-center mx-auto text-center"
//           onClick={showModal}
//         >
//           + Tạo mới hàng loạt
//         </Button>
//       </div>
//       <div className="flex justify-between mt-2">
//         <p className="uppercase font-semibold"> danh sách</p>

//         <Modal
//           width={700}
//           title="IMPORT TẠO MỚI SẢN PHẨM"
//           cancelText="Hủy"
//           open={isModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           okButtonProps={{ disabled: currentStep < 2 }}
//         >
//           <Tabs defaultActiveKey="1" items={items} />
//         </Modal>
//       </div>
//       <Table
//         onRow={(record, rowIndex) => {
//           return {
//             onClick: (event) => {
//               () => showDrawer(record);
//             },
//           };
//         }}
//         pagination={{
//           pageSizeOptions: ["10", "5"],
//           showSizeChanger: true,
//           total: allProducts.length,
//           // onChange: (page, pageSize) => {
//           //   fetchRecords(page, pageSize);
//           // }
//         }}
//         bordered
//         rowSelection={{
//           type: "checkbox",
//           ...rowSelection,
//         }}
//         columns={columns}
//         dataSource={allProducts}
//         locale={{
//           emptyText: <Empty description={<span>Trống</span>} />,
//         }}
//         className=""
//       />
//     </div>
//   );
// }
