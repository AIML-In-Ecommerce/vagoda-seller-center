
import OrderInvoice from "@/component/order/OrderInvoice"
import { Flex} from "antd"


interface OrderPageProps
{

}


function OrderInvoicePage({}: OrderPageProps)
{

    return(
        <>
            <Flex vertical className="w-full" align="center" justify="center">
                <OrderInvoice />
            </Flex>
        </>
    )
}


export default OrderInvoicePage