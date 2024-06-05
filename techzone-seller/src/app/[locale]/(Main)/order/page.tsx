import OrderTabs from "@/component/order/OrderTabs"
import { AuthContext } from "@/context/AuthContext"
import { Flex} from "antd"
import { useContext } from "react"


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