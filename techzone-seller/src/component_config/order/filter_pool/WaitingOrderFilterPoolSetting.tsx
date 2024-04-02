import { FilterSetting } from "../../../component/order/util/IFilter";
import OrderSearchFilter from "../../../component/order/util/OrderSearchFilter";
import OrderTimeFilter from "../../../component/order/util/OrderTimeFilter";
import { OrderSearchOptions } from "../props/OrderSearchFilter";
import { OrderTimeOptions } from "../props/OrderTimeFilter";
import { OrderStatusFilterOptions } from "../props/OrderStatusFilter";
import OrderStatusFilter from "@/component/order/util/OrderStatusFilter";

const OrderSearchOptionsSetting = OrderSearchOptions
const OrderTimeOptionsSetting = OrderTimeOptions
const OrderStatusFilterSetting = OrderStatusFilterOptions


export const WaitingOrderFilterPoolSetting: FilterSetting[] = 
[
    {
        key:"ft-search-00",
        defaultIndex: 0,
        filter: OrderSearchFilter,
        options: OrderSearchOptionsSetting
    },
    {
        key: "ft-01",
        defaultIndex: 3,
        filter: OrderTimeFilter,
        options: OrderTimeOptionsSetting
    },
    {
        key: "ft-02",
        defaultIndex: 2,
        filter: OrderStatusFilter,
        options: OrderStatusFilterSetting
    }
]