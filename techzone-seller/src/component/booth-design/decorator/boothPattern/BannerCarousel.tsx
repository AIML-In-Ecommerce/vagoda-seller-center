"use client";
import { BannerElement, WidgetType } from "@/model/WidgetType";
import { Carousel, Image, Skeleton } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import CustomEmpty from "../mini/CustomEmpty";

interface BannerCarouselProps {
  widget: WidgetType;
}

export default function BannerCarousel(props: BannerCarouselProps) {
  const [largeBackgroundUrl, setLargeBackgroundUrl] = useState<string>("");
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [smallEvents, setSmallEvents] = useState<string[]>([]);
  const [currentIndexOfSmallEvent, setCurrentIndexOfSmallEvent] =
    useState<number>(-1);
  const [SmallEventsDisplay, setSmallEventsDisplay] = useState<any | undefined>(
    undefined
  );
  const numberSmallEventsDisplayed = 5;

  const [images, setImages] = useState<string[]>([]);

  const element = useMemo(() => {
    return props.widget.element as BannerElement;
  }, [props.widget.element]);

  useEffect(() => {
    setImages(element.images);
  }, [element.images]);

  useEffect(() => {
    if (images.length > 0) {
      setCarouselImages(images);
      setLargeBackgroundUrl(images[0]);
      setSmallEvents(images);
      setCurrentIndexOfSmallEvent(0);
      handleSmallEventsChange();
    }
  }, [images, props.widget.element]);

  // const SmallEventCardStyle: React.CSSProperties =
  // {
  //     width: "60%",
  //     height:"169px"
  // }

  const CarouselDisplay: any = carouselImages.map((value, index) => {
    return (
      <div key={index} className="flex max-w-1/2 max-h-96 items-center">
        <Image
          className="w-full h-full"
          src={value}
          onClick={handleCarouselOnClick}
        />
      </div>
    );
  });

  function handleSmallEventsChange() {
    if (smallEvents.length < 1) {
      setSmallEventsDisplay(<Skeleton active />);
      return;
    } else if (smallEvents.length < numberSmallEventsDisplayed) {
      const result = smallEvents.map((value, index) => {
        return (
          <div
            key={index}
            // style={SmallEventCardStyle}
            className="shadow-sm rounded-md shadow-black hover:shadow-lg hover:shadow-black lg:w-56 lg:h-36"
          >
            <Image
              preview={false}
              className="rounded-md"
              height={"100%"}
              width={"100%"}
              src={value}
            />
          </div>
        );
      });
      setSmallEventsDisplay(result);
    } else {
      const endIndex =
        (currentIndexOfSmallEvent + numberSmallEventsDisplayed) %
        smallEvents.length;
      let slicedArray: string[] = [];
      if (endIndex < currentIndexOfSmallEvent) {
        slicedArray = slicedArray.concat(
          smallEvents.slice(currentIndexOfSmallEvent)
        );
        slicedArray = slicedArray.concat(smallEvents.slice(0, endIndex));
      } else {
        slicedArray = slicedArray.concat(
          smallEvents.slice(currentIndexOfSmallEvent, endIndex)
        );
      }

      const result = slicedArray.map((value, index) => {
        return (
          <div
            key={index}
            // style={SmallEventCardStyle}
            className="shadow-sm rounded-md shadow-black hover:shadow-lg hover:shadow-black lg:w-56 lg:h-36"
          >
            <Image
              preview={false}
              className="rounded-md"
              height={"100%"}
              width={"100%"}
              src={value}
            />
          </div>
        );
      });

      setSmallEventsDisplay(result);
    }
  }

  const LargeBackground: React.CSSProperties = {
    background: `url(${largeBackgroundUrl})`,
  };

  function handleCarouselOnClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    console.log("picture clicked");
  }

  function afterCarouselChange(currentSlide: number) {
    const slide = carouselImages[currentSlide];
    setLargeBackgroundUrl(slide);
    setCurrentIndexOfSmallEvent(
      (currentIndexOfSmallEvent + numberSmallEventsDisplayed) %
        smallEvents.length
    );

    handleSmallEventsChange();
  }

  return (
    <div>
      {(images.length > 0 && (
        <div className="mb-10">
          <div
            className="w-full flex flex-col justify-end items-center relative rounded-xl"
            style={LargeBackground}
          >
            <div className="flex flex-col justify-center items-center backdrop-blur-md w-full h-1/6">
              <div className="invisible h-10">hidden block</div>
              <div className="w-1/2 h-full">
                <Carousel
                  autoplay={true}
                  style={{ height: "100%" }}
                  afterChange={afterCarouselChange}
                >
                  {CarouselDisplay}
                </Carousel>
              </div>
              <div className="invisible h-10">hidden block</div>
            </div>
          </div>
        </div>
      )) || (
        <div className="bg-white p-10 my-5 rounded-xl">
          <CustomEmpty />
        </div>
      )}
    </div>
  );
}
