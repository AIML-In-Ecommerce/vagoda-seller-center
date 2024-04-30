import OrderTabs from "@/component/order/OrderTabs"
import { Flex} from "antd"


interface OrderPageProps
{

}


function OrderPage({}: OrderPageProps)
{

    return(
        <>
            <Flex vertical className="w-full" align="center" justify="center">
                <OrderTabs />
            </Flex>
        </>
    )
}


export default OrderPage