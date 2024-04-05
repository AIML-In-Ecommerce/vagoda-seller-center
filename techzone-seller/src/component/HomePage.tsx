"use client";
import { formatDate, getPreviousWeekDateRange } from "@/utils/DateFormatter"
import { Rate, Empty, Select, Table, TableColumnsType, Tooltip, DatePicker, DatePickerProps } from "antd"
import React, { useEffect, useState } from "react"
import { FaRegCalendarAlt, FaStar, FaBookmark, FaAngleRight, FaRegQuestionCircle } from "react-icons/fa"
import { BEChart } from "./BusinessEfficiencyChart"
import CustomCarousel from "./Carousel"
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { TbFilter } from "react-icons/tb";
import { FaCircleLeft, FaCircleRight } from "react-icons/fa6";



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
                        <Tooltip title={item.index_tooltip}>
                            <div><FaRegQuestionCircle /></div></Tooltip>
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

const { RangePicker } = DatePicker;

const quarterFormat: DatePickerProps['format'] = (value) =>
    `${value.format(`[Quý] Q - YYYY`)}`;

const getCorrectInterval = (startDate: Date, endDate: Date, filterBy: string) => {
    let _start = new Date(startDate);
    let _end = new Date(endDate);

    switch (filterBy) {
        case 'date':
            return [_start, _end];
        case 'month':
            _start.setDate(1);
            _end = new Date(_end.getFullYear(), _end.getMonth() + 1, 1);
            _end.setDate(_end.getDate() - 1);
            return [_start, _end];
        case 'year':
            _start = new Date(_start.getFullYear(), 0, 1); // January 1st of the start year
            _end = new Date(_end.getFullYear(), 11, 31); // December 31st of the end year
            return [_start, _end];
        case 'quarter':
            const quarterStartMonth = Math.floor(_start.getMonth() / 3) * 3; // Get the starting month of the quarter
            const quarterEndMonth = quarterStartMonth + 2; // Get the ending month of the quarter
            _start = new Date(_start.getFullYear(), quarterStartMonth, 1); // First day of the quarter
            _end = new Date(_end.getFullYear(), quarterEndMonth + 1, 0); // Last day of the quarter
            return [_start, _end];
        default:
            return [_start, _end];
    }
}

const rangeDefaultsForFilter = (filterBy: string): [Dayjs, Dayjs] => {
    return filterBy === 'date' ? [dayjs().subtract(6, 'day'), dayjs()] :
        filterBy === 'month' ? [dayjs().startOf('year'), dayjs()] :
            filterBy === 'quarter' ? [dayjs().startOf('year'), dayjs()] : [dayjs().subtract(5, 'year'), dayjs()]
}

//HomePage 
export default function HomePage() {
    const [filterValue, setFilterValue] = useState<string>('date');
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(6, 'day'), dayjs()]);

    const DayjsToDate = (dates: [Dayjs | null, Dayjs | null]) => {
        return dates.map(item => {
            if (item === null) {
                return null;
            } else {
                return item.toDate();
            }
        });
    }

    const handleFilterChange = (value: string) => {
        setFilterValue(value);
        let range = rangeDefaultsForFilter(value);
        console.log('Range: ', range, value);
        let [_start, _end] = [new Date(range[0]!.format('YYYY-MM-DD')), new Date(range[1]!.format('YYYY-MM-DD'))];
        let actualRange = getCorrectInterval(_start, _end, value);
        console.log('Actual Range: ', actualRange);
        setSelectedDates([dayjs(actualRange[0]), dayjs(actualRange[1])]); // Reset selected date when filter changes
    };

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            let [_start, _end] = [new Date(dates[0]!.format('YYYY-MM-DD')), new Date(dates[1]!.format('YYYY-MM-DD'))];
            let range = getCorrectInterval(_start, _end, filterValue);

            setSelectedDates([dayjs(range[0]), dayjs(range[1])]);
        } else {
            console.log('Clear');
        }
    };

    return (
        <React.Fragment>
            <div className="container grid grid-cols-4">
                {/* slider */}
                <div className="col-start-1 col-span-4 mx-auto mt-10 w-10/12">
                    <CustomCarousel arrows={true}
                        autoplay={true}
                        prevArrow={<FaCircleLeft/>} 
                        nextArrow={<FaCircleRight/>}
                        prevArrowStyles={{
                            color: 'black',
                            fontSize: '36px',
                            lineHeight: '1.5715'
                        }}
                        nextArrowStyles={{
                            color: 'black',
                            fontSize: '36px',
                            lineHeight: '1.5715'
                        }}

                        contents={
                            bannerContent.map((item, key) => {
                                return (
                                    <div key={key} className="bg-sky-600 h-[240px]">
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
                            <div className="absolute top-2 left-2.5 z-[1] text-white"><FaStar /></div>
                            <div className="absolute top-0 left-0 text-4xl z-[0] text-green-500"><FaBookmark /></div>
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
                            <div className="font-semibold text-xl flex flex-col lg:flex-row">
                                <div>Hiệu quả kinh doanh</div>
                                <div className="text-base font-normal lg:mx-2 self-center">7 ngày qua: {getPreviousWeekDateRange()}</div>
                            </div>
                            <div className="font-medium text-sky-500 flex flex-row items-center">
                                <span>Xem chi tiết</span>
                                <span><FaAngleRight /></span>
                            </div>
                        </div>
                        <div className="flex lg:flex-row mt-5 flex-col relative">
                            <div className="lg:w-2/5 flex-col flex">
                                <div className="flex flex-row items-center">
                                    <div className="mr-2 text-2xl"><TbFilter /></div>
                                    <div className="mr-5 text-semibold">Lọc</div>
                                    <Select
                                        defaultValue="date"
                                        style={{ width: 120 }}
                                        onChange={(value: string) => { handleFilterChange(value) }}
                                        options={[
                                            { value: 'date', label: 'Theo Ngày' },
                                            { value: 'month', label: 'Theo Tháng' },
                                            { value: 'quarter', label: 'Theo Quý' },
                                            { value: 'year', label: 'Theo Năm' },
                                        ]}
                                    />
                                </div>
                                <div className="mt-5">
                                    {filterValue === 'date' && (
                                        <RangePicker
                                            picker="date"
                                            defaultValue={[dayjs().subtract(6, 'day'), dayjs()]}
                                            value={selectedDates}
                                            onChange={onRangeChange}
                                            maxDate={dayjs(new Date())}
                                            format="DD/MM/YYYY"
                                        />
                                    )}
                                    {filterValue === 'month' && (
                                        <RangePicker
                                            picker="month"
                                            value={selectedDates}
                                            onChange={onRangeChange}
                                            maxDate={dayjs(new Date())}
                                            format="MM/YYYY"
                                        />
                                    )}
                                    {filterValue === 'quarter' && (
                                        <RangePicker
                                            picker="quarter"
                                            value={selectedDates}
                                            onChange={onRangeChange}
                                            maxDate={dayjs(new Date())}
                                            format={quarterFormat}
                                        />
                                    )}
                                    {filterValue === 'year' && (
                                        <RangePicker
                                            picker="year"
                                            value={selectedDates}
                                            onChange={onRangeChange}
                                            maxDate={dayjs(new Date())}
                                            format="YYYY"
                                        />
                                    )}
                                </div>

                            </div>
                            <div className="lg:w-3/5">
                                <BEChart filterBy={filterValue}
                                    dateRange={Array.from(DayjsToDate(selectedDates))} />
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
    )
}