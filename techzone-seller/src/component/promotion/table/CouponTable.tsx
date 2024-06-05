"use client";
import { Input, Select, Table, TableColumnsType, Tooltip } from 'antd';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { FaEye, FaMagnifyingGlass } from 'react-icons/fa6';
import { LuView } from 'react-icons/lu';
import { TbInfoCircle } from 'react-icons/tb';
import styled from 'styled-components';

interface CouponTableProps {

}

enum DiscountType {
    PERCENTAGE,
    DIRECT_PRICE,
}

enum DiscountStatus {
    UPCOMMING = "UPCOMMING",
    IN_PROGRESS = "IN_PROGRESS",
    EXPIRED = "EXPIRED"
}

type DiscountTypeInfo = {
    type: DiscountType,
    value: number,
    lowerBoundaryForOrder: number,
    highestAmountToReduce?: number
}

type Promotion = {
    name: string,
    shop: string,
    discountTypeInfo: DiscountTypeInfo,
    createdAt: Date,
    activedDate: Date,
    expiredDate: Date,
    targetProducts: string[] // Nếu []/null/undefined thì apply cho toàn đơn hàng của shop đấy
    description: string,
    quantity: number,
    redeemedTotal: number,
    status: DiscountStatus
    code: string
}

const columns: TableColumnsType<Promotion> = [
    {
        title: 'Mã giảm giá',
        dataIndex: 'name',
        fixed: 'left',
        width: '20%',
    },
    {
        title: <div className="flex flex-row gap-2 items-center">
            <div>Mã đã dùng /<br></br>Tổng số mã</div>
            <Tooltip title={"Số Mã Giảm Giá đã sử dụng / Tổng số mã giảm giá đã tạo."}>
                <TbInfoCircle />
            </Tooltip>
        </div>,
        dataIndex: ['redeemedTotal', 'quantity'],
        render: (text, record, index) => (
            <div className="flex flex-row gap-1">
                <div>{record.redeemedTotal}</div>
                <div>/</div>
                <div>{record.quantity}</div>
            </div>
        ),
    },
    {
        title: <div className="flex flex-row gap-1 items-center">
            <div>Thời gian</div>
        </div>,
    },
    {
        title: <div className="flex flex-row gap-1 items-center">
            <div>Trạng thái</div>
            <Tooltip title={""}>
                <TbInfoCircle />
            </Tooltip>
        </div>,
        dataIndex: 'status',
    },
    {
        title: <div className="flex flex-row gap-1 items-center">
            <div>Thao tác</div>
        </div>,
        render: () => {
            return (
                <div className="flex flex-row gap-4 items-center">
                    <Tooltip title="Chỉnh sửa"><FaRegEdit /></Tooltip>
                    <Tooltip title="Xem chi tiết"><LuView /></Tooltip>
                    
                </div>
            )
        }
    },
];

const TableWrapper = styled.div`
  // .ant-table-thead .ant-table-cell {
  //   background-color: #fafafa !important;
  // }
`

export default function CouponTable(props: CouponTableProps) {
    return (
        <React.Fragment>
            <div className="flex flex-col">
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-1">
                        <div>Mã giảm giá</div>
                        <Input prefix={<FaMagnifyingGlass />} placeholder={"Nhập mã giảm giá"} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>Trạng thái</div>
                        <Select
                            style={{ width: '140px' }}
                            placement='bottomLeft'
                            defaultValue="ALL"
                            options={[
                                { value: "ALL", label: 'Tất cả' },
                                { value: DiscountStatus.UPCOMMING, label: 'Sắp diễn ra' },
                                { value: DiscountStatus.IN_PROGRESS, label: 'Đang diễn ra' },
                                { value: DiscountStatus.EXPIRED, label: 'Kết thúc' },
                            ]}
                        />
                    </div>
                </div>
                <div className="my-5">
                    <TableWrapper>
                        <Table columns={columns} scroll={{ x: "max-content" }}
                            // dataSource={data}
                            bordered />
                    </TableWrapper>
                </div>
            </div>
        </React.Fragment>
    )
}
