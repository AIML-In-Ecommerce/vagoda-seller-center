"use client";
import AuthForm from "@/component/auth/AuthForm";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useRef, useState } from "react";



export default function Auth() {

  const ref = useRef(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  


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

  return (
    <div>
      {showSuccessMsg && (
        <div className=" w-1/2 mx-auto mt-4 alert alert-success ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Information confirm! We will send an OTP to your email to complete registration!</span>
        </div>
      )}
      <div className="flex justify-center items-center space-x-2 h-screen bg-gray-100">
        <div className="hidden md:block">{lottie}</div>
        <AuthForm showSuccessMsg={setShowSuccessMsg} />
      </div>
    </div>
  );
}
