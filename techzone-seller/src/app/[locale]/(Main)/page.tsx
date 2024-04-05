"use client";
import React from "react";
import HomePage from "@/component/HomePage";


export default function Home() {

  //Home overview:
  // + Banner (slider): Hiển thị các chức năng nhanh.
  // + Thông tin đơn hàng mới nhất.
  // + Hiệu quả kinh doanh: Filter theo (7 ngày, 30 ngày, Tùy chỉnh)
  // + Hiểu quả vận hành: Tỉ lệ hủy đơn, Tỉ lệ xử lý đúng hạn, Tỉ lệ giao đúng hạn (ML dành cho hệ thống), Tỉ lệ phản hồi chat.

  return (
    <React.Fragment>
      <HomePage />
    </React.Fragment>
  );
}
