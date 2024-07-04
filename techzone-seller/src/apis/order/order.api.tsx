import axios from "axios"


const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX
const SERVICE_PORT = process.env.NEXT_PUBLIC_ORDER_PORT
const API_URL: string = `${process.env.NEXT_PUBLIC_S_BACKEND_PREFIX}`


const OrderAPI =
{
    async getOrdersByShopId(shopId: string, targetOrderStatus: string)
    {
        const url = `${API_URL}/order/seller/orders`

        try
        {
            const response = await axios.get(url, {
                params:
                {
                    shopId: shopId,
                    orderStatus: targetOrderStatus
                },
            })

            if(response.status == 200)
            {
                const data = response.data
                return data.data
            }

            return []
        }
        catch(error)
        {
            console.log(error)
            return []
        }
    },

    async updateOnOrderStatus(shopId: string, orderId: string, specStatusCode: string | undefined)
    {
        const url = `${API_URL}/order/seller/status/update_one`
        const requestBody = 
        {
            orderId: orderId,
            execTime: new Date(),
            specStatusCode: specStatusCode
        }

        try
        {
            const response = await axios.put(url, requestBody,
                {
                    params:
                    {
                        shopId: shopId
                    }
                }
            )

            if(response.status == 200 || response.status == 201)
            {
                const data = response.data
                return data.data
            }
            else
            {
                return null
            }
        }
        catch(error)
        {
            console.log(error)
            return null
        }
    },

    async updateManyOrderStatus(shopId: string, orderIds: string[], specStatusCode: string | undefined)
    {
        try
        {
            const url = `${API_URL}/order/seller/status/update_many`
            const requestBody = 
            {
                orderIds: orderIds,
                execTime: new Date(),
                specStatusCode: specStatusCode
            }

            const response =  await axios.put(url, requestBody,
                {
                    params:
                    {
                        shopId: shopId
                    }
                }
            )

            if(response.status == 200 || response.status == 201)
            {
                const data = response.data
                return data.data
            }
            else
            {
                return null
            }
        }
        catch(error)
        {
            console.log(error)
            return null
        }
    },


}

export default OrderAPI