"use client";
import {
    Button, DatePicker, Divider, Empty, Input, Radio,
    RadioChangeEvent, Select, Space, Spin, Table, TableColumnsType, Tooltip
} from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { GoDownload } from 'react-icons/go'
import CheckableCard from '@/component/report/CheckableCard'
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { TbInfoCircle } from 'react-icons/tb';
import styled from 'styled-components'
import { POST_GetProductListByShop } from '@/apis/product/ProductAPI';
import { AuthContext } from '@/context/AuthContext';
import { ProductType } from '@/model/ProductType';
import { POST_getAddToCartRatio, POST_getAmountBuyerOfProducts, POST_getProductViewers } from '@/apis/statistic/StatisticAPI';
import { Currency } from '@/component/util/CurrencyDisplay';

interface RevenueAndVisitsProps {

}

const mainValues = [
    {
        title: "SKU bán ra",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số lượng SKU bán ra tính trên các đơn hàng được xác nhận trong khoảng thời gian đã chọn. Nếu một SKU được bán nhiều lần, hệ thống ghi nhận là một.",
        backgroundColor: '#0ea5e9'
    },
    {
        title: "Đơn vị đã bán",
        value: "--",
        description: "Không có dữ liệu",
        tooltip: "Tổng số lượng sản phẩm đã bán tính trên các đơn hàng được xác nhận trong khoảng thời gian đã chọn. Nếu có hai sản phẩm bán được trong cùng một SKU, hệ thống ghi nhận là hai.",
        backgroundColor: '#f97316'
    }
]

const convertPeriodLabel = (period: string) => {
    return period === "today" ? "Hôm nay" :
        period === "yesterday" ? "Hôm qua" :
            period === "week" ? "7 ngày qua" : "30 ngày qua";
}

const dateRangeToString = (selectedDates: [Dayjs | null, Dayjs | null]) => {
    return `${selectedDates[0]?.format('DD/MM/YYYY')} - ${selectedDates[1]?.format('DD/MM/YYYY')}`
}

const { RangePicker } = DatePicker;

interface ProductStatisticsType {
    key: React.Key,
    product: ProductType,
    totalViews: number,
    totalViewers: number,
    cartAdditions: number,
    cartAddRates: number,
    purchaseCount: number,
    conversionRate: number,
    unitsSold: number,
    revenue: number,
}

const TableWrapper = styled.div`
    /* First and last group header */
    .ant-table-thead > tr:first-child > th:first-child,
    .ant-table-thead > tr:first-child > th:last-child {
    background-color: #fafafa !important; /* Change this color for the first group */
    }

    /* Second group header */
    .ant-table-thead > tr:first-child > th:nth-child(2),
    .ant-table-thead > tr:nth-child(2) > th:nth-child(-n + 2) {
    background-color: #feffe6 !important; /* Change this color for the second group */
    }

    /* Third group header */
    .ant-table-thead > tr:first-child > th:nth-child(3),
    .ant-table-thead > tr:nth-child(2) > th:nth-child(n + 3):nth-child(-n + 4) {
    background-color: #f9f0ff !important; /* Change this color for the third group */
    }

    /* Fourth group header */
    .ant-table-thead > tr:first-child > th:nth-child(4),
    .ant-table-thead > tr:nth-child(2) > th:nth-child(n + 5):nth-child(-n + 9) {
    background-color: #f6ffed !important; /* Change this color for the fourth group */
}`

const DayjsToDate = (dates: [Dayjs | null, Dayjs | null]) => {
    return dates.map(item => {
        if (item === null) {
            return null;
        } else {
            return item.toDate();
        }
    });
}

const roundTo2DecimalPlaces = (value: number) => {
    const result = Math.round((value + Number.EPSILON) * 100) / 100;
    if (isFinite(result)) return result; //Check for NaN values
    else return 0;
}

