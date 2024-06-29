'use client';

import axios from 'axios'
import { APIFunctionResponse, APIResponseSchema } from '../APIResponseSchema'

interface SignUpProps
{
    email: string,
    password: string,
    shopName: string,
    fullName: string
}

const accountType = "SHOP"

export async function POST_SignUpByEmailPassword(props: SignUpProps)
{
    // const API_URL: string = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_AUTH_PORT}`
    const API_URL: string = `${process.env.NEXT_PUBLIC_S_BACKEND_PREFIX}`
    const url = API_URL + "/auth/register/"
    
    const requestBody = 
    {
        email: props.email,
        password: props.password,
        shopName: props.shopName,
        fullName: props.fullName,
        type: accountType
    }


    try
    {
        const response = await axios.post(url, requestBody,
            {
                headers:
                {
                    "Accept": "*",
                },
            }
        )

        return response
    }
    catch(err)
    {
        console.error(err)
        return null
    }
}