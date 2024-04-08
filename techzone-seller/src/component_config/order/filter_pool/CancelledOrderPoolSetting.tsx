import { FilterSetting } from "@/component/order/util/IFilter";
import OrderSearchFilter from "@/component/order/util/OrderSearchFilter";
import { OrderSearchOptions } from "../props/OrderSearchFilter";
import OrderTimeFilter from "@/component/order/util/OrderTimeFilter";
import { OrderTimeOptions } from "../props/OrderTimeFilter";



const OrderSearchFilterOptionSetting = OrderSearchOptions
const OrderTimeFilterOptionSetting = OrderTimeOptions

export const CancelledOrderPoolSetting: FilterSetting[] =
[
    {
        key: "ft-search-00",
        defaultIndex: 0,
        filter: OrderSearchFilter,
        options: OrderSearchFilterOptionSetting
    },
    {
        key: "ft-01",
        defaultIndex: 3,
        filter: OrderTimeFilter,
        options: OrderTimeFilterOptionSetting
    },
]