'use client'

import { DiscountType, PromotionType } from "@/model/PromotionType"
import { Button, Flex, Skeleton } from "antd"
import React, { useEffect, useRef, useState } from "react"
import PromotionCard from "../booth-design/decorator/mini/PromotionCard"

interface SetupProps
{
    setup: InfinitePromotionListProps
}

export interface InfinitePromotionListProps
{
    overflowMaxHeight: string,
    promotionsPerRow: number,
}


enum WrapperType{
    paddingBlock,
    infoBlock
}

interface ItemPropsWrapper
{
    type: WrapperType,
    productInfo: PromotionType
}

const paddingBlockProps: PromotionType =
{
    _id: (Math.random()*10000).toString(),
    name: "",
    description: "",
    discountType: 0,
    discountValue: -1, 
    upperBound: -1,
    lowerBound: -1,
    quantity: -1,
    activeDate: "",
    expiredDate: "",
    createdAt: "",
    code: "",
}

const MockData: PromotionType[] = 
[
    {
        _id: "pro-01",
        name: "Brand Opening Sales 15%",
        description: "Applied for all of our products bought online",
        discountType: DiscountType.PERCENTAGE,
        discountValue: 15,
        upperBound: 1000000,
        lowerBound: 0,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02",
        code: ""
    },
    {
        _id: "pro-02",
        name: "Sales 06-01",
        description: "Sale 20% up to 100k. Applied when customer buy an item worth at least 20,000k",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 20,
        upperBound: 100000,
        lowerBound: 20000,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02",
        code: ""
    },
    {
        _id: "pro-03",
        name: "Big Sale Dell Laptops 1000k for students",
        description: "Applied when a student buys a Dell laptop",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 1000000,
        upperBound: 1000000,
        lowerBound: 8000000,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02",
        code: ""
    },
    {
        _id: "pro-04",
        name: "Big Sale Lenovo Laptops 1000k for students",
        description: "Applied when a student buys a Lenovo laptop",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 1000000,
        upperBound: 1000000,
        lowerBound: 8000000,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02",
        code: ""
    },
    {
        _id: "pro-05",
        name: "Big Sale HP Laptops upto 1000k for students",
        description: "Applied when a student buys a HP laptop",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 1000000,
        upperBound: 1000000,
        lowerBound: 8000000,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02",
        code: ""
    }
]

export default function InfinitePromotionList(setupProps: SetupProps)
{

    const [promotions, setPromotions] = useState<PromotionType[]>([])
    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false)
    const [mainDisplay, setMainDisplay] = useState<JSX.Element>(<Skeleton active />)

    const ref = useRef(null);
    React.useEffect(() => {
      require("@lottiefiles/lottie-player");
    });

    const loadingLottie =
        <lottie-player
          id="firstLottie"
          ref={ref}
          autoPlay
          loop
          mode="normal"
          src="https://lottie.host/db240567-c95f-4ada-816c-1edf9286f14e/0QXuCKuchC.json"
          style={{height: "60px"}}
        ></lottie-player>


    useEffect(() =>
    {
        
        setIsLoadingItems(true)
        
        //for testing
        setTimeout(() =>
        {
            setPromotions(MockData)
            setIsLoadingItems(false)
        }, 3000)

        //fetch data here

    },
    [])

    useEffect(() =>
    {
        setIsLoadingItems(true)
        setTimeout(() =>
        {
            const newDisplay = getSlideOfPromotionDisplay()
            setMainDisplay(newDisplay)
            setIsLoadingItems(false)
        }, 3000)
    },
    [promotions])

    function handleApplyDiscount(item: PromotionType)
    {

    }

    function handleRemoveDiscount(item: PromotionType)
    {

    }

    function handleLoadMoreOnClick()
    {
        setIsLoadingItems(true)

        setTimeout(() =>
        {
            setIsLoadingItems(false)
            const newPromotions = [...promotions].concat([...MockData])
            setPromotions(newPromotions)
        }, 3000)
    }

    function getSlideOfPromotionDisplay()
    {
        if(promotions.length < 1)
        {
            return <Skeleton active />
        }

        let result: JSX.Element = <></>

        let data = promotions.map((value: PromotionType) =>
        {
            const item: ItemPropsWrapper =
            {
                productInfo: value,
                type: WrapperType.infoBlock
            }

            return item
        })

        let numOfRows = data.length / setupProps.setup.promotionsPerRow

        const remainder = data.length % setupProps.setup.promotionsPerRow
        //insert padding blocks
        if(remainder != 0 && remainder < setupProps.setup.promotionsPerRow)
        {
            const paddingBlocks = new Array(setupProps.setup.promotionsPerRow - remainder).fill(paddingBlockProps).map((value) =>
            {
                const item: ItemPropsWrapper =
                {
                    productInfo: value,
                    type: WrapperType.paddingBlock
                }
                return item
            })
            data = data.concat(paddingBlocks)

            numOfRows = numOfRows + 1
        }

        const wrapper:JSX.Element[] = []
        
        for(let i = 0; i < numOfRows; i++)
        {
            const left = i* setupProps.setup.promotionsPerRow
            const right = ((left + setupProps.setup.promotionsPerRow) > data.length ? data.length : (left + setupProps.setup.promotionsPerRow))

            const slicedData = data.slice(left, right)

            const rowDisplay = slicedData.map((valueWrapper: ItemPropsWrapper) =>
            {
                let isVisible:string = ""
                if(valueWrapper.type == WrapperType.paddingBlock)
                {   
                    isVisible = "invisible"
                }
                const value = valueWrapper.productInfo
                return(
                    <>
                        <div className={isVisible + " w-full"} key={value._id}>
                            <PromotionCard item={value} isSelected={false} applyDiscount={handleApplyDiscount} removeDiscount={handleRemoveDiscount}/>
                        </div>
                    </>
                )
            })

            wrapper.push(
                <Flex key={i.toString()} className="w-full" justify="center" align="center" gap={6}>
                    {rowDisplay}
                </Flex>
            )

        }

        // result = <Flex className="w-11/12" vertical={true} justify="center" align="center">
        //     {wrapper}
        // </Flex>

        result = <Flex vertical className="w-full" justify="center" align="center" gap={20}>
            {wrapper}
        </Flex>

        return result
    }

    // const displayList: JSX.Element[] | JSX.Element = promotions.length < 1?
    // <div className="w-full">
    //     <Skeleton active />
    // </div>:
    // promotions.map((value: PromotionType, index: number) =>
    // {
    //     return(
    //     )
    // })

    const LoadMoreButton = isLoadingItems == true? <div className="w-full">{loadingLottie}</div> :
    <Button className="border-none" onClick={handleLoadMoreOnClick}>
        Xem thêm
    </Button>

    return(
        <>
            <Flex className="w-full h-full bg-white" vertical justify="center" align="center">
                <div className="overflow-y-auto py-4 w-full" style={{maxHeight: `${setupProps.setup.overflowMaxHeight}`}}>
                    {mainDisplay}
                </div>
                <Flex className="w-full" justify="center" align="center">
                    {LoadMoreButton}
                </Flex>
            </Flex>
        </>
    )
}