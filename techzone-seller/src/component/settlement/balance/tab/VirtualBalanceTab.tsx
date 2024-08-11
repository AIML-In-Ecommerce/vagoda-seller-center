import { Currency } from '@/component/util/CurrencyDisplay'
import { Button, Divider, Tooltip, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
import { CgClipboard } from 'react-icons/cg'
import { MdInfoOutline } from 'react-icons/md'
import { PiBank } from 'react-icons/pi'
import { SlArrowRight, SlWallet } from 'react-icons/sl'
import TransactionHistoryTable from '../table/TransactionHistoryTable'
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { WalletType } from '@/model/ShopType'

dayjs.extend(LocalizedFormat)


interface VirtualBalanceTabProps {
    shopWallet: WalletType;
}

const getNextScheduledPaymentDate = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let nextDate: Date;

    if (currentDay < 16) {
        // If today is before the 16th, return the 16th of this month
        nextDate = new Date(currentYear, currentMonth, 16);
    } else {
        // Otherwise, return the 1st of the next month
        nextDate = new Date(currentYear, currentMonth + 1, 1);
    }
    return nextDate;
}

const formatShortDate = (date: Date) => {
    return dayjs(date).locale('vi').format('L');
}

const convertUserBankName = (name: string) => {
    // Remove diacritics (accents) and convert to uppercase
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

const getCensoredUserBankNumber = (accountNumber: string) => {
    let censoredString = new Array(accountNumber.length - 4).fill('*');
    return censoredString.concat(accountNumber.substring(accountNumber.length - 4));
}

export default function VirtualBalanceTab(props: VirtualBalanceTabProps) {
    const totalBalance = props.shopWallet.balance;
    const bankAccount = props.shopWallet.bankCard.at(0);
    

    const nextScheduledPaymentDate = useMemo(() => {
        return formatShortDate(getNextScheduledPaymentDate());
    }, [])
    
    return (
        <React.Fragment>
            <div className="flex flex-col bg-white">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex flex-col sm:p-5 lg:px-5 sm:border-b-2 lg:border-b-0 lg:border-r-2 border-slate-400 space-y-4">
                        <div className="flex flex-row gap-3 lg:item-center">
                            <div className="font-semibold text-2xl text-blue-500"><SlWallet /></div>
                            <div className="flex flex-row gap-3 items-center">
                                <div className="text-lg font-semibold">Số dư khả dụng</div>
                                <Tooltip title="Số tiền trong tài khoản mà Nhà bán có thể thực hiện yêu cầu thanh toán ngay.">
                                    <div className="text-xl">
                                        <MdInfoOutline />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="text-xl ml-9">
                            <div className={`${totalBalance === 0 ? "text-neutral-400" : "text-blue-500"} font-extrabold`}>
                                <Currency value={totalBalance} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:p-4 lg:px-5 sm:border-b-2 lg:border-b-0 border-slate-400 space-y-4">
                        <div className="flex flex-row gap-3 lg:items-center">
                            <div className="font-semibold text-3xl text-blue-500"><PiBank /></div>
                            <div className="flex flex-row gap-3 items-center">
                                <div className="text-lg font-semibold">Thông tin ngân hàng</div>
                                <Tooltip title="Số tiền yêu cầu Thanh toán linh hoạt sẽ được gửi vào tài khoản này">
                                    <div className="text-xl">
                                        <MdInfoOutline />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        {
                            bankAccount ? <div className="ml-11 flex flex-col space-y-2">
                                <div>{bankAccount.bankName}</div>
                                <div>{convertUserBankName(bankAccount.owner)}</div>
                                <div>{getCensoredUserBankNumber(bankAccount.accountNumber)}</div>
                                <div className="text-sky-500 cursor-pointer hover:text-blue-500 flex flex-row items-center gap-1">
                                    <span>Thay đổi thông tin</span>
                                    <span><SlArrowRight /></span>
                                </div>
                            </div> : <>
                                <div className="text-red-500 ml-11 w-96">
                                    Bạn cần cập nhật thông tin Tài Khoản Ngân hàng để nhận thanh toán từ Vagoda
                                </div>
                                <div className="text-sky-500 cursor-pointer hover:text-blue-500 flex flex-row mx-auto items-center ml-11 gap-1">
                                    <span>Thêm thông tin</span>
                                    <span><SlArrowRight /></span>
                                </div>
                            </>
                        }

                    </div>
                    {/* <div className="flex flex-col sm:p-4 lg:px-5 border-slate-400 space-y-4">
                        <div className="flex flex-row gap-3 lg:items-center">
                            <div className="font-semibold text-3xl text-blue-500"><CgClipboard /></div>
                            <div className="flex flex-row gap-3 items-center">
                                <div className="text-lg font-semibold">Hóa đơn điện tử</div>
                                <Tooltip title="Hóa đơn phí dịch vụ Vagoda xuất cho các khoản phí đã thu">
                                    <div className="text-xl">
                                        <MdInfoOutline />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="text-red-500 ml-11">
                            Chưa có hóa đơn nào
                        </div>
                    </div> */}

                </div>
                <div className="w-32 mt-5 p-5">
                    <Button size="large" disabled>
                        <div className="text-lg">Thanh toán ngay</div>
                    </Button>
                </div>
                <div className="flex flex-col space-y-5 mt-5 p-5">
                    <div className="text-red-500">Bạn có thể thực hiện "Thanh toán ngay" tối đa 1 lần mỗi ngày.</div>
                    <div className="font-semibold">
                        Số dư khả dụng sẽ được chuyển tự động định kỳ vào
                        <span className="text-sky-500 cursor-pointer hover:text-blue-500"> tài khoản ngân hàng</span>. Ngày thanh toán định kỳ tiếp theo là: <span className="text-orange-500 font-semibold">{nextScheduledPaymentDate}</span>.</div>
                    <div>Bạn sẽ nhận được tiền trong vòng tối đa 3 ngày làm việc, tùy thuộc vào ngân hàng mà bạn đang sử dụng.</div>
                </div>

            </div>
            <div className="mt-5 p-5 bg-white">
                <TransactionHistoryTable />
            </div>
        </React.Fragment>
    )
}
