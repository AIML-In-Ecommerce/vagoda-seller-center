import { Currency } from '@/component/util/CurrencyDisplay';
import { Button, DatePicker, Divider, Empty, Input, Radio, RadioChangeEvent, Select, Space, Table, TableColumnsType, Tabs, TabsProps } from 'antd';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs'
import { FaMinus, FaPlus } from 'react-icons/fa6';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { GoDownload } from 'react-icons/go';
import { AuthContext } from '@/context/AuthContext';
import { TransactionAPI } from '@/apis/settlement/TransactionAPI';

dayjs.extend(LocalizedFormat)

interface TransactionHistoryTableProps {

}

interface TransactionType {
    _id: string,
    shopId: string,
    transactionDate: Date,
    transactionCategory: string,
    transactionDescription: string,
    orderId: string,
    money: number,
    balance: number
}

const { RangePicker } = DatePicker;

const formatShortDate = (date: Date) => {
    return dayjs(date).locale('vi').format('L');
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


export default function TransactionHistoryTable(props: TransactionHistoryTableProps) {
    const context = useContext(AuthContext);
    const [selectedReportPeriod, setSelectedReportPeriod] = useState<string>("week");
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date'), dayjs().endOf('date')]);
    const [totalMoneyIn, setTotalMoneyIn] = useState<number>(0);
    const [totalMoneyOut, setTotalMoneyOut] = useState<number>(0);
    const [activeKey, setActiveKey] = useState<string>('all');
    const [keyword, setKeyword] = useState<string>("");
    const [idType, setIdType] = useState<string>("transaction");
    const [selectedTransactionCategories, setSelectedTransactionCategories] = useState<string>("");
    const [transactionData, setTransactionData] = useState<TransactionType[]>([])
    const [filteredData, setFilteredData] = useState<TransactionType[]>([]);


    const onTabChange = (key: string) => {
        setActiveKey(key);
    }

    const handleChange = (value: string) => {
        setIdType(value);
    };

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
    }

    const onPeriodChange = (e: RadioChangeEvent) => {
        setSelectedReportPeriod(e.target.value);
        switchPeriod(e.target.value);
    };

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            setSelectedDates([dates[0], dates[1]]);
        } else {
            console.log('Clear');
        }
    };

    const tabItems: TabsProps['items'] = [
        {
            key: 'all',
            label: <div className="select-none">Tất cả</div>,
            children: <></>,
        },
        // {
        //     key: 'revenue',
        //     label: <div className="select-none">Doanh thu</div>,
        //     children: <></>,
        // },
        // {
        //     key: 'withdrawn',
        //     label: <div className="select-none">Thanh toán</div>,
        //     children: <></>,
        // },
        // {
        //     key: 'ms_fee',
        //     label: <div className="select-none">Phí tiếp thị</div>,
        //     children: <></>,
        // },
    ]

    const columns = useMemo<TableColumnsType<TransactionType>>(() => {
        const result: TableColumnsType<TransactionType> = [
            {
                title: <div>Mã giao dịch</div>,
                dataIndex: '_id',
                fixed: 'left',
                width: '10%',
            },
            {
                title: <div>Thời gian giao dịch</div>,
                dataIndex: 'transactionDate',
                width: '20%',
                render: (value: any, record: TransactionType) => <div>{formatShortDate(record.transactionDate)}</div>
            },
            {
                title: <div>Loại giao dịch</div>,
                dataIndex: 'transactionCategory',
            },
            {
                title: <div>Số tiền</div>,
                dataIndex: 'money',
                render: (value: any, record: TransactionType) => <Currency value={record.money ?? 0} />
            },
            {
                title: <div>Số dư</div>,
                dataIndex: 'balance',
                render: (value: any, record: TransactionType) => <Currency value={record.balance ?? 0} />
            },
            {
                title: <div>Mã đơn hàng</div>,
                dataIndex: 'orderId',
            },
            {
                title: <div>Nội dung giao dịch</div>,
                dataIndex: 'transactionDescription',
            },
        ];
        return result;
    }, [transactionData])

    const filterData = (transactionData: TransactionType[]) => {
        let data = transactionData;

        // const searchInObject = (obj: any, keyword: string) => {
        //     if (typeof obj !== 'object' || obj === null) {
        //         return false;
        //     }
        //     for (let key in obj) {
        //         if (typeof obj[key] === 'object') {
        //             if (searchInObject(obj[key], keyword)) {
        //                 return true;
        //             }
        //         } else if (obj[key].toString().toLowerCase().includes(keyword.toLowerCase())) {
        //             return true;
        //         }
        //     }
        //     return false;
        // };


        if (keyword && idType) {
            if (idType === 'order') {
                data = data.filter(item => item.orderId === keyword);
            }
            else {
                data = data.filter(item => item._id === keyword);
            }
        }
        if (selectedTransactionCategories.length !== 0) {
            data = data.filter(item => selectedTransactionCategories.includes(item.transactionCategory))
        }

        console.log('filtered data');
        setFilteredData(data);
    };

    //legacy fetch
    // useEffect(() => {
    //     const fetchTransactionData = async () => {
    //         const listTransactionResponse = await TransactionAPI.getTransactionByShopId(context.shopInfo?._id as string);
    //         if (listTransactionResponse.status === 200) {
    //             setTransactionData(listTransactionResponse.data ?? []);
    //         }
    //     }
    //     if (context.shopInfo) {
    //         fetchTransactionData();
    //     }
    // }, [context.shopInfo])

    useEffect(() => {
        const fetchTransactionData = async () => {
            const [startDate, endDate] = DayjsToDate(selectedDates);
            const listTransactionResponse = await TransactionAPI.filterTransaction(
                context.shopInfo?._id as string,
                selectedTransactionCategories,
                startDate ? startDate : undefined,
                endDate ? endDate : undefined
            );
            if (listTransactionResponse.status === 200) {
                setTransactionData(listTransactionResponse.data ?? []);
            }
        }
        if (context.shopInfo) {
            fetchTransactionData();
        }
    }, [context.shopInfo, selectedDates, selectedTransactionCategories])

    useEffect(() => {
        if (transactionData) {
            filterData(transactionData);
        }
    }, [transactionData])

    useEffect(() => {
        switchPeriod(selectedReportPeriod);
    }, [selectedReportPeriod])

    return (
        <React.Fragment>
            <div className="flex flex-col">
                <div className="text-xl font-semibold mb-5">Lịch sử giao dịch</div>
                <div className="flex lg:grid lg:grid-cols-2 flex flex-col gap-5">
                    <div className="flex flex-col">
                        <div className="text-lg font-semibold">Chu kỳ</div>
                        <div className="mt-3 flex flex-row gap-2">
                            <Radio.Group onChange={onPeriodChange} value={selectedReportPeriod}>
                                <Radio.Button value="week">7 ngày gần nhất</Radio.Button>
                                <Radio.Button value="month">30 ngày gần nhất</Radio.Button>
                            </Radio.Group>
                            <RangePicker picker="date"
                                onChange={onRangeChange}
                                value={selectedDates} format="DD/MM/YYYY" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-lg font-semibold lg:mt-0 mt-5">Tổng quan</div>
                        <div className="flex flex-col grid grid-cols-2 mt-3">
                            <div className="items-center flex-row flex gap-2">
                                <div className="text-lg"><BsBoxArrowInRight /></div>
                                <div className="text-md">Tổng tiền vào</div>
                                {
                                    totalMoneyIn ? (
                                        <div className="flex flex-row font-semibold text-lg text-green-500 items-center gap-1">
                                            <div><FaPlus /></div>
                                            <Currency value={totalMoneyIn} />
                                        </div>
                                    ) : <div className="text-lg text-green-500 font-semibold">{'--'}</div>
                                }
                            </div>
                            <div className="items-center flex-row flex gap-2">
                                <div className="text-lg"><BsBoxArrowRight /></div>
                                <div className="text-md">Tổng tiền ra</div>
                                {
                                    totalMoneyOut ? (
                                        <div className="flex flex-row font-semibold text-lg text-gray-500 items-center gap-1">
                                            <div><FaMinus /></div>
                                            <Currency value={totalMoneyOut} />
                                        </div>
                                    ) : <div className="text-lg text-black font-semibold">{'--'}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Divider style={{ borderColor: '#a8a8a8' }} />
                <Tabs
                    activeKey={activeKey}
                    onChange={onTabChange}
                    type="card"
                    size="large"
                    tabBarGutter={20}
                    items={tabItems}
                />
                <div className="mt-5 gap-5">
                    <Space direction="horizontal">
                        <Space.Compact>
                            <Select
                                size="large"
                                style={{ width: '140px' }}
                                defaultValue="transaction"
                                onChange={handleChange}
                                options={[
                                    { value: 'order', label: 'Mã đơn hàng' },
                                    { value: 'transaction', label: 'Mã giao dịch' },
                                ]}
                            />
                            <Input.Search size="large" style={{ width: '400px' }}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Tìm kiếm theo mã đơn hàng/giao dịch" />
                        </Space.Compact>
                        <Select
                            size="large"
                            style={{ width: '400px' }}
                            placement='bottomLeft'
                            // defaultValue="transaction"
                            // onChange={handleChange}
                            placeholder="Loại giao dịch"
                            options={[
                                // { value: 'order', label: 'Mã đơn hàng' },
                                // { value: 'transaction', label: 'Mã giao dịch' },
                            ]}
                        />
                    </Space>
                </div>
                <div className="mt-10 flex flex-row gap-10">
                    <div className="text-xl font-semibold mb-5">Giao dịch</div>
                    <Button onClick={() => { }} disabled>
                        <div className="flex flex-row gap-2 items-center">
                            <div>Xuất excel</div>
                            <GoDownload />
                        </div>
                    </Button>
                </div>
                <div className="mt-5">
                    <Table columns={columns}
                        dataSource={filteredData}
                        scroll={{ x: "max-content" }}
                        locale={{
                            emptyText: <Empty description="Không có dữ liệu"></Empty>
                        }} />
                </div>
            </div>
        </React.Fragment>
    )
}
