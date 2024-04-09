import { FilterSetting } from "@/component/order/util/IFilter";
import OrderSearchFilter from "@/component/order/util/OrderSearchFilter";
import { OrderSearchOptions } from "../props/OrderSearchFilter";
import OrderTimeFilter from "@/component/order/util/OrderTimeFilter";
import { OrderTimeOptions } from "../props/OrderTimeFilter";
import OrderDatePickerFilter from "@/component/order/util/OrderDatePickerFilter";
import { OrderDatePickerFilterOption } from "../props/OrderDatePickerFilter";


const OrderSearchFilterOptionSetting = OrderSearchOptions
const OrderTimeFilterOptionSetting = OrderTimeOptions
const OrderDatePickerOptionSetting = OrderDatePickerFilterOption

export const CompletedOrderPoolSetting: FilterSetting[] =
[
    {
        key: "ft-search-00",
        defaultIndex: 0,
        filter: OrderSearchFilter,
        options: OrderSearchFilterOptionSetting
    },
    {
        key: "ft-01",
        defaultIndex: 0,
        filter: OrderDatePickerFilter,
        options: OrderDatePickerOptionSetting
    },
    {
        key: "ft-02",
        defaultIndex: 3,
        filter: OrderTimeFilter,
        options: OrderTimeFilterOptionSetting
    },
]