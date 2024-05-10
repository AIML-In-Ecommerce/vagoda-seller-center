'use client'

import { ShopInfoType } from "@/model/ShopInfoType";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";


interface AuthContextProviderInitProps
{
    children: ReactNode
}

const authLocalStorageID = "#auth-context-session-info-ID"

const matcher: string[] = 
[]

interface AuthContextProps
{
    shopInfo: ShopInfoType | null,
    sessionInfoID: string | null,
    methods: AuthContextFunctions | null
}

interface AuthContextFunctions
{
    validateAuthRequest: (sessionInfoID: string) => boolean,
    logout: () => void
}

const defaultContextValue: AuthContextProps = 
{
    shopInfo: null,
    sessionInfoID: null,
    methods: null,
}

export const AuthContext = createContext<AuthContextProps>(defaultContextValue)

export default function AuthContextProvider({children}: AuthContextProviderInitProps)
{
    const [shopInfo, setShopInfo] = useState<ShopInfoType | null>(null)
    const [sessionInfoID, setSessionInfoID] = useState<string | null>("")

    const router = useRouter()
    const currentPathname = usePathname()

    //check authentication
    useEffect(() =>
    {
        console.log("current pathname: " + currentPathname)

        if(matcher.includes(currentPathname) == true)
        {
            const authCase = validateAuth()
            switch(authCase)
            {
                case 1:
                {
                 
                    break;
                }
                case 0:
                {

                    break;
                }
                case -1:
                {
                    break;
                }
            }
        }

    }, [currentPathname])

    function validateAuthRequest(receivedSessionInfoID: string)
    {
        const stringifiedObject = sessionStorage.getItem(receivedSessionInfoID)
        if(stringifiedObject == null)
        {
            return false
        }

        const parsedObject: ShopInfoType = JSON.parse(stringifiedObject)
        
        localStorage.setItem(authLocalStorageID, receivedSessionInfoID)
        setShopInfo(parsedObject)
        setSessionInfoID(receivedSessionInfoID)

        return true
    }

    function validateAuth()
    {
        //TODO: check whether the user has already been authenticated

        return 1
    }

    function refreshToken()
    {

    }

    function logout()
    {
        if(sessionInfoID)
        {
            sessionStorage.removeItem(sessionInfoID)
        }
        localStorage.removeItem(authLocalStorageID)

        //remove token here
        
    }

    const supportMethodValue: AuthContextFunctions =
    {
        validateAuthRequest: validateAuthRequest,
        logout: logout,

    }

    const [supportMethods, setSupportMethods] = useState<AuthContextFunctions | null>(supportMethodValue)


    const value:AuthContextProps = useMemo(() =>
    {
        const newValue: AuthContextProps =
        {
            shopInfo: shopInfo,
            sessionInfoID: sessionInfoID,
            methods: supportMethods
        }

        return newValue
    },
    [shopInfo, sessionInfoID, supportMethods])

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}