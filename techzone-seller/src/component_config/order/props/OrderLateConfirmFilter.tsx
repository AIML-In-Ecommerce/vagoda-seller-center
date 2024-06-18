
import { OrderLateConfirmOption } from "@/component/order/util/OrderLateConfirmFilter";
import { OrderPropType } from "@/model/OrderPropType";

enum OrderOption
{
    Late
}

function getAttributeToFilter(item: OrderPropType)
{
    if(item.orderStatus.length == 1)
    {
        return null
    }
    const length = item.orderStatus.length
    const prevCompletedTime = item.orderStatus[length - 2].complete
    const prevDeadline = item.orderStatus[length - 2].deadline
    const result = [prevCompletedTime, prevDeadline]

    return result
}

function filterFunction(dataSource: OrderPropType[], targetData: any)
{
    if(targetData == null) {} //skip

    let result: OrderPropType[] = []

    dataSource.forEach((value: OrderPropType) =>
    {
        const filterTime = getAttributeToFilter(value)
        if(filterTime != null)
        {
            const prevCompletedTime = filterTime[0]
            const prevDeadline = filterTime[1]

            if(prevCompletedTime && prevDeadline && prevCompletedTime > prevDeadline)
            {
                result.push(value)
            }
        }
    })

    return result
}

function getTagLabel(params: any)
{
    if(params == null) {} //skip

    return "Xác nhận muộn trước đó"
}


export const OrderLateConfirmFilterOption: OrderLateConfirmOption =
{
    label: "Xác nhận muộn trước đó",
    value: OrderOption.Late.toString(),
    supportFunction: 
    {
        getAttributeToFilter: getAttributeToFilter,
        filterFunction: filterFunction,
        getTagLabel: getTagLabel,
    }
}