'use client';

import OrderAPI from "@/apis/order/order.api"
import { AuthContextFunctions } from "@/context/AuthContext";
import { OrderPropType, OrderStatusValues } from "@/model/OrderPropType";

const OrderService = 
{
    async getOrders(shopId: string, targetOrderStatus: string)
    {
        const orders = await OrderAPI.getOrdersByShopId(shopId, targetOrderStatus) as OrderPropType[]
        if(orders == null)
        {
            return [] as OrderPropType[]
        }

        return orders
    },

    async updateOneOrderStatus(shopId: string, orderId: string)
    {
        const result = await OrderAPI.updateOnOrderStatus(shopId, orderId, undefined)
        return result
    },

    async cancelOneOrderStatus(shopId: string, orderId: string)
    {
        const result = await OrderAPI.updateOnOrderStatus(shopId, orderId, OrderStatusValues.CANCELLED)
        return result
    },

    async updateManyOrdersStatus(shopId: string, orderIds: string[])
    {
        const result = await OrderAPI.updateManyOrderStatus(shopId, orderIds, undefined)
        if(result == null)
        {
            return false
        }

        return true
    },


}


export default OrderService