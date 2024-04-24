export interface ConfigInfoType {
  name: string;
  placeholderText: string;
}
export const laptopSpecs: ConfigInfoType[] = [
  { name: "CPU", placeholderText: "Intel Core i5-1235U" },
  {
    name: "Kích thước màn hình",
    placeholderText: '15.6" (1920 x 1080) Full HD',
  },
  { name: "Bộ nhớ (RAM)", placeholderText: "8GB Onboard GDDR4 3200MHz" },
  { name: "Pin", placeholderText: "Lithium-ion" },
  { name: "Khối lượng", placeholderText: "1.2kg, 1.8kg, 2kg" },
  { name: "Màu sắc", placeholderText: "" }, // Bạn có thể thêm các màu sắc mong muốn ở đây
];

export const applianceSpecs: ConfigInfoType[] = [
  { name: "Bảo hành", placeholderText: "12 tháng" },
  { name: "Màu sắc", placeholderText: "" }, // Bạn có thể thêm màu sắc cụ thể ở đây
  { name: "Khối lượng", placeholderText: "1.2kg, 1.8kg, 2kg" },
  { name: "Kích thước", placeholderText: "" }, // Bạn có thể thêm kích thước cụ thể ở đây
  { name: "Năm sản xuất", placeholderText: "2015, 2020" },
  { name: "Nơi sản xuất", placeholderText: "Việt Nam" },
  { name: "Dung tích", placeholderText: "2l, 5l, 10l" },
  { name: "Công suất", placeholderText: "100W" },
];

export const desktopSpecs: ConfigInfoType[] = [
  { name: "Storage", placeholderText: "500GB SSD" },
  { name: "Mainboard", placeholderText: "Msi B760M-PLUS WIFI" },
  { name: "CPU", placeholderText: "Intel Core i5-1235U" },
  { name: "Chip đồ họa", placeholderText: "Onboard Intel Iris Xe Graphics" },
  { name: "VGA", placeholderText: "Msi GeForce RTX 4060 8GB GDDR6" },
];

export const monitorSpecs: ConfigInfoType[] = [
  { name: "Màu sắc", placeholderText: "" }, // Bạn có thể thêm màu sắc cụ thể ở đây
  { name: "Kích thước", placeholderText: '23.8"' },
  { name: "Độ phân giải", placeholderText: "1920 x 1080 (16:9)" },
  { name: "Kiểu màn hình", placeholderText: "Màn hình phẳng" },
  { name: "Khối lượng", placeholderText: "1.2kg, 1.8kg, 2kg" },
  { name: "Cổng xuất hình", placeholderText: "1 x HDMI 1.4, 1 x VGA/D-sub" },
  {
    name: "Phụ kiện đi kèm",
    placeholderText:
      "1 x Cáp nguồn; 1 x Cáp DisplayPort 1.4 - 1,8 m; 1 x Cáp USB Type-A đến USB Type-C Gen 2 - 1 m",
  },
  { name: "Tấm nền", placeholderText: "IPS" },
];

export const computerComponentSpecs: ConfigInfoType[] = [
  { name: "Màu sắc", placeholderText: "" }, // Bạn có thể thêm màu sắc cụ thể ở đây
  { name: "Chất liệu", placeholderText: "Thép" },
  { name: "Cổng kết nối", placeholderText: "2 x USB 3.2, 1 x USB Type C" },
  { name: "Số lượng ổ đĩa hỗ trợ", placeholderText: '4 x 3.5", 3 x 2.5"' },
];

export const computerAccessorySpecs: ConfigInfoType[] = [
  { name: "Số lượng ổ đĩa hỗ trợ", placeholderText: '4 x 3.5", 3 x 2.5"' },
  { name: "Màu sắc", placeholderText: "" }, // Bạn có thể thêm màu sắc cụ thể ở đây
  { name: "Kiểu", placeholderText: "In-ear" },
  { name: "Kiểu kết nối", placeholderText: "Tai nghe có dây" },
  { name: "Kích thước", placeholderText: "113 x 62 x 38 mm" },
  { name: "Đèn LED", placeholderText: "Không đèn" },
];

