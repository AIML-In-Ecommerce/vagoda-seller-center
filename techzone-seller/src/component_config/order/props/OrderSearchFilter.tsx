import { OrderPropType } from "@/model/OrderPropType";
import { SearchOptionProps } from "../../../component/order/util/OrderSearchFilter";


enum SearchOptionValue
{
    OrderId,
    Username,
    UserPhone,
}

function getOrderId(item: OrderPropType)
{
    return item._id
}

function getUsername(item: OrderPropType)
{
    return item.user.fullName
}

function getUserPhone(item: OrderPropType)
{
    return item.user.phoneNumber
}

//By order ID//////////////////////////////////////

function searchByOrderId(dataSource: OrderPropType[], params: string[])
{
    let result: OrderPropType[] = []

    params.forEach((param: string) => 
    {
        const filterData = dataSource.filter((value: OrderPropType) => getOrderId(value).includes(param))
        result = result.concat(filterData)
    })

    return result
}

function getTagLabel1(params: any | null)
{
    if(params == null)
    {
        return ""
    }
    
    const castedParams = params as string[]
    if(castedParams.length == 0)
    {
        return ""
    }
    let result: string = "Mã đơn hàng: |"

    castedParams.forEach((value: string) =>
    {
        result = result.concat(value + "|")
    })

    return result
}

////////////////////////////////////////////////////
//By Username

function searchByUsername(dataSource: OrderPropType[], params: string[])
{
    let result: OrderPropType[] = []

    params.forEach((param: string) =>
    {
        const filterData = dataSource.filter((value: OrderPropType) => getUsername(value).includes(param))
        result = result.concat(filterData)
    })

    return result
}

function getTagLabel2(params: any| null)
{
    if(params == null)
    {
        return "Tên người đặt"
    }
    
    const castedParams = params as string[]
    if(castedParams.length == 0)
    {
        return ""
    }
    let result: string = "Tên người dùng: |"
    
    castedParams.forEach((value: string) =>
    {
        result = result.concat(value + "|")
    })

    return result
}

/////////////////////////////////////////////////////
//By User's phone

function searchByUserPhoneNumber(dataSource: OrderPropType[], params: string[])
{
    let result: OrderPropType[] = []

    params.forEach((param: string) =>
    {
        const filterData = dataSource.filter((value: OrderPropType) => getUserPhone(value).includes(param))
        result = result.concat(filterData)
    })

    return result
}

function getTagLabel3(params: any| null)
{
    if(params == null)
    {
        return "Số điện thoại"
    }
    
    const castedParams = params as string[]
    if(castedParams.length == 0)
    {
        return ""
    }
    let result: string = "Số điện thoại: |"
    castedParams.forEach((value: string) =>
    {
        result = result.concat(value + "|")
    })

    return result
}


export const OrderSearchOptions: SearchOptionProps[] = 
[
    {
        label: "Mã đơn hàng",
        value: SearchOptionValue.OrderId.toString(),
        index: 0,
        supportFunction: 
        {
            getAttributeToFilter: getOrderId,
            filterFunction: searchByOrderId,
            getTagLabel: getTagLabel1
        }
    },
    {
        label: "Tên người dùng",
        value: SearchOptionValue.Username.toString(),
        index: 1,
        supportFunction: 
        {
            getAttributeToFilter: getUsername,
            filterFunction: searchByUsername,
            getTagLabel: getTagLabel2
        }
    },
    {
        label: "Số điện thoại",
        value: SearchOptionValue.UserPhone.toString(),
        index: 2,
        supportFunction:
        {
            getAttributeToFilter: getUserPhone,
            filterFunction: searchByUserPhoneNumber,
            getTagLabel: getTagLabel3
        }
    }
]