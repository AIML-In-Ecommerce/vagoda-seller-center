'use client';

import { notification } from "antd"
import { NotificationInstance } from "antd/es/notification/interface"
import { createContext, JSXElementConstructor, ReactElement, useMemo } from "react"

interface NotificationContextProviderProps
{
    children: React.ReactNode
}


interface NotificationContextProps
{
    notificationAPI: NotificationInstance,
    notificationContextHolder: ReactElement<any, string | JSXElementConstructor<any>>
}

export const NotificationContext = createContext<NotificationContextProps | null>(null)


export default function NotificationContextProvider({children}: NotificationContextProviderProps)
{
    const [notificationAPI, notificationContextHolder] = notification.useNotification()

    const value: NotificationContextProps = useMemo(() =>
    {   
        const value: NotificationContextProps = 
        {
            notificationAPI: notificationAPI,
            notificationContextHolder: notificationContextHolder
        }

        return value
    }, [notificationAPI, notificationContextHolder])

    return(
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}
