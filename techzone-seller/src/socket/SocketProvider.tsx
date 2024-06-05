'use client'

import { createContext, useEffect, useMemo, useState } from 'react'
import {io, Socket} from 'socket.io-client'


const URL:string = process.env.NODE_ENV == "development" ? (process.env.NEXT_PUBLIC_SOCKET_URL == undefined ? "http://localhost:4000": process.env.NEXT_PUBLIC_SOCKET_URL) : "http://localhost:4000"

interface SocketIOProps
{
    children: React.ReactNode
}

export interface SocketIOContextProps
{
    socket: Socket | null,
    isConnected: boolean,
}

const defaultContextValue: SocketIOContextProps = 
{
    socket: null,
    isConnected: false
}

export const SocketIOContext = createContext<SocketIOContextProps>(defaultContextValue)

export default function SocketProvider({children}: SocketIOProps)
{
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [socketIO, setSocketIO] = useState<Socket | null>(null)
    const testingAuthentication = "sakfjaksjflask"

    //start socket after authenticated, so SocketProvider should be bounded by AuthContext
    useEffect(() =>
    {
        if(socketIO == null)
        {
            const newSocketIO = io(URL, 
                {
                    withCredentials: true,
                    extraHeaders: {
                        "Authorization": testingAuthentication
                    },
                    autoConnect: false
                })
        
                setSocketIO(newSocketIO)
        }
    },
    [])

    const value: SocketIOContextProps = useMemo(() =>
    {

        if(isConnected == false && socketIO != null)
        {

            socketIO.on("connection", (args) =>
            {
                setIsConnected(true)
            })

            socketIO.on("disconnect", (reason: Socket.DisconnectReason) =>
            {
                setIsConnected(false)
                if(reason == "ping timeout")
                {
                    socketIO.connect()
                }   
                else if(reason == "io server disconnect")
                {
                    socketIO.disconnect()
                    setSocketIO(null)
                }             
            })

            socketIO.connect()
        }

        return {
            isConnected: isConnected,
            socket: socketIO
        }
    },
    [isConnected, socketIO])

    return(
        <SocketIOContext.Provider value={value}>
            {children}
        </SocketIOContext.Provider>
    )
}