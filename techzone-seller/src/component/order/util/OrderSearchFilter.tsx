'use client'

import { Flex, Select, Typography } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { useEffect, useState } from "react"
import { IFilterCallbackProps, IFilterSupportFunction } from "./IFilter"


interface OrderSearchFilterProps
{
    filterKey: string,
    filterOption: SearchOptionProps[],
    defaultIndex: number,
    filterCallback: (result: IFilterCallbackProps) => void
}

interface searchOptionDisplayProps
{
    index: number,
    label: JSX.Element,
    value: string,
    name: string
}

export interface SearchOptionProps
{
    index: number,
    label: string,
    value: string,
    supportFunction: IFilterSupportFunction | null
}

const initSearchOption: SearchOptionProps = 
{
    index: 0,
    label: "",
    value: "-1",
    supportFunction: null
}

export default function OrderSearchFilter({filterKey ,filterOption, defaultIndex, filterCallback}: OrderSearchFilterProps)
{
    const [selectedSearchOptionValue, setSelectedSearchOptionValue] = useState<string>("0")
    const [searchOption, setSearchOption] = useState<SearchOptionProps>(initSearchOption)
    const [searchOptionsDisplay, setSearchOptionsDisplay] = useState<any>([])

    useEffect(() =>
    {
        if(filterOption != undefined && filterOption.length > 0 && defaultIndex != undefined)
        {
            const defaultOption = filterOption[defaultIndex]
            setSelectedSearchOptionValue(defaultOption.value.toString())
            setSearchOption(defaultOption)
            const newfilterOptionsDisplay = filterOption.map((value: SearchOptionProps) =>
            {
                const display: searchOptionDisplayProps = 
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

            setSearchOptionsDisplay(newfilterOptionsDisplay)
        }
    },  
    [filterOption])


    function handleSearchOptionOnChange(value: string, option: searchOptionDisplayProps | searchOptionDisplayProps[])
    {
        const index = (option as searchOptionDisplayProps).index
        setSelectedSearchOptionValue(value)
        setSearchOption(filterOption[index])
    }

    function handleSearchTextOnChange(value: string | string[])
    {
        const castedValue = value as string[]
        
        const supportFunction = searchOption.supportFunction

        if(supportFunction != null)
        {
            const callbackResult: IFilterCallbackProps =
            {
                key: filterKey,
                label: supportFunction.getTagLabel(castedValue) as string,
                filterFunction: supportFunction.filterFunction,
                filterParams: castedValue
            }

            filterCallback(callbackResult)
        }
        else
        {
            const callbackResult: IFilterCallbackProps =
            {
                key: filterKey,
                label: "",
                filterFunction: supportFunction,
                filterParams: castedValue
            }

            filterCallback(callbackResult)
        }    
    }
    
    return(
        <>
            <Flex className="min-w-96 w-1/2" align="center" gap={4}>
                <Select
                    className="min-w-36 w-48"
                    value={selectedSearchOptionValue}
                    onChange={handleSearchOptionOnChange}
                    options={searchOptionsDisplay}
                />
                <Select 
                    className="w-full"
                    mode={"tags"}
                    tokenSeparators={[',']}
                    onChange={handleSearchTextOnChange}
                />
            </Flex>
        </>
    )
}