"use client";
import { PromotionStatus, PromotionType } from '@/model/PromotionType';
import { Button, Input, Modal, Popover, Select, Table, TableColumnsType, Tag, Timeline, Tooltip } from 'antd';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FaRegClipboard, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { FaEye, FaMagnifyingGlass, FaRegEye } from 'react-icons/fa6';
import { TbInfoCircle } from 'react-icons/tb';
import styled from 'styled-components';
import moment from 'moment';
import { AuthContext } from '@/context/AuthContext';
import PromotionCard from '@/component/booth-design/decorator/mini/PromotionCard';
import { useRouter } from 'next/navigation';

interface CouponTableProps {
    loading: boolean;
    promotionData: PromotionType[];
    handleEditPromotion: (promotionId: string) => void;
    handleDeletePromotion: (promotionId: string) => Promise<void>;
}

const formatDate = (date: Date) => {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
};

const TableWrapper = styled.div`
  // .ant-table-thead .ant-table-cell {
  //   background-color: #fafafa !important;
  // }
`

export default function CouponTable(props: CouponTableProps) {
    // const context = useContext(AuthContext);
    // const router = useRouter();
    const [filteredData, setFilteredData] = useState<PromotionType[]>(props.promotionData);
    const [keyword, setKeyword] = useState<string>("");
    const [currentStatusValue, setCurrentStatusValue] = useState<string>("");
    const [isDeletePromotionModalOpen, setIsDeletePromotionModalOpen] = useState<boolean>(false);
    const [currentPromotionId, setCurrentPromotionId] = useState<string>("");

    const [isHovering, setIsHovered] = useState<string | null>(null);
    const onMouseEnter = (promotionId: string) => setIsHovered(promotionId);
    const onMouseLeave = () => setIsHovered(null);
    
    const handleOpenDeletePromotionModal = (promotionId: string) => {
        setCurrentPromotionId(promotionId);
        setIsDeletePromotionModalOpen(true);
    }

    const handleCancelDeletePromotionModal = () => {
        setIsDeletePromotionModalOpen(false);
    }

    const handleDeletePromotion = async () => {
        await props.handleDeletePromotion(currentPromotionId);
        setIsDeletePromotionModalOpen(false);
    }

    const columns: TableColumnsType<PromotionType> = [
        {
            title: 'Mã giảm giá',
            dataIndex: 'name',
            fixed: 'left',
            render: (text: any, record: PromotionType) => {
                const isHoveringRow = isHovering === record._id;
                let triggerSelected = false;
                const innerContent = (
                    <div className="flex flex-col gap-1 relative">
                        <div>{record.name}</div>
                        <Tag color="default"
                            onClick={async () => { await navigator.clipboard.writeText(record.code) }}>
                            <div className="items-center flex flex-row gap-2">
                                <div><FaRegClipboard /></div>
                                <div className="font-semibold">
                                    {record.code}
                                </div>
                            </div>
                        </Tag>
                        <div className="absolute right-0 top-0"
                            onMouseEnter={() => onMouseEnter(record._id)}
                            onMouseLeave={() => onMouseLeave()}>
                            {isHoveringRow ? <FaEye></FaEye> : <FaRegEye />}
                        </div>
                    </div>
                )
                const popupContent = (<PromotionCard item={record}
                    isSelected={triggerSelected}
                    applyDiscount={() => { triggerSelected = true }}
                    removeDiscount={() => { triggerSelected = false }} />)
                return (
                    isHoveringRow ? (
                    <Popover placement="top" title="Xem trước" content={popupContent}
                        autoAdjustOverflow
                        arrow={{ pointAtCenter: true }}
                        overlayInnerStyle={{ width: '400px' }}>
                        {innerContent}
                    </Popover>) : innerContent
                )
            },
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
            dataIndex: 'activeDate',
            render: (value: any, record: PromotionType) => {
                return (
                    <div className="flex">
                        <Timeline mode="left" className="w-full"
                            items={[
                                {
                                    label: 'Bắt đầu',
                                    children: `${formatDate(record.activeDate)}`
                                },
                                {
                                    label: 'Kết thúc',
                                    children: `${formatDate(record.expiredDate)}`
                                }
                            ]}>
                        </Timeline>
                    </div>
                    // <div className="flex flex-col gap-4">
                    //     <div>Bắt đầu: {formatDate(record.activeDate)}</div>
                    //     <div>Kết thúc: {formatDate(record.expiredDate)}</div>
                    // </div>
                )
            }
    
        },
        {
            title: <div className="flex flex-row gap-1 items-center">
                <div>Trạng thái</div>
                <Tooltip title={""}>
                    <TbInfoCircle />
                </Tooltip>
            </div>,
            dataIndex: 'status',
            render: (value: any, record: PromotionType) => {
                return (
                    <div className="flex flex-row gap-4 items-center">
                        {
                            record.status === PromotionStatus.UPCOMMING
                                ? "Sắp diễn ra" : record.status === PromotionStatus.IN_PROGRESS
                                    ? "Đang diễn ra" : "Kết thúc"
                        }
                    </div>
                )
            }
        },
        {
            title: <div className="flex flex-row gap-1 items-center">
                <div>Thao tác</div>
            </div>,
            render: (value: any, record: PromotionType) => {
                return (
                    <div className="flex flex-row gap-4 items-center">
                        <Button className="bg-blue-500 hover:bg-blue-300 font-semibold text-white" onClick={() => props.handleEditPromotion(record._id)}>
                            <Tooltip title="Chỉnh sửa"><FaRegEdit /></Tooltip>
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-300 font-semibold text-white" onClick={() => handleOpenDeletePromotionModal(record._id)}>
                            <Tooltip title="Xóa Mã giảm giá"><FaRegTrashAlt /></Tooltip>
                        </Button>
                    </div>
                )
            }
        },
    ];

    const filterData = () => {
        let data = props.promotionData;

        if (keyword) {
            data = data.filter(item =>
                Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(keyword.toLowerCase())
                )
            );
        }

        if (currentStatusValue) {
            data = data.filter(item => item.status === currentStatusValue);
        }
        setFilteredData(data);
    };

    useEffect(() => {

        filterData();
        // console.log('Keyword', keyword);
        // console.log('currentStatusValue', currentStatusValue);
    }, [keyword, currentStatusValue, props.promotionData, props.loading]);

    return (
        <React.Fragment>
            <div className="flex flex-col">
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-1">
                        <div>Mã giảm giá</div>
                        <Input prefix={<FaMagnifyingGlass />} placeholder={"Nhập mã giảm giá"}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>Trạng thái</div>
                        <Select
                            style={{ width: '140px' }}
                            placement='bottomLeft'
                            value={currentStatusValue}
                            onChange={(value) => setCurrentStatusValue(value)}
                            options={[
                                { value: "", label: 'Tất cả' },
                                { value: PromotionStatus.UPCOMMING, label: 'Sắp diễn ra' },
                                { value: PromotionStatus.IN_PROGRESS, label: 'Đang diễn ra' },
                                { value: PromotionStatus.EXPIRED, label: 'Kết thúc' },
                            ]}
                        />
                    </div>
                </div>
                <div className="my-5">
                    <TableWrapper>
                        <Table columns={columns} scroll={{ x: "max-content" }}
                            loading={props.loading}
                            dataSource={filteredData}
                            bordered />
                    </TableWrapper>
                </div>
            </div>
            <Modal
                width={400}
                open={isDeletePromotionModalOpen}
                onCancel={handleCancelDeletePromotionModal}
                title={<span className="text-xl">Xóa mã giảm giá</span>}
                footer={() => (
                    <>
                        <Button key="cancel" onClick={handleCancelDeletePromotionModal}>Hủy</Button>,
                        <Button className="bg-red-500 cursor-pointer hover:bg-red-800 text-white" key="ok" onClick={handleDeletePromotion}>Xóa</Button>
                    </>
                )}
                centered
            >
                Bạn có muốn xóa mã giảm giá này không?
            </Modal>
        </React.Fragment>
    )
}
