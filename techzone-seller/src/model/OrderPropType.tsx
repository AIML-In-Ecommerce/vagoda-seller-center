import { AttributeProductType } from "./ProductType";

export const OrderStatusValues = 
{
    WAITING_ONLINE_PAYMENT: "WAITING_ONLINE_PAYMENT", // đối với đơn hàng thanh toán trực tuyến như ZaloPay, đơn hàng đang đợi được thanh toán trước (giống Shopee)
    PENDING: "PENDING", // đơn hàng đang chờ xác nhận bởi người bán
    PROCESSING: "PROCESSING", // người bán đã xác nhận đơn hàng => chờ lấy hàng
    SHIPPING: "SHIPPING", // đã chuẩn bị hàng xong và đã giao cho đơn vị vận chuyển
    COMPLETED: "COMPLETED", // giao hàng thành công
    CANCELLED: "CANCELLED",
}

interface CoordinateInOrder
{
    lng: number,
    lat: number
}

export interface ProductInOrder
{
    _id: string;
    name: string;
    images: string[];
    description: string;
    avgRating: number;
    soldQuantity: number;
    purchasedPrice: number;
    originalPrice: number;
    isFlashSale: boolean;
    status: string;
    category: { id: string; name: string };
    subCategory: { id: string; name: string };
    subCategoryType: { id: string; name: string };
    brand: string;
    inventoryAmount: number;
    attribute: AttributeProductType[];
    profit: number;
    platformFee: number;
    quantity: number;
}

export interface PromotionInOrder
{
    _id: string,
    shop: string,
    name: string,
    discountType: string,
    discountValue: number,
    expiredDate: EpochTimeStamp
}

export const PromotionTypeConvention = 
{
    PERCENTAGE: "PERCENTAGE",
    DIRECT_PRICE: "DIRECT_PRICE" 
}

export interface OrderStatus
{
    status: string,
    time: Date,
    deadline: Date,
    complete: Date | null
}

export type OrderPropType =
{
    _id: string,
    shop: {
        _id: string,
        name: string,
        location: string
    },
    user: 
    {
        _id: string,
        name: string,
        phoneNumber: string,
    },
    products: ProductInOrder[],
    promotion: PromotionInOrder,
    paymentMethod:
    {
        kind: string,
        name: string,
        isPaid: boolean,
        paidAt: Date | null
    },
    shippingAddress:
    {
        _id: string,
        receiverName: string,
        street: string,
        idProvince: string,
        idDistrict: string,
        idCommune: string,
        country: string,
        coordinate: CoordinateInOrder | null,
        phoneNumber: string,
        label: string,
        isDefault: boolean,
    },
    totalPrice: number,
    profit: number,
    shippingFee: number,
    orderStatus: OrderStatus[]
}