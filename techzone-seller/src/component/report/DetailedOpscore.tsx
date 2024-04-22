"use client";
import { Breadcrumb, Card, DatePicker, Divider, List, Tooltip, Radio, RadioChangeEvent, Table, TableColumnsType, TableProps, Tag, ConfigProvider, Empty } from "antd";
import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import { TbInfoCircle } from "react-icons/tb";
import RatingChart from "./RatingChart";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

const { RangePicker } = DatePicker;

dayjs.extend(LocalizedFormat)

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
    //       firstPart: "Techzone phải tạm tắt gian hàng trong 14 ngày.",
    //       content: "Lưu ý: Sau 2 lần bị khóa gian do điểm vận hành, lần thứ 3 gian hàng của bạn sẽ bị khóa vĩnh viễn."
    //     }
    //   },
    //   {
    //     score: "Tạm tắt gian hàng (vĩnh viễn)",
    //     rating: "Rất tiếc! Techzone phải tắt gian hàng hàng vĩnh viễn.",
    //     message: {
    //       firstPart: "Đây đã là lần thứ 3 bạn đạt điểm vận hành bằng 0!",
    //       content: "Vì vậy, Techzone rất tiếc phải tắt gian hàng vĩnh viễn."
    //     }
    //   }
]

const orderStatistics = [
    {
        title: 'Số đơn xử lý trễ hạn:',
        value: 0,
        tooltip: 'Tổng số đơn quá hạn xác nhận và/hoặc quá hạn bàn giao.'
    },
    {
        title: 'Số đơn xử lý đúng hạn:',
        value: 0,
        tooltip: 'Tổng số đơn đúng cả hạn xác nhận và hạn bàn giao.'
    },
    {
        title: 'Số đơn bị hủy:',
        value: 0,
        tooltip: 'Tổng số đơn bị hủy với lỗi vi phạm từ phía Nhà Bán.'
    },
    {
        title: 'Số đơn chờ kết quả xử lý:',
        value: 0,
        tooltip: 'Tổng số đơn đang chờ Xác nhận đóng gói hoặc chờ Bàn giao đối tác vận chuyển và chưa thể kết luận trạng thái xử lý của đơn hàng là đúng hạn hay trễ hạn.'
    },
    {
        title: <div className="font-semibold">Tổng đơn đã nhận:</div>,
        value: 0,
        tooltip: 'Tổng số đơn ở mọi trạng thái.'
    },
];


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

export enum InfractionType {
    OverdueConfirmation,
    OverdueDelivery,
    Cancelled
}

interface BadStatusOrderType {
    key: React.Key;
    order_id: string;
    type: InfractionType;
    description: string;
}


