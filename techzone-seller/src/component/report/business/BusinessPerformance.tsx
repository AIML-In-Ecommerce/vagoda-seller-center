"use client";
import { Breadcrumb, Card, Checkbox, DatePicker, Empty, Flex, Radio, RadioChangeEvent, Skeleton, Space, Spin, Tooltip } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import CustomCarousel from "../../Carousel";
import { TbInfoCircle } from "react-icons/tb";
import CheckableCard from "../CheckableCard";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import BPChart, { BPChartStats } from "./BPChart";
import { OrderStatusType, POST_getConversionRateStats, POST_getOrderStatisticsWithStatus, POST_getReturnRateOfCustomers, POST_getTopCitiesInSales, POST_getTopProductsInSales, POST_getTotalSales } from "@/apis/statistic/StatisticAPI";
import { AuthContext } from "@/context/AuthContext";
import TopProductsBarChart from "./TopProductsBarChart";
import TopCitiesBarChart from "./TopCitiesBarChart";

dayjs.extend(LocalizedFormat)

const { RangePicker } = DatePicker

interface BPCategory {
    _id: string;
    title: string,
    value: number;
    suffix?: string;
    isPercentageValue?: boolean;
    percentChange?: number;
    tooltip: string;
    color: string;
}

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

const roundTo2DecimalPlaces = (value: number) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

const calcPercentChanges = (value1: number, value2: number, isPercentageValue?: boolean) => {
    return !isPercentageValue ? roundTo2DecimalPlaces((value1 ?? 0 - value2 ?? 0) / value2 ?? 0 * 100) : roundTo2DecimalPlaces(value1 ?? 0 - value2 ?? 0);
}

