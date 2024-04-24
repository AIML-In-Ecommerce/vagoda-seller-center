// import { ProductType } from "@/app/[locale]/(Main)/product/list/page";
// import { Dropdown } from "antd";
// import { useState } from "react";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import FileDownloadButton from "./FileDownloadButton";

// // Component ExportOption sẽ chứa các tùy chọn cho dropdown
// const ExportOption = ({
//   selectedProducts,
// }: {
//   selectedProducts: ProductType[];
// }) => {
//   // State để lưu loại file được chọn
//   const [fileType, setFileType] = useState("csv");

//   // Hàm xử lý khi nhấn nút download
//   const handleDownload = () => {
//     // TODO: Thực hiện tải xuống file
//     console.log(`Downloading ${fileType} file...`);
//   };

//   return (
//     <div className="flex items-center hover:text-sky-600 hover:bg-sky-200 p-1 rounded-xl border m-2 theme-button">
//       <Dropdown
//         overlay={
//           <div className="p-2">
//             <FileDownloadButton
//               filename="products"
//               selectedProducts={selectedProducts}
//             />
//           </div>
//         }
//         placement="bottomLeft"
//       >
//         <div className="flex items-center">
//           <p className="ml-2 truncate text-sm">Xuất sản phẩm</p>
//           <RiArrowDropDownLine size={20} />
//         </div>
//       </Dropdown>
//     </div>
//   );
// };

// export default ExportOption;
