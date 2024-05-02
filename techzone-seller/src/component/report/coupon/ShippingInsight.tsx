"use client";
import { DatePicker, Empty, Radio, RadioChangeEvent, Select, SelectProps } from "antd";
import React, { useState } from "react";
import CustomCarousel from "../../Carousel";
import CheckableCard from "../CheckableCard";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import ShippingInsightTable from "./table/ShippingInsightTable";

dayjs.extend(LocalizedFormat)


const { RangePicker } = DatePicker

const mainValues = [
    {
        title: "Doanh thu",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng doanh thu từ các đơn hàng được xác nhận và có áp dụng giảm giá vận chuyển trong khoảng thời gian đã chọn.",
        backgroundColor: '#0ea5e9',
        borderVisibility: true,
    },
    {
        title: "Sản phẩm đã bán",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số sản phẩm có áp dụng giảm giá vận chuyển, tính trên các đơn hàng được xác nhận trong khoảng thời gian đã chọn.",
        backgroundColor: '#f97316',
        borderVisibility: true,
    },
    {
        title: "Chi phí vận chuyển",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng chi phí vận chuyển mà Nhà bán đã hỗ trợ, tính trên các đơn hàng xác nhận trong khoảng thời gian đã chọn.",
        backgroundColor: '#10b981',
        borderVisibility: false,

    },
    {
        title: "Tỉ lệ lợi nhuận trên chi phí",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Doanh thu/chi phí vận chuyển",
        backgroundColor: '#ec4899',
        borderVisibility: false
    },
    {
        title: "Người mua",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số khách hàng đã áp dụng giảm giá vận chuyển ở các đơn hàng được xác nhận trong khoảng thời gian đã chọn.",
        backgroundColor: '#78716c',
        borderVisibility: false
    },
    {
        title: "Đơn hàng",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số đơn hàng được xác nhận và có áp dụng giảm giá vận chuyển trong khoảng thời gian đã chọn.",
        backgroundColor: '#78716c',
        borderVisibility: false
    },

]

const discounts = [
    {
        label: 'Tất cả giảm giá vận chuyển',
        value: 'AllDiscounts',
    },
    {
        label: 'Giảm giá được tạo bởi nhà bán',
        value: 'SellerDiscount',
    },
]

const discountTypeOptions: SelectProps['options'] = [
    {
        label: 'Tất cả giảm giá vận chuyển',
        value: 'AllDiscounts',
    },
    {
        label: 'Giảm giá được tạo bởi nhà bán',
        value: 'SellerDiscount',
    },
]

export default function ShippingInsight() {
    const [selectedReportPeriod, setSelectedReportPeriod] = useState<string>("week");
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date'), dayjs().endOf('date')]);
    const [compareDates, setCompareDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date'), dayjs().endOf('date')]);
    const [selectedDiscountType, setSelectedDiscountType] = useState<string>("SellerDiscount");
    const [selectedDiscountLabel, setSelectedDiscountLabel] = useState<string>("Giảm giá được tạo bởi nhà bán");

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

    const switchPeriod = (selectedPeriod: string) => {
        let period: [Dayjs, Dayjs] = [dayjs().startOf('date'), dayjs().endOf('date')];
        switch (selectedPeriod) {
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
        handlePreviousPeriod(period, selectedPeriod);
    }

    const onPeriodChange = (e: RadioChangeEvent) => {
        setSelectedReportPeriod(e.target.value);
        switchPeriod(e.target.value);
    };

    const handleOptionChange = (value: string) => {
        setSelectedDiscountType(value);
        setSelectedDiscountLabel(discounts.filter(option => option.value === value)[0].label);
    };

    const convertPeriodLabel = (period: string) => {
        return period === "today" ? "Hôm nay" :
            period === "yesterday" ? "Hôm qua" :
                period === "week" ? "7 ngày qua" : "30 ngày qua";
    }

    const dateRangeToString = (selectedDates: [Dayjs | null, Dayjs | null]) => {
        return `${selectedDates[0]?.format('DD/MM/YYYY')} - ${selectedDates[1]?.format('DD/MM/YYYY')}`
    }

    return (
        <React.Fragment>
            <div className="flex flex-col container mx-auto bg-slate-100">
                <div className="bg-white py-4 px-4 mx-5 mt-5">
                    <div className="flex lg:flex-row flex-col lg:justify-between gap-5">
                        <div className="flex flex-row gap-5 items-center">
                            <div>Loại giảm giá:</div>
                            <Select
                                style={{ width: '350px' }}
                                value={selectedDiscountType}
                                options={discountTypeOptions}
                                onChange={handleOptionChange}
                                optionRender={(option) => (
                                    <Radio checked={selectedDiscountType === option.value}
                                        value={option.value}>{option.label}</Radio>
                                )}>
                            </Select>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5 lg:items-center">
                            <div>Thời gian báo cáo:</div>
                            <Radio.Group onChange={onPeriodChange} value={selectedReportPeriod}>
                                <Radio.Button value="week">7 ngày qua</Radio.Button>
                                <Radio.Button value="month">30 ngày qua</Radio.Button>
                            </Radio.Group>
                            <RangePicker picker="date" value={selectedDates} format="DD/MM/YYYY" />
                        </div>
                    </div>
                </div>

                <div className="bg-white py-4 px-4 mx-5 mt-5 flex flex-col">
                    <div className="flex flex-col lg:flex-row">
                        <div className="font-semibold">Chỉ số hiệu quả của <span className="lowercase">{selectedDiscountLabel}</span></div>
                        <div className="lg:ml-4 text-slate-500">
                            {convertPeriodLabel(selectedReportPeriod)}: {dateRangeToString(selectedDates)} (So sánh với: {dateRangeToString(compareDates)})
                        </div>
                    </div>
                    <div className="w-[100%] my-10 flex flex-col gap-10">
                        <div className="lg:hidden sm:block">
                            <div className="grid grid-cols-2 gap-2">
                                {
                                    mainValues.map((item, key) => {
                                        return (
                                            <div key={key}>
                                                <CheckableCard
                                                    item={item} checkboxVisibility={false}
                                                    borderVisibility={item.borderVisibility} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="lg:block sm:hidden">
                            <CustomCarousel loading={false} arrows infinite={false}
                                slidesToShow={5}
                                contents={
                                    mainValues.map((item, key) => {
                                        return (
                                            <div key={key}>
                                                <CheckableCard
                                                    item={item} checkboxVisibility={false}
                                                    borderVisibility={item.borderVisibility} />
                                            </div>
                                        )
                                    })
                                } />
                        </div>
                        <Empty description={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty>
                    </div>
                </div>
                <div className="mt-5 mx-5">
                    <ShippingInsightTable />
                </div>
            </div>
        </React.Fragment >
    )
}