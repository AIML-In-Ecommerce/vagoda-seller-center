'use client'

import { Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { IFilterCallbackProps, IFilterSupportFunction } from "./IFilter";

interface OrderTimeFilterProps
{
    filterKey: string,
    filterOption: OrderTimeOptionProps[],
    defaultIndex: number,
    filterCallback: (result: IFilterCallbackProps) => void,
}


interface OrderTimeOptionDisplayProps
{
    index: number,
    label: JSX.Element,
    value: string,
    name: string,
}

export interface OrderTimeOptionProps
{
    index: number,
    label: string,
    value: string,
    supportFunction: IFilterSupportFunction | null
}


export default function OrderTimeFilter({filterKey, filterOption, defaultIndex ,filterCallback}: OrderTimeFilterProps)
{
    const [selectedOrderTimeOption, setSelectedOrderTimeOption] = useState<string>("0")

    useEffect(() =>
    {
        if(filterOption != undefined && filterOption.length > 0)
        {
            setSelectedOrderTimeOption(filterOption[defaultIndex].value)

            const supportFunction = filterOption[defaultIndex].supportFunction
            if(supportFunction != null)
            {
                // const filterData: OrderPropType[] = supportFunction.filterFunction(dataSource)
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


    const orderTimeOptionDisplay = filterOption.map((value) =>
    {
        const display:OrderTimeOptionDisplayProps = 
        {
            index: value.index,
            label: <Typography.Text>
                {value.label}
            </Typography.Text>,
            value: value.value,
            name: value.label
        }

        return display
    })


    function handleOrderTimeOptionOnChange(value: string, option: OrderTimeOptionDisplayProps | OrderTimeOptionDisplayProps[])
    {
        setSelectedOrderTimeOption(value)
        
        const index = (option as OrderTimeOptionDisplayProps).index
        const supportFunction = filterOption[index].supportFunction

        if(supportFunction != null)
        {
            // const filterData: OrderPropType[] = supportFunction.filterFunction(dataSource)
            const callbackProps: IFilterCallbackProps =
            {
                key: filterKey,
                label: supportFunction.getTagLabel(null) as string,
                filterFunction: supportFunction.filterFunction,
                filterParams: null
            }
            filterCallback(callbackProps)
        }

    }

    return(
        <>
            <Select 
                className="min-w-36 w-40"
                options={orderTimeOptionDisplay}
                value={selectedOrderTimeOption}
                onChange={handleOrderTimeOptionOnChange}
                placeholder={<Typography.Text>Ngày đặt hàng</Typography.Text>}
            />
        </>
    )
}