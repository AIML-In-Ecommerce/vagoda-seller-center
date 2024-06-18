"use client";
import { Button, Carousel, Col, Row, Skeleton } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import React, { useRef, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styled from 'styled-components';

interface CarouselProps {
    autoplay?: boolean;
    arrows?: boolean;
    prevArrow?: JSX.Element;
    nextArrow?: JSX.Element;
    contents: any;
    loading: boolean
    slidesToShow?: number;
    slidesToScroll?: number;
    infinite?: boolean;
}

const CarouselWrapper = styled(Carousel)`
> .slick-dots li button {
   width: 6px;
   height: 6px;
   border-radius: 100%;
}
> .slick-dots li.slick-active button {
   width: 7px;
   height: 7px;
   border-radius: 100%;
}
`;

export default function CustomCarousel(props: CarouselProps) {
    const ref = useRef<CarouselRef>(null);
    const [leftArrowVisibility, setLeftArrowVisibility] = useState<boolean>(true);
    const [rightArrowVisibility, setRightArrowVisibility] = useState<boolean>(true);

    return (
        <React.Fragment>
            <div className={`relative ${(!props.slidesToShow || props.slidesToShow === 1) ? '' : 'px-10'}`}>
                {
                    props.loading ? <Skeleton active={props.loading} /> : (
                        <>
                            <CarouselWrapper slidesToShow={props.slidesToShow ?? 1}
                                slidesToScroll={props.slidesToScroll ?? 1}
                                infinite={props.infinite ?? true}
                                autoplay={props.autoplay ?? false}
                                ref={ref}
                                draggable
                                afterChange={(current) => {
                                    const slidesPerPage = props.slidesToShow ?? 1;
                                    const totalSlides = props.contents.length;
                                    const lastIndex = totalSlides - 1;
                                    const firstVisibleIndex = current;
                                    const lastVisibleIndex = current + slidesPerPage - 1;

                                    // Check if the current slide is at the beginning
                                    if (firstVisibleIndex === 0) {
                                        setLeftArrowVisibility(false);
                                    } else {
                                        setLeftArrowVisibility(true);
                                    }

                                    // Check if the current slide is at the end
                                    if (lastVisibleIndex >= lastIndex) {
                                        setRightArrowVisibility(false);
                                    } else {
                                        setRightArrowVisibility(true);
                                    }
                                }}>
                                {props.contents}
                            </CarouselWrapper>
                            {
                                props.arrows ? (
                                    <>
                                        {
                                            leftArrowVisibility ? <Button type="text" className="absolute inset-y-1/3 left-0 h-[35%] bg-slate-700/20 hover:bg-slate-700/50"
                                                icon={
                                                    <div className="text-3xl text-white">
                                                        {props.prevArrow ?? <SlArrowLeft />}
                                                    </div>
                                                } onClick={() => ref.current!.prev()} /> : <></>
                                        }
                                        {
                                            rightArrowVisibility ? <Button type="text" className="absolute inset-y-1/3 right-0 h-[35%] bg-slate-700/20 hover:bg-slate-700/50"
                                                icon={
                                                    <div className="text-3xl text-white">
                                                        {props.nextArrow ?? <SlArrowRight />}
                                                    </div>
                                                }
                                                onClick={() => ref.current!.next()} /> : <></>
                                        }
                                    </>
                                ) : <></>
                            }
                        </>)
                }

            </div>
        </React.Fragment >
    )
}