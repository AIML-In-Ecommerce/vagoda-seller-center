'use client';

import OrderAPI from "@/apis/order/order.api"
import { AuthContextFunctions } from "@/context/AuthContext";
import { OrderPropType, OrderStatusValues } from "@/model/OrderPropType";

const OrderService = 
{
    async getOrders(accessToken: string, targetOrderStatus: string)
    {
        const orders = await OrderAPI.getOrdersByShopId(accessToken, targetOrderStatus) as OrderPropType[]
        if(orders == null)
        {
            return [] as OrderPropType[]
        }

        return orders
    },

    async updateOneOrderStatus(accessToken: string, orderId: string)
    {
        const result = await OrderAPI.updateOnOrderStatus(accessToken, orderId, undefined)
        return result
    },

    async cancelOneOrderStatus(accessToken: string, orderId: string)
    {
        const result = await OrderAPI.updateOnOrderStatus(accessToken, orderId, OrderStatusValues.CANCELLED)
        return result
    },

    async updateManyOrdersStatus(accessToken: string, orderIds: string[])
    {
        const result = await OrderAPI.updateManyOrderStatus(accessToken, orderIds, undefined)
        if(result == null)
        {
            return false
        }

        return true
    },


}


export default OrderService