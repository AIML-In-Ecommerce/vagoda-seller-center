
export const OrderStatusValues = 
{
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    SHIPPING: "SHIPPING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
}

export interface ProductInOrder
{
    _id: string,
    image: string,
    name: string,
    originPrice: number,
    purchasedPrice: number,
    quantity: number
}

export interface PromotionInOrder
{
    _id: string,
    name: string,
    discountType: string,
    discountValue: number,
    expiredDate: EpochTimeStamp
}

export interface OrderStatus
{
    status: string,
    time: EpochTimeStamp,
    deadline: EpochTimeStamp,
    complete: EpochTimeStamp | null
}

export type OrderPropType =
{
    _id: string,
    shopId: string,
    user: 
    {
        _id: string,
        name: string,
        phoneNumber: string,
    },
    product: ProductInOrder[],
    promotion: PromotionInOrder[],
    paymentMethod:
    {
        _id: string,
        name: string
    },
    shipping:
    {
        _id: string,
        name: string,
        fee: number
    },
    totalPrice:
    {
        product: number,
        discount: number,
        shipping: number,
        total: number,
        profit: number
    },
    address:
    {
        receiverName: string,
        address: string,
        phoneNumber: string,
        coordinate:
        {
            lng: number,
            lat: number
        },
        label: "HOME",
        isDefault: boolean
    }
    orderStatus: OrderStatus[]
}