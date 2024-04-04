import { FilterSetting } from "@/component/order/util/IFilter";
import { OrderSearchOptions } from "../props/OrderSearchFilter";
import OrderSearchFilter from "@/component/order/util/OrderSearchFilter";
import OrderShippingFilter from "@/component/order/util/OrderShippingFilter";
import { OrderShippingOptions } from "../props/OrderShipppingFilter";
import OrderLateConfirmFilter from "@/component/order/util/OrderLateConfirmFilter";
import { OrderLateConfirmFilterOption } from "../props/OrderLateConfirmFilter";
import { OrderDatePickerFilterOption } from "../props/OrderDatePickerFilter";
import OrderDatePickerFilter from "@/component/order/util/OrderDatePickerFilter";
import OrderTimeFilter from "@/component/order/util/OrderTimeFilter";
import { OrderTimeOptions } from "../props/OrderTimeFilter";


const OrderSearchOptionsSetting = OrderSearchOptions
const OrderShippingOptionSetting = OrderShippingOptions
const OrderTimeFilterOptionSetting = OrderTimeOptions
const OrderLateConfirmOptionSetting = OrderLateConfirmFilterOption
const OrderDatePickerOptionSetting = OrderDatePickerFilterOption

export const ShippingOrderPoolSetting: FilterSetting[] =
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
        filter: OrderShippingFilter,
        options: OrderShippingOptionSetting
    },
    {
        key: "ft-02",
        defaultIndex: 3,
        filter: OrderTimeFilter,
        options: OrderTimeFilterOptionSetting
    },
    {
        key: "ft-02",
        defaultIndex: 0,
        filter: OrderDatePickerFilter,
        options: OrderDatePickerOptionSetting
    },
    {
        key: "ft-03",
        defaultIndex: 0,
        filter: OrderLateConfirmFilter,
        options: OrderLateConfirmOptionSetting
    },
]