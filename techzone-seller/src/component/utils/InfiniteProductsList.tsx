'use client'

import { ProductType } from "@/model/ProductType"
import { Button, Flex, Image, Pagination, Skeleton, Typography } from "antd"
import React, { useEffect, useRef, useState } from "react"
import ProductItem from "./ProductItem"

interface SetupProps
{
    // fetchDataFuntion: (page: number) => Promise<any>
    setup: InfiniteScrollProductsProps
}

export interface InfiniteScrollProductsProps
{
    productsPerRow: number,
    overFlowMaxHeight: string,
    productItemSize: string
}

interface ProductItemProps 
{
    _id: string
    imageLink: string;
    name: string;
    rating: number;
    soldAmount: number;
    price: number;
    isFlashSale: boolean;
    originalPrice: number;
    inWishlist: boolean;
}

enum WrapperType{
    paddingBlock,
    infoBlock
}

interface ProductItemPropsWrapper
{
    type: WrapperType,
    productInfo: ProductItemProps
}

const MockData: ProductType[] = 
[
    {
        _id: "sp-01",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lenovo 15i",
        rating: 4.5,
        soldAmount: 20,
        price: 15000000,
        flashSale: true,
        originalPrice: 17000000,
        category: "CA"
    },
    {
        _id: "sp-02",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell Vostro",
        rating: 4.5,
        soldAmount: 32,
        price: 17000000,
        flashSale: false,
        originalPrice: 17000000,
        category: "C2"
    },
    {
        _id: "sp-03",
        imageLink: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell SuperLight",
        rating: 4.5,
        soldAmount: 10,
        price: 22000000,
        flashSale: true,
        originalPrice: 20000000,
        category: "C1"
    },
    {
        _id: "sp-04",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lenovo 15i",
        rating: 4.5,
        soldAmount: 20,
        price: 15000000,
        flashSale: true,
        originalPrice: 17000000,
        category: "CA"
    },
    {
        _id: "sp-05",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell Vostro",
        rating: 4.5,
        soldAmount: 32,
        price: 17000000,
        flashSale: false,
        originalPrice: 17000000,
        category: "C2"
    },
    {
        _id: "sp-06",
        imageLink: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell SuperLight",
        rating: 4.5,
        soldAmount: 10,
        price: 22000000,
        flashSale: true,
        originalPrice: 20000000,
        category: "C3"
    },
    {
        _id: "sp-07",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lenovo 15i",
        rating: 4.5,
        soldAmount: 20,
        price: 15000000,
        flashSale: true,
        originalPrice: 17000000,
        category: "CA"
    },
    {
        _id: "sp-08",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell Vostro",
        rating: 4.5,
        soldAmount: 32,
        price: 17000000,
        flashSale: false,
        originalPrice: 17000000,
        category: "C2"
    },
    {
        _id: "sp-09",
        imageLink: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell SuperLight",
        rating: 4.5,
        soldAmount: 10,
        price: 22000000,
        flashSale: true,
        originalPrice: 20000000,
        category: "CA"
    },
    {
        _id: "sp-10",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lenovo 15i",
        rating: 4.5,
        soldAmount: 20,
        price: 15000000,
        flashSale: true,
        originalPrice: 17000000,
        category: "C2"
    },
    {
        _id: "sp-11",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell Vostro",
        rating: 4.5,
        soldAmount: 32,
        price: 17000000,
        flashSale: false,
        originalPrice: 17000000,
        category: "CA"
    },
    // {
    //     _id: "sp-12",
    //     imageLink: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     name: "Dell SuperLight",
    //     rating: 4.5,
    //     soldAmount: 10,
    //     price: 22000000,
    //     flashSale: true,
    //     originalPrice: 20000000,
    //     category: "C2"
    // }
]

const paddingBlockProps: ProductType =
{
    _id: "",
    imageLink: "",
    name: "padding",
    rating: 0.0,
    soldAmount: 0,
    price: 0,
    flashSale: false,
    originalPrice: 0,
    category: "Unknown"
}