export function DetailedOpScorePage() {
    const [opScore, setOpScore] = useState<number>(3.4);
    const [totalLateOrCancelledOrders, setTotalLateOrCancelledOrders] = useState<number>(0);
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(6, 'day'), dayjs()]);
    const [lastUpdateTime, setLastUpdateTime] = useState<Dayjs>(dayjs());
    const [currentInfractionType, setCurrentInfractionType] = useState<InfractionType | null>(null);

    const columns: TableColumnsType<BadStatusOrderType> = [
        {
            title: <div className="font-semibold">Mã đơn hàng</div>,
            dataIndex: 'order_id',
            width: '30%',
        },
        {
            title: <div className="font-semibold">Vi phạm</div>,
            dataIndex: 'type',
            render: (type: InfractionType) => {
                switch (type) {
                    case InfractionType.OverdueConfirmation:
                        return (
                            <Tag color="#FFA500">Quá hạn xác nhận</Tag>
                        );
                    case InfractionType.OverdueDelivery:
                        return (
                            <Tag color="#FF6347">Quá hạn bàn giao</Tag>
                        );
                    case InfractionType.Cancelled:
                        return (
                            <Tag color="#808080">Hủy</Tag>
                        );
                    default:
                        return <></>
                }
            },
            width: '20%',
        },
        {
            title: <div className="font-semibold">Chi tiết xử lý trễ / hủy</div>,
            dataIndex: 'description',
            width: '40%',
        },
    ];

    const data: BadStatusOrderType[] = [
        {
            key: "1",
            order_id: "DH12345",
            type: InfractionType.OverdueConfirmation,
            description: "Đơn hàng DH12345 đã quá hạn xác nhận và đã được xử lý vào ngày 2024-04-20 lúc 14:30."
        },
        {
            key: "2",
            order_id: "DH67890",
            type: InfractionType.OverdueDelivery,
            description: "Đơn hàng DH67890 đã trễ hẹn giao hàng vào ngày 2024-04-18 lúc 10:00 nhưng đã được xử lý vào ngày 2024-04-19 lúc 09:00."
        },
        {
            key: "3",
            order_id: "DH24680",
            type: InfractionType.Cancelled,
            description: "Đơn hàng DH24680 đã bị hủy vào ngày 2024-04-16 lúc 12:45 do yêu cầu từ khách hàng hoặc vấn đề khác và đã được xử lý."
        },
        {
            key: "4",
            order_id: "DH13579",
            type: InfractionType.OverdueConfirmation,
            description: "Đơn hàng DH13579 đã gặp vấn đề về xác nhận vào ngày 2024-04-19 lúc 16:20 và đã được giải quyết vào ngày 2024-04-20 lúc 08:00."
        }
    ];

    const filteredData = currentInfractionType !== null ? data.filter(item => item.type === currentInfractionType) : data;

    const onChange: TableProps<BadStatusOrderType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const onInfractionChange = (e: RadioChangeEvent) => {
        setCurrentInfractionType(e.target.value);
    };

    return (
        <React.Fragment>
            <div className="flex flex-col container">
                <div className="bg-white pr-4 px-4">
                    <div className="mt-5">
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
                                    title: "Chi tiết Điểm chất lượng vận hành",
                                },
                            ]}
                        />
                    </div>
                    <div className="font-semibold text-lg uppercase mt-5">
                        Chi tiết Điểm chất lượng vận hành</div>
                    <div className="text-slate-500"><Divider /></div>
                    <div className="flex lg:flex-row flex-col gap-5 lg:items-center mb-5">
                        <div className="flex flex-row items-center gap-5">
                            <div className="font-semibold">Thời gian</div>
                            <RangePicker picker="date" />
                        </div>
                        <div>(Lần cập nhật cuối: {lastUpdateTime.locale('vi').format('LLLL')})</div>
                    </div>
                </div>
                <div className="mt-5 bg-white mx-5">
                    <Card title={
                        <div className="font-semibold">Điểm chất lượng vận hành</div>
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
                            <div className="flex flex-col lg:col-start-6 lg:col-span-4">
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
                        </div>
                    </Card>
                </div>
                <div className="mt-10 bg-white mx-5">
                    <Card title={
                        <div className="font-semibold">Danh sách đơn xử lý trễ hạn/hủy ({totalLateOrCancelledOrders})</div>
                    }></Card>
                    <div className="mx-5 flex flex-col">
                        <div className="flex flex-row gap-1 items-center">
                            <div>Loaị vi phạm:</div>
                            <Radio.Group onChange={onInfractionChange} value={currentInfractionType}>
                                <Radio.Button value={InfractionType.OverdueConfirmation}>Quá hạn xác nhận</Radio.Button>
                                <Radio.Button value={InfractionType.OverdueDelivery}>Quá hạn bàn giao</Radio.Button>
                                <Radio.Button value={InfractionType.Cancelled}>Hủy</Radio.Button>
                            </Radio.Group>
                        </div>
                        <Divider />
                        <ConfigProvider
                            theme={{
                                components: {
                                    Table: {
                                        headerBg: '#fafafa',
                                    }
                                }
                            }}>
                            <Table columns={columns}
                                dataSource={filteredData}
                                onChange={onChange}
                                locale={{
                                    emptyText: <Empty description="Không có dữ liệu"></Empty>
                                }}/>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}