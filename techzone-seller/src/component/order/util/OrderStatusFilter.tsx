'use client'

import { Select, Typography } from "antd"
import { IFilterCallbackProps, IFilterSupportFunction } from "./IFilter"
import { useEffect, useState } from "react"

interface OrderExpiredConfirmFilterProps
{
    filterKey: string,
    filterOption: OrderStatusOptionProps[],
    defaultIndex: number,
    filterCallback: (result: IFilterCallbackProps) => void
}

interface OptionDisplay
{
    index: number,
    value: string,
    name: string,
    label: JSX.Element
}

export interface OrderStatusOptionProps
{
    index: number,
    value: string,
    label: string,
    supportFunction: IFilterSupportFunction | null
}


export default function OrderStatusFilter({filterKey, filterOption, defaultIndex, filterCallback}: OrderExpiredConfirmFilterProps)
{
    const [selectedOptionValue, setSelectedOptionValue] = useState<string>("0")


    useEffect(() =>
    {
        if(filterOption != undefined && defaultIndex != undefined)
        {
            setSelectedOptionValue(filterOption[defaultIndex].value)
            const supportFunction = filterOption[defaultIndex].supportFunction
            if(supportFunction != null)
            {
                const callbackProps: IFilterCallbackProps = 
                {
                    key: filterKey,
                    label: supportFunction.getTagLabel(null) as string,
                    filterFunction: supportFunction.filterFunction,
                    filterParams: null,
                }

                filterCallback(callbackProps)
            }
        }
    },
    [filterOption])

    const optionDisplays: OptionDisplay[] = filterOption.map((value: OrderStatusOptionProps) =>
    {
        const display: OptionDisplay = 
        {
            index: value.index,
            value: value.value,
            label: <Typography.Text>Trạng thái - {value.label}</Typography.Text>,
            name: value.label
        }

        return display;
    })

    function handleOptionChange(value: string, option: OptionDisplay | OptionDisplay[])
    {
        setSelectedOptionValue(value)
        const index = (option as OptionDisplay).index
        const supportFunction = filterOption[index].supportFunction

        if(supportFunction != null)
        {
            const callbackProps: IFilterCallbackProps = 
            {
                key: filterKey,
                label: supportFunction.getTagLabel(null),
                filterFunction: supportFunction.filterFunction,
                filterParams: null
            }

            filterCallback(callbackProps)
        }
    }

    return(
        <>
            <Select
                className="min-w-36 w-48"
                value={selectedOptionValue}
                options={optionDisplays}
                onChange={handleOptionChange}
                placeholder={<Typography.Text>Trạng thái hiện tại</Typography.Text>}
            />
        </>
    )
}