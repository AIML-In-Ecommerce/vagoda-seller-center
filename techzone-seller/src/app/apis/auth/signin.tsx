import axios from "axios";
import { env } from "process";
import { APIFunctionResponse, APIResponseSchema } from "../APIResponseSchema";

interface SignInByEmailPasswordProps
{
    email: string,
    password: string,
}

export async function POST_SignInByEmailPassword(props: SignInByEmailPasswordProps)
{
    //TODO: ask about the url please
    // const url = process.env.AUTH_API_URL + ""
    const url = "https://9ee80fc7-405f-4d26-99d6-b4b56e81c52e.mock.pstmn.io/seller/auth/sign_in"

    try
    {
        const requestBody =
        {
            email: props.email,
            password: props.password
        }

        const response = await axios.post(url, requestBody,
            {
                headers: 
                {
                    "Content-Type": "application/json"
                }
            }
        )

        const statusCode = JSON.parse(JSON.stringify(response.status))
        const data: APIResponseSchema = JSON.parse(JSON.stringify(response.data))

        const result: APIFunctionResponse = 
        {
            statusCode: statusCode,
            message: data.message,
            data: data.data
        }

        return result
    }
    catch(err)
    {
        console.error(err)

        const result: APIFunctionResponse =
        {
            statusCode: 500,
            message: "Unknown error...",
            data: undefined,
        }

        return result
    }
}