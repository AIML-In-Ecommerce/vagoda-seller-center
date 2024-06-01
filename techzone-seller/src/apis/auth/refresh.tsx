import axios from "axios"


export async function POST_refreshToken(refreshToken: string)
{
    const API_URL: string = process.env.NEXT_PUBLIC_AUTH_API_URL as string
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