import { Checkbox, ConfigProvider, message, Statistic, Tooltip } from "antd";
import React, { useMemo, useState } from "react";
import { TbInfoCircle } from "react-icons/tb";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

interface CheckableCardProps {
    item: any;
    isPercentageValue?: boolean;
    suffix?: string
    checkboxVisibility?: boolean;
    borderVisibility?: boolean;
    selectedCategories?: any[];
    setSelectedCategories?: (categories: any[]) => void;
}

const IncreasingValueStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#3f8600",
    fontWeight: "bold",
}

const DecreasingValueStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#cf1322",
    fontWeight: "bold",
}

export default function CheckableCard(props: CheckableCardProps) {
    const [isVisible, setIsVisible] = useState<boolean>(props.borderVisibility || false);
    // const value = Math.round(Math.random() * 100 * Math.random() * 100);
    // const mockDiffPercents = Math.round(Math.random() * 100) / 100 + Math.random();
    const isIncreasing = useMemo<boolean>(() => {
        const result = props.item?.percentChange > 0 ? true : false;
        return result;
    }, [props.item?.percentChange]);

    const absPercentChange = useMemo<number>(() => {
        const result = isIncreasing ? props.item?.percentChange : (-1) * props.item?.percentChange;
        return result;
    }, [props.item?.percentChange, isIncreasing]);

    const isNumber = useMemo<boolean>(() => {
        return typeof absPercentChange === 'number' && isFinite(absPercentChange);
    }, [absPercentChange])

    const isInfinity = useMemo<boolean>(() => {
        return absPercentChange === Infinity || absPercentChange === -Infinity;
    }, [absPercentChange])

    const handleSelectedCard = (category: any) => {
        // console.log('handleSelectedCard', category);

        const isAlreadySelected = props.selectedCategories?.find(item => item._id === category._id);
        // console.log('isAlreadySelected: ', isAlreadySelected);

        if (isAlreadySelected) {
            props.setSelectedCategories!(props.selectedCategories!.filter(item => item._id !== category._id))
        } else {
            // Limit to 2 selections
            if (props.selectedCategories!.length < 2) {
                let categories = [...props.selectedCategories!];
                categories.push(category);
                props.setSelectedCategories!(categories);
            }
            else {
                message.error("Giới hạn 2 mục dữ liệu");
                return;
            };
        }
        setIsVisible(!isVisible);

    }

    return (
        <React.Fragment>
            <div className={`relative w-[95%] ${props.checkboxVisibility === false ? '' : "cursor-pointer select-none"}`}
                onClick={() => {
                    if (props.checkboxVisibility === false) return;
                    handleSelectedCard(props.item);
                }}>
                <div className={`absolute z-10 top-0 h-2 w-full border rounded-t-xl ${!isVisible ? 'hidden' : ''} 
                bg-[${props.item.color}]
                `} />
                <div className={`relative p-5 bg-white border-2 ${!isVisible ? 'border-gray-300' : `border-[${props.item.color}]`} shadow-lg rounded-lg`}>
                    <div className="flex flex-col select-none truncate">
                        {
                            props.checkboxVisibility === true ? (
                                <ConfigProvider theme={{ token: { colorPrimary: `${props.item.color}` } }}>
                                    <Checkbox onChange={() => handleSelectedCard(props.item)} checked={isVisible}>
                                        <div className="truncate">{props.item.title}</div>
                                    </Checkbox>
                                </ConfigProvider>
                            ) : <div className="truncate">{props.item.title}</div>
                        }
                        {
                            props.isPercentageValue ? <>{<>
                                <Statistic className={`mt-4 ${props.checkboxVisibility ? "lg:ml-6" : ""}`} value={props.item?.value || 0} suffix={"%"} />
                                {
                                    isIncreasing ? (
                                        <Statistic className={`mt-3 ${props.checkboxVisibility ? "lg:ml-6" : ""}`} value={absPercentChange} precision={2}
                                            prefix={<BiSolidUpArrow />} suffix={'%'} valueStyle={IncreasingValueStyle} />
                                    ) : (
                                        <Statistic className={`mt-3 ${props.checkboxVisibility ? "lg:ml-6" : ""}`} value={absPercentChange} precision={2}
                                            prefix={<BiSolidDownArrow />} suffix={'%'} valueStyle={DecreasingValueStyle} />
                                    )
                                }
                            </>}</> : <>{<>
                                <Statistic className={`mt-4 ${props.checkboxVisibility ? "lg:ml-6" : ""}`} value={props.item?.value || 0} suffix={props.suffix ?? ""} />
                                {
                                    //handle Infinity & NaN values
                                    !isInfinity ?
                                        (isIncreasing ? (
                                            <Statistic className={`mt-3 ${props.checkboxVisibility ? "lg:ml-6" : ""}`} value={isNumber ? absPercentChange : 0} precision={2}
                                                prefix={<BiSolidUpArrow />} suffix={'%'} valueStyle={IncreasingValueStyle} />
                                        ) : (
                                            <Statistic className={`mt-3 ${props.checkboxVisibility ? "lg:ml-6" : ""}`} value={isNumber ? absPercentChange : 0} precision={2}
                                                prefix={<BiSolidDownArrow />} suffix={'%'} valueStyle={DecreasingValueStyle} />
                                        )) : <div className={`mt-3 italic text-slate-500 ${props.checkboxVisibility ? "lg:ml-6" : ""}`}>Không có dữ liệu</div>
                                }
                            </>}</>
                        }

                        <div className="absolute wrap top-3 right-2 text-lg">
                            <Tooltip title={props.item.tooltip}>
                                <TbInfoCircle />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}