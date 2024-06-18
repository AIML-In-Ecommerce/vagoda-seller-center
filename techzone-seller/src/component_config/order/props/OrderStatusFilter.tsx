import { OrderStatusOptionProps } from "@/component/order/util/OrderStatusFilter";
import { OrderPropType } from "@/model/OrderPropType";


enum OptionValue
{
    Processing,
    Expired,
    All
}

function getAttributeToFilterByProcessingStatus(order: OrderPropType)
{
    return order.orderStatus[order.orderStatus.length - 1].deadline
}

function filterByProcessingStatus(dataSource: OrderPropType[], targetData: any)
{
    if(targetData == null){} // skip

    let result: OrderPropType[] = []
    const today = Date.now()

    dataSource.forEach((value: OrderPropType) =>
    {
        const deadline = value.orderStatus[value.orderStatus.length - 1].deadline * 1000

        if(deadline > today || deadline == today)
        {
            result.push(value)
        }
    })
    
    return result
}

function getTagLabelByProcessingStatus(params: any)
{
    if(params == null){}

    return "Trạng thái: Đang chờ"
}

function filterByExpiredStatus(dataSource: OrderPropType[], targetData: any)
{
    if(targetData == null){} // skip

    let result: OrderPropType[] = []
    const today = Date.now()

    dataSource.forEach((value: OrderPropType) =>
    {
        const deadline = value.orderStatus[value.orderStatus.length - 1].deadline * 1000
        if(deadline < today)
        {
            result.push(value)
        }
    })
    
    return result
}

function getTagLabelByExpiredStatus(params: any)
{
    if(params == null){}

    return "Trạng thái: Đã quá hạn"
}

function filterByAllStatus(dataSource: OrderPropType[], targetData: any)
{
    if(targetData == null){} // skip

    let result: OrderPropType[] = Array.from(dataSource)
    
    return result
}

function getTagLabelByAllStatus(params: any)
{
    if(params == null){}

    return "Trạng thái: Tất cả"
}

export const OrderStatusFilterOptions: OrderStatusOptionProps[] =
[
    {
        index: 0,
        value: OptionValue.Processing.toString(),
        label: "Đang chờ",
        supportFunction: 
        {
            getAttributeToFilter: getAttributeToFilterByProcessingStatus,
            filterFunction: filterByProcessingStatus,
            getTagLabel: getTagLabelByProcessingStatus,
        }
    },
    {
        index: 1,
        value: OptionValue.Expired.toString(),
        label: "Đã quá hạn",
        supportFunction: 
        {
            getAttributeToFilter: getAttributeToFilterByProcessingStatus,
            filterFunction: filterByExpiredStatus,
            getTagLabel: getTagLabelByExpiredStatus,
        }
    },
    {
        index: 2,
        value: OptionValue.All.toString(),
        label: "Tất cả",
        supportFunction: 
        {
            getAttributeToFilter: getAttributeToFilterByProcessingStatus,
            filterFunction: filterByAllStatus,
            getTagLabel: getTagLabelByAllStatus,
        }
    }
]