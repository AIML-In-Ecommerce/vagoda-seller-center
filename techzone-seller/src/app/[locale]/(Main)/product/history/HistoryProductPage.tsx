import { Breadcrumb, Select } from "antd";
import { HiOutlineHome } from "react-icons/hi2";

export default function HistoryProductPage() {
  return (
    <div className="pt-4 pr-4 space-y-2">
      {/* <Breadcrumb
        className="text-xs"
        items={[
          {
            href: "/",
            title: (
              <div className="flex items-center">
                <HiOutlineHome size={15} />
              </div>
            ),
          },
          {
            href: "/product/list",
            title: "Sản phẩm",
          },
          {
            href: "/product/history",
            title: "Lịch sử thay đổi",
          },
        ]}
      />
      <p className="uppercase text-xl font-semibold">
        Lịch sử thay đổi sản phẩm
      </p>
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
      </div> */}
    </div>
  );
}
