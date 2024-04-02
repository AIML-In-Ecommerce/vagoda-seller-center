import { FilterSetting } from "@/component/order/util/IFilter";
import { OrderDatePickerFilterOption } from "../props/OrderDatePickerFilter";
import { OrderSearchOptions } from "../props/OrderSearchFilter";
import OrderSearchFilter from "@/component/order/util/OrderSearchFilter";
import OrderDatePickerFilter from "@/component/order/util/OrderDatePickerFilter";
import OrderShippingFilter from "@/component/order/util/OrderShippingFilter";
import { OrderShippingOptions } from "../props/OrderShipppingFilter";


const OrderSearchOptionsSetting = OrderSearchOptions
const OrderDatePickerSetting = OrderDatePickerFilterOption
const OrdershippingOptionSetting = OrderShippingOptions

export const ProcessingOrderPoolSetting: FilterSetting[] =
[
    {
        key: "ft-search-00",
        defaultIndex: 0,
        filter: OrderSearchFilter,
        options: OrderSearchOptionsSetting
    },
    {
        key: "ft-01",
        defaultIndex: 0,
        filter: OrderDatePickerFilter,
        options: OrderDatePickerSetting
    },
    {
        key: "ft-02",
        defaultIndex: 0,
        filter: OrderShippingFilter,
        options: OrdershippingOptionSetting
    }
]