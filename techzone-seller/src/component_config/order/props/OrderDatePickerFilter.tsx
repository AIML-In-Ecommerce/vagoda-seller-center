import { OrderDatePickerFilterOptionProps } from "@/component/order/util/OrderDatePickerFilter";
import { OrderPropType } from "@/model/OrderPropType";




function getAttributeToFilter(item: OrderPropType)
{
    //item.orderStatus[latest_index].time now is the expected time to confirm the delivery
    return item.orderStatus[item.orderStatus.length - 1].time
}

function filterFunction(dataSource: OrderPropType[], targetData: string)
{
    //targetData now is the expected time to confirm the delivery that you want to search,
    //but first, we have to convert it into Date type
    //targetData variable will follow YYYY-MM-DD date-string format
    const targetDate = new Date(targetData).setHours(0,0,0,0)

    let result: OrderPropType[] = []


    dataSource.forEach((value: OrderPropType) =>
    {
        const latestStatusIndex = value.orderStatus.length - 1
        const time = new Date(value.orderStatus[latestStatusIndex].time * 1000).setHours(0,0,0,0)

        if(targetDate == time)
        {
            result.push(value)
        }
    })

    return result
}

function getTagLabel(params: string)
{
    let result = "Dự kiến vào ".concat(params)

    return result
}

export const OrderDatePickerFilterOption: OrderDatePickerFilterOptionProps =
{
    index: 0,
    supportFunction: 
    {
        getAttributeToFilter: getAttributeToFilter,
        filterFunction: filterFunction,
        getTagLabel: getTagLabel
    }
}