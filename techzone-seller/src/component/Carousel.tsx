"use client";
import { Button, Carousel, Col, Row } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import React, { useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface CarouselProps {
    autoplay?: boolean;
    arrows?: boolean;
    prevArrow?: JSX.Element;
    nextArrow?: JSX.Element;
    contents: any;
}


export default function CustomCarousel(props: CarouselProps) {
    const ref = useRef<CarouselRef>(null);
    return (
        <React.Fragment>
            <div className="carousel-container container relative shadow-lg rounded-lg">
                <Carousel autoplay={props.autoplay ?? false}
                    ref={ref}
                    draggable>
                    {props.contents}
                </Carousel>
                {
                    props.arrows ? (
                        <>
                            <Button type="text" className="absolute inset-y-1/3 h-[35%] bg-slate-700/50"
                                icon={
                                    <div className="text-3xl text-white">
                                        {props.prevArrow ?? <SlArrowLeft />}
                                    </div>
                                } onClick={() => ref.current!.prev()} />
                            <Button type="text" className="absolute inset-y-1/3 right-0 h-[35%] bg-slate-700/50"
                                icon={
                                    <div className="text-3xl text-white">
                                        {props.nextArrow ?? <SlArrowRight />}
                                    </div>
                                }
                                onClick={() => ref.current!.next()} />
                        </>
                    ) : <></>
                }
            </div>
        </React.Fragment >
    )
}