"use client";
import { Breadcrumb, Card, Checkbox, DatePicker, Empty, Flex, Radio, RadioChangeEvent, Space, Tooltip } from "antd";
import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import CustomCarousel from "../Carousel";
import { TbInfoCircle } from "react-icons/tb";
import CheckableCard from "./CheckableCard";


const { RangePicker } = DatePicker

const mainValues = [
    {
        title: "Doanh số",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng giá trị của các đơn hàng được xác nhận trong khoảng thời gian đã chọn, bao gồm doanh số từ các đơn hủy và đơn Trả hàng/Hoàn tiền.",
        backgroundColor: '#0ea5e9'
    },
    {
        title: "Đơn hàng",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số lượng đơn hàng được xác nhận trong khoảng thời gian đã chọn",
        backgroundColor: '#f97316'
    },
    {
        title: "Doanh thu thuần",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng doanh thu của các đơn hàng giao thành công. (Doanh thu = Giá trị hàng hoá - NB giảm giá - Phí trả Tiki).",
        backgroundColor: '#10b981'
    },
    // {
    //     title: "Lượt xem",
    //     value: "--",
    //     description: "Không có dữ liệu",
    //     tooltip: "Hàng hàng"
    // },
    {
        title: "Tỉ lệ chuyển đổi",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số khách truy cập và có đơn đã xác nhận chia tổng số khách truy cập trong khoảng thời gian đã chọn. ",
        backgroundColor: '#ec4899'
    },
    {
        title: "Giá trị đơn hàng trung bình",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Doanh số trung bình mỗi đơn hàng trong khoảng thời gian đã chọn.",
        backgroundColor: '#3b82f6'
    },
    {
        title: "Đơn hàng hủy",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số lượng đơn hàng hủy trong khoảng thời gian đã chọn",
        backgroundColor: '#78716c'
    },

]

export default function BusinessPerformancePage() {
    const onChange = (e: RadioChangeEvent) => {
        console.log(`radio checked:${e.target.value}`);
    };

    return (
        <React.Fragment>
            <div className="flex flex-col container">
                <div className="bg-white pr-4 px-4">
                    <Breadcrumb
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
                                href: "/report/business-performance",
                                title: "Trung tâm phát triển",
                            },
                            {
                                title: "Hiệu quả kinh doanh",
                            },
                        ]}
                    />
                    <div className="mt-5 uppercase text-xl font-semibold">Hiệu quả kinh doanh</div>
                    <div className="mt-5">Vui lòng xem hướng dẫn chi tiết: Giới thiệu trung tâm phát triển</div>
                    <div className="mt-5">
                        <div className="flex lg:flex-row flex-col gap-5 mb-5 lg:items-center">
                            <div className="font-bold">Thời gian báo cáo:</div>
                            <Radio.Group onChange={(e) => onChange(e)} defaultValue="today">
                                <Radio.Button value="today">Hôm nay</Radio.Button>
                                <Radio.Button value="yesterday">Hôm qua</Radio.Button>
                                <Radio.Button value="week">7 ngày qua</Radio.Button>
                                <Radio.Button value="month">30 ngày qua</Radio.Button>
                            </Radio.Group>
                            <RangePicker picker="date" />
                            <div>(Lần cập nhật cuối {new Date().toISOString()})</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-4 px-10 mt-5 flex flex-col">
                    <div className="flex flex-col lg:flex-row ">
                        <div className="font-semibold">Chỉ số chính</div>
                        <div className="lg:ml-4">13/04/2023 - 13/04/2024 (So sánh với: 11/04/2022 - 12/04/2023)</div>
                    </div>
                    <div className="w-[100%] my-10 flex flex-col gap-10">
                        <div className="lg:hidden sm:block">
                            <div className="grid grid-cols-2 gap-2">
                                {   
                                    mainValues.map((item, key) => {
                                        return (
                                            <CheckableCard key={key} item={item} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="lg:block sm:hidden">
                            <CustomCarousel loading={false} arrows infinite={false}
                                slidesToShow={4} slidesToScroll={1}
                                contents={
                                    mainValues.map((item, key) => {
                                        return (
                                            <CheckableCard key={key} item={item} />
                                        )
                                    })
                                } />
                        </div>
                        <Empty description={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty>
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 flex flex-col gap-5 mt-5">
                    <Card className="bg-white py-4 px-10 mt-5 flex flex-col lg:mb-20"
                        title={
                            <div className="flex flex-col">
                                <div className="font-semibold flex flex-row items-center gap-2">
                                    <div className="text-lg">Top 10 sản phẩm (theo doanh số)</div>
                                    <Tooltip title=""><TbInfoCircle /></Tooltip>
                                </div>
                                <div className="text-sm">13/04/2023 - 13/04/2024</div>
                            </div>
                        }>
                        <div className="w-[100%] my-10 flex flex-col gap-5">
                            <Empty description={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty>
                        </div>
                    </Card>
                    <Card className="bg-white py-4 px-10 mt-5 flex flex-col lg:mb-20"
                        title={
                            <div className="flex flex-col">
                                <div className="font-semibold flex flex-row items-center gap-2">
                                    <div className="text-lg">Top 10 thành phố (theo doanh số)</div>
                                    <Tooltip title=""><TbInfoCircle /></Tooltip>
                                </div>
                                <div className="text-sm">13/04/2023 - 13/04/2024</div>
                            </div>
                        }>
                        <div className="w-[100%] my-10 flex flex-col gap-5">
                            <Empty description={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty>
                        </div>
                    </Card>
                </div>
            </div >
        </React.Fragment >
    )
}