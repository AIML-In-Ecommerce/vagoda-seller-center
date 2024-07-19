"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import RatingChart from "../RatingChart";
import { Breadcrumb, Button, Card, DatePicker, List, Slider, Tooltip } from "antd";
import { HiOutlineHome } from "react-icons/hi";
import { SlArrowRight } from "react-icons/sl";
import { TbInfoCircle } from "react-icons/tb";
import { GoDownload } from "react-icons/go";
import GaugeChart from "../GaugeChart";
import RatingStatistics from "../RatingStatistics";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { AuthContext } from "@/context/AuthContext";
import { POST_getTotalRecievedOrders, POST_getTotalLateTimeOrders, POST_getTotalOnTimeOrders, POST_getTotalProcessOrders, OrderStatusType, POST_getOrderStatistics, POST_getReviewStatistics, ReviewRange, ShopPerformanceDetail, GET_getShopPerformanceStatistics } from "@/apis/statistic/StatisticAPI";

dayjs.extend(LocalizedFormat)

const { RangePicker } = DatePicker;

interface RatingItem {
    stars: number,
    count: number,
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

const dateRangeToString = (selectedDates: [Dayjs | null, Dayjs | null]) => {
    return `${selectedDates[0]?.format('DD/MM/YYYY')} - ${selectedDates[1]?.format('DD/MM/YYYY')}`
}


const qosComment = [
    {
        score: [5],
        rating: "Xuất sắc",
        message: {
            firstPart: "Tuyệt vời! Bạn đang xử lý đơn hàng",
            highlightWord: "xuất sắc",
            secondPart: "trong tuần vừa qua!",
            content: "Hãy giữ vững phong độ để có thêm thật nhiều đánh giá 5 sao và nhận thêm nhiều đặc quyền từ Vagoda nhé!"
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
            firstPart: "Rất tiếc! Vagoda phải",
            highlightWord: "tạm tắt gian hàng",
            secondPart: "trong 7 ngày.",
            content: "Hãy tham khảo các giải pháp cải thiện điểm số và chất lượng vận hành tại đây để sẵn sàng khi gian hàng mở cửa trở lại nhé!"
        }
    },
    //   {
    //     score: "Tạm tắt gian hàng (lần 2)",
    //     rating: "Đây đã là lần thứ 2 bạn đạt điểm vận hành bằng 0!",
    //     message: {
    //       firstPart: "Vagoda phải tạm tắt gian hàng trong 14 ngày.",
    //       content: "Lưu ý: Sau 2 lần bị khóa gian do điểm vận hành, lần thứ 3 gian hàng của bạn sẽ bị khóa vĩnh viễn."
    //     }
    //   },
    //   {
    //     score: "Tạm tắt gian hàng (vĩnh viễn)",
    //     rating: "Rất tiếc! Vagoda phải tắt gian hàng hàng vĩnh viễn.",
    //     message: {
    //       firstPart: "Đây đã là lần thứ 3 bạn đạt điểm vận hành bằng 0!",
    //       content: "Vì vậy, Vagoda rất tiếc phải tắt gian hàng vĩnh viễn."
    //     }
    //   }
]

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



export default function SellerPerformancePage() {
    const context = useContext(AuthContext);
    const [opScore, setOpScore] = useState<number>(0);
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(2, 'week'), dayjs()]);
    const [totalReceivedOrders, setTotalReceivedOrders] = useState<number>(0);
    const [totalOnTimeOrders, setTotalOnTimeOrders] = useState<number>(0);
    const [totalLateTimeOrders, setTotalLateTimeOrders] = useState<number>(0);
    const [totalCancelledOrders, setTotalCancelledOrders] = useState<number>(0);
    const [totalProcessTimeOrders, setTotalProcessTimeOrders] = useState<number>(0);
    const [ratingItems, setRatingItems] = useState<RatingItem[]>([] as RatingItem[]);
    const [shopPerformance, setShopPerformance] = useState<ShopPerformanceDetail>()
    // const [totalChatResponses, setTotalChatResponses] = useState<number>(0);

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            // console.log('From: ', dates[0], ', to: ', dates[1]);
            // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            let [_start, _end] = [new Date(dates[0]!.format('YYYY-MM-DD')), new Date(dates[1]!.format('YYYY-MM-DD'))];
            _start.setHours(0, 0, 0, 0);
            _end.setHours(23, 59, 59, 59);
            setSelectedDates([dayjs(_start), dayjs(_end)]);
        } else {
            console.log('Clear');
        }
    };

    const operationalEfficiency = useMemo(() => {

        const stats = {
            'CancellationRate': [totalCancelledOrders, totalReceivedOrders - totalCancelledOrders],
            'OntimeProcessingRate': [totalOnTimeOrders, totalReceivedOrders - totalOnTimeOrders],
            // 'ReturnRate': [12, 1630],
            // 'ChatResponseRate': [],
            'AverageResponseTime': [],
        }
        return stats;
    }, [totalCancelledOrders, totalReceivedOrders, totalOnTimeOrders]);

    const orderStatistics = useMemo(() => {
        const statistics = [
            {
                title: 'Số đơn xử lý trễ hạn:',
                value: totalLateTimeOrders,
                tooltip: 'Tổng số đơn quá hạn xác nhận và/hoặc quá hạn bàn giao.'
            },
            {
                title: 'Số đơn xử lý đúng hạn:',
                value: totalOnTimeOrders,
                tooltip: 'Tổng số đơn đúng cả hạn xác nhận và hạn bàn giao.'
            },
            {
                title: 'Số đơn bị hủy:',
                value: totalCancelledOrders,
                tooltip: 'Tổng số đơn bị hủy với lỗi vi phạm từ phía Nhà Bán.'
            },
            {
                title: 'Số đơn chờ kết quả xử lý:',
                value: totalProcessTimeOrders,
                tooltip: 'Tổng số đơn đang chờ Xác nhận đóng gói hoặc chờ Bàn giao đối tác vận chuyển và chưa thể kết luận trạng thái xử lý của đơn hàng là đúng hạn hay trễ hạn.'
            },
            {
                title: <div className="font-semibold">Tổng đơn đã nhận:</div>,
                value: totalReceivedOrders,
                tooltip: 'Tổng số đơn ở mọi trạng thái.'
            },
        ];
        return statistics;
    }, [selectedDates, 
        totalLateTimeOrders, totalOnTimeOrders,
        totalCancelledOrders, totalProcessTimeOrders, totalReceivedOrders]);

    const fetchOrderStatistics = async () => {
        const [startDate, endDate] = DayjsToDate(selectedDates);
        await POST_getTotalRecievedOrders(context.shopInfo?._id as string,
            startDate || new Date(),
            endDate || new Date()
        ).then((response) => setTotalReceivedOrders(response.data.totalOrders))

        await POST_getTotalLateTimeOrders(context.shopInfo?._id as string,
            startDate || new Date(),
            endDate || new Date()
        ).then((response) => setTotalLateTimeOrders(response.data.totalOrders))

        await POST_getTotalOnTimeOrders(context.shopInfo?._id as string,
            startDate || new Date(),
            endDate || new Date()
        ).then((response) => setTotalOnTimeOrders(response.data.totalOrders))

        await POST_getTotalProcessOrders(context.shopInfo?._id as string,
            startDate || new Date(),
            endDate || new Date()
        ).then((response) => setTotalProcessTimeOrders(response.data.totalOrders))

        await POST_getOrderStatistics(context.shopInfo?._id as string,
            OrderStatusType.CANCELLED,
            startDate || new Date(),
            endDate || new Date()
        ).then((response) => setTotalCancelledOrders(response.data.totalOrders))
    }

    const fetchReviewStatistics = async () => {
        const [startDate, endDate] = DayjsToDate(selectedDates);
        const responseAllReviews = await POST_getReviewStatistics(
            context.shopInfo?._id as string,
            [], undefined, startDate || new Date(), endDate || new Date()
        )

        if (responseAllReviews) {
            let ratings: RatingItem[] = [] as RatingItem[];
            let starRate = 1;
            const rangeReviews = responseAllReviews.data as ReviewRange[]
            // calculate totalScore and totalRatings
            for (let range of rangeReviews) {
                ratings.push({
                    stars: starRate,
                    count: range.totalReviews
                } as RatingItem)
                starRate += 1;
            }
            setRatingItems(ratings);
        }
    }

    const fetchShopPerformance = async () => {
        const shopPerformanceResponse = 
            await GET_getShopPerformanceStatistics(context.shopInfo?._id as string)
        if (shopPerformanceResponse) {
            const data = shopPerformanceResponse.data as ShopPerformanceDetail
            setShopPerformance(data);
        }
    }

    useEffect(() => {
        if (context.shopInfo) {
            fetchOrderStatistics();
            fetchReviewStatistics();
            fetchShopPerformance();
        }
    }, [context.shopInfo, selectedDates])

    useEffect(() => {
        if (shopPerformance) {
            setOpScore(shopPerformance.operationalQuality);
        }
    }, [shopPerformance])

    return (
        <React.Fragment>
            <div className="flex flex-col container">
                <div className="bg-white pr-4 px-4 mb-5">
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
                                title: "Hiệu quả vận hành",
                            },
                        ]}
                    />
                    <div className="font-semibold text-lg uppercase">Hiệu quả vận hành</div>
                </div>
                <div className="mt-10 bg-white">
                    <Card title={
                        <div className="font-semibold">Điểm chất lượng vận hành</div>
                    } extra={
                        <div>
                            <RangePicker picker="date"
                                defaultValue={[dayjs().subtract(14, 'day'), dayjs()]}
                                value={selectedDates}
                                onChange={onRangeChange}
                                maxDate={dayjs(new Date())}
                                format="DD/MM/YYYY" /></div>
                    }>
                        <div className="flex flex-col lg:grid lg:grid-cols-8 gap-10">
                            <div className="flex flex-col lg:col-start-1 lg:col-span-4">
                                <RatingChart score={opScore} />
                                {/* slider for testing purposes */}
                                {/* <Slider value={opScore} step={0.1} onChange={(e) => setopScore(e)} min={0} max={5}></Slider> */}
                                {
                                    qosComment.filter((item) => item.score.includes(Math.floor(opScore))).map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className={`${handleRatingColor(opScore, 200, "bg")} text-black border ${handleRatingColor(opScore, 500, "border")} p-4 w-full rounded-xl text-sm mb-5`}>
                                                    <div className="font-semibold">{item.message.firstPart} <span className={`${handleRatingColor(opScore, 500, "text")} font-bold`}>{item.message.highlightWord}</span> {item.message.secondPart}</div>
                                                    <div className="font-light">
                                                        {item.message.content}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex flex-col lg:col-start-5 lg:col-span-3">
                                <List itemLayout="horizontal"
                                    dataSource={orderStatistics}
                                    renderItem={(item, index) => (
                                        <List.Item className="flex flex-row justify-between">
                                            <div className="flex flex-row gap-1 items-center">
                                                <div>{item.title}</div>
                                                <Tooltip title={item.tooltip}>
                                                    <TbInfoCircle />
                                                </Tooltip>

                                            </div>
                                            <div>{item.value}</div>
                                        </List.Item>
                                    )} />
                            </div>
                            <div className="flex flex-col lg:col-start-8 lg:col-span-1">
                                <Button className="cursor-pointer flex flex-row mx-auto items-center mb-5 gap-1"
                                    href={"/report/seller-operational-score"}>
                                    <span>Xem chi tiết</span>
                                    <span><SlArrowRight /></span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="mt-10 bg-white">
                    <Card title={<div>Chỉ số vận hành</div>}>
                        <div className="lg:grid lg:grid-cols-2 flex flex-col gap-5">
                            <div className="lg:col-start-1 lg:col-span-1 flex flex-col border border-gray-200 p-5">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row gap-1 items-center">
                                        <div className="font-semibold">Tỉ lệ hủy đơn</div>
                                        <Tooltip title={""}>
                                            <TbInfoCircle />
                                        </Tooltip>
                                    </div>
                                    <Button disabled>
                                        <div className="flex flex-row items-center gap-1">
                                            <div>Xuất các đơn bị hủy</div>
                                            <GoDownload />
                                        </div>
                                    </Button>
                                </div>
                                <div className="my-5">
                                    {/* Cancellation rate gauge */}
                                    <GaugeChart label={"Đơn hàng"}
                                        labels={["Đơn bị hủy", "Đơn đã nhận"]}
                                        datasets={operationalEfficiency['CancellationRate']}
                                        isBelow={true} thresholdValue={2} />
                                </div>
                                <div className="flex flex-row justify-between p-4">
                                    <div>Số đơn bị hủy</div>
                                    <div>{operationalEfficiency['CancellationRate'][0]}</div>
                                </div>
                                <div className="flex flex-row justify-between font-semibold bg-gray-100 p-4 border-t-2">
                                    <div>Tổng số đơn đã nhận</div>
                                    <div>{operationalEfficiency['CancellationRate'].reduce((acc, curr) => acc + curr, 0)}</div>
                                </div>
                            </div>
                            <div className="lg:col-start-2 lg:col-span-1 flex flex-col border border-gray-200 p-5">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row gap-1 items-center">
                                        <div className="font-semibold">Tỉ lệ xử lý đơn đúng hạn</div>
                                        <Tooltip title={""}>
                                            <TbInfoCircle />
                                        </Tooltip>
                                    </div>
                                    <Button disabled>
                                        <div className="flex flex-row items-center gap-1">
                                            <div>Xuất các đơn trễ hạn</div>
                                            <GoDownload />
                                        </div>
                                    </Button>
                                </div>
                                <div className="my-5">
                                    {/* On-time application processing rate gauge */}
                                    <GaugeChart label={"Đơn hàng"}
                                        labels={["Đơn xử lý đúng hạn", "Đơn xử lý trễ hạn"]}
                                        datasets={operationalEfficiency['OntimeProcessingRate']}
                                        isBelow={false} thresholdValue={97} />
                                </div>
                                <div className="flex flex-row justify-between p-4">
                                    <div>Số đơn xử lý đúng hạn</div>
                                    <div>{operationalEfficiency['OntimeProcessingRate'][0]}</div>
                                </div>
                                <div className="flex flex-row justify-between font-semibold bg-gray-100 p-4 border-t-2">
                                    <div>Tổng số đơn đã nhận</div>
                                    <div>{operationalEfficiency['OntimeProcessingRate'].reduce((acc, curr) => acc + curr, 0)}</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="mt-10 bg-white">
                    <div className="lg:grid lg:grid-cols-2 flex flex-col gap-5">
                        {/* <div className="lg:col-start-1 lg:col-span-1 flex flex-col border border-gray-200 p-5">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-1 items-center">
                                    <div className="font-semibold">Tỉ lệ đổi trả</div>
                                    <Tooltip title={""}>
                                        <TbInfoCircle />
                                    </Tooltip>
                                </div>
                                <Button disabled>
                                    <div className="flex flex-row items-center gap-1">
                                        <div>Xuất các đơn đổi trả</div>
                                        <GoDownload />
                                    </div>
                                </Button>
                            </div>
                            <div className="my-5">
                                {/* On-time application processing rate gauge */}
                                {/* <GaugeChart label={"Đơn hàng"}
                                    labels={["Sản phẩm đổi trả", "Sản phẩm không đổi trả"]}
                                    datasets={operationalEfficiency['ReturnRate']}
                                    isBelow={true} thresholdValue={2} />
                            </div>
                            <div className="flex flex-row justify-between p-4">
                                <div>Số sản phẩm đổi trả</div>
                                <div>{operationalEfficiency['ReturnRate'][0]}</div>
                            </div>
                            <div className="flex flex-row justify-between font-semibold bg-gray-100 p-4 border-t-2">
                                <div>Số sản phẩm đã bán</div>
                                <div>{operationalEfficiency['ReturnRate'].reduce((acc, curr) => acc + curr, 0)}</div>
                            </div>
                        </div> */}
                        {/* <div className="lg:col-start-2 lg:col-span-1 flex flex-col border border-gray-200 p-5"> */}
                        <div className="lg:col-span-2 flex flex-col border border-gray-200 p-5">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-1 items-center">
                                    <div className="font-semibold">Đánh giá sản phẩm</div>
                                    <Tooltip title={""}>
                                        <TbInfoCircle />
                                    </Tooltip>
                                </div>
                                <Button
                                    href={"/product/review"}>
                                    <div className="cursor-pointer flex flex-row mx-auto items-center gap-1">
                                        <span>Xem chi tiết</span>
                                        <span><SlArrowRight /></span>
                                    </div>
                                </Button>
                            </div>
                            <div className="mt-10">
                                <RatingStatistics ratings={ratingItems}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {
                    <div className="mt-10 bg-white">
                    <Card title=
                        {<div className="flex flex-col mt-5">
                            <div>Chỉ số tương tác với khách hàng</div>
                            <div className="text-gray-400">(4 tuần qua)</div>
                        </div>}>
                        <div className="grid grid-cols-2">
                            <div className="col-start-1 col-span-1 flex flex-col border border-gray-200 p-5">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row gap-1 items-center">
                                        <div className="font-semibold">Tỉ lệ phản hồi chat</div>
                                        <Tooltip title={""}>
                                            <TbInfoCircle />
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 grid-rows-2">
                                    <div className="flex flex-row gap-2 col-start-1 col-span-1 row-start-1 row-span-1 items-center">
                                        <div className="font-semibold text-lg">{0 === 0 ? '--' : 0}</div>
                                        <div className="text-gray-400">Không có dữ liệu</div>
                                    </div>
                                    <div className="col-start-1 col-span-1 row-start-2 row-span-1 items-center">Chỉ tiêu: &ge; 80%</div>
                                    <div className="flex flex-row justify-between p-4 col-start-2 col-span-1 row-start-1 row-span-1">
                                        <div>Lượt phản hồi chat</div>
                                        <div>0</div>
                                    </div>
                                    <div className="flex flex-row justify-between font-semibold bg-gray-100 p-4 border-t-2
                                                    col-start-2 col-span-1 row-start-2 row-span-1">
                                        <div>Lượt chat nhận được</div>
                                        <div>0</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-start-2 col-span-1 flex flex-col border border-gray-200 p-5">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row gap-1 items-center">
                                        <div className="font-semibold">Thời gian phản hồi trung bình</div>
                                        <Tooltip title={"Thời gian trung bình Nhà Bán phản hồi khách hàng, được tính dựa trên \"Lượt phản hồi chat\""}>
                                            <TbInfoCircle />
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="grid grid-rows-2 gap-5 mt-4">
                                    <div className="flex flex-row gap-2 row-start-1 row-span-1 items-center">
                                        <div className="font-semibold text-lg">{0 === 0 ? '--' : 0}</div>
                                        <div className="text-gray-400">Không có dữ liệu</div>
                                    </div>
                                    <div className="row-start-2 row-span-1 items-center">Chỉ tiêu: &le; 30 phút</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
} */}
            </div >

        </React.Fragment >
    )
}