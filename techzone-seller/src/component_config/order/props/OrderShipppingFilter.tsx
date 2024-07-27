import { OrderShippingOptionProps } from "@/component/order/util/OrderShippingFilter";
import { OrderPropType } from "@/model/OrderPropType";

const ShippingUnit = 
{
    TechZoneDeli: "shp-01",
    NinjaLead: "shp-02"
}


function getAttributeToFilter(item: OrderPropType)
{
    return item.shippingAddress.idDistrict
}


function filterByShippingUnit(dataSource: OrderPropType[], targetData: string[])
{
    let result: OrderPropType[] = []

    targetData.forEach((shipUnitId) =>
    {
        const filterData = dataSource.filter((value: OrderPropType) => getAttributeToFilter(value) == shipUnitId)
        
        result = result.concat(filterData)
    })

    return result
}

function getTagLabel(params: string[])
{
    let result = "Đơn vị vận chuyển |"

    params.forEach((value: string) =>
    {
        result = result.concat(value).concat("|")
    })

    return result
}


export const OrderShippingOptions: OrderShippingOptionProps[] = 
[
    {
        index: 0,
        label: "TechZone Deli",
        value: ShippingUnit.TechZoneDeli,
        supportFunction:
        {
            getAttributeToFilter: getAttributeToFilter,
            filterFunction: filterByShippingUnit,
            getTagLabel: getTagLabel
        }
    },
    {
        index: 1,
        label: "Ninja Lead",
        value: ShippingUnit.NinjaLead,
        supportFunction:
        {
            getAttributeToFilter: getAttributeToFilter,
            filterFunction: filterByShippingUnit,
            getTagLabel: getTagLabel
        }
    }
]