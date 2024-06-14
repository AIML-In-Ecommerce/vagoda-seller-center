"use client";
import React, { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Divider, Flex, Modal, Result } from "antd";
import { AuthContext } from "@/context/AuthContext";
import { ResultStatusType } from "antd/es/result";
import AuthService, { SignInResponseData } from "@/services/auth.service";

interface AuthFormProps {
  showSuccessMsg: (show: boolean) => void;
}

const signInSuccessMessage = "Sign in successfully!"
const signUpSuccessMessage = "Sign up successfully!"
const localErrorMessage = "An error happened that has been identified yet"
const goToLoginPageMessage = "We will direct you to Login page now..."
const goToHomepageMessage =  "We will direct you to Homepage now..."
const unauthorizedMessage = "Unauthorized. Please check your credentials"


export default function AuthForm(props: AuthFormProps) {

  const authContext = useContext(AuthContext)

  const [openModalAuthSuccess, setOpenModalAuthSucess] = useState<boolean>(false)
  const [authModalTitle, setAuthModalTitle] = useState<string>("")

  const [descriptionMessageOfModal, setDescriptionMessageOfModal] = useState<string>(goToLoginPageMessage)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [username, setUsername] = useState("");
  const [shopName, setShopName] = useState<string>("")
  const [isSigninOpeneded, setIsSigninOpeneded] = useState(true);
  const [isSignupOpeneded, setIsSignupOpeneded] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [validAuthMsg, setValidAuthMsg] = useState<string | null>(null);
  const [resultModalState, setResultModalState] = useState<ResultStatusType>("success")

//   const context = useRecoveryContext();
  const router = useRouter();
  const t = useTranslations("Authentication");

  const waitingLottieRef = useRef(null);

  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const waitingLottie = (
    <lottie-player
      id="waitingLottie"
      ref={waitingLottieRef}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/db240567-c95f-4ada-816c-1edf9286f14e/0QXuCKuchC.json"
      style={{ width: "50px", height: "50px" }}
    />
  );

//   context.request = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/send-verification`;

  const isEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(email);
  };

  const isPassword = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    return regex.test(password);
  };

  const isValidAuth = (email: string, password: string) => {
    setValidAuthMsg(null);
    if (!isEmail(email)) {
      setValidAuthMsg(t("email_error_msg"));
      console.error("Error email");
      return false;
    }
    if (!isPassword(password)) {
      setValidAuthMsg(t("password_error_msg"));
      console.error("Error password");
      return false;
    }
    return true;
  };

  const handleLogin = async () => 
  {
    const targetEmail = (new String(email)).toString()
    const targetPassword = (new String(password)).toString()
    if(isValidAuth(email, password) == false)
    {
      return
    }

    const response = await AuthService.signIn(targetEmail, targetPassword)

    if(response.statusCode == 500)
    {
      setValidAuthMsg(localErrorMessage)
    }
    else if(response.statusCode == 200 || response.statusCode == 201)
    {
      //set access token and refresh token to cookie
      
      setResultModalState("success")
      setAuthModalTitle(signInSuccessMessage)
      setDescriptionMessageOfModal(goToHomepageMessage)
      setOpenModalAuthSucess(true)

      if(authContext.methods)
      {
        const authInfo = response.data as SignInResponseData
        const check = authContext.methods.login(authInfo)
        
        if(check == true)
        {
          router.push("/")
        }
        else
        {
          setOpenModalAuthSucess(false)
          setDescriptionMessageOfModal("An involvement has happened that prevents you from your sign-in process")
          setResultModalState("error")
          setDescriptionMessageOfModal("")
        }
      }
    }
    else if(response.statusCode == 401) // Unauthorized
    {
      setValidAuthMsg(unauthorizedMessage)
    }
    else
    {
      setValidAuthMsg(response.message)
    }


  };

  const handleSignup = async () => 
  {
    let check = true
    let message = null
    if(username.length == 0)
    {
      check = false
      message = t("empty_username")
      setValidAuthMsg(message)
    }
    else if(shopName.length == 0)
    {
      check = false
      message = t("empty_shopname")
      setValidAuthMsg(message)
    }
    else if(password != confirmPassword)
    {
      check = false
      message = t("different_password_confirm_password")
      setValidAuthMsg(message)
    }
    else if(isValidAuth(email, password) == false)
    {
      check = false
    }

    if(check == false)
    {
      return
    }
    console.log("here")

    const response = await AuthService.register(email, password, shopName, username)

    if(response.statusCode == 500)
    {
      setValidAuthMsg(localErrorMessage)
    }
    else if(response.statusCode == 201 || response.statusCode == 200) //create account successfully
    {
      setResultModalState("success")
      setOpenModalAuthSucess(true)
      setDescriptionMessageOfModal(goToLoginPageMessage)
      setTimeout(() =>
      {
        goToLogin()
        setOpenModalAuthSucess(false)
      }, 2000)
    }
    else if(response.statusCode == 409)
    {
      setValidAuthMsg("Email has already existed")
    }
  };

  const handleVerification = async () => {
    // context.email = email;
    // const generatedOTP = Math.floor(Math.random() * 9000 + 1000);
    // context.otp = generatedOTP;
    // console.log("RecoveryContext:", context);

    // try {
    //   const response = await axios.post(context.request, {
    //     email: context.email,
    //     otp: context.otp,
    //   });
    //   // console.log("Status code: ", response.status);
    //   if (response.status === 201) {
    //     // props.setSuccessMsg(t("forget_password_request_success_msg"));
    //     props.showSuccessMsg(true);
    //     setTimeout(() => {
    //       props.showSuccessMsg(false);
    //     }, 2000);
    //     context.page = "otp";
    //   }
    // } catch (error: any) {
    //   const errorMessage =
    //     error.response && error.response.data
    //       ? error.response.data.message
    //       : "Failed to send reset password request";
    //   setValidAuthMsg(errorMessage);

    //   console.error("Failed to send reset password request:", error);
    // }
  };

  const goToLogin = async () => {
    setValidAuthMsg(null);
    setIsSignupOpeneded(false);
    setIsSigninOpeneded(true);
    setIsPasswordVisible(false);
  };
  const goToSignup = async () => {
    setValidAuthMsg(null);
    setIsSigninOpeneded(false);
    setIsSignupOpeneded(true);
  };

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function toggleConfirmPasswordVisibility()
  {
    setConfirmPasswordVisible((prevState) => !prevState)
  }

  function goToResetPassword(): void {
    router.push("/forget_password");
  }

  const handleGoogleLogin = async () => {
    try {
      router.push(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/google`);
      // router.push(`http://localhost:4000/auth/google`);
    } catch (error) {
      console.error("Error initiating Google login:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // router.push(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/facebook`);
    //   router.push(`http://localhost:4000/auth/facebook`);
    } catch (error) {
      console.error("Error initiating Facebook login:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col border rounded-xl p-4 m-8 w-96 mx-auto my-auto bg-white">
          <Link href={"/"} prefetch={false} className="text-center">
              <label className="font-semibold text-4xl text-center p-2 text-blue-900">TechZone</label>
          </Link>
        {isSignupOpeneded && (
          <input
            type="text"
            placeholder={t("username")}
            className="input input-bordered w-full max-w-xs m-2 mx-auto px-1 py-2"
            value={username}
            maxLength={15}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        {isSignupOpeneded && (
          <input
            type="text"
            placeholder={t("shop_name")}
            className="input input-bordered w-full max-w-xs m-2 mx-auto px-1 py-2"
            value={shopName}
            maxLength={15}
            onChange={(e) => setShopName(e.target.value)}
          />
        )}

        <input
          type="text"
          placeholder={t("email")}
          className="input input-bordered w-full max-w-xs m-2 mx-auto dark:bg-white dark:text-black px-1 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder={t("password")}
            className="input input-bordered w-full max-w-xs ml-4 mt-2 mx-auto px-1 py-2"
            value={password}
            maxLength={16}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <button
            className="absolute inset-y-0 right-4 flex items-center pt-2 px-4 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button> */}
        </div>
        {
          isSignupOpeneded &&
            <div className="relative">
              <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder={t("confirm_password")}
              className="input input-bordered w-full max-w-xs ml-4 mt-2 mx-auto px-1 py-2"
              value={confirmPassword}
              maxLength={16}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* <button
              className="absolute inset-y-0 right-4 flex items-center pt-2 px-4 text-gray-600"
              onClick={toggleConfirmPasswordVisibility}
            >
              {isConfirmPasswordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button> */}
          </div>
          }
        {validAuthMsg && (
          <label className="flex text-center items-center justify-center my-3 text-red-700">
            {validAuthMsg}
          </label>
        )}

        {isSigninOpeneded && (
          <button
            onClick={() => handleLogin()}
            className="btn btn-info w-full max-w-xs m-4 mx-auto mt-3 hover:bg-blue-600 text-white bg-blue-500 rounded-full py-2"
          >
            {t("signin_btn")}
          </button>
        )}

        {isSignupOpeneded && (
          <button
            onClick={() => handleSignup()}
            className="btn btn-info w-full max-w-xs m-4 mx-auto mt-3 hover:bg-blue-600 text-white bg-blue-500 rounded-full py-2"
          >
            {t("signup_btn")}
          </button>
        )}

        <div>
          <p>{}</p>
        </div>


          <Divider />
          <button
          onClick={() => handleGoogleLogin()}
          className="flex w-full items-center justify-center gap-3.5 font-medium rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-80 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-80 my-4
              hover:bg-gray-200
          "
        >
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_191_13499)">
                <path
                  d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                  fill="#4285F4"
                ></path>
                <path
                  d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                  fill="#34A853"
                ></path>
                <path
                  d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                  fill="#EB4335"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_191_13499">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </span>
          Sign in with Google
        </button>
        <button
          onClick={() => handleFacebookLogin()}
          className="flex w-full items-center justify-center gap-3.5 font-medium rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-80 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-80 mb-4
              hover:bg-gray-200
          "
        >
          <span>
            <img
              alt="presentation image"
              width={30}
              height={30}
              src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
            ></img>
          </span>
          Sign in with Facebook
        </button>

        {isSigninOpeneded && (
          <>
              <div className="w-full h-3 invisible">hidden block</div>
              <label
              onClick={() => goToSignup()}
              className="flex text-center items-center justify-center"
              >
              {t("go_to_signup_mg")}
              <span className="text-blue-700 ml-2 hover:text-blue-500">{t("signup_btn")}</span>
              </label>
          </>
        )}
        {isSignupOpeneded && (
          <>
            <div className="w-full h-3 invisible">hidden block</div>
            <label
            onClick={() => goToLogin()}
            className="flex text-center items-center justify-center">
              {t("go_to_signin_mg")}
              <span className="text-blue-700 ml-2 hover:text-blue-500">{t("signin_btn")}</span>
              </label>
          </>
        )}
        {isSigninOpeneded && (
          <>
            <div className="w-full h-3 invisible">hidden block</div>
            <label
              onClick={() => goToResetPassword()}
              className="flex text-center items-center justify-center italic text-blue-700 ml-2 hover:text-blue-500"
            >
              {t("go_to_password_reset_mg")}
            </label>
          </>
        )}
      </div>
      <Modal
        open={openModalAuthSuccess}
        closable={false}
        footer={[]}
        mask={false}
      >
        <Flex vertical className="w-full h-full" justify="center" align="center">
          <Result 
            status={resultModalState}
            title={authModalTitle}
            subTitle={descriptionMessageOfModal}
          />
          <Flex className="w-full h-full" justify="center" align="center">
            <div className="animate-bounce">
              {waitingLottie}
            </div>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}