export const gameStreamSpecs: ConfigInfoType[] = [
  { name: "Độ phân giải (CPI/DPI)", placeholderText: "8000DPI" },
  { name: "Dạng cảm biến", placeholderText: "Optical" },
  { name: "Kết nối", placeholderText: "USB" },
  { name: "Màu sắc", placeholderText: "" }, // Bạn có thể thêm màu sắc cụ thể ở đây
  { name: "Đèn LED", placeholderText: "RGB" },
  { name: "Số nút bấm", placeholderText: "7" },
  { name: "Khối lượng", placeholderText: "86g" },
  { name: "Độ nhạy", placeholderText: "-40.5dBV (1V / Pa ở 1kHz)" },
  { name: "Kê tay", placeholderText: "Có" },
  {
    name: "Tính năng đặc biệt",
    placeholderText: "OLED Smart Display hiển thị thông báo tích hợp trên phím",
  },
];

export const phoneAccessorySpecs: ConfigInfoType[] = [
  { name: "Màu sắc", placeholderText: "Tím Lavender" },
  { name: "Loại màn hình", placeholderText: '6.8" Dynamic AMOLED 2X' },
  { name: "Độ phân giải", placeholderText: "Quad HD+ (2K+) (3088 x 1440)" },
  { name: "Dung lượng (ROM)", placeholderText: "256GB" },
  { name: "RAM", placeholderText: "8GB" },
  { name: "Pin", placeholderText: "5000 mAh" },
  { name: "Camera sau", placeholderText: "2 x 10MP, 200MP, 12 MP" },
  { name: "Camera trước", placeholderText: "12 MP" },
  { name: "Khối lượng", placeholderText: "233g" }, // Bạn có thể chỉ rõ là khối lượng của điện thoại và phụ kiện nếu cần
  { name: "Jack tai nghe", placeholderText: "USB Type-C" },
  { name: "Kích thước", placeholderText: "39 x 27 x 41mm" },
];

export const accessorySpecs: ConfigInfoType[] = [
  { name: "Thiết bị tương thích", placeholderText: "Laptop" },
  { name: "Chiều dài dây", placeholderText: "0.5M" },
  { name: "Kích thước", placeholderText: "39 x 27 x 41mm" },
  { name: "Khối lượng", placeholderText: "50g" },
];

export const audioDeviceSpecs: ConfigInfoType[] = [
  { name: "Kiểu", placeholderText: "Over-ear" },
  { name: "Kết nối", placeholderText: "3.5 mm" },
  { name: "Màu sắc", placeholderText: "" }, // Bạn có thể thêm màu sắc cụ thể ở đây
  { name: "Microphone", placeholderText: "Có" },
  { name: "Độ nhạy", placeholderText: "105dB ± 3dB" },
  { name: "Khối lượng", placeholderText: "320g" },
  { name: "Công suất tổng", placeholderText: "45W (RMS), 90W (Peak)" },
  { name: "Khả năng chống nước", placeholderText: "Không" },
];

export const officeDeviceSpecs: ConfigInfoType[] = [
  { name: "Độ phân giải", placeholderText: "2400 x 600 dpi" },
  { name: "Tốc độ in trắng/đen", placeholderText: "12 ppm (Độ phủ 5%)" },
  { name: "Kết nối", placeholderText: "Cổng USB 2.0 tốc độ cao" },
  {
    name: "Hệ điều hành hỗ trợ",
    placeholderText: "Windows 98/ME/2000/XP/7/10, Linux (CUPS)",
  },
  { name: "Bảo hành", placeholderText: "12 tháng" },
  { name: "Khổ giấy in", placeholderText: "57 mm" },
];

export const otherProductSpecs: ConfigInfoType[] = [
  { name: "Bảo hành", placeholderText: "12 tháng" },
  { name: "Màu sắc", placeholderText: "" }, // Bạn có thể thêm màu sắc cụ thể ở đây
  { name: "Kích thước", placeholderText: "113 x 62 x 38 mm" },
  { name: "Khối lượng", placeholderText: "vd: 1.2kg, 1.8kg, 2kg" },
  { name: "Tính năng nổi bật", placeholderText: "vd: có đèn LED" },
];
