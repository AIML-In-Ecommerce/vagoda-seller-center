'use client'

import { OrderPropType } from "@/model/OrderPropType"
import { Flex, Tag } from "antd"
import { useEffect, useRef, useState } from "react"
import { FilterSetting, IFilterCallbackProps } from "./IFilter"


interface OrderFilterPoolProps
{
    poolKey: string,
    filterPoolSetting: FilterSetting[], 
    dataSource: OrderPropType[],
    filterCallback: (result: OrderFilterPoolCallbackProps) => void
}

interface FilterTagProps
{
    key: string,
    label: string,
    filterFunction: any,
    filterParams: any | null
}

export interface OrderFilterPoolCallbackProps
{
    key: string,
    filterData: OrderPropType[]
}

export default function OrderFilterPool({poolKey, filterPoolSetting, dataSource, filterCallback}: OrderFilterPoolProps)
{
    const [filterTags, setFilterTags] = useState<FilterTagProps[]>([])
    const [filterDisplay, setFilterDisplay] = useState<JSX.Element[]>([])
    const [tagDisplay, setTagDisplay] = useState<JSX.Element[]>([])
    const filterTagsRef = useRef<FilterTagProps[]>()

    filterTagsRef.current = filterTags 

    useEffect(() =>
    {
        const newfilterDisplay = filterPoolSetting.map((value: FilterSetting, index: number) =>
        {
            return(
                <value.filter key={index.toString() + value.key} filterKey={value.key} defaultIndex={value.defaultIndex} filterOption={value.options} filterCallback={handleFilterCallback} />
            )
        })
        setFilterDisplay(newfilterDisplay)

    }, [dataSource])

    useEffect(() =>
    {
        if(filterTags.length != 0)
        {
            let pre_data = dataSource.slice(0, dataSource.length)
            filterTags.forEach((value: FilterTagProps) =>
            {
                pre_data = value.filterFunction(pre_data, value.filterParams)
            })

            const callbackProp: OrderFilterPoolCallbackProps = 
            {
                key: poolKey,
                filterData: pre_data
            }

            filterCallback(callbackProp)
        }
        else
        {
            const callbackProp: OrderFilterPoolCallbackProps = 
            {
                key: poolKey,
                filterData: dataSource
            }

            filterCallback(callbackProp)
        }

        const newTagDisplay:JSX.Element[] = filterTags.map((value: FilterTagProps, index: number) =>
        {

            return(
                <div key={value.key + index.toString() + Date.now().toString()}>
                    <Tag
                        bordered={false}
                        color={"processing"}
                        closable={true}
                        onClose={() => {handleTagOnClose(value.key)}}
                    >
                        {value.label}
                    </Tag>
                </div>
            )
        })
        setTagDisplay(newTagDisplay)

    }, [filterTags])

    function handleTagOnClose(tagKey: string)
    {
        setFilterTags(prevFilterTags => 
            {
                const newFilterTags = [...prevFilterTags].filter((value: FilterTagProps) => value.key != tagKey)
                return newFilterTags
            })

        return
    }

    function handleFilterCallback(result: IFilterCallbackProps)
    {
        console.log("in handleFilterCallback POOL")
        //no filter => remove the relevant filter
        if(result.label.length == 0)
        {
            setFilterTags(prevFilterTags => 
                {
                    const newFilterTags = [...prevFilterTags].filter((value: FilterTagProps) => value.key != result.key)
                    return newFilterTags
                })

            return
        }

        const newTag: FilterTagProps = 
        {
            key: result.key,
            label: result.label,
            filterFunction: result.filterFunction,
            filterParams: result.filterParams
        }

        setFilterTags(prevFilterTags => 
            {
                const newFilterTags = [...prevFilterTags].filter((value: FilterTagProps) => value.key != result.key)
                newFilterTags.push(newTag)
                return newFilterTags
            })
    }

    return(
        <>
            <Flex vertical className="w-full" justify="center" align="center" gap={20}>
                <Flex className="w-full" justify="evenly" align="center" gap={4} wrap={"wrap"}>
                    {filterDisplay}
                </Flex>
                <Flex className="w-full" justify="start" align="center" gap={4}>
                    {tagDisplay}
                </Flex>
            </Flex>
        </>
    )
}