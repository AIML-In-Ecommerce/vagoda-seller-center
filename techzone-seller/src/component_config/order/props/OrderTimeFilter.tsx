import { OrderPropType } from "@/model/OrderPropType";
import { OrderTimeOptionProps } from "../../../component/order/util/OrderTimeFilter";


enum OrderTimeOptionValue
{
    Today,
    SevenDay,
    ThirtyDay,
    All,
    Custom
}

function getAttributeToFilter(item: any)
{
    const castedItem = item as OrderPropType
    const latestStatusIndex = castedItem.orderStatus.length
    return castedItem.orderStatus[latestStatusIndex - 1].time
}

////////////////////////////////////////////
//Filter today

function filterToDay(dataSource: any[])
{
    let result: OrderPropType[] = []
    const today = new Date(new Date().setHours(0, 0, 0, 0))

    dataSource.forEach((value: any) =>
    {
        const timestamp = getAttributeToFilter(value) * 1000
        const date = new Date(new Date(timestamp).setHours(0,0,0,0))
        if(date == today)
        {
            const castedValue = value as OrderPropType
            result.push(castedValue)
        }
    })

    return result 
}

function getTagLabel1(params: any | null)
{
    if(params == null)
    {
        // do nothing
    }
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const result = "Từ ngày ".concat(today.toDateString())
    return result
}

////////////////////////////////////////////////
//Filter 7 days

function filter7Days(dataSource: any[])
{
    let result: OrderPropType[] = []
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const sevenDayBefore = new Date(new Date(today).setDate(today.getDate() - 7))

    dataSource.forEach((value: any) =>
    {
        const timestamp = getAttributeToFilter(value)*1000
        const date = new Date(new Date(timestamp).setHours(0,0,0,0))
        if(date <= today && date >= sevenDayBefore)
        {
            const castedValue = value as OrderPropType
            result.push(castedValue)
        }
    })

    return result
}

function getTagLabel2(params: any | null)
{
    if(params == null)
    {
        // do nothing
    }
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const sevenDayBefore = new Date(new Date(today).setDate(today.getDate() - 7))
    const result = "Từ ngày ".concat(today.toDateString()).concat(" đến ngày ").concat(sevenDayBefore.toDateString())
    return result
}

////////////////////////////////////////////////
//Filter 30 days

function filter30Days(dataSource: any[])
{
    let result: OrderPropType[] = []
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const thirtyDayBefore = new Date(new Date(today).setDate(today.getDate() - 30))

    dataSource.forEach((value: any) =>
    {
        const timestamp = getAttributeToFilter(value)*1000
        const date = new Date(new Date(timestamp).setHours(0,0,0,0))
        if(date <= today && date >= thirtyDayBefore)
        {
            const castedValue = value as OrderPropType
            result.push(castedValue)
        }
    })

    return result
}

function getTagLabel3(params: any | null)
{
    if(params == null)
    {
        // do nothing
    }
    const today = new Date(new Date().setHours(0, 0, 0, 0))
    const thirtyDayBefore = new Date(new Date(today).setDate(today.getDate() - 30))
    const result = "Từ ngày ".concat(today.toDateString()).concat(" đến ngày ").concat(thirtyDayBefore.toDateString())
    return result
}
/////////////////////////////////////////////////////
//Filter all time

function filterAllTime(dataSource: any[])
{
    let result: OrderPropType[] = dataSource as OrderPropType[]

    return result;
}

function getTagLabel4(params: any | null)
{
    if(params == null)
    {
        // do nothing
    }
    const result = "Toàn thời gian"
    return result
}

////////////////////////////////////////////////////////

export const OrderTimeOptions: OrderTimeOptionProps[] =
[
    {
        index: 0,
        label: "Hôm nay",
        value: OrderTimeOptionValue.Today.toString(),
        supportFunction: 
        {
            getAttributeToFilter: getAttributeToFilter,
            filterFunction: filterToDay,
            getTagLabel: getTagLabel1
        }
    },
    {
        index: 1,
        label: "7 ngày qua",
        value: OrderTimeOptionValue.SevenDay.toString(),
        supportFunction:
        {
            getAttributeToFilter: getAttributeToFilter,
            filterFunction: filter7Days,
            getTagLabel: getTagLabel2
        }
    },
    {
        index: 2,
        label: "30 ngày qua",
        value: OrderTimeOptionValue.ThirtyDay.toString(),
        supportFunction:
        {
            getAttributeToFilter: getAttributeToFilter,
            filterFunction: filter30Days,
            getTagLabel: getTagLabel3
        }
    },
    {
        index: 3,
        label: "Toàn thời gian",
        value: OrderTimeOptionValue.All.toString(),
        supportFunction:
        {
            getAttributeToFilter: getAttributeToFilter,
            filterFunction: filterAllTime,
            getTagLabel: getTagLabel4
        }
    },
    {
        index: 4,
        label: "Tùy chỉnh",
        value: OrderTimeOptionValue.Custom.toString(),
        supportFunction: null
    }
]