"use client";
import { DatePicker, Empty, Radio, RadioChangeEvent, SelectProps } from "antd";
import React, { useState } from "react";
import CheckableCard from "../CheckableCard";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import CampaignInsightTable from "./table/CampaignInsightTable";

dayjs.extend(LocalizedFormat)


const { RangePicker } = DatePicker

const mainValues = [
    {
        title: "Doanh thu",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng giá trị các đơn hàng được xác nhận, có áp dụng khuyến mãi trong khoảng thời gian đã chọn.",
        backgroundColor: '#0ea5e9',
        borderVisibility: true,
    },
    {
        title: "SKU bán ra",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số lượng SKU bán ra tính trên các đơn hàng được xác nhận trong khoảng thời gian đã chọn. Nếu một SKU được bán nhiều lần, hệ thống ghi nhận là một.",
        backgroundColor: '#f97316',
        borderVisibility: true,
    },
    {
        title: "Đơn vị đã bán",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số lượng sản phẩm đã bán có áp dụng khuyến mãi, tính trên các đơn hàng xác nhận, trong khoảng thời gian đã chọn. Nếu có 2 sản phẩm bán được bán trong cùng một SKU, hệ thống ghi nhận là 2.",
        backgroundColor: '#10b981',
        borderVisibility: false,

    },
    {
        title: "Đơn hàng",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số lượng đơn hàng được xác nhận, có áp dụng khuyến mãi trong khoảng thời gian đã chọn.",
        backgroundColor: '#78716c',
        borderVisibility: false
    },
    {
        title: "Khách hàng",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số khách hàng mua sản phẩm có áp dụng khuyến mãi, tính trên các đơn hàng được xác nhận trong khoảng thời gian đã chọn.",
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

export default function CampaignInsight() {
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
                    <div className="font-semibold text-lg">Chỉ số chính</div>
                    <div className="w-[100%] my-10 flex flex-col gap-10">
                        <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-2">
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
                        <Empty description={<div>Không có dữ liệu. Hãy chọn thời gian báo cáo khác</div>}></Empty>
                    </div>
                </div>
                <div className="mt-5 mx-5">
                    <CampaignInsightTable />
                </div>
            </div>
        </React.Fragment >
    )
}