export default function BusinessPerformancePage() {
    const context = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedReportPeriod, setSelectedReportPeriod] = useState<string>("today");
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date'), dayjs().endOf('date')]);
    const [compareDates, setCompareDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date'), dayjs().endOf('date')]);
    const [lastUpdateTime, setLastUpdateTime] = useState<Dayjs>(dayjs());
    const [selectedCategories, setSelectedCategories] = useState<BPCategory[]>([]);
    const [productSales, setProductSales] = useState([]);
    const [citiesSales, setCitiesSales] = useState([]);
    const [currentPeriod, setCurrentPeriod] = useState<BPChartStats>();
    const [previousPeriod, setPreviousPeriod] = useState<BPChartStats>();

    const maxLabels = 31; // Maximum number of labels to display on Chart

    const totalLabels = useMemo(() => {
        const [startDate, endDate] = selectedDates;
        // return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Calculate total number of days
        return endDate!.diff(startDate, 'day');

    }, [selectedDates])

    const step = useMemo(() => {
        return Math.floor(totalLabels / maxLabels) === 0 ? 1 : Math.floor(totalLabels / maxLabels); // Calculate step size (date)
    }, [totalLabels]);


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

    const categories = useMemo<BPCategory[]>(() => {
        const totalRevenuePecentChanges = calcPercentChanges(currentPeriod?.sales.totalRevenue!, previousPeriod?.sales.totalRevenue!);
        const totalOrdersPecentChanges = calcPercentChanges(currentPeriod?.sales.totalOrders!, previousPeriod?.sales.totalOrders!);
        const totalProfitPecentChanges = calcPercentChanges(currentPeriod?.sales.totalProfit!, previousPeriod?.sales.totalProfit!);
        const conversionRatePecentChanges = calcPercentChanges(currentPeriod?.conversionRate.conversionRate! * 100, previousPeriod?.conversionRate.conversionRate! * 100, true);
        const avgRevenuePecentChanges = calcPercentChanges(currentPeriod?.sales.avgRevenue!, previousPeriod?.sales.avgRevenue!);
        const returningRatePecentChanges = calcPercentChanges(currentPeriod?.returningRate.totalReturningUsers!, previousPeriod?.returningRate.totalReturningUsers!);
        const cancelledPecentChanges = calcPercentChanges(currentPeriod?.cancelledOrders.totalOrders!, previousPeriod?.cancelledOrders.totalOrders!);

        const result: BPCategory[] = [
            {
                title: "Doanh số",
                value: currentPeriod?.sales.totalRevenue || 0,
                percentChange: totalRevenuePecentChanges,
                suffix: "đ",
                tooltip: "Tổng giá trị của các đơn hàng được xác nhận trong khoảng thời gian đã chọn, bao gồm doanh số từ các đơn hủy và đơn Trả hàng/Hoàn tiền.",
                color: '#0ea5e9',
                _id: "revenue"
            },
            {
                title: "Đơn hàng",
                value: currentPeriod?.sales.totalOrders || 0,
                percentChange: totalOrdersPecentChanges,
                tooltip: "Tổng số lượng đơn hàng được xác nhận trong khoảng thời gian đã chọn",
                color: '#f97316',
                _id: "orders"
            },
            {
                title: "Doanh thu thuần",
                value: currentPeriod?.sales.totalProfit || 0,
                percentChange: totalProfitPecentChanges,
                suffix: "đ",
                tooltip: "Tổng doanh thu của các đơn hàng giao thành công. (Doanh thu = Giá trị hàng hoá - NB giảm giá - Phí trả Vagoda).",
                color: '#10b981',
                _id: "profit"
            },
            {
                title: "Tỉ lệ chuyển đổi",
                value: roundTo2DecimalPlaces(currentPeriod?.conversionRate.conversionRate! * 100 || 0),
                isPercentageValue: true,
                percentChange: conversionRatePecentChanges,
                suffix: "%",
                tooltip: "Tổng số khách truy cập và có đơn đã xác nhận chia tổng số khách truy cập trong khoảng thời gian đã chọn. ",
                color: '#ec4899',
                _id: "conversionRate"
            },
            {
                title: "Giá trị đơn hàng trung bình",
                value: roundTo2DecimalPlaces(currentPeriod?.sales.avgRevenue || 0),
                percentChange: avgRevenuePecentChanges,
                suffix: "đ",
                tooltip: "Doanh số trung bình mỗi đơn hàng trong khoảng thời gian đã chọn.",
                color: '#3b82f6',
                _id: "avgRevenuePerOrder"
            },
            {
                title: "Đơn hàng hủy",
                value: currentPeriod?.cancelledOrders.totalOrders || 0,
                percentChange: cancelledPecentChanges,
                tooltip: "Tổng số lượng đơn hàng hủy trong khoảng thời gian đã chọn",
                color: '#78716c',
                _id: "cancelledOrders"
            },
            {
                title: "Khách hàng quay lại",
                value: currentPeriod?.returningRate.totalReturningUsers || 0,
                percentChange: returningRatePecentChanges,
                suffix: "khách",
                tooltip: "Tổng số lượng khách quay lại trong khoảng thời gian đã chọn",
                color: '#78716c',
                _id: "returningCustomers"
            },
        ]
        return result;
    }, [currentPeriod, previousPeriod])

    useEffect(() => {
        if (!context.shopInfo) return;
        const fetchTopProductsSales = async () => {
            const [startTime, endTime] = DayjsToDate(selectedDates);
            await POST_getTopProductsInSales(
                context.shopInfo?._id as string,
                startTime!, endTime!).then((response) => setProductSales(response.data))
        }
        const fetchTopCitiesSales = async () => {
            const [startTime, endTime] = DayjsToDate(selectedDates);
            await POST_getTopCitiesInSales(
                context.shopInfo?._id as string,
                startTime!, endTime!).then((response) => {
                    console.log("cities fetched", response.data.statisticsData);
                    setCitiesSales(response.data.statisticsData)
                })
        }

        const fetchCurrentPeriod = async () => {
            const [BECurrentStartTime, BECurrentEndTime] = DayjsToDate(selectedDates);

            const totalSalesResponse = await POST_getTotalSales(
                context.shopInfo?._id as string,
                BECurrentStartTime || new Date(),
                BECurrentEndTime || new Date(),
                `${step}-d`);
            const cancelledOrdersResponse = await POST_getOrderStatisticsWithStatus(
                context.shopInfo?._id as string,
                OrderStatusType.CANCELLED,
                BECurrentStartTime || new Date(),
                BECurrentEndTime || new Date(),
                `${step}-d`);
            const conversionRateResponse = await POST_getConversionRateStats(
                context.shopInfo?._id as string,
                BECurrentStartTime || new Date(),
                BECurrentEndTime || new Date(),
                `${step}-d`
            )
            const returnRateResponse = await POST_getReturnRateOfCustomers(
                context.shopInfo?._id as string,
                BECurrentStartTime || new Date(),
                BECurrentEndTime || new Date(),
                `${step}-d`
            )

            console.log("ReturningRateResponse", returnRateResponse.data);

            setCurrentPeriod({
                sales: totalSalesResponse.data || [],
                cancelledOrders: cancelledOrdersResponse.data || [],
                conversionRate: conversionRateResponse.data || [],
                returningRate: returnRateResponse.data || [],
            } as BPChartStats)

            const [BECompareStartTime, BECompareEndTime] = DayjsToDate(compareDates);
            const previousTotalSalesResponse = await POST_getTotalSales(
                context.shopInfo?._id as string,
                BECompareStartTime || new Date(),
                BECompareEndTime || new Date(),
                `${step}-d`);
            const previousCancelledOrdersResponse = await POST_getOrderStatisticsWithStatus(
                context.shopInfo?._id as string,
                OrderStatusType.CANCELLED,
                BECompareStartTime || new Date(),
                BECompareEndTime || new Date(),
                `${step}-d`);
            const previousConversionRateResponse = await POST_getConversionRateStats(
                context.shopInfo?._id as string,
                BECompareStartTime || new Date(),
                BECompareEndTime || new Date(),
                `${step}-d`
            )
            const previousReturnRateResponse = await POST_getReturnRateOfCustomers(
                context.shopInfo?._id as string,
                BECompareStartTime || new Date(),
                BECompareEndTime || new Date(),
                `${step}-d`
            )

            setPreviousPeriod({
                sales: previousTotalSalesResponse.data || [],
                cancelledOrders: previousCancelledOrdersResponse.data || [],
                conversionRate: previousConversionRateResponse.data || [],
                returningRate: previousReturnRateResponse.data || [],
            } as BPChartStats)
        }

        setLoading(true);
        fetchTopProductsSales();
        fetchTopCitiesSales();
        fetchCurrentPeriod();
        setLastUpdateTime(dayjs());
        setLoading(false);
    }, [context.shopInfo, selectedDates])

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
                                                    isPercentageValue={item.isPercentageValue}
                                                    selectedCategories={selectedCategories}
                                                    setSelectedCategories={setSelectedCategories} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="lg:block sm:hidden">
                            {
                                <CustomCarousel loading={loading} arrows infinite={false}
                                    slidesToShow={4} slidesToScroll={1}
                                    contents={
                                        categories.map((item, key) => {
                                            return (
                                                <div key={key}>
                                                    <CheckableCard item={item} checkboxVisibility={true}
                                                        suffix={item.suffix ?? ""}
                                                        selectedCategories={selectedCategories}
                                                        setSelectedCategories={setSelectedCategories} />
                                                </div>
                                            )
                                        })
                                    } />
                            }

                        </div>
                        {
                            loading ? <Spin /> :
                                <BPChart
                                    currentPeriod={currentPeriod}
                                    previousPeriod={previousPeriod}
                                    timeUnit={selectedReportPeriod}
                                    dateRange={Array.from(DayjsToDate(selectedDates))}
                                    categories={selectedCategories} />
                        }
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
                                productSales && productSales.length !== 0 ?
                                    <TopProductsBarChart items={productSales} />
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
                                citiesSales && citiesSales.length !== 0 ?
                                    <TopCitiesBarChart items={citiesSales} />
                                    : <Empty description={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty>
                            }
                        </div>
                    </Card>
                </div>
            </div >
        </React.Fragment >
    )
}