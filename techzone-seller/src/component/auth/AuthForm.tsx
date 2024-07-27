"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Divider, Flex, Modal, Result } from "antd";
import { AuthContext } from "@/context/AuthContext";
import { ResultStatusType } from "antd/es/result";
import AuthService, { SignInResponseData } from "@/services/auth.service";
import GoogleImage from "../../../public/asset/google.256x256.png"
import FacebookImage from "../../../public/asset/facebook.256x256.png"
import VagodaIcon from "../VagodaIcon";
import VagodaText from "../VagodaText";
import { clearTimeout, setTimeout } from "timers";

interface AuthFormProps {
  showSuccessMsg: (show: boolean) => void;
}

const signInSuccessMessage = "Sign in successfully!"
const signUpSuccessMessage = "Sign up successfully!"
const localErrorMessage = "Email hay mật khẩu không hợp lệ"
const goToLoginPageMessage = "Đang chuyển hướng đến trang đang nhập..."
const goToHomepageMessage =  "Đang chuyển hướng đến trang chủ..."
const unauthorizedMessage = "Thông tin đăng nhập không hợp lệ. Vui lòng thử lại"


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

  useEffect(() =>
  {
    let timeout = undefined
    if(validAuthMsg != null)
    {
      timeout =setTimeout(() =>
      {
        setValidAuthMsg(null)
      }, 4000)
    }

    return () => clearTimeout(timeout)
  }, [validAuthMsg])

  const isValidAuth = (email: string, password: string) => {
    setValidAuthMsg(null);
    if (!isEmail(email)) {
      setValidAuthMsg("Email không hợp lệ");
      console.error("Error email");
      return false;
    }
    if (!isPassword(password)) {
      setValidAuthMsg("Mật khẩu không hợp lệ");
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
      message = "Hãy cung cấp tên cửa hàng của bạn"
      setValidAuthMsg(message)
    }
    else if(shopName.length == 0)
    {
      check = false
      message = "Hãy cung cấp tên cửa hàng"
      setValidAuthMsg(message)
    }
    else if(password != confirmPassword)
    {
      check = false
      message = "Xác nhận mật khẩu không chính xác"
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
      setValidAuthMsg("Email đã tồn tại. Mời sử dụng email khác")
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
    // router.push("/forget_password");
  }

  const handleGoogleLogin = async () => {
    // try {
    //   router.push(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/google`);
    //   // router.push(`http://localhost:4000/auth/google`);
    // } catch (error) {
    //   console.error("Error initiating Google login:", error);
    // }
  };

  const handleFacebookLogin = async () => {
    // try {
    //   // router.push(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/facebook`);
    // //   router.push(`http://localhost:4000/auth/facebook`);
    // } catch (error) {
    //   console.error("Error initiating Facebook login:", error);
    // }
  };

  return (
    <>
      <div className="flex flex-col justify-center overflow-auto items-center py-4 px-16 md:px-16 w-full lg:w-1/2 mx-auto my-auto bg-white h-full"
        style={{
          height: `calc(100dvh/100*85)`
        }}
      >
        <Link href={"/"} prefetch={false} className="text-center">
          <div className="flex justify-center items-center">
            <VagodaIcon width={50} height={50} color={"black"} />
            <VagodaText width={100} height={30} color={"black"}/>
          </div>
        </Link>

        <div className="invisible h-6">
          hidden block
        </div>

        {isSigninOpeneded ? 
        <div className="flex w-full justify-center items-center">
          <p className="text-3xl lg:text-4xl font-semibold font-sans">Welcome Back!</p>
        </div> : undefined }

        <div className="flex w-full justify-center items-center">
          <p className="text-sm"></p>
        </div>

        <div className="invisible h-5 md:h-5">hidden block</div>

        {
          isSigninOpeneded ?
          <>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                title={undefined}
                onClick={() => handleGoogleLogin()}
                className="flex w-full w-28 md:w-28 items-center justify-center gap-3.5 font-medium rounded-lg border border-stroke bg-gray py-2 hover:bg-opacity-80 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-80
                    hover:bg-gray-200
                "
                // className="hover:bg-gray-200 p-2 rounded-full"
              >
                <span>
                  <img className="rounded-full" src={GoogleImage.src} alt="Google login" width={20} height={20}/>
                </span>
              </button>
              <button
                type={"button"}
                title={undefined}
                onClick={() => handleFacebookLogin()}
                className="flex w-full items-center w-28 md:w-28 justify-center gap-3.5 font-medium rounded-lg border border-stroke bg-gray py-2 hover:bg-opacity-80 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-80
                    hover:bg-gray-200
                "
                // className="hover:bg-gray-200 p-2 rounded-full"
              >
                <span>
                  <img
                    className="rounded-full"
                    alt="Facebook login"
                    width={20}
                    height={20}
                    src={FacebookImage.src}
                  ></img>
                </span>
              </button>
            </div>
            <Divider />
          </> : undefined
        }

        {isSignupOpeneded && (
          <>
            <div className="flex flex-col items-start justify-center w-full">
              <label className="text-md font-semibold"> 
                Tên người dùng
              </label>
              <input
                type="text"
                placeholder={"Tên người dùng"}
                className="input input-bordered w-full m-2 mx-auto px-1 py-2 bg-gray-100"
                value={username}
                maxLength={15}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start justify-center w-full">
              <label className="text-md font-semibold"> 
                Tên cửa hàng
              </label>
              <input
                type="text"
                placeholder={"Shop A***"}
                className="input input-bordered w-full m-2 mx-auto px-1 py-2 bg-gray-100"
                value={shopName}
                maxLength={15}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="flex flex-col items-start justify-center w-full mt-1">
          <label className="text-md font-semibold">
            Email
          </label>
          <input
            type="text"
            placeholder={"example@email.com"}
            className="input input-bordered w-full m-2 mx-auto dark:bg-white dark:text-black px-1 py-2 bg-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start justify-center w-full mt-1">
          <label className="text-md font-semibold">
            Mật khẩu
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder={"******************"}
            className="input input-bordered w-full m-2 mx-auto px-1 py-2 bg-gray-100"
            value={password}
            maxLength={16}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isSignupOpeneded && (
          <div className="flex flex-col items-start justify-center w-full mt-1">
            <label className="text-md font-semibold">
              Xác nhận mật khẩu
            </label>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder={""}
              className="input input-bordered w-full m-2 mx-auto px-1 py-2 bg-gray-100"
              value={confirmPassword}
              maxLength={16}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        <div className="invisible h-4">hidden block</div>

        {validAuthMsg && (
          <label className="flex text-center items-center justify-center my-3 text-red-700">
            {validAuthMsg}
          </label>
        )}

        {isSigninOpeneded && (
          <button
            onClick={() => handleLogin()}
            className="btn btn-info w-full m-4 mx-auto mt-3 hover:bg-blue-500 text-white bg-blue-700 rounded-full py-2"
          >
            Đăng nhập
          </button>
        )}

        {isSignupOpeneded && (
          <button
            onClick={() => handleSignup()}
            className="btn btn-info w-full m-4 mx-auto mt-3 hover:bg-blue-500 text-white bg-blue-700 rounded-full py-2"
          >
            Đăng ký
          </button>
        )}

        <div>
          <p>{}</p>
        </div>

        {isSigninOpeneded && (
          <>
            <div className="w-full h-3 invisible">hidden block</div>
            <label
              onClick={() => goToSignup()}
              className="flex text-center items-center justify-center"
            >
              Chưa có tài khoản?
              <span className="text-blue-700 ml-2 hover:text-blue-500 font-semibold">
                Đăng ký ngay
              </span>
            </label>
          </>
        )}
        {isSignupOpeneded && (
          <>
            <div className="w-full h-3 invisible">hidden block</div>
            <label
              onClick={() => goToLogin()}
              className="flex text-center items-center justify-center"
            >
              Tôi đã có tài khoản!
              <span className="text-blue-700 ml-2 hover:text-blue-500 font-semibold">
                Đăng nhập
              </span>
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
              Quên mật khẩu!
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

