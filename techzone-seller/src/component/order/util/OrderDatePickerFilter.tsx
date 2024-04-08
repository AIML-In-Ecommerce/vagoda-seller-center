'use client';

import { DatePicker } from "antd";
import { IFilterCallbackProps, IFilterSupportFunction } from "./IFilter";


interface OrderDatePickerFilterProps
{
    filterKey: string,
    filterOption: OrderDatePickerFilterOptionProps,
    defaultIndex: number,
    filterCallback: (result: IFilterCallbackProps) => void,
}

export interface OrderDatePickerFilterOptionProps
{
    index: number,
    supportFunction: IFilterSupportFunction
}

export default function OrderDatePickerFilter({filterKey, filterOption, filterCallback}:OrderDatePickerFilterProps)
{


    function handleDatePickerOnChange(date: any, dateString: string | string[])
    {
        const supportFunction = filterOption.supportFunction

        if(date == null && supportFunction != null)
        {
            const callbackProp: IFilterCallbackProps =
            {
                key: filterKey,
                label: "",
                filterFunction: filterOption.supportFunction.filterFunction,
                filterParams: undefined
            }

            filterCallback(callbackProp)

            return
        }

        if(supportFunction != null)
        {
            const callbackProp: IFilterCallbackProps =
            {
                key: filterKey,
                label: supportFunction.getTagLabel(dateString),
                filterFunction: supportFunction.filterFunction,
                filterParams: dateString
            }

            filterCallback(callbackProp)
        }

    }

    return(
        <DatePicker 
        onChange={handleDatePickerOnChange} />
    )
}