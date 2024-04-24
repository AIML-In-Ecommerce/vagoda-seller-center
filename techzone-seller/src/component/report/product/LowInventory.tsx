import { TableColumnsType, Tooltip, Card, Table } from 'antd';
import React from 'react'
import { TbInfoCircle } from 'react-icons/tb';


interface ProductStatisticsType {
    key: React.Key,
    name: string,
    sku: number,
    sellerInventory: number,
    techzoneInventory: number,
    unitsSoldCurrentWeek: number,
}

const calculateDaysUntilOutOfStock = (sellerInventory: number, unitsSoldCurrentWeek: number) => {
    return sellerInventory / unitsSoldCurrentWeek;
} 

export default function LowInventory() {

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
            title: (
                <div className="font-semibold">
                    Kho nhà bán
                </div>
            ),
            dataIndex: 'unitsSoldLastWeek'
        },
        {
            title: (
                <div className="font-semibold">
                    Kho Techzone
                </div>
            ),
            dataIndex: 'unitsSoldCurrentWeek',

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
            title: (<div className="flex flex-row gap-1">
                <div className="font-semibold">
                    Số ngày dự kiến hết hàng
                </div>
                <Tooltip title={""}>
                    <TbInfoCircle />
                </Tooltip>
            </div>),
        },
    ];

    return (
        <React.Fragment>
            <div className="bg-white py-4 px-10 mt-5 flex flex-col">
                <Card title={
                    <div className="font-semibold">Tồn kho thấp</div>
                }>
                    <Table columns={columns} />
                </Card>
            </div>
        </React.Fragment>
    )
}
