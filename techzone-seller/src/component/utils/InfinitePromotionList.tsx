import PromotionCard from "@/component/customer/product/PromotionCard"
import { DiscountType, DiscountTypeInfo, PromotionStatus, PromotionType } from "@/model/PromotionType"
import { Button, Flex, Skeleton } from "antd"
import React, { useEffect, useRef, useState } from "react"

interface SetupProps
{
    setup: InfinitePromotionListProps
}

export interface InfinitePromotionListProps
{
    overflowMaxHeight: string,

}

const MockData: PromotionType[] = 
[
    {
        _id: "pro-01",
        name: "Brand Opening Sales 15%",
        description: "Applied for all of our products bought online",
        discountTypeInfo: {
            type: DiscountType.PERCENTAGE,
            value: 15,
            lowerBoundaryForOrder: 0,
            limitAmountToReduce: 1000000
        } as DiscountTypeInfo,
        quantity: 1000,
        activeDate: new Date(),
        expiredDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        createAt: new Date(),
        code: "p001",
        targetProducts: [],
        status: PromotionStatus.UPCOMMING
    },
    {
        _id: "pro-02",
        name: "Sales 06-01",
        description: "Sale 20% up to 100k. Applied when customer buy an item worth at least 20,000k",
        discountTypeInfo: {
            type: DiscountType.PERCENTAGE,
            value: 20,
            lowerBoundaryForOrder: 20000,
            limitAmountToReduce: 100000
        } as DiscountTypeInfo,
        quantity: 1000,
        activeDate: new Date(),
        expiredDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        createAt: new Date(),
        targetProducts: [],
        status: PromotionStatus.UPCOMMING,
        code: "p002"
    },
    {
        _id: "pro-03",
        name: "Big Sale Dell Laptops 1000k for students",
        description: "Applied when a student buys a Dell laptop",
        discountTypeInfo: {
            type: DiscountType.DIRECT_PRICE,
            value: 1000000,
            lowerBoundaryForOrder: 8000000,
            limitAmountToReduce: 1000000
        } as DiscountTypeInfo,
        quantity: 1000,
        activeDate: new Date(),
        expiredDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        createAt: new Date(),
        targetProducts: [],
        status: PromotionStatus.UPCOMMING,
        code: "p003"
    },
    {
        _id: "pro-04",
        name: "Big Sale Lenovo Laptops 1000k for students",
        description: "Applied when a student buys a Lenovo laptop",
        discountTypeInfo: {
            type: DiscountType.DIRECT_PRICE,
            value: 1000000,
            lowerBoundaryForOrder: 8000000,
            limitAmountToReduce: 1000000
        } as DiscountTypeInfo,
        quantity: 1000,
        activeDate: new Date(),
        expiredDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        createAt: new Date(),
        targetProducts: [],
        status: PromotionStatus.UPCOMMING,
        code: "p004"
    },
    {
        _id: "pro-05",
        name: "Big Sale HP Laptops upto 1000k for students",
        description: "Applied when a student buys a HP laptop",
        discountTypeInfo: {
            type: DiscountType.DIRECT_PRICE,
            value: 1000000,
            lowerBoundaryForOrder: 8000000,
            limitAmountToReduce: 1000000
        } as DiscountTypeInfo,
        quantity: 1000,
        activeDate: new Date(),
        expiredDate: new Date(new Date().setDate(new Date().getDate() + 10)),
        createAt: new Date(),
        targetProducts: [],
        status: PromotionStatus.UPCOMMING,
        code: "p001"
    }
]

export default function InfinitePromotionList(setupProps: SetupProps)
{

    const [promotions, setPromotions] = useState<PromotionType[]>([])
    const [selectedPromotions, setSelectedPromotions] = useState<PromotionType[]>([])
    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false)

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

    const displayList: JSX.Element[] | JSX.Element = promotions.length < 1?
    <div className="w-full">
        <Skeleton active />
    </div>:
    promotions.map((value: PromotionType, index: number) =>
    {
        return(
            <div key={value._id + index.toString()} className="w-full bg-green-200">
                <PromotionCard item={value} applyDiscount={handleApplyDiscount} removeDiscount={handleRemoveDiscount} isSelected={false}/>
            </div>
        )
    })

    const LoadMoreButton = isLoadingItems == true? <div className="w-full">{loadingLottie}</div> :
    <Button className="border-none" onClick={handleLoadMoreOnClick}>
        Xem thêm
    </Button>

    return(
        <>
            <Flex className="w-full h-full bg-blue-500 overflow-y-auto py-4" vertical justify="center" align="center"
                style={{maxHeight: `${setupProps.setup.overflowMaxHeight}`}}
            >
                <Flex className="w-4/5" justify="center" vertical align="center">
                    {displayList}
                </Flex>
                <Flex className="w-full" justify="center" align="center">
                    {LoadMoreButton}
                </Flex>
            </Flex>
        </>
    )
}