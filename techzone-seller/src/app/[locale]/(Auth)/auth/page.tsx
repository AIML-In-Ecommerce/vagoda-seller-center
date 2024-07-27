"use client";
import AuthForm from "@/component/auth/AuthForm";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { clearInterval, setInterval } from "timers";



export default function Auth() {

  const mainImages = [
    {
      index:0,
      url: "https://img.freepik.com/free-photo/vertical-banners-sales-promo_23-2150653389.jpg?t=st=1721921268~exp=1721924868~hmac=b34168d82ee67d23e8682694963d7fdae2c24f346c770834f7d68ff51e1ae7f1&w=360",
      title: "Mở shop ngay",
      subTitle: "Đưa shop của bạn đến nhiều hơn với mọi người!!!"
    },
    {
      index: 1,
      url: "https://img.freepik.com/free-photo/vertical-banners-sales-promo_23-2150653391.jpg?t=st=1721921520~exp=1721925120~hmac=163bea1e7d524c07402dc1d56e84b22a0e6087bcfe6dc8d222363090a091ece7&w=360",
      title: "Tăng giá trị",
      subTitle: "cùng Vagoda tăng doanh thu cho cửa hàng của bạn nhé!!"
    },
    {
      index: 2,
      url: "https://img.freepik.com/free-photo/vertical-banners-sales-promo_23-2150653385.jpg?t=st=1721921392~exp=1721924992~hmac=a9898203dd64d2797cdd5bcc06f0f08ec92e3bc6b4003efb1de8168bc62b77a7&w=360",
      title: "Dễ dàng & Tiện lợi",
      subTitle: "Vagoda sẽ hỗ trợ tất cả các dịch vụ cần thiết cho việc kinh doanh!!"
    },

  ]

  const ref = useRef(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [mainImage, setMainImage] = useState(mainImages[0])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  

  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const lottie = (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/61982b9d-db51-46f4-b213-69f38b1b9746/B1tklFwfI0.json"
      style={{ width: "500px", height: "500px" }}
      className="absolute bottom-4"
    />
  );

  function getRandomImageDisplay()
  {
    const nextIndex = (mainImage.index + 1) % mainImages.length

    const nextDisplay = mainImages[nextIndex]
    
    setMainImage(nextDisplay)
    setCurrentIndex(nextIndex)
  }

  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      getRandomImageDisplay()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div>
    {/* // <div>
    //   {showSuccessMsg && (
    //     <div className=" w-1/2 mx-auto mt-4 alert alert-success ">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="stroke-current shrink-0 h-6 w-6"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="1"
    //           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    //         />
    //       </svg>
    //       <span>Information confirm! We will send an OTP to your email to complete registration!</span>
    //     </div>
    //   )} */}
        <div className="flex justify-center items-center h-dvh bg-gray-100">
          <div className="shadow-lg w-full md:w-4/6" 
            style={{
              height: `calc(100dvh/100*85)`,
              maxHeight: `calc(100dvh/100*85)`,
            }}>
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col lg:w-1/2">
                <div className="w-full">
                  <div className="relative">
                    <img className="hidden lg:block" src={mainImage.url} alt="big-image" style={{
                      height: `calc(100dvh/100*85)`,
                      width: "100%"
                    }}/>

                    <div className="absolute top-0 overflow-hidden hidden md:block z-20 w-full">
                      <div className="flex justify-center items-center w-full"
                        style={{
                          height: `calc(100dvh/100*85)`
                        }}
                      >
                        <div className="flex flex-col w-11/12 justify-center items-center backdrop-blur py-4 space-y-2">
                          <div className="flex justify-start items-center w-11/12">
                            <p className="text-5xl font-semibold font-sans text-white">
                              {mainImage.title}
                            </p>
                          </div>
                          <div className="flex justify-end items-center w-11/12">
                            <p className="text-2xl text-white font-sans ">
                              {mainImage.subTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <AuthForm showSuccessMsg={setShowSuccessMsg} />
            </div>
          </div>
        </div>
    </div>
  );
}
