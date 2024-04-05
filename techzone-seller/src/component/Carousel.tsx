"use client";
import { Carousel, Col, Row } from 'antd';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styled from 'styled-components';


const SampleNextArrow = (props: any) => {
    const { className, style, onClick, icon } = props
    return (
        <div
            className={className}
            style={{
                ...style, color: 'white',
                fontSize: '32px',
                lineHeight: '1.5715',
                'margin-right': '50px',
            }}
            onClick={onClick}
        >
            {icon ?? <FaAngleRight />}
        </div>
    )
}

const SamplePrevArrow = (props: any) => {
    const { className, style, onClick, icon } = props
    return (
        <div
            className={className}
            style={{
                ...style, color: 'white',
                fontSize: '32px',
                lineHeight: '1.5715',
                'margin-left': '40px',
            }}
            onClick={onClick}
        >
            {icon ?? <FaAngleLeft />}

        </div>
    )
}

interface CarouselProps {
    autoplay?: boolean;
    arrows?: boolean;
    prevArrow?: JSX.Element;
    nextArrow?: JSX.Element;
    prevArrowStyles?: any;
    nextArrowStyles?: any;
    contents: any;
}

const CarouselWrapper = styled.div`
    .ant-carousel {
        .slick-next {
        &::before {
            content: '';
        }
        }
        .slick-prev { 
        &::before {
            content: '';
        }
        }
    }
    .ant-carousel .slick-prev,
    .ant-carousel .slick-next {
        color: unset;
        font-size: unset;
        z-index: 2;
    }

    .ant-carousel .slick-prev:hover,
    .ant-carousel .slick-next:hover,
    .ant-carousel .slick-prev:focus,
    .ant-carousel .slick-next:focus {
        color: unset;
        z-index: 2;
}
`;


export default function CustomCarousel(props: CarouselProps) {
    const settings = {
        nextArrow: <SampleNextArrow icon={props.nextArrow} style={props.nextArrowStyles}/>,
        prevArrow: <SamplePrevArrow icon={props.prevArrow} style={props.prevArrowStyles}/>,
    }
    return (
        <div>
            <CarouselWrapper>
                <Row justify="center">
                    <Col span={24}>
                        <Carousel autoplay={props.autoplay ?? false}
                            arrows={props.arrows ?? false} {...settings}>
                            {props.contents}
                        </Carousel>
                    </Col>
                </Row>
            </CarouselWrapper>
        </div>
    )
}