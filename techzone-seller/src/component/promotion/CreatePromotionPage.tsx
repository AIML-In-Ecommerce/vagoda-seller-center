"use client";
import { Breadcrumb, FormProps, RadioChangeEvent, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { HiOutlineHome } from 'react-icons/hi2'
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    Image,
} from 'antd';
import { MdInfoOutline } from 'react-icons/md';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { RiCoupon3Line } from 'react-icons/ri';
import { DiscountType } from '@/model/PromotionType';
import { FaPlus } from 'react-icons/fa6';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const validateMessages = {
    required: 'Vui lòng nhập thông tin này',
};

type DiscountInfoField = {
    name: string;
    code: string;
    date: [Dayjs | undefined, Dayjs | undefined];
    isRecommendStats: boolean;
    discountType: DiscountType;
    discountValue: number;
    isHasLowerBoundaryForOrder: boolean;
    lowerBoundaryForOrder: number;
    isLimitAmountToReduce: boolean;
    limitAmountToReduce: number;
    quantity: number;
    targetProducts: any[] | undefined
}

const initialDiscount: DiscountInfoField = {
    name: '',
    code: '',
    date: [dayjs(), undefined],
    isRecommendStats: true,
    discountType: DiscountType.DIRECT_PRICE,
    discountValue: 0,
    isHasLowerBoundaryForOrder: false,
    lowerBoundaryForOrder: 0,
    isLimitAmountToReduce: false,
    limitAmountToReduce: 0,
    quantity: 0,
    targetProducts: [],
}

const generatePromotionCode = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.floor(Math.random() * 6) + 5;
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result.toUpperCase();
}

