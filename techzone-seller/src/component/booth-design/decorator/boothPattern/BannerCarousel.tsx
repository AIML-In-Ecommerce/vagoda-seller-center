"use client";
import { WidgetType } from "@/model/WidgetType";
import { Carousel, Image, Skeleton } from "antd";
import React, { useEffect, useState } from "react";

interface BannerCarouselProps {
  widget: WidgetType;
}

interface CarouselImageProps {
  _id: string;
  image_url: string;
}

const MockPictures: CarouselImageProps[] = [
  {
    _id: "testing_01",
    image_url:
      "https://images.unsplash.com/photo-1515940279136-2f419eea8051?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "testing_02",
    image_url:
      "https://images.unsplash.com/photo-1591785944213-c8b5b7a75ec6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "testing_03",
    image_url:
      "https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "testing_04",
    image_url:
      "https://images.unsplash.com/photo-1591785944213-c8b5b7a75ec6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "testing_05",
    image_url:
      "https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "testing_06",
    image_url:
      "https://images.unsplash.com/photo-1591785944213-c8b5b7a75ec6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "testing_07",
    image_url:
      "https://images.unsplash.com/photo-1503328427499-d92d1ac3d174?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function BannerCarousel(props: BannerCarouselProps) {
  const [largeBackgroundUrl, setLargeBackgroundUrl] = useState<string>("");
  const [carouselImages, setCarouselImages] = useState<CarouselImageProps[]>(
    []
  );
  const [smallEvents, setSmallEvents] = useState<CarouselImageProps[]>([]);
  const [currentIndexOfSmallEvent, setCurrentIndexOfSmallEvent] =
    useState<number>(-1);
  const [SmallEventsDisplay, setSmallEventsDisplay] = useState<any | undefined>(
    undefined
  );
  const numberSmallEventsDisplayed = 5;

  useEffect(() => {
    //fetch data here

    //testing
    setCarouselImages(MockPictures);
    setLargeBackgroundUrl(MockPictures[0].image_url);
  }, []);

  useEffect(() => {
    //fetch data here
    setSmallEvents(MockPictures);
    setCurrentIndexOfSmallEvent(0);
    handleSmallEventsChange();
  }, []);

  // const SmallEventCardStyle: React.CSSProperties =
  // {
  //     width: "60%",
  //     height:"169px"
  // }

  const CarouselDisplay: any = carouselImages.map(
    (value: CarouselImageProps) => {
      return (
        <div key={value._id} className="w-1/2 max-h-96">
          <Image
            className="w-full h-full"
            src={value.image_url}
            onClick={handleCarouselOnClick}
          />
        </div>
      );
    }
  );

  function handleSmallEventsChange() {
    if (smallEvents.length < 1) {
      setSmallEventsDisplay(<Skeleton active />);
      return;
    } else if (smallEvents.length < numberSmallEventsDisplayed) {
      const result = smallEvents.map((value: CarouselImageProps) => {
        return (
          <div
            key={value._id}
            // style={SmallEventCardStyle}
            className="shadow-sm rounded-md shadow-black hover:shadow-lg hover:shadow-black lg:w-56 lg:h-36"
          >
            <Image
              preview={false}
              className="rounded-md"
              height={"100%"}
              width={"100%"}
              src={value.image_url}
            />
          </div>
        );
      });
      setSmallEventsDisplay(result);
    } else {
      const endIndex =
        (currentIndexOfSmallEvent + numberSmallEventsDisplayed) %
        smallEvents.length;
      let slicedArray: CarouselImageProps[] = [];
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

      const result = slicedArray.map((value: CarouselImageProps) => {
        return (
          <div
            key={value._id}
            // style={SmallEventCardStyle}
            className="shadow-sm rounded-md shadow-black hover:shadow-lg hover:shadow-black lg:w-56 lg:h-36"
          >
            <Image
              preview={false}
              className="rounded-md"
              height={"100%"}
              width={"100%"}
              src={value.image_url}
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
    console.log(currentSlide);
    const slide: CarouselImageProps = carouselImages[currentSlide];
    setLargeBackgroundUrl(slide.image_url);
    setCurrentIndexOfSmallEvent(
      (currentIndexOfSmallEvent + numberSmallEventsDisplayed) %
        smallEvents.length
    );

    handleSmallEventsChange();
  }

  return (
    <div className="mb-10">
      <div
        className="w-full flex flex-col justify-end items-center relative"
        style={LargeBackground}
      >
        <div className="flex flex-col justify-center items-center backdrop-blur-md w-full h-1/2">
          <div className="invisible h-10">hidden block</div>
          <div className="w-3/4 h-1/2">
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
  );
}
