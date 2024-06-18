import { Select, Table, TableColumnsType, Tooltip } from 'antd'
import React from 'react'
import { TbInfoCircle } from 'react-icons/tb';
import styled from 'styled-components';


interface CouponInsightStatistics {
  key: string,
  name: string,
  activeDate: Date,
  usedCodeCount: number,
  totalCodeCount: number
  productRevenue: number,
  soldProductCount: number,
  totalCost: number,
  // profitMargin: number // 
  buyerCount: number,
  orderCount: number,
}

const columns: TableColumnsType<CouponInsightStatistics> = [
  {
    title: 'Mã giảm giá',
    dataIndex: 'name',
    fixed: 'left',
    width: '10%',
  },
  {
    title: 'Thời gian áp dụng',
    dataIndex: 'activeDate',
    width: '20%',
  },
  {
    title: <div className="flex flex-row gap-1 items-center">
      <div>Mã đã dùng / Tổng số mã</div>
      <Tooltip title={"Số Mã Giảm Giá đã sử dụng / Tổng số mã giảm giá đã tạo."}>
        <TbInfoCircle />
      </Tooltip>
    </div>,
    dataIndex: ['usedCodeCount', 'totalCodeCount'],
    render: (text, record, index) => (
      <div className="flex flex-row gap-1">
        <div>{record.usedCodeCount}</div>
        <div>/</div>
        <div>{record.totalCodeCount}</div>
      </div>
    )
  },
  {
    title: <div className="flex flex-row gap-1 items-center">
      <div>Doanh thu</div>
      <Tooltip title={"Tổng giá trị của các đơn hàng có áp dụng Mã Giảm Giá của Nhà bán đã được xác nhận trong khoảng thời gian đã chọn."}>
        <TbInfoCircle />
      </Tooltip>
    </div>,
    dataIndex: 'productRevenue',
  },
  {
    title: <div className="flex flex-row gap-1 items-center">
      <div>Sản phẩm đã bán</div>
      <Tooltip title={"Tổng số lượng sản phẩm có áp dụng Mã Giảm Giá của Nhà bán đã bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn."}>
        <TbInfoCircle />
      </Tooltip>
    </div>,
    dataIndex: 'soldProductCount',
  },
  {
    title: <div className="flex flex-row gap-1 items-center">
      <div>Chi phí</div>
      <Tooltip title={"Tổng chi phí Mã Giảm Giá mà Nhà bán phải chi, tính trên các đơn hàng xác nhận trong khoảng thời gian đã chọn."}>
        <TbInfoCircle />
      </Tooltip>
    </div>,
    dataIndex: 'totalCost',
  },
  {
    title: <div className="flex flex-row gap-1 items-center">
      <div>Tỉ lệ lợi nhuận trên chi phí</div>
      <Tooltip title={"Doanh thu/chi phí Mã Giảm Giá"}>
        <TbInfoCircle />
      </Tooltip>
    </div>,
  },
  {
    title: <div className="flex flex-row gap-1 items-center">
      <div>Người mua</div>
      <Tooltip title={"Tổng số lượng người mua đã sử dụng ít nhất một Mã Giảm Giá của Nhà bán, tính trên toàn bộ các đơn hàng được xác nhận trong khoảng thời gian đã chọn."}>
        <TbInfoCircle />
      </Tooltip>
    </div>,
    dataIndex: 'buyerCount',
  },
  {
    title: <div className="flex flex-row gap-1 items-center">
      <div>Đơn hàng</div>
      <Tooltip title={"Tổng số đơn hàng được xác nhận và có áp dụng Mã giảm giá của Nhà bán trong khoảng thời gian đã chọn."}>
        <TbInfoCircle />
      </Tooltip>
    </div>,
    dataIndex: 'orderCount',
  },
];

const TableWrapper = styled.div`
  // .ant-table-thead .ant-table-cell {
  //   background-color: #fafafa !important;
  // }
`

export default function CouponInsightTable() {
  return (
    <div className="flex flex-col bg-white my-5 px-5">
      <div className="flex lg:flex-row flex-col lg:justify-between my-5">
        <div className="font-semibold">Số lượng mã giảm giá: {0}</div>
        <div className="flex flex-row gap-2 items-center">
          <div>Trạng thái</div>
          <Select
            style={{ width: '140px' }}
            placement='bottomLeft'
            defaultValue="all"
            options={[
              { value: 'all', label: 'Tất cả' },
              { value: 'upcomming', label: 'Sắp diễn ra' },
              { value: 'inprogress', label: 'Đang diễn ra' },
              { value: 'expired', label: 'Kết thúc' },
            ]}
          />
        </div>
      </div>
      <div className="mb-5">
        <TableWrapper>
          <Table columns={columns} scroll={{ x: "max-content" }}
            // dataSource={data}
            bordered />
        </TableWrapper>
      </div>
    </div>
  )
}
