// import { Breadcrumb, DatePicker, Input } from "antd";
// import { HiOutlineHome } from "react-icons/hi2";

// export default function HistoryProductPage() {
//   const { RangePicker } = DatePicker;
//   return (
//     <div className="pt-4 pr-4 space-y-2">
//       <Breadcrumb
//         className="text-xs"
//         items={[
//           {
//             href: "/",
//             title: (
//               <div className="flex items-center">
//                 <HiOutlineHome size={15} />
//               </div>
//             ),
//           },
//           {
//             href: "/product/list",
//             title: "Sản phẩm",
//           },
//           {
//             href: "/product/history",
//             title: "Lịch sử thay đổi",
//           },
//         ]}
//       />
//       <p className="uppercase text-xl font-semibold">
//         Lịch sử thay đổi sản phẩm
//       </p>
//       <div className="flex space-x-2 items-center">
//         <div className="">
//           <p className="font-semibold">SKU</p>
//           <Input placeholder="Nhập SKU" />
//         </div>
//         <div className="">
//           <p className="font-semibold">ID</p>
//           <Input placeholder="Nhập ID" />
//         </div>
//         <div className="">
//           <p className="font-semibold">Ngày sửa đổi</p>
//           <RangePicker />
//         </div>
//       </div>
//     </div>
//   );
// }