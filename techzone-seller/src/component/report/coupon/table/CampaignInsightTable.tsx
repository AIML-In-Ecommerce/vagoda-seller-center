import { Select, Table, TableColumnsType, Tooltip } from 'antd'
import React from 'react'
import { TbInfoCircle } from 'react-icons/tb';
import styled from 'styled-components';


interface CampaignInsightStatistics {
  key: string,
  name: string,
  eventDate: Date,
  customerCount: number,
  productCount: number,
  productSKU: number,
  unitsSold: number,
  revenue: number,
}

const columns: TableColumnsType<CampaignInsightStatistics> = [
  {
    title: 'Chiến dịch khuyến mãi',
    dataIndex: 'name',
    fixed: 'left',
    width: '22%',
  },
  {
    title: 'Ngày diễn ra',
    dataIndex: 'eventDate',
    width: '13%',
  },
  {
    title: 'Khách hàng',
    dataIndex: 'customerCount',
    width: '13%',
  },  
  {
    title: 'Đơn hàng',
    dataIndex: 'productCount',
    width: '13%',
  },
  {
    title: 'SKU bán ra',
    dataIndex: 'productSKU',
    width: '13%',
  },
  {
    title: 'Đơn vị đã bán',
    dataIndex: 'unitsSold',
    width: '13%',
  },
  {
    title: 'Doanh thu',
    dataIndex: 'revenue',
    width: '13%',
  },
];

const TableWrapper = styled.div`
  // .ant-table-thead .ant-table-cell {
  //   background-color: #fafafa !important;
  // }
`

export default function CampaignInsightTable() {
  return (
    <div className="flex flex-col bg-white my-5 px-5">
      <div className="font-semibold text-lg my-5">Danh sách chiến dịch</div>
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
