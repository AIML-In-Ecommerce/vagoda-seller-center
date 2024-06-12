"use client";
import { Breadcrumb, Card, Checkbox, DatePicker, Empty, Flex, Radio, RadioChangeEvent, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import CustomCarousel from "../../Carousel";
import { TbInfoCircle } from "react-icons/tb";
import CheckableCard from "../CheckableCard";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import BPChart from "./BPChart";
import HorizontalBarChart from "./HorizontalBarChart";
import { POST_getTopProductsInSales } from "@/apis/statistic/StatisticAPI";

dayjs.extend(LocalizedFormat)

const { RangePicker } = DatePicker

interface BPCategory {
    id: string;
    title: string,
    value: string | number;
    percentChange?: string | number;
    tooltip: string;
    color: string;
}

const categories: BPCategory[] = [
    {
        title: "Doanh số",
        value: "--",
        percentChange: "Không có dữ liệu",
        tooltip: "Tổng giá trị của các đơn hàng được xác nhận trong khoảng thời gian đã chọn, bao gồm doanh số từ các đơn hủy và đơn Trả hàng/Hoàn tiền.",
        color: '#0ea5e9',
        id: "DS"
    },
    {
        title: "Đơn hàng",
        value: "--",
        percentChange: "Không có dữ liệu",
        tooltip: "Tổng số lượng đơn hàng được xác nhận trong khoảng thời gian đã chọn",
        color: '#f97316',
        id: "DH"
    },
    {
        title: "Doanh thu thuần",
        value: "--",
        percentChange: "Không có dữ liệu",
        tooltip: "Tổng doanh thu của các đơn hàng giao thành công. (Doanh thu = Giá trị hàng hoá - NB giảm giá - Phí trả Tiki).",
        color: '#10b981',
        id: "DTT"
    },
    {
        title: "Tỉ lệ chuyển đổi",
        value: "--",
        percentChange: "Không có dữ liệu",
        tooltip: "Tổng số khách truy cập và có đơn đã xác nhận chia tổng số khách truy cập trong khoảng thời gian đã chọn. ",
        color: '#ec4899',
        id: "TLCD"
    },
    {
        title: "Giá trị đơn hàng trung bình",
        value: "--",
        percentChange: "Không có dữ liệu",
        tooltip: "Doanh số trung bình mỗi đơn hàng trong khoảng thời gian đã chọn.",
        color: '#3b82f6',
        id: "GTDHTB"
    },
    {
        title: "Đơn hàng hủy",
        value: "--",
        percentChange: "Không có dữ liệu",
        tooltip: "Tổng số lượng đơn hàng hủy trong khoảng thời gian đã chọn",
        color: '#78716c',
        id: "DHH"
    },
]

const DayjsToDate = (dates: [Dayjs | null, Dayjs | null]) => {
    return dates.map(item => {
        if (item === null) {
            return null;
        } else {
            return item.toDate();
        }
    });
}

const convertPeriodLabel = (period: string) => {
    return period === "today" ? "Hôm nay" :
        period === "yesterday" ? "Hôm qua" :
            period === "week" ? "7 ngày qua" : "30 ngày qua";
}

const dateRangeToString = (selectedDates: [Dayjs | null, Dayjs | null]) => {
    return `${selectedDates[0]?.format('DD/MM/YYYY')} - ${selectedDates[1]?.format('DD/MM/YYYY')}`
}

export default function BusinessPerformancePage() {
    const [selectedReportPeriod, setSelectedReportPeriod] = useState<string>("today");
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date'), dayjs().endOf('date')]);
    const [compareDates, setCompareDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date'), dayjs().endOf('date')]);
    const [lastUpdateTime, setLastUpdateTime] = useState<Dayjs>(dayjs());
    const [selectedCategories, setSelectedCategories] = useState<BPCategory[]>([]);
    const [productSales, setProductSales] = useState([])

    const handlePreviousPeriod = (currentPeriod: [Dayjs, Dayjs], periodUnit: string) => {
        let previous: [Dayjs, Dayjs] = [...currentPeriod];
        switch (periodUnit) {
            case "today": case "yesterday":
                previous[1] = currentPeriod[0].subtract(1, 'day').endOf('date');
                previous[0] = previous[1].startOf('date');
                break;
            case "week":
                previous[1] = currentPeriod[0].subtract(1, 'day').endOf('date');
                previous[0] = previous[1].subtract(6, 'day').startOf('date');
                break;
            case "month":
                previous[1] = currentPeriod[0].subtract(1, 'day').endOf('date');
                previous[0] = previous[1].subtract(29, 'day').startOf('date');
                break;
        }
        setCompareDates(previous);
    }

    const switchPeriod = (periodUnit: string) => {
        let period: [Dayjs, Dayjs] = [dayjs().startOf('date'), dayjs().endOf('date')];
        switch (periodUnit) {
            case "today":
                break;
            case "yesterday":
                period = [dayjs().startOf('date').subtract(1, 'day'), dayjs().endOf('date')]
                break;
            case "week":
                period = [dayjs().startOf('date').subtract(1, 'week'), dayjs().endOf('date')]
                break;
            case "month":
                period = [dayjs().startOf('date').subtract(30, 'day'), dayjs().endOf('date')]
                break;
        }
        setSelectedDates(period);
        handlePreviousPeriod(period, periodUnit);

    }

    const onPeriodChange = (e: RadioChangeEvent) => {
        setSelectedReportPeriod(e.target.value);
        switchPeriod(e.target.value);
    };

    useEffect(() => {
        const fetchProductsSales = async () => {
            const [startTime, endTime] = DayjsToDate(selectedDates);
            const response = await POST_getTopProductsInSales(
                process.env.NEXT_PUBLIC_SHOP_ID as string,
                startTime!, endTime!)
            setProductSales(response.data)
        }
        fetchProductsSales();
        setLastUpdateTime(dayjs());
    }, [selectedDates])

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
                            <Radio.Group onChange={onPeriodChange} value={selectedReportPeriod}>
                                <Radio.Button value="today">Hôm nay</Radio.Button>
                                <Radio.Button value="yesterday">Hôm qua</Radio.Button>
                                <Radio.Button value="week">7 ngày qua</Radio.Button>
                                <Radio.Button value="month">30 ngày qua</Radio.Button>
                            </Radio.Group>
                            <RangePicker picker="date" value={selectedDates} format="DD/MM/YYYY" />
                            <div>(Lần cập nhật cuối {lastUpdateTime.locale('vi').format('L LTS')})</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white py-4 px-10 mt-5 flex flex-col">
                    <div className="flex flex-col lg:flex-row ">
                        <div className="font-semibold">Chỉ số chính</div>
                        <div className="lg:ml-4">
                            {convertPeriodLabel(selectedReportPeriod)}: {dateRangeToString(selectedDates)} (So sánh với: {dateRangeToString(compareDates)})</div>
                    </div>
                    <div className="w-[100%] my-10 flex flex-col gap-10">
                        <div className="lg:hidden sm:block">
                            <div className="grid grid-cols-2 gap-2">
                                {
                                    categories.map((item, key) => {
                                        return (
                                            <div key={key}>
                                                <CheckableCard item={item} checkboxVisibility={true}
                                                    selectedCategories={selectedCategories}
                                                    setSelectedCategories={setSelectedCategories} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="lg:block sm:hidden">
                            <CustomCarousel loading={false} arrows infinite={false}
                                slidesToShow={4} slidesToScroll={1}
                                contents={
                                    categories.map((item, key) => {
                                        return (
                                            <div key={key}>
                                                <CheckableCard item={item} checkboxVisibility={true}
                                                    selectedCategories={selectedCategories}
                                                    setSelectedCategories={setSelectedCategories} />
                                            </div>
                                        )
                                    })
                                } />
                        </div>
                        <BPChart timeUnit={selectedReportPeriod}
                            dateRange={Array.from(DayjsToDate(selectedDates))}
                            categories={selectedCategories} />
                        {/* <Empty percentChange={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty> */}
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
                                <div className="text-sm">{convertPeriodLabel(selectedReportPeriod)}: {dateRangeToString(selectedDates)}</div>
                            </div>
                        }>
                        <div className="w-[100%] mb-10 flex flex-col gap-5">
                            {
                                productSales.length !== 0 ?
                                    <HorizontalBarChart items={productSales} />
                                    : <Empty description={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty>
                            }
                        </div>
                    </Card>
                    <Card className="bg-white py-4 px-10 mt-5 flex flex-col lg:mb-20"
                        title={
                            <div className="flex flex-col">
                                <div className="font-semibold flex flex-row items-center gap-2">
                                    <div className="text-lg">Top 10 thành phố (theo doanh số)</div>
                                    <Tooltip title=""><TbInfoCircle /></Tooltip>
                                </div>
                                <div className="text-sm">{convertPeriodLabel(selectedReportPeriod)}: {dateRangeToString(selectedDates)}</div>
                            </div>
                        }>
                        <div className="w-[100%] mb-10 flex flex-col gap-5">
                            {
                                productSales.length !== 0 ?
                                    <HorizontalBarChart items={productSales} />
                                    : <Empty description={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty>
                            }
                        </div>
                    </Card>
                </div>
            </div >
        </React.Fragment >
    )
}