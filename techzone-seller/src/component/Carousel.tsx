"use client";
import { Carousel } from 'antd';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styled from 'styled-components';

interface ArrowProps {
    color?: string;
    height?: number;
    margin?: number;
    //...
}

interface CarouselProps {
    autoplay?: boolean;
    arrows?: boolean;
    prevArrow?: JSX.Element;
    nextArrow?: JSX.Element;
    arrowProps?: ArrowProps;
    contents: any;
}

export default function CustomCarousel(props: CarouselProps) {
    const CarouselWrapper = styled.div`
    .ant-carousel .slick-prev,
    .ant-carousel .slick-prev:hover,
    .ant-carousel .slick-prev:focus {
        font-size: 20px;
        height: ${props.arrowProps?.height ?? 30}px;
        left: ${props.arrowProps?.margin ?? 10}px;
        z-index: 2;
        color: ${props.arrowProps?.color ?? 'black'};
    }

    .ant-carousel .slick-next,
    .ant-carousel .slick-next:hover,
    .ant-carousel .slick-next:focus {
        font-size: 20px;
        height: ${props.arrowProps?.height ?? 30}px;
        right: ${props.arrowProps?.margin ?? 10}px;
        z-index: 2;
        color: ${props.arrowProps?.color ?? 'black'};
    }
    `;

    return (
        <CarouselWrapper>
            <Carousel
                autoplay={props.autoplay ?? false}
                arrows={props.arrows ?? false}
                prevArrow={props.prevArrow ?? <FaAngleLeft />}
                nextArrow={props.nextArrow ?? <FaAngleRight />}>
                {props.contents}
            </Carousel>
        </CarouselWrapper>
    )
}