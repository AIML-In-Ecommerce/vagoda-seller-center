"use client";
import { formatDate, getPreviousWeekDateRange } from "@/utils/DateFormatter"
import { Rate, Empty, Select, Table, TableColumnsType, Tooltip, DatePicker, DatePickerProps, Divider, Card } from "antd"
import React, { useEffect, useState } from "react"
import { FaRegCalendarAlt, FaStar, FaBookmark } from "react-icons/fa"
import { BEChart } from "./BusinessEfficiencyChart"
import CustomCarousel from "./Carousel"
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { TbFilter } from "react-icons/tb";
import { SlArrowRight } from "react-icons/sl";
import NotificationList, { NotificationType } from "./NotificationList";
import { TbInfoCircle } from "react-icons/tb";

const bannerContent = [
    { title: 'Quản lý đơn hàng', description: "Quản lý đơn hàng dễ dàng và hiệu quả với các công cụ của chúng tôi." },
    { title: 'Tạo sản phẩm', description: "Cửa hàng của bạn đã sẵn sàng để nhận các đơn hàng. Hãy bắt đầu tạo sản phẩm nào!" },
    { title: 'Xem hiệu quả kinh doanh', description: "Theo dõi và đánh giá hiệu quả kinh doanh của bạn với báo cáo chi tiết." },
    { title: 'Trung tâm phát triển', description: "Khám phá các công cụ và tài nguyên mới để phát triển cửa hàng của bạn." },
    { title: 'Xem công cụ khuyến mãi', description: "Tăng doanh số bằng cách sử dụng các công cụ khuyến mãi và quảng cáo." },
    { title: 'Thiết kế gian hàng', description: "Tạo ra một gian hàng độc đáo và chuyên nghiệp để thu hút khách hàng." },
];

const qosComment = [
    {
        score: [5],
        rating: "Xuất sắc",
        message: {
            firstPart: "Tuyệt vời! Bạn đang xử lý đơn hàng",
            highlightWord: "xuất sắc",
            secondPart: "trong tuần vừa qua!",
            content: "Hãy giữ vững phong độ để có thêm thật nhiều đánh giá 5 sao và nhận thêm nhiều đặc quyền từ Techzone nhé!"
        }
    },
    {
        score: [3, 4],
        rating: "Tốt",
        message: {
            firstPart: "Bạn đang xử lý đơn hàng",
            highlightWord: "khá tốt",
            secondPart: ".",
            content: "Tăng tốc độ thêm 1 chút xíu nữa để trở thành Nhà Bán xử lý đơn hàng xuất sắc và tối ưu tỷ lệ chuyển đổi nhé!"
        }
    },
    {
        score: [1, 2],
        rating: "Chưa tốt",
        message: {
            firstPart: "Ôi không… Hiệu suất vận hành của bạn đang",
            highlightWord: "không ổn",
            secondPart: ".",
            content: "Hãy tập trung cải thiện tốc độ xử lý đơn hàng nhé!"
        }
    },
    {
        score: [0],
        rating: "Tạm tắt gian hàng",
        message: {
            firstPart: "Rất tiếc! Techzone phải",
            highlightWord: "tạm tắt gian hàng",
            secondPart: "trong 7 ngày.",
            content: "Hãy tham khảo các giải pháp cải thiện điểm số và chất lượng vận hành tại đây để sẵn sàng khi gian hàng mở cửa trở lại nhé!"
        }
    },
    //   {
    //     score: "Tạm tắt gian hàng (lần 2)",
    //     rating: "Đây đã là lần thứ 2 bạn đạt điểm vận hành bằng 0!",
    //     message: {
    //       firstPart: "Tiki phải tạm tắt gian hàng trong 14 ngày.",
    //       content: "Lưu ý: Sau 2 lần bị khóa gian do điểm vận hành, lần thứ 3 gian hàng của bạn sẽ bị khóa vĩnh viễn."
    //     }
    //   },
    //   {
    //     score: "Tạm tắt gian hàng (vĩnh viễn)",
    //     rating: "Rất tiếc! Tiki phải tắt gian hàng hàng vĩnh viễn.",
    //     message: {
    //       firstPart: "Đây đã là lần thứ 3 bạn đạt điểm vận hành bằng 0!",
    //       content: "Vì vậy, Tiki rất tiếc phải tắt gian hàng vĩnh viễn."
    //     }
    //   }
]

const notificationData: NotificationType[] = [
    {
        _id: '1',
        title: 'Báo cáo doanh thu tuần',
        image: 'https://cdn-icons-png.flaticon.com/512/432/432548.png',
        description: "Xin chào Thảo Lăng, Doanh thu của bạn tuần vừa qua đạt 13.360.783đ",
        timestamp: new Date(2024, 2, 31, 12, 24, 52)
    },
    {
        _id: '2',
        title: 'Thông báo từ hệ thống',
        image: 'https://cdn-icons-png.flaticon.com/512/1169/1169118.png',
        description: "Xin chào Thảo Lăng, Điều khoản & Điều kiện của bạn đã được chấp nhận & thành công. Cảm ơn bạn đã hợp tác cùng chúng tôi",
        timestamp: new Date(2024, 2, 31, 12, 24, 52)
    }
]

