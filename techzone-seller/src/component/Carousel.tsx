"use client";
import { Button, Carousel, Col, Row, Skeleton } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import React, { useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

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


export default function CustomCarousel(props: CarouselProps) {
    const ref = useRef<CarouselRef>(null);
    return (
        <React.Fragment>
            <div className="relative">
                {
                    props.loading ? <Skeleton active={props.loading} /> : (
                        <>
                            <Carousel slidesToShow={props.slidesToShow ?? 1}
                                slidesToScroll={props.slidesToShow ?? 1}
                                infinite={props.infinite ?? true}
                                autoplay={props.autoplay ?? false}
                                ref={ref}
                                draggable>
                                {props.contents}
                            </Carousel>
                            {
                                props.arrows ? (
                                    <>
                                        <Button type="text" className="absolute inset-y-1/3 h-[35%] bg-slate-700/20 hover:bg-slate-700/50"
                                            icon={
                                                <div className="text-3xl text-white">
                                                    {props.prevArrow ?? <SlArrowLeft />}
                                                </div>
                                            } onClick={() => ref.current!.prev()} />
                                        <Button type="text" className="absolute inset-y-1/3 right-0 h-[35%] bg-slate-700/20 hover:bg-slate-700/50"
                                            icon={
                                                <div className="text-3xl text-white">
                                                    {props.nextArrow ?? <SlArrowRight />}
                                                </div>
                                            }
                                            onClick={() => ref.current!.next()} />
                                    </>
                                ) : <></>
                            }
                        </>)
                }

            </div>
        </React.Fragment >
    )
}