import axios from "axios"


export async function GET_getShopInfo(shopId: string)
{
    const API_URL: string = process.env.NEXT_PUBLIC_SHOP_API_URL as string
    const url = API_URL + "/shop_info"

    try
    {
        const response = await axios.get(url, 
            {
                params:
                {
                    shopId: shopId,
                    useShopDetail: false,
                    useDesign: false
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