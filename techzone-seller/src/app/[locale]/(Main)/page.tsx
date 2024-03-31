"use client";
import React from "react";
import CustomCarousel from "@/component/Carousel";
import { FaAngleRight } from "react-icons/fa";

import { Affix, Empty, Table, TableColumnsType, Tooltip } from "antd";
import { BEChart } from "@/component/BusinessEfficiencyChart";
import { FaRegQuestionCircle, FaRegCalendarAlt } from "react-icons/fa";

import { Rate } from "antd";

const getPreviousWeekDateRange = () => {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days

  const startDate = new Date(lastWeek);
  startDate.setDate(lastWeek.getDate() - lastWeek.getDay()); // Get first day of the previous week (Sunday)

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // Get last day of the previous week (Saturday)

  // Format dates as "dd/mm/yyyy"
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return `${formattedStartDate} - ${formattedEndDate}`;
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


const bannerContent = [
  { title: 'Quản lý đơn hàng', description: "Quản lý đơn hàng dễ dàng và hiệu quả với các công cụ của chúng tôi." },
  { title: 'Tạo sản phẩm', description: "Cửa hàng của bạn đã sẵn sàng để nhận các đơn hàng. Hãy bắt đầu tạo sản phẩm nào!" },
  { title: 'Xem hiệu quả kinh doanh', description: "Theo dõi và đánh giá hiệu quả kinh doanh của bạn với báo cáo chi tiết." },
  { title: 'Trung tâm phát triển', description: "Khám phá các công cụ và tài nguyên mới để phát triển cửa hàng của bạn." },
  { title: 'Xem công cụ khuyến mãi', description: "Tăng doanh số bằng cách sử dụng các công cụ khuyến mãi và quảng cáo." },
  { title: 'Thiết kế gian hàng', description: "Tạo ra một gian hàng độc đáo và chuyên nghiệp để thu hút khách hàng." },
];

//Operational Efficiency
interface OEProps {
  key: React.Key;
  index?: string;
  index_description?: string;
  index_tooltip?: string;
  score?: number;
  status?: string;
  rating?: number;
  totalRatings?: number;
}

const qosScore = 4.3;

const columns: TableColumnsType<OEProps> = [
  {
    title: <div className="font-semibold">Chỉ số</div>,
    dataIndex: 'index',
    render: (index: string, item: OEProps) =>
      <div className="flex flex-col px-4">
        <div className="flex-row flex gap-1">
          <div className="font-semibold">{item.index}</div>
          <div className="text-sm">
            <Tooltip title={item.index_tooltip}><FaRegQuestionCircle /></Tooltip>
          </div>
        </div>
        <div>{item.index_description}</div>
      </div>,
    width: '50vw'
  },
  {
    title: <div className="font-semibold">Điểm hiện tại</div>,
    dataIndex: 'score',
    render: (score: number) =>
      score > 0 ? score : <div>---</div>,
    width: '25vw'
  },
  {
    title: <div className="font-semibold">Trạng thái</div>,
    dataIndex: 'status',
    width: '25vw'
  },
];

const OEDataSources: OEProps[] = [
  {
    key: '1',
    index: "Tỉ lệ hủy đơn",
    index_description: "Chỉ tiêu <= 2%",
    index_tooltip: "Số đơn bị hủy (lỗi nhà bán) / Tổng số đơn đã nhận trong 4 tuần qua.",
    score: 0,
    status: '----'
  },
  {
    key: '2',
    index: "Tỉ lệ xử lý đúng hạn",
    index_description: "Chỉ tiêu >= 97%",
    index_tooltip: "Số đơn hàng xử lý đúng hạn / Tổng số đơn đã nhận trong 4 tuần qua.",
    score: 0,
    status: '----'
  },
  {
    key: '3',
    index: "Tỉ lệ đổi trả",
    index_description: "Chỉ tiêu <= 2%",
    index_tooltip: "Số sản phẩm đổi trả (lỗi nhà bán) / Số sản phẩm đã bán trong 4 tuần qua.",
    score: 0,
    status: '----'
  },
  {
    key: '4',
    index: "Tỉ lệ phản hồi chat",
    index_description: "Chỉ tiêu >= 80%",
    index_tooltip: "Tỷ lệ phản hồi = Lượt phản hồi chat / Lượt chat nhận được. Tỷ lệ phản hồi chỉ được tính khi Nhà bán nhận được ít nhất 2 tin nhắn trong vòng 4 tuần qua.",
    score: 0,
    status: '----'
  },

]

const ratingColumn: TableColumnsType<OEProps> = [
  {
    title: <div className="text-center font-semibold lg:text-lg">Đánh giá sản phẩm</div>,
    dataIndex: 'rating',
    render: (rating: number, item: OEProps) =>
      <div className="flex flex-col items-center justify-center space-y-1 px-5">
        <div className="text-slate-500 text-lg font-semibold">{rating ? rating : '--'}/5</div>
        <div>{`(${item.totalRatings} đánh giá)`}</div>
        <Rate value={rating} count={5} disabled allowHalf />
      </div>,
  },
];

const RatingDataSources: OEProps[] = [
  {
    key: '1',
    rating: 4.6,
    totalRatings: 540,
  }
]

export default function Home() {

  //Home overview:
  // + Banner (slider): Hiển thị các chức năng nhanh.
  // + Thông tin đơn hàng mới nhất.
  // + Hiệu quả kinh doanh: Filter theo (7 ngày, 30 ngày, Tùy chỉnh)
  // + Hiểu quả vận hành: Tỉ lệ hủy đơn, Tỉ lệ xử lý đúng hạn, Tỉ lệ giao đúng hạn (ML dành cho hệ thống), Tỉ lệ phản hồi chat.

  return (
    <React.Fragment>
      <div className="container grid grid-cols-4">
        {/* slider */}
        <div className="col-start-1 col-span-4 mx-auto mt-10 w-10/12">
          <CustomCarousel arrows
            autoplay
            arrowProps={{ color: 'white', height: 35, margin: 20 }}
            contents={
              bannerContent.map(item => {
                return (
                  <div className="bg-sky-600 h-[240px]">
                    <div className="lg:grid lg:grid-cols-2 p-10 m-5">
                      <div className="text-2xl font-semibold text-white text-center">{item.title}</div>
                      <div className="mt-5 lg:mt-0 lg:text-lg text-white text-center">{item.description}</div>
                    </div>
                  </div>
                )
              })

            }
          />
        </div>

        {/* Thông tin đơn hàng */}
        <div className="col-start-1 lg:col-span-3 col-span-4 mt-10 mx-20 flex flex-col gap-5 my-10">
          <div className="font-semibold text-xl">Đơn hàng</div>
          <div>Nhà bán chưa có việc gì cần làm với đơn hàng</div>
        </div>


        <div className="col-start-1 lg:col-span-3 col-span-4 mx-10 lg:mx-0 lg:col-start-4 lg:col-span-1 lg:row-span-4 lg:mt-10">
          {/* <Affix offsetTop={100}> */}
          <div className="flex flex-col">
            <div className="border flex flex-col relative mx-5 rounded-xl shadow-lg">
              <div className="mt-10 mx-5 font-semibold text-lg">Điểm chất lượng vận hành</div>
              <div className="mx-5 flex flex=row gap-2 items-center text-sm">
                <FaRegCalendarAlt />
                <div>Tuần trước {
                  getPreviousWeekDateRange()
                }</div>
              </div>
              <div className="mx-auto my-5 flex gap-5 items-center">
                <Rate value={qosScore} count={5} disabled allowHalf />
                <div><span className="text-yellow-500 text-lg font-bold">{qosScore} </span>/ 5.0 sao</div>
              </div>
              <div className="bg-green-200 text-black border border-green-400 p-4 mx-10 rounded-xl text-sm mb-5">
                <div className="font-semibold">Tuyệt vời! Bạn đang xử lý đơn hàng <span className="font-bold text-green-500">xuất sắc</span> trong tuần vừa qua!</div>
                <div>
                  Hãy giữ vững phong độ để có thêm thật nhiều đánh giá 5 sao và nhận thêm nhiều đặc quyền từ Techzone nhé!</div>
              </div>
              <div className="text-sky-500 flex flex-row mx-auto items-center mb-5">
                <span>Xem chi tiết</span>
                <span><FaAngleRight /></span>
              </div>
            </div>
            <div className="border flex flex-col relative mt-10 mx-5 rounded-xl shadow-lg">
              <div className="text-center my-5 font-semibold text-xl">Thông báo!</div>
              <div> <Empty description={"Không có thông báo mới!"} /></div>
              <div className="text-sky-500 flex flex-row mx-auto items-center my-5">
                <span>Xem tất cả</span>
                <span><FaAngleRight /></span>
              </div>
            </div>
          </div>
          {/* </Affix> */}
        </div>

        {/* Hiệu quả kinh doanh */}
        <div className="col-start-1 lg:col-span-3 col-span-4 mt-10 mx-20">
          <div className="flex flex-col container">
            <div className="flex flex-row justify-between">
              <div className="font-semibold text-xl">
                Hiệu quả kinh doanh <span className="text-base font-normal mx-2">7 ngày qua: {getPreviousWeekDateRange()}</span>
              </div>
              <div className="font-medium text-sky-500 flex flex-row items-center">
                <span>Xem chi tiết</span>
                <span><FaAngleRight /></span>
              </div>
            </div>
            <div className="flex lg:flex-row mt-5 flex-col relative">
              <div className="lg:w-2/5">&nbsp;</div>
              <div className="lg:w-3/5">
                <BEChart />
              </div>
            </div>
          </div>
        </div>

        {/* Hiệu quả vận hành */}
        <div className="col-start-1 lg:col-span-3 col-span-4 mt-10 mx-20">
          <div className="flex flex-row justify-between">
            <div className="font-semibold text-xl">Hiệu quả vận hành</div>
            <div className="font-medium text-sky-500 flex flex-row items-center">
              <span>Xem chi tiết</span>
              <span><FaAngleRight /></span>
            </div>
          </div>
        </div>
        <div className="col-start-1 lg:col-span-3 col-span-4 gap-5 my-10 mx-20 flex flex-col">
          <div className="border border-2 shadow-lg rounded-xl">
            <Table columns={columns} dataSource={OEDataSources} pagination={false} />
          </div>
          <div className="border border-2 shadow-lg rounded-xl">
            <Table columns={ratingColumn} dataSource={RatingDataSources} pagination={false} />
          </div>
        </div>
      </div>



    </React.Fragment>
  );
}
