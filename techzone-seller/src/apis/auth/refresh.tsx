import axios from "axios"


export async function POST_refreshToken(refreshToken: string)
{
    // const API_URL: string = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_AUTH_PORT}`
    const API_URL: string = `${process.env.NEXT_PUBLIC_S_BACKEND_PREFIX}`

    const url = API_URL + "/auth/refresh_token/"

    try
    {
        const requestBody = 
        {
            refreshToken: refreshToken
        }

        const response = await axios.post(url, requestBody,
            {
                headers:
                {
                    "Accept": "*"
                }
            }
        )

        return response
    }
    catch(error)
    {
        console.log(error)
        return null
    }
}