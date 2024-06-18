import { APIFunctionResponse, APIResponseSchema } from "@/apis/APIResponseSchema"
import { GET_getShopInfo } from "@/apis/info/shop_info.api"
import { ShopInfoType } from "@/model/ShopInfoType"

const defaultErrorResponse: APIFunctionResponse =
{
    statusCode: 500,
    message: "Connection error",
    data: undefined
}


const ShopService = 
{
    async getShopInfoByShopId(shopId: string)
    {
        const response = await GET_getShopInfo(shopId)
        if(response == null)
        {
            return defaultErrorResponse
        }

        const statusCode = JSON.parse(JSON.stringify(response.status))

        if(statusCode != 200 && statusCode != 201)
        {
            const result: APIFunctionResponse =
            {
                statusCode: statusCode,
                message: "Internal Server error",
                data: undefined
            }

            return result
        }

        const data: APIResponseSchema = JSON.parse(JSON.stringify(response.data))
        const shopInfo = data.data as ShopInfoType        

        const result: APIFunctionResponse = 
        {
            statusCode: statusCode,
            message: "Get shop's info successfully",
            data: shopInfo
        }

        return result
    },

}

export default ShopService