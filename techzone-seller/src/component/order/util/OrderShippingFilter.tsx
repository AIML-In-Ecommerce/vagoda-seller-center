'use client'

import { Button, Checkbox, Dropdown, Flex, MenuProps, Typography } from "antd"
import { IFilterCallbackProps, IFilterSupportFunction } from "./IFilter"
import { useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"




interface OrderShippingFilterProps
{
    filterKey: string,
    defaultIndex: number,
    filterOption: OrderShippingOptionProps[],
    filterCallback: (result: IFilterCallbackProps) => void
}

interface OrderShippingOptionDisplayProps
{
    index: number,
    label: JSX.Element,
    key: string,
    name: string
}


export interface OrderShippingOptionProps
{
    index: number,
    label: string,
    value: string,
    supportFunction: IFilterSupportFunction | null
}



export default function OrderShippingFilter({filterKey, defaultIndex, filterOption, filterCallback}: OrderShippingFilterProps)
{
    const [selectionDisplay, setSelectionDisplays] = useState<MenuProps["items"]>([])

    useEffect(() =>
    {
        if(filterOption != undefined && filterOption.length > 0)
        {
            const displays = filterOption.map((value: OrderShippingOptionProps) =>
            {
                const item = 
                {
                    index: value.index,
                    key: value.value,
                    label: <Checkbox onChange={() => handleCheckBoxOnChange(value)}>{value.label}</Checkbox>
                }

                return item
            })
            
            setSelectionDisplays(displays)
        }
    },
    [filterOption])

    function handleCheckBoxOnChange(value: OrderShippingOptionProps)
    {
        console.log("inside Checkbox change")
        console.log(value)
    }

    function handleOptionOnChange(value: string, option: OrderShippingOptionDisplayProps | OrderShippingOptionDisplayProps[])
    {
        console.log("inside optionOnChange")
        console.log(value)
        console.log(option)
    }

    return(
        <>
            {/* <Select
            className="min-w-36 w-40"
            mode={"multiple"}
            options={selectionDisplay}
            tagRender={() => <></>}
            onChange={handleOptionOnChange}
            maxTagCount={undefined}
            placeholder={<Typography.Text>Đơn vị vận chuyển</Typography.Text>}
            /> */}

            <Dropdown
                menu={{items: selectionDisplay}}
                trigger={["click"]}
                >
                <Button>
                    <Flex className="w-full" justify="center" align="center" gap={2}>
                        Đơn vị vận chuyển
                        <IoIosArrowDown className="ml-1 text-gray-300"/>
                    </Flex>
                </Button>
            </Dropdown>
        </>
    )
}