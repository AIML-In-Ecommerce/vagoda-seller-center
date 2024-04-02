'use client'

import { Button, Flex } from "antd"
import { IFilterCallbackProps, IFilterSupportFunction } from "./IFilter"
import { useEffect, useState } from "react"

interface OrderLateConfirmProps
{
    filterKey: string,
    filterOption: OrderLateConfirmOption,
    defaultIndex: number,
    filterCallback: (result: IFilterCallbackProps) => void
}


export interface OrderLateConfirmOption
{
    label: string,
    value: string,
    supportFunction: IFilterSupportFunction | null
}

export default function OrderLateConfirmFilter({filterKey, filterOption, defaultIndex, filterCallback}: OrderLateConfirmProps)
{
    const [buttonLabel, setButtonLabel] = useState<string>("")

    useEffect(() =>
    {
        if(defaultIndex){} //skip
        if(filterOption != undefined)
        {
            setButtonLabel(filterOption.label)
        }
    },
    [filterOption])

    function handleButtonFilterOnClick()
    {
        if(!filterOption)
        {

            return
        }

        const supportFunction = filterOption.supportFunction
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
            <Button
                className="hover:bg-transparent"
                onClick={() => handleButtonFilterOnClick()}
            >
                {buttonLabel}
            </Button>
        </>
    )
}