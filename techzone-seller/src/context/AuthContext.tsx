'use client'

import { ShopInfoType } from "@/model/ShopInfoType";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import AuthService, { RefreshTokenReponseData, SignInResponseData } from "@/services/auth.service";
import ShopService from "@/services/shop.service";


interface AuthContextProviderInitProps
{
    children: ReactNode
}

const authLocalStorageID = "#auth-context-shop-info#"

const matcher: string[] = 
[
    
]

interface AuthContextProps
{
    shopInfo: ShopInfoType | null,
    methods: AuthContextFunctions | null
}

export interface AuthContextFunctions
{
    // validateAuthRequest: (sessionInfoID: string) => boolean,
    login: (authInfo: SignInResponseData) => boolean,
    forceSignIn: () => void,
    logout: () => void,
    refreshToken: () => Promise<string | null>,
    getAccessToken: () => string | null
}

function initLoading()
{
  const storageInfo = localStorage.getItem(authLocalStorageID)
  if(storageInfo != null)
  {
    return JSON.parse(storageInfo) as ShopInfoType
  }
  else
  {
    return null
  }
}


const defaultContextValue: AuthContextProps = 
{
    shopInfo: initLoading(),
    methods: null,
}

export const AuthContext = createContext<AuthContextProps>(defaultContextValue)

export default function AuthContextProvider({children}: AuthContextProviderInitProps)
{
    const accessTokenCookieKey = "#access_token@"
    const refreshTokenCookieKey = "#refresh_token@"

    const [shopInfo, setShopInfo] = useState<ShopInfoType | null>(null)

    // const shopInfoRef = useRef<ShopInfoType| null>(null)

    const router = useRouter()
    const currentPathname = usePathname()

    useEffect(() =>
    {
        try
        {
            const shopInfoStorage = localStorage.getItem(authLocalStorageID)
            if(shopInfoStorage != null)
            {
                setShopInfo((prev) => JSON.parse(shopInfoStorage))
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }, [])

    async function validateClientAuth()
    {
        //TODO: check whether the user has already been authenticated
        const refreshToken = Cookies.get(refreshTokenCookieKey)
        if(refreshToken == null)
        {
            return -1
        }

        const accessToken = Cookies.get(accessTokenCookieKey)

        if(accessToken == null)
        {
            return 0
        }

        return 1
    }

    function login(authInfo: SignInResponseData)
    {
        try
        {
            const stringifiedSellerInfo = JSON.stringify(authInfo.sellerInfo)
            localStorage.setItem(authLocalStorageID, stringifiedSellerInfo)
            Cookies.set(accessTokenCookieKey, authInfo.accessToken, {expires: new Date(authInfo.accessTokenExpiredDate)})
            Cookies.set(refreshTokenCookieKey, authInfo.refreshToken, {expires: new Date(authInfo.refreshTokenExpiredDate)})

            setShopInfo((prev) => authInfo.sellerInfo)
            // shopInfoRef.current = authInfo.sellerInfo
            return true
        }
        catch(error)
        {
            return false
        }
    }

    function getAccessToken()
    {
        return Cookies.get(accessTokenCookieKey)
    }

    async function refreshToken()
    {
        const currentRefreshToken = Cookies.get(refreshTokenCookieKey)
        if(currentRefreshToken == null) //reture false to force the user re-authenticate
        {
            return null
        }
        const response = await AuthService.refreshToken(currentRefreshToken)
        if(response.statusCode == 500)
        {
            return null
        }
        else if(response.statusCode != 200 && response.statusCode != 201)
        {
            return null
        }

        const data = response.data as RefreshTokenReponseData

        Cookies.set(accessTokenCookieKey, data.accessToken, {expires: new Date(data.accessTokenExpiredDate)})
        Cookies.set(refreshTokenCookieKey, data.refreshToken, {expires: new Date(data.refreshTokenExpiredDate)})

        return data.userId
    }

    async function reloadShopInfo(userId: string) {
        //should call this function when the accessToken has existed
        try {
            if (shopInfo == null) {
                const stringifiedInfo = localStorage.getItem(authLocalStorageID);
                if (stringifiedInfo != null) {
                    const initUserInfo = JSON.parse(stringifiedInfo) as ShopInfoType;
                    setShopInfo((prev) => initUserInfo);
                    // shopInfoRef.current = initUserInfo
                    return true;
                }

                const newShopInfo = await ShopService.getShopInfoByShopId(userId);
                if (newShopInfo == null) {
                    return false;
                }

                localStorage.setItem(authLocalStorageID, JSON.stringify(newShopInfo));
                setShopInfo((prev) => newShopInfo as ShopInfoType)
                // shopInfoRef.current = newShopInfo.data
            }
        } 
        catch (error) 
        {
            return false;
        }
    }

    function logout()
    {
        localStorage.removeItem(authLocalStorageID)
        // shopInfoRef.current = null
        setShopInfo(null)
        //remove token here
        Cookies.remove(accessTokenCookieKey)
        Cookies.remove(refreshTokenCookieKey)
    }

    function forceSignIn()
    {
        logout()
        router.replace("/auth")
    }

    const supportMethodValue: AuthContextFunctions =
    {
        // validateAuthRequest: validateAuthRequest,
        login: login,
        logout: logout,
        forceSignIn: forceSignIn,
        refreshToken: refreshToken,
        getAccessToken: getAccessToken,
    }

    const [supportMethods, setSupportMethods] = useState<AuthContextFunctions | null>(supportMethodValue)

    //check authentication
    useEffect(() =>
    {
        console.log("current path: ", currentPathname)
        const storedValue = localStorage.getItem(authLocalStorageID);
        if (storedValue != null && shopInfo == null) 
        {
            const currentuserInfo = JSON.parse(
                storedValue as string
            ) as ShopInfoType;
              setShopInfo((prev) => currentuserInfo);
            // shopInfoRef.current = currentuserInfo
        }
        async function checkAuthentication()
        {   
            // if(matcher.includes(currentPathname) == true)
            // {
                const authCase = await validateClientAuth()
                switch(authCase)
                {
                    case 1:
                    {
                        break;
                    }
                    case 0: //no available access token -> refresh token
                    {
                        const refreshShopId = await refreshToken()
                        if(refreshShopId == null)
                        {
                            // force to login
                            logout()
                            forceSignIn()
                        }
                        else
                        {
                            await reloadShopInfo(refreshShopId)
                        }
                        break;
                    }
                    case -1: // no refresh token -> re-authenticate (login again)
                    {
                        logout()
                        forceSignIn()
                        break;
                    }
                }
            // }
        }

        checkAuthentication()
    }, [currentPathname])

    const value:AuthContextProps = useMemo(() =>
    {
        const newValue: AuthContextProps =
        {
            shopInfo: shopInfo,
            methods: supportMethods
        }

        return newValue
    },
    [shopInfo, supportMethods])

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}