//Operational Efficiency
interface OEProps {
    key: React.Key;
    index?: string;
    index_description?: string;
    index_tooltip?: string;
    score?: number;
    status?: string;
}

const columns: TableColumnsType<OEProps> = [
    {
        title: <div className="font-semibold">Chỉ số</div>,
        dataIndex: 'index',
        render: (index: string, item: OEProps) =>
            <div className="flex flex-col px-4">
                <div className="flex-row flex gap-1 items-center">
                    <div className="font-semibold">{item.index}</div>
                    <div className="text-sm">
                        <Tooltip title={item.index_tooltip}>
                            <div><TbInfoCircle /></div></Tooltip>
                    </div>
                </div>
                <div>{item.index_description}</div>
            </div>,
        width: '46%'
    },
    {
        title: <div className="font-semibold">Điểm hiện tại</div>,
        dataIndex: 'score',
        render: (score: number) =>
            score > 0 ? score : <div>---</div>,
        width: '27%'
    },
    {
        title: <div className="font-semibold">Trạng thái</div>,
        dataIndex: 'status',
        width: '27%'
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



const productRatingData = {
    rating: 4.6,
    totalRatings: 540,
}

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

const handleRatingColor = (rating: number, intensity: number, prefix: string) => {
    let actualRating = Math.floor(rating);
    let color: string;
    switch (actualRating) {
        case 0:
            color = 'orange';
            break;
        case 1: case 2:
            color = 'red';
            break;
        case 3: case 4:
            color = 'amber';
            break;
        case 5:
            color = 'green';
            break;
        default:
            color = 'gray';
            break;
    }
    return `${prefix}-${color}-${intensity}`;
}

//HomePage 
export default function HomePage() {
    const [filterValue, setFilterValue] = useState<string>('date');
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(6, 'day'), dayjs()]);
    const [totalOrderQuantity, setTotalOrderQuantity] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [qosScore, setQosScore] = useState<number>(5);

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
            <div className="container flex flex-col px-20 mx-auto">
                {/* slider */}
                <div className="mt-10 w-[100%]">
                    <CustomCarousel
                        arrows
                        autoplay={true}
                        contents={
                            bannerContent.map((item, key) => {
                                return (
                                    <div key={key} className="bg-sky-600 h-[240px] rounded-lg">
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
                <div className="grid grid-cols-4 gap-x-5 gap-y-2">
                    {/* Thông tin đơn hàng */}
                    <div className="col-start-1 lg:col-span-3 col-span-4 mt-10 flex flex-col gap-5 my-10">
                        <div className="font-semibold text-xl">Đơn hàng</div>
                        <div>Nhà bán chưa có việc gì cần làm với đơn hàng</div>
                    </div>

                    <div className="col-start-1 lg:col-span-3 col-span-4 lg:mx-0 lg:col-start-4 lg:col-span-1 lg:row-span-4 lg:mt-10">
                        {/* <Affix offsetTop={100}> */}
                        <div className="flex flex-col">
                            <div className="border flex flex-col relative lg:ml-5 rounded-xl shadow-lg">
                                <div className="mt-10 sm:mt-5 mx-5 sm:text-center font-semibold text-lg">Điểm chất lượng vận hành</div>
                                <div className="mx-5 sm:mt-2 flex sm:justify-center flex-row gap-2 items-center sm:text-sm lg:text-xs">
                                    <FaRegCalendarAlt />
                                    <div>Tuần trước {
                                        getPreviousWeekDateRange()
                                    }</div>
                                </div>
                                <div className="absolute top-2 left-2.5 z-[1] text-white"><FaStar /></div>
                                <div className={`absolute top-0 left-0 text-4xl z-[0] ${handleRatingColor(qosScore, 500, "text")}`}><FaBookmark /></div>
                                <div className="mx-auto my-5 flex lg:flex-row flex-col gap-5 items-center">
                                    <Rate value={qosScore} count={5} disabled allowHalf />
                                    <div><span className={`${handleRatingColor(qosScore, 500, "text")} text-lg font-bold`}>{qosScore} </span>/ 5 sao</div>
                                </div>
                                {
                                    qosComment.filter((item) => item.score.includes(Math.floor(qosScore))).map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className={`${handleRatingColor(qosScore, 200, "bg")} text-black border ${handleRatingColor(qosScore, 500, "border")} p-4 lg:mx-5 mx-10 rounded-xl text-sm mb-5`}>
                                                    <div className="font-semibold">{item.message.firstPart} <span className={`${handleRatingColor(qosScore, 500, "text")} font-bold`}>{item.message.highlightWord}</span> {item.message.secondPart}</div>
                                                    <div className="font-light">
                                                        {item.message.content}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <a className="text-sky-500 flex flex-row mx-auto items-center mb-5 gap-1">
                                    <span>Xem chi tiết</span>
                                    <span><SlArrowRight /></span>
                                </a>
                            </div>
                            <div className="border flex flex-col relative mt-10 lg:ml-5 rounded-xl shadow-lg">
                                <div className="text-center my-5 font-semibold text-xl">Thông báo!</div>
                                <div>
                                    <NotificationList data={notificationData} />
                                </div>
                                <a className="text-sky-500 flex flex-row mx-auto items-center my-5 gap-1">
                                    <span>Xem tất cả</span>
                                    <span><SlArrowRight /></span>
                                </a>
                            </div>
                        </div>
                        {/* </Affix> */}
                    </div>

                    {/* Hiệu quả kinh doanh */}
                    <div className="col-start-1 lg:col-span-3 col-span-4 mt-10">
                        <div className="flex flex-col container">
                            <div className="flex flex-row justify-between">
                                <div className="font-semibold text-xl flex flex-col lg:flex-row">
                                    <div>Hiệu quả kinh doanh</div>
                                    {/* <div className="text-base font-normal lg:mx-2 self-center">
                                    {selectedDates[0]?.diff(selectedDates[1])}
                                    {filterValue === 'date' ? "ngày" :
                                        filterValue === 'month' ? "tháng" :
                                            filterValue === 'quarter' ? "quý" : "năm"
                                    } qua: {}</div> */}
                                </div>
                                <a className="font-medium text-sky-500 flex flex-row items-center gap-1">
                                    <span>Xem chi tiết</span>
                                    <span><SlArrowRight /></span>
                                </a>
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
                                    <div className="flex lg:flex-col flex-row justify-between">
                                        <div>
                                            <div className="mt-8 w-14 h-1 bg-red-500"></div>
                                            <div className="font-semibold mt-2 text-lg">Đơn hàng</div>
                                            <div className="mt-1 mr-3 font-light text-2xl">{totalOrderQuantity}</div>
                                        </div>
                                        <div>
                                            <div className="mt-3 sm:mt-8 w-14 h-1 bg-teal-500"></div>
                                            <div className="font-semibold mt-2 text-lg">Doanh số</div>
                                            <div className="mt-1 mr-3 font-light text-2xl">
                                                {totalRevenue.toLocaleString('vi-VN',
                                                    { style: 'currency', currency: 'VND' })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-3/5">
                                    <BEChart filterBy={filterValue}
                                        dateRange={Array.from(DayjsToDate(selectedDates))}
                                        setTotalOrderQuantity={setTotalOrderQuantity}
                                        setTotalRevenue={setTotalRevenue} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hiệu quả vận hành */}
                    <div className="col-start-1 lg:col-span-3 col-span-4 mt-10 ">
                        <div className="flex flex-row justify-between">
                            <div className="font-semibold text-xl">Hiệu quả vận hành</div>
                            <a className="font-medium text-sky-500 flex flex-row items-center gap-1">
                                <span>Xem chi tiết</span>
                                <span><SlArrowRight /></span>
                            </a>
                        </div>
                    </div>
                    <div className="col-start-1 lg:col-span-3 col-span-4 gap-5 my-10 flex lg:grid lg:grid-cols-6 sm:flex-col">
                        <div className="lg:col-start-1 lg:col-span-4 border border-2 shadow-lg rounded-xl">
                            <Table columns={columns} dataSource={OEDataSources} pagination={false} />
                        </div>
                        <div className="lg:col-start-5 lg:col-span-2 border border-2 shadow-lg rounded-xl">
                            {/* <Table className="p-2" columns={ratingColumn} dataSource={RatingDataSources} pagination={false} /> */}
                            <Card className="h-full" title={
                                <div className="font-semibold flex flex-row items-center text-sm justify-center gap-1">
                                    <div>Đánh giá sản phẩm</div>
                                    <Tooltip title={"Trung bình tất cả các đánh giá sản phẩm của nhà bán"}>
                                        <div><TbInfoCircle /></div></Tooltip>
                                </div>
                            }>
                                <div className="flex flex-col items-center justify-center space-y-1 px-5 h-full ant-card-body">
                                    <div className="text-slate-500 text-3xl font-semibold">{productRatingData.rating ? productRatingData.rating : '--'}/5</div>
                                    <div>{`(${productRatingData.totalRatings} đánh giá)`}</div>
                                    <Rate className=" text-2xl" value={productRatingData.rating} count={5} disabled allowHalf />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}