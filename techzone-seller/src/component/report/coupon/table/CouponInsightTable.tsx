"use client";
import { GET_GetAllPromotions, GET_GetPromotionListByShop } from '@/apis/promotion/PromotionAPI';
import PromotionCard from '@/component/booth-design/decorator/mini/PromotionCard';
import { AuthContext } from '@/context/AuthContext';
import { PromotionStatus, PromotionType } from '@/model/PromotionType';
import { Popover, Select, Table, TableColumnsType, Tag, Timeline, Tooltip } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegClipboard } from 'react-icons/fa6';
import { TbInfoCircle } from 'react-icons/tb';
import styled from 'styled-components';
import moment from 'moment';

// Function to format dates
const formatDate = (date: Date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
};

interface CouponInsightStatistics {
  key: string,
  promotion: PromotionType,
  usedCodeCount: number,
  totalCodeCount: number
  productRevenue: number,
  soldProductCount: number,
  totalCost: number,
  returnOnAsset: number,
  buyerCount: number,
  orderCount: number,
}

const columns: TableColumnsType<CouponInsightStatistics> = [
  {
    title: 'Mã giảm giá',
    dataIndex: 'name',
    render: (value: any, record: CouponInsightStatistics) => {
      let triggerSelected = false;
      const innerContent = (
        <div className="flex flex-col gap-1">
          <div>{record.promotion.name}</div>
          <Tag color="default"
            onClick={async () => { await navigator.clipboard.writeText(record.promotion.code) }}>
            <div className="items-center flex flex-row gap-2">
              <div><FaRegClipboard /></div>
              <div className="font-semibold">
                {record.promotion.code}
              </div>
            </div>
          </Tag>
        </div>
      )
      const popupContent = (<PromotionCard item={record.promotion}
        isSelected={triggerSelected}
        applyDiscount={() => { triggerSelected = true }}
        removeDiscount={() => { triggerSelected = false }} />)
      return (
        <Popover placement="top" title="Preview" content={popupContent}
          autoAdjustOverflow
          arrow={{ pointAtCenter: true }}
          overlayInnerStyle={{ width: '400px' }}>
          {innerContent}
        </Popover>
      )
    },
    width: '15%',
    fixed: 'left',
  },
  {
    title: 'Thời gian áp dụng',
    dataIndex: 'activeDate',
    width: '20%',
    render: (value: any, record: CouponInsightStatistics) => {
      return (<Timeline mode="right" className="w-full"
        items={[
          {
            children: 'Bắt đầu',
            label: `${formatDate(record.promotion.activeDate)}`
          },
          {
            children: 'Kết thúc',
            label: `${formatDate(record.promotion.expiredDate)}`
          }
        ]}>
      </Timeline>)
    },
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
    dataIndex: 'returnOnAsset'
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
  const context = useContext(AuthContext);
  const [promotions, setPromotions] = useState<PromotionType[]>([]);
  const [promotionStatistics, setPromotionStatistics] = useState<CouponInsightStatistics[]>([]);
  const [currentStatusValue, setCurrentStatusValue] = useState<string>("");
  const [fileredData, setFilteredData] = useState<CouponInsightStatistics[]>([]);

  const filterData = () => {
    let data = promotionStatistics;

    // if (keyword) {
    //     data = data.filter(item =>
    //         Object.values(item).some(value =>
    //             value.toString().toLowerCase().includes(keyword.toLowerCase())
    //         )
    //     );
    // }

    if (currentStatusValue) {
        data = data.filter(item => item.promotion.status === currentStatusValue);
    }
    setFilteredData(data);
};

  useEffect(() => {
    const fetchPromotionStatistics = async () => {
      if (!context.shopInfo) return;
      const response = await GET_GetPromotionListByShop(context.shopInfo?._id);
      if (response) {
        const promotionListData = response.data as PromotionType[];
        setPromotions(promotionListData);
        console.log('fetchPromotionList', promotionListData);

        let couponListStatisics = promotionListData.map(promotion => {
          let productRevenue = 0, totalCost = 0;
          let returnOnAsset = totalCost === 0 ? 0 : productRevenue / totalCost;
          return {
            key: promotion._id,
            promotion: promotion,
            usedCodeCount: promotion.redeemedTotal,
            totalCodeCount: promotion.quantity,
            productRevenue: productRevenue,
            soldProductCount: 0,
            totalCost: totalCost,
            returnOnAsset: returnOnAsset,
            buyerCount: 0,
            orderCount: 0,
          } as CouponInsightStatistics
        })

        setPromotionStatistics(couponListStatisics);
      }
    }
    fetchPromotionStatistics();
  }, [context.shopInfo])

  useEffect(() => {

    filterData();
    // console.log('Keyword', keyword);
    // console.log('currentStatusValue', currentStatusValue);
}, [currentStatusValue]);

  return (
    <div className="flex flex-col bg-white my-5 px-5">
      <div className="flex lg:flex-row flex-col lg:justify-between my-5">
        <div className="font-semibold">Số lượng mã giảm giá: {promotions.length}</div>
        <div className="flex flex-row gap-2 items-center">
          <div>Trạng thái</div>
          <Select
            style={{ width: '140px' }}
            placement='bottomLeft'
            value={currentStatusValue}
            options={[
              { value: '', label: 'Tất cả' },
              { value: PromotionStatus.UPCOMMING, label: 'Sắp diễn ra' },
              { value: PromotionStatus.IN_PROGRESS, label: 'Đang diễn ra' },
              { value: PromotionStatus.EXPIRED, label: 'Kết thúc' },
            ]}
          />
        </div>
      </div>
      <div className="mb-5">
        <TableWrapper>
          <Table columns={columns} scroll={{ x: "max-content" }}
            dataSource={promotionStatistics}
            bordered />
        </TableWrapper>
      </div>
    </div>
  )
}