export default function RevenueAndVisits(props: RevenueAndVisitsProps) {
    const context = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedReportPeriod, setSelectedReportPeriod] = useState<string>("today");
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date'), dayjs().endOf('date')]);
    const [compareDates, setCompareDates] = useState<[Dayjs | null, Dayjs | null]>([dayjs().startOf('date').subtract(1, 'day'), dayjs().endOf('date').subtract(1, 'day')])
    const [lastUpdateTime, setLastUpdateTime] = useState<Dayjs>(dayjs());
    const [keyword, setKeyword] = useState<string>("");
    //all the products by seller
    const [products, setProducts] = useState<ProductType[]>([]);
    const [productStatisticData, setProductStatisticData] = useState<ProductStatisticsType[]>([]);
    const [filteredData, setFilteredData] = useState<ProductStatisticsType[]>([]);


    useEffect(() => {
        const fetchAllProducts = async () => {
            if (!context.shopInfo) return;
            // setLoading(true);
            let [startDate, endDate] = DayjsToDate(selectedDates);
            const response = await POST_GetProductListByShop(context.shopInfo?._id as string);
            if (response.status === 200) {
                let products = response.data;
                setProducts(products ?? []);
                //01. Xem trang sản phẩm
                const getProductsViewersResponse = await POST_getProductViewers(
                    context.shopInfo?._id as string,
                    products?.flatMap(product => product._id) || [],
                    startDate ?? new Date(),
                    endDate ?? new Date(),
                )

                let getProductsViewersData = getProductsViewersResponse.data;
                //02. Cho hàng vào giỏ
                const getProductsAddToCart = await POST_getAddToCartRatio(context.shopInfo?._id as string,
                    products?.flatMap(product => product._id) || [],
                    startDate ?? new Date(),
                    endDate ?? new Date(),
                )
                const getProductsAddToCartData = getProductsAddToCart.data;
                console.log(getProductsAddToCartData);

                //03. Xác nhận đơn hàng
                const confirmedOrderStats = await POST_getAmountBuyerOfProducts(
                    context.shopInfo?._id as string,
                    products?.flatMap(product => product._id) || [],
                    startDate ?? new Date(),
                    endDate ?? new Date()
                )
                const confirmedOrderStatsData = confirmedOrderStats.data.at(0).statisticsData;

                let productStatisticData = products?.map((item: ProductType, index: React.Key) => {
                    let singleProductViewersData = getProductsViewersData.statisticsData[0].statisticsData?.find(
                        (productItem: any) => productItem.productId === item._id) ?? [];
                    let singleProductAddToCartData = getProductsAddToCartData?.find(
                        (productItem: any) => productItem.productId === item._id) ?? [];
                    let singleProductConfirmedOrderStatsData = confirmedOrderStatsData?.find(
                        (productItem: any) => productItem.product === item._id) ?? [];
                    let [totalViews, totalViewers] = [singleProductViewersData.views, singleProductViewersData.viewers];
                    let [viewerCount, addToCartCount] = [singleProductAddToCartData.viewerCount, singleProductAddToCartData.addToCartCount];

                    let [unitsSold,
                        revenue,
                        conversionRate,
                        purchaseCount] = [singleProductConfirmedOrderStatsData.sold,
                        singleProductConfirmedOrderStatsData.revenue,
                        singleProductConfirmedOrderStatsData.conversion,
                        singleProductConfirmedOrderStatsData.buyers?.length ?? 0]
                    {
                        // purchaseCount, conversionRate, unitsSold, revenue
                    }
                    return {
                        key: item._id,
                        product: item,
                        totalViews: totalViews ?? 0,
                        totalViewers: totalViewers ?? 0,
                        cartAdditions: addToCartCount ?? 0,
                        cartAddRates: (addToCartCount !== undefined) && (viewerCount !== undefined) ? roundTo2DecimalPlaces(addToCartCount / viewerCount) : 0,
                        unitsSold: unitsSold ?? 0,
                        revenue: revenue ?? 0,
                        conversionRate: roundTo2DecimalPlaces(conversionRate) ?? 0,
                        purchaseCount: purchaseCount ?? 0
                    } as ProductStatisticsType
                }) ?? [];
                setProductStatisticData(productStatisticData);
                // setLoading(false);   
            }
        }

        fetchAllProducts();

    }, [context.shopInfo, selectedDates])

    const filterData = () => {
        let data = productStatisticData;

        if (keyword) {
            data = data.filter(item =>
                Object.values(item.product).some(value =>
                    value.toString().toLowerCase().includes(keyword.toLowerCase())
                )
            );
        }
        setFilteredData(data);
    };

    useEffect(() => {
        filterData();
    }, [keyword, context.shopInfo, productStatisticData, selectedDates])

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
                period = [dayjs().subtract(1, 'day').startOf('date'), dayjs().subtract(1, 'day').endOf('date')]
                break;
            case "week":
                period = [dayjs().subtract(1, 'week').startOf('date'), dayjs().endOf('date')]
                break;
            case "month":
                period = [dayjs().subtract(30, 'day').startOf('date'), dayjs().endOf('date')]
                break;
        }
        setSelectedDates(period);
        handlePreviousPeriod(period, periodUnit);
    }

    const onPeriodChange = (e: RadioChangeEvent) => {
        setSelectedReportPeriod(e.target.value);
        switchPeriod(e.target.value);
    };
    const handleProductIdTypeChange = (value: string, option: { value: string; label: string; } | { value: string; label: string; }[]) => {
        return;
    }

    const columns: TableColumnsType<ProductStatisticsType> = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            render: (value: any, record: ProductStatisticsType) => {
                return (<div>
                    <div>
                        <div
                            style={{ display: "flex", alignItems: "center" }}
                            className="font-semibold"
                        >
                            <img
                                src={record.product.imageLink}
                                alt={""}
                                style={{ marginRight: "8px", width: "64px", height: "64px" }}
                            />
                            {record.product.name ? record.product.name : ""}
                        </div>
                    </div>
                </div>);
            },
            fixed: 'left',
            width: '15%',
        },
        {
            title: '01. Xem trang sản phẩm',
            children: [
                {
                    title: <div className="flex flex-row gap-1 items-center">
                        <div>Lượt xem</div>
                        <Tooltip title={"Tổng số lượt xem trang sản phẩm trong khoảng thời gian đã chọn (Chỉ tính riêng gian hàng của bạn và không bao gồm lượt xem sản phẩm của các nhà bán khác.)"}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>,
                    dataIndex: 'totalViews',
                },
                {
                    title: <div className="flex flex-row gap-1 items-center">
                        <div>Số người xem</div>
                        <Tooltip title={"Tổng số người đã xem trang sản phẩm trong khoảng thời gian đã chọn (Chỉ tính riêng gian hàng của bạn và không bao gồm khách hàng của các nhà bán khác.)"}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>,
                    dataIndex: 'totalViewers',
                },
            ],

        },
        {
            title: '02. Cho hàng vào giỏ',
            children: [
                {
                    title: <div className="flex flex-row gap-1 items-center">
                        <div>Số người cho hàng vào giỏ</div>
                        <Tooltip title={"Tổng số người truy cập đã thêm tối thiểu một sản phẩm vào giỏ hàng trong khoảng thời gian đã chọn."}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>,
                    dataIndex: 'cartAdditions',
                },
                {
                    title: <div className="flex flex-row gap-1 items-center">
                        <div>Tỉ lệ cho vào giỏ</div>
                        <Tooltip title={"Tổng số người thêm sản phẩm vào giỏ hàng chia cho số người đã xem trang sản phẩm."}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>,
                    dataIndex: 'cartAddRates',
                    render: (value: any) => {
                        return `${value * 100}%`
                    }
                },
            ]
        },
        {
            title: '03. Xác nhận đơn hàng',
            children: [
                {
                    title: <div className="flex flex-row gap-1 items-center">
                        <div>Số khách mua</div>
                        <Tooltip title={"Tổng số khách hàng có ít nhất một đơn hàng được xác nhận trong khoảng thời gian đã chọn."}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>,
                    dataIndex: 'purchaseCount',
                },
                {
                    title: <div className="flex flex-row gap-1 items-center">
                        <div>Tỉ lệ chuyển đổi</div>
                        <Tooltip title={"Tổng số khách có ít nhất một đơn hàng được xác nhận chia cho tổng số người đã xem sản phẩm trong khoảng thời gian đã chọn."}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>,
                    dataIndex: 'conversionRate',
                    render: (value: any) => {
                        return `${value * 100}%`
                    }
                },
                {
                    title: <div className="flex flex-row gap-1 items-center">
                        <div>Đơn vị đã bán</div>
                        <Tooltip title={"Tổng số lượng sản phẩm đã bán tính trên các đơn hàng được xác nhận trong khoảng thời gian đã chọn. Nếu có hai sản phẩm bán được trong cùng một SKU, hệ thống ghi nhận là hai."}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>,
                    dataIndex: 'unitsSold',
                },
                {
                    title: <div className="flex flex-row gap-1 items-center">
                        <div>Doanh thu</div>
                        <Tooltip title={"Tổng giá trị đơn hàng được xác nhận trong khoảng thời gian đã chọn."}>
                            <TbInfoCircle />
                        </Tooltip>
                    </div>,
                    dataIndex: 'revenue',
                    render: (value: any, record: ProductStatisticsType) => (
                        <Currency value={record.revenue} />
                    )
                },
            ]
        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            fixed: 'right',
        }
    ];

    return (
        <React.Fragment>
            <div className="flex flex-col container mx-auto bg-slate-100">
                <div className="bg-white pr-4 px-4 mx-5 mt-5">
                    <div className="flex lg:flex-row flex-col gap-5 mb-5 lg:items-center mt-5">
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
                {/* <div className="bg-white py-4 px-4 mx-5 mt-5 flex flex-col">
                    <div className="flex flex-col lg:flex-row ">
                        <div className="font-semibold">Chỉ số chính</div>
                        <div className="lg:ml-4">
                            {convertPeriodLabel(selectedReportPeriod)}: {dateRangeToString(selectedDates)} (So sánh với: {dateRangeToString(compareDates)})</div>
                    </div>
                    <div className="lg:w-1/2 my-10 flex flex-col gap-10">
                        <div className="grid grid-cols-2 gap-2">
                            {
                                mainValues.map((item, key) => {
                                    return (
                                        <div key={key}>
                                            <CheckableCard item={item} checkboxVisibility={false} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div> */}
                <div className="bg-white py-4 px-4 mx-5 mt-5 flex flex-col">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-4">
                            <div className="font-semibold">Hiệu quả sản phẩm</div>
                            <div>{convertPeriodLabel(selectedReportPeriod)}: {dateRangeToString(selectedDates)}</div>
                        </div>
                        <Button disabled>
                            <div className="flex flex-row items-center gap-1">
                                <div>Tải dữ liệu</div>
                                <GoDownload />
                            </div>
                        </Button>
                    </div>
                    <Divider />
                    <Space direction="vertical">
                        <Space.Compact>
                            {/* <Select
                                size="large"
                                style={{ width: '140px' }}
                                placement='bottomLeft'
                                defaultValue="product_name"
                                onChange={handleProductIdTypeChange}
                                options={[
                                    { value: 'product_name', label: 'Tên sản phẩm' },
                                    { value: 'sku', label: 'SKU' },
                                    { value: 'psku', label: 'PSKU' },
                                ]}
                            /> */}
                            <Input.Search size="large" style={{ width: '400px' }}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Điền tên sản phẩm" />
                        </Space.Compact>
                    </Space>
                    <Divider />
                    {
                        loading ? <Spin /> : (
                            <TableWrapper>
                                <Table columns={columns} scroll={{ x: "max-content" }}
                                    dataSource={filteredData}
                                    loading={loading}
                                    bordered />
                            </TableWrapper>)
                    }
                </div>
            </div>
        </React.Fragment >
    )
}
