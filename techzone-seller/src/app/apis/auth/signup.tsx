
import 'axios'
import axios from 'axios'
import { APIFunctionResponse, APIResponseSchema } from '../APIResponseSchema'
import { ShopInfoType } from '@/model/ShopInfoType'


interface SignUpProps
{
    email: string,
    password: string,
    shopName: string,
}

const accountType = "SHOP"

export async function POST_SignUpByEmailPassword(props: SignUpProps)
{
    // const url = process.env.AUTH_API_URL + ""
    const url = "https://9ee80fc7-405f-4d26-99d6-b4b56e81c52e.mock.pstmn.io/seller/auth/sign_up"
    
    const requestBody = 
    {
        email: props.email,
        password: props.password,
        shopName: props.shopName,
        type: accountType,
    }

    try
    {
        const response = await axios.post(url, requestBody, 
            {
                headers:
                {
                    "Content-Type": "application/json"
                },
            }
        )

        const status = response.status
        const data: APIResponseSchema = JSON.parse(JSON.stringify(response.data))
        const message = data.message

        const result: APIFunctionResponse = 
        {
            message: message,
            statusCode: status,
            data: data.data as ShopInfoType
        }

        return result
    }
    catch(err)
    {
        console.error(err)

        const result: APIFunctionResponse =
        {
            statusCode: 500,
            message: "Connection error...",
            data: undefined,
        }

        return result
    }
}