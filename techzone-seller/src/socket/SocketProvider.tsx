'use client'

import { createContext, useEffect, useState } from 'react'
import {io, Socket} from 'socket.io-client'


const URL:string = process.env.NODE_ENV == "development" ? (process.env.SOCKET_URL == undefined ? "http://localhost:4000": process.env.SOCKET_URL) : "http://localhost:4000"

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

    useEffect(() =>
    {
        if(isConnected == false)
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
    
            return () =>
            {
                socketIO?.disconnect()
            }
        }
    },
    [])

    useEffect(() =>
    {
        if(isConnected == false && socketIO != null)
        {
            socketIO.on("connection", (args) =>
            {
                console.log(args)
                setIsConnected(true)
            })

            socketIO.on("disconnect", () =>
            {
                setIsConnected(false)
            })

            const newSocketIO = socketIO.connect()
            setSocketIO(newSocketIO)
        }
    },
    [socketIO])

    return(
        <SocketIOContext.Provider value={{isConnected: isConnected, socket: socketIO}}>
            {children}
        </SocketIOContext.Provider>
    )
}