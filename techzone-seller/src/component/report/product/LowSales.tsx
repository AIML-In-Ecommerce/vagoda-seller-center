import { TableColumnsType, Tooltip, Card, Table } from 'antd';
import React from 'react'
import { TbInfoCircle } from 'react-icons/tb';


interface ProductStatisticsType {
    key: React.Key,
    name: string,
    sku: number,
    unitsSoldLastWeek: number,
    unitsSoldCurrentWeek: number,
    revenueLastWeek: number,
    revenueCurrentWeek: number,
}

export default function LowSales() {

    const columns: TableColumnsType<ProductStatisticsType> = [
        {
            title: (<div className="font-semibold">
                Sản phẩm
            </div>),
            dataIndex: 'name',
            fixed: 'left',
        },
        {
            title: (<div className="font-semibold">
                SKU
            </div>),
            dataIndex: 'sku',
        },
        {
            title: (<div className="flex flex-col">
                <div className="font-semibold">
                    Đơn vị đã bán
                </div>
                <div>(7 ngày trước)</div>
            </div>),
            dataIndex: 'unitsSoldLastWeek'
        },
        {
            title: (<div className="flex flex-col">
                <div className="font-semibold">
                    Đơn vị đã bán
                </div>
                <div>(7 ngày qua)</div>
            </div>),
            dataIndex: 'unitsSoldCurrentWeek',

        },
        {
            title: (<div className="flex flex-col">
                <div className="font-semibold">
                    Doanh thu
                </div>
                <div>(7 ngày trước)</div>
            </div>),
            dataIndex: 'revenueLastWeek'
        },
        {
            title: (<div className="flex flex-col">
                <div className="font-semibold">
                    Doanh thu
                </div>
                <div>(7 ngày qua)</div>
            </div>),
            dataIndex: 'revenueCurrentWeek',

        },
        {
            title: (<div className="flex flex-row gap-1">
                <div className="font-semibold">
                    % thay đổi
                </div>
                <Tooltip title={""}>
                    <TbInfoCircle />
                </Tooltip>
            </div>),
        },
    ];

    return (
        <React.Fragment>
            <div className="flex flex-col container mx-auto bg-slate-100">
                <div className="bg-white py-4 px-4 mx-5 mt-5 flex flex-col">
                    <Card title={
                        <div className="font-semibold">Doanh số thấp</div>
                    }>
                        <Table columns={columns} />
                    </Card>
                </div>
            </div>
        </React.Fragment>
    )
}