export default function CreatePromotionPage() {
    const [form] = Form.useForm<DiscountInfoField>();
    const discountName = Form.useWatch('name', form);
    const discountCode = Form.useWatch('code', form);
    const date = Form.useWatch('date', form);
    const recommendStats = Form.useWatch('isRecommendStats', form);
    const discountType = Form.useWatch('discountType', form);
    const discountValue = Form.useWatch('discountValue', form);
    const isHasLowerBoundaryForOrder = Form.useWatch('isHasLowerBoundaryForOrder', form);
    const lowerBoundaryForOrder = Form.useWatch('lowerBoundaryForOrder', form);
    const isLimitAmountToReduce = Form.useWatch('isLimitAmountToReduce', form);
    const limitAmountToReduce = Form.useWatch('limitAmountToReduce', form);
    const quantity = Form.useWatch('quantity', form);
    // const [discount, setDiscount] = useState<DiscountInfoField>(initialDiscount);

    useEffect(() => {
        // setDiscount({
        //     name: form.getFieldValue('name'),
        //     code: form.getFieldValue('code'),
        //     activeDate: new Date(),
        //     expiredDate: undefined,
        // } as DiscountInfoField)
        console.log('form setDiscount', date);
    }, [discountName, discountCode, date]);

    const handleUpdatePromotionCode = () => {
        const generateCode = generatePromotionCode();
        form.setFieldsValue({ code: generateCode });
    }
    const handleSwitchRecommendStats = () => {
        form.setFieldsValue({ isRecommendStats: !recommendStats });
    }

    const onProductListChange = ({ target: { value } }: RadioChangeEvent) => {
        console.log("Product list change...", value);
    }

    const onDiscountTypeChange = ({ target: { value } }: RadioChangeEvent) => {
        form.setFieldsValue({ discountType: value });
    }

    const onHasLowerBoundaryForOrder = ({ target: { value } }: RadioChangeEvent) => {
        form.setFieldsValue({ isHasLowerBoundaryForOrder: value });
    }

    const onHasLimitAmountToReduce = ({ target: { value } }: RadioChangeEvent) => {
        form.setFieldsValue({ isLimitAmountToReduce: value });
    }

    return (
        <React.Fragment>
            <div className="flex flex-col container py-5">
                <div className="pr-4 px-4">
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
                                href: "/marketing-center/promotion-tool",
                                title: "Trung tâm marketing",
                            },
                            {
                                href: "/marketing-center/promotion-tool/coupons",
                                title: "Công cụ khuyến mãi",
                            },
                            {
                                title: "Taọ mới",
                            }
                        ]}
                    />
                </div>
                <div className="pr-4 px-4 mt-5 uppercase text-xl font-semibold">Mã giảm giá / Tạo mới</div>
                <div className="pr-4 px-4 mt-5 lg:grid lg:grid-cols-7 gap-5">

                    <div className="col-start-1 col-span-5 p-5 bg-white container">
                        <div className="font-semibold text-lg">1. Thông tin cơ bản</div>
                        <Form {...formItemLayout}
                            initialValues={initialDiscount}
                            validateMessages={validateMessages}
                            form={form}
                            labelWrap
                            colon={false}>
                            <div className="mt-5">
                                <Form.Item label={
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="font-semibold">Tên mã giảm giá</div>
                                        <Tooltip title={"Tên mã giảm giá sẽ không được hiển thị với khách hàng, chỉ dành cho Nhà bán kham thảo"}>
                                            <MdInfoOutline />
                                        </Tooltip>
                                    </div>
                                } name="name" rules={[{ required: true }]}>
                                    <Input size="large" placeholder={"Điền tên mã giảm giá"} value={discountName} />
                                </Form.Item>
                                <Form.Item label={
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="font-semibold">Mã giảm giá</div>
                                        <Tooltip title={"Khách hàng có thể nhập mã giảm giá này khi thanh toán."}>
                                            <MdInfoOutline />
                                        </Tooltip>
                                    </div>
                                } name="code" rules={[{ required: true }]}>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-between mt-1">
                                            <div className="mb-2">Chỉ bao gồm từ 5 - 10 ký tự thường và chữ số.</div>
                                            <Tooltip title={"Hệ thống chúng tôi sẽ gợi ý một mã giảm giá bất kì, không trùng lặp trong hệ thống cho Nhà bán.."}>
                                                <div className="flex flex-row items-center gap-1 text-blue-700 cursor-pointer hover:text-blue-900 select-none"
                                                    onClick={() => handleUpdatePromotionCode()}>
                                                    <div>Tạo mã bất kỳ</div>
                                                    <MdInfoOutline />
                                                </div>
                                            </Tooltip>
                                        </div>
                                        <Input size="large" placeholder={"Điền ký tự mã giảm giá"} value={discountCode} />
                                    </div>
                                </Form.Item>
                                <Form.Item label={
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="font-semibold">Thời gian hiệu lực</div>
                                    </div>
                                } name="date">
                                    <RangePicker size="large" showTime format="DD-MM-YYYY HH:mm"
                                        placeholder={["Ngày bắt đâu", "Ngày kết thúc"]}
                                        value={date} />
                                </Form.Item>
                            </div>
                        </Form>

                    </div>
                    <div className="col-start-1 col-span-5 p-5 bg-white container">
                        <div className="font-semibold text-lg">2. Điều kiện áp dụng</div>
                        <Form {...formItemLayout}
                            initialValues={initialDiscount}
                            validateMessages={validateMessages}
                            form={form}
                            labelWrap
                            colon={false}>
                            <div className="mt-5">
                                <Form.Item className="bg-sky-200 py-4" label={
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="text-blue-500 text-lg font-semibold"><RiCoupon3Line /></div>
                                        <div className="font-semibold">Mã giảm giá thông minh</div>
                                        <Tooltip title={"Mã giảm giá thông minh của hệ thống chúng tôi sẽ cung cấp cho bạn các gợi ý cài đặt giảm giá dựa trên lịch sử dữ liệu của bạn và những nhà bán đã áp dụng mã giảm giá thành công. Cài đặt được đề xuất để cải thiện hiệu suất sử dụng mã giảm giá của bạn."}>
                                            <MdInfoOutline />
                                        </Tooltip>
                                    </div>
                                } name="isRecommendStats">
                                    <div className="flex flex-row items-center gap-2">
                                        <Switch value={recommendStats} onChange={() => handleSwitchRecommendStats()} />
                                        <div>Hiện đề xuất</div>
                                    </div>
                                </Form.Item>
                                <Form.Item label={
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="font-semibold">Loại giảm giá</div>
                                    </div>
                                }>
                                    <Form.Item name="discountType">
                                        <Radio.Group size="large" className="grid grid-cols-2 items-center" onChange={onDiscountTypeChange} value={discountType} optionType="button">
                                            <Radio className="text-center" value={DiscountType.DIRECT_PRICE}>Theo số tiền (VNĐ)</Radio>
                                            <Radio className="text-center" value={DiscountType.PERCENTAGE}>Theo phần trăm</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="discountValue" rules={[{ required: true }]}>
                                        <Input size="large" addonAfter={
                                            discountType === DiscountType.DIRECT_PRICE ? "đ" : "%"
                                        } value={discountValue}
                                            placeholder={
                                                discountType === DiscountType.DIRECT_PRICE ? "Nhập số tiền" : "Nhập số phần trăm"
                                            } />
                                    </Form.Item>
                                </Form.Item>
                                {
                                    discountType === DiscountType.PERCENTAGE ? (
                                        <Form.Item label={
                                            <div className="flex flex-row items-center gap-2">
                                                <div className="font-semibold">Số tiền giảm tối đa</div>
                                            </div>
                                        } name="">
                                            <Form.Item name="isLimitAmountToReduce">
                                                <Radio.Group size="large" className="grid grid-cols-2 items-center" onChange={onHasLimitAmountToReduce} value={isLimitAmountToReduce} optionType="button">
                                                    <Radio className="text-center" value={false}>Không giới hạn</Radio>
                                                    <Radio className="text-center" value={true}>Giới hạn số tiền tối đa</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                            {
                                                isLimitAmountToReduce === true ? (
                                                    <Form.Item name="limitAmountToReduce" rules={[{ required: true }]}>
                                                        <Input size="large" addonAfter={"đ"}
                                                            value={limitAmountToReduce}
                                                            placeholder={"Nhập số tiền"} />
                                                    </Form.Item>) : <></>
                                            }
                                        </Form.Item>) : <></>
                                }
                                <Form.Item label={
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="font-semibold">Giá trị đơn hàng tối thiểu</div>
                                    </div>
                                }>
                                    <Form.Item name="isHasLowerBoundaryForOrder">
                                        <Radio.Group size="large" className="grid grid-cols-2 items-center" onChange={onHasLowerBoundaryForOrder} value={isHasLowerBoundaryForOrder} optionType="button">
                                            <Radio className="text-center" value={false}>Không ràng buộc</Radio>
                                            <Radio className="text-center" value={true}>Giới hạn đơn hàng tối thiểu</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    {
                                        isHasLowerBoundaryForOrder === true ? (
                                            <Form.Item name="lowerBoundaryForOrder" rules={[{ required: true }]}>
                                                <Input size="large" addonAfter={"đ"}
                                                    value={lowerBoundaryForOrder}
                                                    placeholder={"Nhập số tiền"} />
                                            </Form.Item>) : <></>
                                    }
                                </Form.Item>
                                <Form.Item label={
                                    <div className="flex flex-row items-center gap-2">
                                        <div className="font-semibold">Số lượng mã giảm giá</div>
                                    </div>
                                } name="quantity">
                                    <Input size="large" value={quantity} placeholder={"Nhập số luợng"} />
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                    <div className="col-start-1 col-span-5 p-5 bg-white container">
                        <div className="font-semibold text-lg">3. Sản phẩm áp dụng</div>
                        <div className="w-full mt-4">
                            <Radio.Group onChange={onProductListChange} className="flex flex-col gap-5 lg:gap-0 lg:grid lg:grid-cols-2">
                                <Radio value="all_product" className="border-2 border-slate-300 hover:border-blue-500 rounded-sm px-2 py-4">
                                    <div className="flex flex-row items-center gap-3">
                                        <Image src={"https://cdn-icons-png.flaticon.com/512/617/617043.png"}
                                            width={40}
                                            preview={false} />
                                        <div className="font-semibold">Tất cả sản phẩm</div>
                                    </div>
                                </Radio>
                                <Radio value="list_product" className="border-2 border-slate-300 hover:border-blue-500 rounded-sm px-2 py-4 relative">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-3">
                                            <Image src={"https://cdn-icons-png.flaticon.com/256/8574/8574201.png"}
                                                width={40}
                                                preview={false} />
                                            <div className="flex flex-col">
                                                <div className="font-semibold">Sản phẩm cụ thể</div>
                                                <div>({0} sản phẩm)</div>
                                            </div>
                                        </div>
                                        <Button size="large" className="bg-blue-500 hover:bg-blue-700 absolute right-2 inset-auto">
                                            <div className="flex flex-row items-center gap-2 text-white">
                                                <FaPlus />
                                                <div>Chọn</div>
                                            </div>
                                        </Button>
                                    </div>
                                </Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="row-start-1 col-start-6 col-span-2 row-span-2">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="font-semibold">Tóm tắt điều kiện áp dụng mã</div>
                            <div className="p-4 bg-sky-100 border-2 border-blue-300 w-full">
                                <ul className="list-disc list-inside">
                                    {
                                        discountType === DiscountType.PERCENTAGE ? (
                                            <li>Giảm <span className="text-blue-500 font-semibold">{discountValue}%</span> - {isLimitAmountToReduce ? <span>Tối đa <span className="text-blue-500 font-semibold">{limitAmountToReduce} ₫</span></span> : <span className="text-blue-500 font-semibold">Không giới hạn số tiền tối đa</span> }</li>
                                        ) : <li>Giảm <span className="text-blue-500 font-semibold">{discountValue}đ</span></li>
                                    }
                                    {/* <li>Hiện mã giảm giá trong [Trang Chi Tiết Sản Phẩm]</li> */}
                                    <li>Thời gian hiệu lực: <span className="text-blue-500 font-semibold">{date ? date[0]?.format('DD/MM/YYYY HH:mm') : "--"} → {date ? date[1]?.format('DD/MM/YYYY HH:mm') : "--"}</span></li>
                                    {
                                        isHasLowerBoundaryForOrder ? (
                                            <li>Giá trị đơn hàng tối thiểu: <span className="text-blue-500 font-semibold">Không ràng buộc</span></li>
                                        ) : <li>Giá trị đơn hàng tối thiểu: <span className="text-blue-500 font-semibold">{lowerBoundaryForOrder}₫</span></li>
                                    }
                                    {/* <li>Nhóm khách hàng áp dụng: Tất cả khách hàng</li> */}
                                    <li>Tổng số lượng mã giảm giá: <span className="text-blue-500 font-semibold">{quantity}</span></li>
                                    {/* <li>Không giới hạn số lần sử dụng mỗi khách hàng</li> */}
                                    <li>Áp dụng cho:
                                        <span className="text-blue-500 font-semibold">
                                            {

                                            }
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="font-semibold">Hiển thị mẫu trên ứng dụng</div>

                        </div>
                    </div>
                </div>
            </div >
        </React.Fragment >
    )
}
