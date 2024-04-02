import { FilterSetting } from "../../../component/order/util/IFilter";
import OrderSearchFilter from "../../../component/order/util/OrderSearchFilter";
import OrderTimeFilter from "../../../component/order/util/OrderTimeFilter";
import { OrderSearchOptions } from "../props/OrderSearchFilter";
import { OrderTimeOptions } from "../props/OrderTimeFilter";

const OrderSearchOptionsSetting = OrderSearchOptions
const OrderTimeOptionsSetting = OrderTimeOptions

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
    }
]