export default function InfiniteProductsList(setupProps: SetupProps)
{
    const [products, setProducts] = useState<ProductItemProps[]>([])
    const [mainDisplay, setMainDisplay] = useState<JSX.Element>(<Skeleton active />)
    const [currentPagination, setCurrentPagination] = useState<number>(1)
    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false)

    const ref = useRef(null);
    React.useEffect(() => {
      require("@lottiefiles/lottie-player");
    });

    const lottie =
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
        setTimeout(() =>
        {
            setIsLoadingItems(false)
        }, 3000)
        //fetch data here

        //for testing
        const data = MockData.map((value) =>
        {
            const item:ProductItemProps = 
            {
                _id: value._id,
                imageLink: value.imageLink,
                name: value.name,
                rating: value.rating,
                soldAmount: value.soldAmount,
                price: value.price,
                isFlashSale: value.flashSale,
                originalPrice: value.originalPrice,
                inWishlist: false,
                //TODO: fix the inWishlist variable assignment
            }

            return item
        })

        setProducts(data)
    },
    [])

    useEffect(() =>
    {
        setIsLoadingItems(true)
        setTimeout(() =>
        {
            const newDisplay = getSlideOfProductsDisplay()
            setMainDisplay(newDisplay)
            setIsLoadingItems(false)
        }, 3000)
    },
    [products])


    function handleLoadMoreOnClick()
    {
        setIsLoadingItems(true)
        setTimeout(() =>
        {
            setIsLoadingItems(false)
            setCurrentPagination(currentPagination + 1)
            const data = [...MockData]
            const mappedData =  data.map((value: ProductType) =>
            {
                const item:ProductItemProps = 
                {
                    _id: value._id,
                    imageLink: value.imageLink,
                    name: value.name,
                    rating: value.rating,
                    soldAmount: value.soldAmount,
                    price: value.price,
                    isFlashSale: value.flashSale,
                    originalPrice: value.originalPrice,
                    inWishlist: false,
                    //TODO: fix the inWishlist variable assignment
                }
    
                return item
            })
    
            const newProductsItems = [...products].concat(mappedData)
            setProducts(newProductsItems)
        }, 3000)
        //TODO: fetch more data here
        //await fetchDataFunction(currentPage)

    }


    function getSlideOfProductsDisplay()
    {
        if(products.length < 1)
        {
            return <Skeleton active />
        }

        let result: JSX.Element = <></>

        let data = products.map((value: ProductItemProps) =>
        {
            const item: ProductItemPropsWrapper =
            {
                productInfo: value,
                type: WrapperType.infoBlock
            }

            return item
        })

        let numOfRows = data.length / setupProps.setup.productsPerRow

        const remainder = data.length % setupProps.setup.productsPerRow
        //insert padding blocks
        if(remainder != 0 && remainder < setupProps.setup.productsPerRow)
        {
            const paddingBlocks = new Array(setupProps.setup.productsPerRow - remainder).fill(paddingBlockProps).map((value) =>
            {
                const item: ProductItemPropsWrapper =
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
            const left = i* setupProps.setup.productsPerRow
            const right = ((left + setupProps.setup.productsPerRow) > data.length ? data.length : (left + setupProps.setup.productsPerRow))

            const slicedData = data.slice(left, right)

            const rowDisplay = slicedData.map((valueWrapper: ProductItemPropsWrapper) =>
            {
                let isVisible:string = ""
                if(valueWrapper.type == WrapperType.paddingBlock)
                {   
                    isVisible = "invisible"
                }
                const value = valueWrapper.productInfo
                return(
                    <>
                        <div className={isVisible} key={value._id}>
                            <ProductItem
                            size={setupProps.setup.productItemSize}
                            imageLink={value.imageLink} name={value.name} rating={value.rating} 
                            soldAmount={value.soldAmount} price={value.price} isFlashSale={value.isFlashSale} 
                            originalPrice={value.originalPrice} inWishlist={value.inWishlist}/>
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

    const LoadMoreButton = isLoadingItems == false ?
    <Button className="border-none" onClick={handleLoadMoreOnClick}>
        Xem thêm
    </Button> :
    <div>{lottie}</div>

    return(
        <>
            <Flex className="w-full h-full bg-white" vertical justify="center" align="center">
                <div className="overflow-y-auto py-4 w-full" style={{maxHeight: `${setupProps.setup.overFlowMaxHeight}`}}>
                    {mainDisplay}
                </div>
                <Flex className="w-full" justify="center" align="center">
                    {LoadMoreButton}
                </Flex>
            </Flex>
        </>
    )
}