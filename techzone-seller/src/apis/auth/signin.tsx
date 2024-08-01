import axios from "axios";

interface SignInByEmailPasswordProps
{
    email: string,
    password: string,
}


const accountType = "SHOP"

export async function POST_SignInByEmailPassword(props: SignInByEmailPasswordProps)
{
    //TODO: ask about the url please
    // const API_URL: string = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_AUTH_PORT}`
    const API_URL: string = `${process.env.NEXT_PUBLIC_GATEWAY_PREFIX}`
    const url = API_URL + "/auth/login/"

    try
    {
        const requestBody =
        {
            email: props.email,
            password: props.password,
            type: accountType
        }

        const response = await axios.post(url, requestBody,
            {
                headers: 
                {
                    "Content-Type": "application/json",
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