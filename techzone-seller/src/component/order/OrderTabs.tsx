"use client";

import { OrderPropType, OrderStatusValues } from "@/model/OrderPropType";
import { SocketIOContext } from "@/socket/SocketProvider";
import { Breadcrumb, Flex, Tabs, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CancelledOrderTab from "./tab/CancelledOrderTab";
import CompletedOrderTab from "./tab/CompletedOrderTab";
import ProcessingOrderTab from "./tab/ProcessingOrderTab";
import ShippingOrderTab from "./tab/ShippingOrderTab";
import WaitingOrderTab from "./tab/WaitingOrderTab";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { HiOutlineHome } from "react-icons/hi2";
import OrderService from "@/services/order.service";
import { AuthContext } from "@/context/AuthContext";

interface OrderTabsProps {}

// const WaitingMockData: OrderPropType[] = [
//   {
//     _id: "o-01",
//     shopId: "sh-01",
//     user: {
//       _id: "u-01",
//       name: "Lê Hồng Kông",
//       phoneNumber: "0122446972",
//     },
//     product: [
//       {
//         _id: "p-01",
//         image:
//           "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1710939264~exp=1710939864~hmac=8571b9303891f2dbcd82da68a0a4d4a002d7ee77764e3c7a726ba042348ca9d4",
//         name: "Macbook Air 2023",
//         originPrice: 22000000,
//         purchasedPrice: 22000000,
//         quantity: 1,
//       },
//     ],
//     promotion: [
//       {
//         _id: "pro-01",
//         name: "Brand opening promotion",
//         discountType: "DIRECT_PRICE",
//         discountValue: 2000000,
//         expiredDate: 1711360457,
//       },
//     ],
//     paymentMethod: {
//       _id: "pm-01",
//       name: "COD",
//     },
//     shipping: {
//       _id: "shp-01",
//       name: "TechZone Deli",
//       fee: 0.0,
//     },
//     totalPrice: {
//       product: 22000000,
//       discount: 2000000,
//       shipping: 0.0,
//       total: 20000000.0,
//       profit: 19980000.0,
//     },
//     address: {
//       receiverName: "Lê Hồng Phong",
//       address: "227 Đ.Nguyễn Văn Cừ, Phường 4, quận 5, tp.Hồ Chí Minh",
//       phoneNumber: "0122446972",
//       coordinate: {
//         lng: 100.0,
//         lat: 13.0,
//       },
//       label: "HOME",
//       isDefault: false,
//     },
//     orderStatus: [
//       {
//         status: "PENDING",
//         time: 1711785407,
//         deadline: 1711958876,
//         complete: null,
//       },
//     ],
//   },
// ];

// const ProcessingMockData: OrderPropType[] = [
//   {
//     _id: "o-01",
//     shopId: "sh-01",
//     user: {
//       _id: "u-01",
//       name: "Lê Hồng Kông",
//       phoneNumber: "0122446972",
//     },
//     product: [
//       {
//         _id: "p-01",
//         image:
//           "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1710939264~exp=1710939864~hmac=8571b9303891f2dbcd82da68a0a4d4a002d7ee77764e3c7a726ba042348ca9d4",
//         name: "Macbook Air 2023",
//         originPrice: 22000000,
//         purchasedPrice: 22000000,
//         quantity: 1,
//       },
//     ],
//     promotion: [
//       {
//         _id: "pro-01",
//         name: "Brand opening promotion",
//         discountType: "DIRECT_PRICE",
//         discountValue: 2000000,
//         expiredDate: 1711360457,
//       },
//     ],
//     paymentMethod: {
//       _id: "pm-01",
//       name: "COD",
//     },
//     shipping: {
//       _id: "shp-01",
//       name: "TechZone Deli",
//       fee: 0.0,
//     },
//     totalPrice: {
//       product: 22000000,
//       discount: 2000000,
//       shipping: 0.0,
//       total: 20000000.0,
//       profit: 19980000.0,
//     },
//     address: {
//       receiverName: "Lê Hồng Phong",
//       address: "227 Đ.Nguyễn Văn Cừ, Phường 4, quận 5, tp.Hồ Chí Minh",
//       phoneNumber: "0122446972",
//       coordinate: {
//         lng: 100.0,
//         lat: 13.0,
//       },
//       label: "HOME",
//       isDefault: false,
//     },
//     orderStatus: [
//       {
//         status: "PENDING",
//         time: 1711785407,
//         deadline: 1712217407,
//         complete: 1712217407,
//       },
//       {
//         status: "PROCESSING",
//         time: 1712217407,
//         deadline: 1712218076,
//         complete: null,
//       },
//     ],
//   },
// ];

// const ShippingMockData: OrderPropType[] = [
//   {
//     _id: "o-01",
//     shopId: "sh-01",
//     user: {
//       _id: "u-01",
//       name: "Lê Hồng Kông",
//       phoneNumber: "0122446972",
//     },
//     product: [
//       {
//         _id: "p-01",
//         image:
//           "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1710939264~exp=1710939864~hmac=8571b9303891f2dbcd82da68a0a4d4a002d7ee77764e3c7a726ba042348ca9d4",
//         name: "Macbook Air 2023",
//         originPrice: 22000000,
//         purchasedPrice: 22000000,
//         quantity: 1,
//       },
//     ],
//     promotion: [
//       {
//         _id: "pro-01",
//         name: "Brand opening promotion",
//         discountType: "DIRECT_PRICE",
//         discountValue: 2000000,
//         expiredDate: 1711360457,
//       },
//     ],
//     paymentMethod: {
//       _id: "pm-01",
//       name: "COD",
//     },
//     shipping: {
//       _id: "shp-01",
//       name: "TechZone Deli",
//       fee: 0.0,
//     },
//     totalPrice: {
//       product: 22000000,
//       discount: 2000000,
//       shipping: 0.0,
//       total: 20000000.0,
//       profit: 19980000.0,
//     },
//     address: {
//       receiverName: "Lê Hồng Phong",
//       address: "227 Đ.Nguyễn Văn Cừ, Phường 4, quận 5, tp.Hồ Chí Minh",
//       phoneNumber: "0122446972",
//       coordinate: {
//         lng: 100.0,
//         lat: 13.0,
//       },
//       label: "HOME",
//       isDefault: false,
//     },
//     orderStatus: [
//       {
//         status: "PENDING",
//         time: 1711785407,
//         deadline: 1712217407,
//         complete: 1712217407,
//       },
//       {
//         status: "PROCESSING",
//         time: 1712217407,
//         deadline: 1712218076,
//         complete: 1712390876,
//       },
//       {
//         status: "SHIPPING",
//         time: 1712736476,
//         deadline: 1713082076,
//         complete: null,
//       },
//     ],
//   },
// ];

// const CompletedMockData: OrderPropType[] = [
//   {
//     _id: "o-01",
//     shopId: "sh-01",
//     user: {
//       _id: "u-01",
//       name: "Lê Hồng Kông",
//       phoneNumber: "0122446972",
//     },
//     product: [
//       {
//         _id: "p-01",
//         image:
//           "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1710939264~exp=1710939864~hmac=8571b9303891f2dbcd82da68a0a4d4a002d7ee77764e3c7a726ba042348ca9d4",
//         name: "Macbook Air 2023",
//         originPrice: 22000000,
//         purchasedPrice: 22000000,
//         quantity: 1,
//       },
//     ],
//     promotion: [
//       {
//         _id: "pro-01",
//         name: "Brand opening promotion",
//         discountType: "DIRECT_PRICE",
//         discountValue: 2000000,
//         expiredDate: 1711360457,
//       },
//     ],
//     paymentMethod: {
//       _id: "pm-01",
//       name: "COD",
//     },
//     shipping: {
//       _id: "shp-01",
//       name: "TechZone Deli",
//       fee: 0.0,
//     },
//     totalPrice: {
//       product: 22000000,
//       discount: 2000000,
//       shipping: 0.0,
//       total: 20000000.0,
//       profit: 19980000.0,
//     },
//     address: {
//       receiverName: "Lê Hồng Phong",
//       address: "227 Đ.Nguyễn Văn Cừ, Phường 4, quận 5, tp.Hồ Chí Minh",
//       phoneNumber: "0122446972",
//       coordinate: {
//         lng: 100.0,
//         lat: 13.0,
//       },
//       label: "HOME",
//       isDefault: false,
//     },
//     orderStatus: [
//       {
//         status: "PENDING",
//         time: 1711785407,
//         deadline: 1712217407,
//         complete: 1712217407,
//       },
//       {
//         status: "PROCESSING",
//         time: 1712217407,
//         deadline: 1712218076,
//         complete: 1712390876,
//       },
//       {
//         status: "SHIPPING",
//         time: 1712736476,
//         deadline: 1713082076,
//         complete: 1712847855,
//       },
//       {
//         status: "COMPLETED",
//         time: 1713082076,
//         deadline: 1713082076,
//         complete: null,
//       },
//     ],
//   },
// ];

// const CancelledMockData: OrderPropType[] = [
//   {
//     _id: "o-01",
//     shopId: "sh-01",
//     user: {
//       _id: "u-01",
//       name: "Lê Hồng Kông",
//       phoneNumber: "0122446972",
//     },
//     product: [
//       {
//         _id: "p-01",
//         image:
//           "https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?w=740&t=st=1710939264~exp=1710939864~hmac=8571b9303891f2dbcd82da68a0a4d4a002d7ee77764e3c7a726ba042348ca9d4",
//         name: "Macbook Air 2023",
//         originPrice: 22000000,
//         purchasedPrice: 22000000,
//         quantity: 1,
//       },
//     ],
//     promotion: [
//       {
//         _id: "pro-01",
//         name: "Brand opening promotion",
//         discountType: "DIRECT_PRICE",
//         discountValue: 2000000,
//         expiredDate: 1711360457,
//       },
//     ],
//     paymentMethod: {
//       _id: "pm-01",
//       name: "COD",
//     },
//     shipping: {
//       _id: "shp-01",
//       name: "TechZone Deli",
//       fee: 0.0,
//     },
//     totalPrice: {
//       product: 22000000,
//       discount: 2000000,
//       shipping: 0.0,
//       total: 20000000.0,
//       profit: 19980000.0,
//     },
//     address: {
//       receiverName: "Lê Hồng Phong",
//       address: "227 Đ.Nguyễn Văn Cừ, Phường 4, quận 5, tp.Hồ Chí Minh",
//       phoneNumber: "0122446972",
//       coordinate: {
//         lng: 100.0,
//         lat: 13.0,
//       },
//       label: "HOME",
//       isDefault: false,
//     },
//     orderStatus: [
//       {
//         status: "PENDING",
//         time: 1711785407,
//         deadline: 1712217407,
//         complete: 1712217407,
//       },
//       {
//         status: "PROCESSING",
//         time: 1712217407,
//         deadline: 1712218076,
//         complete: null,
//       },
//       {
//         status: "CANCELLED",
//         time: 1712218907,
//         deadline: 1712291136,
//         complete: null,
//       },
//     ],
//   },
// ];

const defaultBreadcrumbItems: ItemType[] = 
[
  {
    title: <div className="flex items-center"><HiOutlineHome size={15}/></div>,
    href: "/",
  },
  {
    title: <p>Danh sách đơn hàng</p>,
    href: `/order?tab=awaiting_confirmation`
  }
]

export default function OrderTabs({}: OrderTabsProps) {
  const defaultTabKey = "awaiting_confirmation";
  const defaultTabLabelProp = (
    <div className="w-full">
      <Flex vertical justify="center" align="center">
        <Typography.Text>Tab</Typography.Text>
        <Typography.Text>-</Typography.Text>
      </Flex>
    </div>
  );

  const totalTabs = 5;
  const router = useRouter();
  const tabParams = useSearchParams();

  const tab = tabParams.get("tab");
  const activeTabFromUrl = tab || "awaiting_confirmation";
  const [orderCount, setOrderCount] = useState<number[]>(
    new Array(totalTabs).fill(0)
  );
  const [selectedTabKey, setSelectedTabKey] =
    useState<string>(activeTabFromUrl);
  const [tabLabels, setTabLabels] = useState<JSX.Element[]>(
    new Array(totalTabs).fill(defaultTabLabelProp)
  );

  const authContext = useContext(AuthContext)

  const [waitingData, setWaitingData] = useState<OrderPropType[]>([]);
  const [processingData, setProcessingData] = useState<OrderPropType[]>([]);
  const [shippingData, setShippingData] = useState<OrderPropType[]>([]);
  const [completeData, setCompleteData] = useState<OrderPropType[]>([]);
  const [cancelledData, setCancelledData] = useState<OrderPropType[]>([]);

  const [breadcrumbItems, setBreadcrumbItems] = useState<ItemType[]>(defaultBreadcrumbItems)

  const tabs = [
    {
      index: 0,
      key: "awaiting_confirmation",
      label: "Chờ xác nhận",
      breadcrumbItem: {
        title: "Đang chờ xác nhận",
        href: `/order?tab=${defaultTabKey}`
      },
      refreshDataFunction: fetchWaitingOrders,
      children: <WaitingOrderTab tabKey={"awaiting_confirmation"} dataSource={waitingData} askToRefreshData={handleAskToRequestData}/>,
    },
    {
      index: 1,
      key: "processing",
      label: "Đang xử lý",
      breadcrumbItem: {
        title: "Đang xử lý",
        href: `/order?tab=processing`
      },
      refreshDataFunction: () => Promise<void>,
      children: <ProcessingOrderTab dataSource={processingData} />,
    },
    {
      index: 2,
      key: "shipping",
      label: "Đang vận chuyển",
      breadcrumbItem: {
        title: "Đang vận chuyển",
        href: `/order?tab=shipping`
      },
      refreshDataFunction: () => Promise<void>,
      children: <ShippingOrderTab dataSource={shippingData} />,
    },
    {
      index: 3,
      key: "delivered",
      label: "Đã giao hàng",
      breadcrumbItem: {
        title: "Đã giao hàng",
        href: `/order?tab=delivered`
      },
      refreshDataFunction: () => Promise<void>,
      children: <CompletedOrderTab dataSource={completeData} />,
    },
    {
      index: 4,
      key: "canceled",
      label: "Đã hủy",
      breadcrumbItem: {
        title: "Đã hủy",
        href: `/order?tab=canceled`
      },
      refreshDataFunction: () => Promise<void>,
      children: <CancelledOrderTab dataSource={cancelledData} />,
    },
  ];

  // const { socket, isConnected } = useContext(SocketIOContext);

  // useEffect(() => {
  //   console.log("socket connection ...");
  //   console.log(isConnected);
  // }, [isConnected]);

  async function fetchWaitingOrders()
  {
    if(authContext.methods != null)
    {
      const isRefreshedSuccessfully = await authContext.methods.refreshToken()
      if(isRefreshedSuccessfully == false)
      {
        authContext.methods.forceSignIn()
      }
      else
      {
        // const accessToken = authContext.methods.getAccessToken() as string
        const orders = await OrderService.getOrders(authContext.methods.getAccessToken() as string, OrderStatusValues.PENDING)
        {
          setWaitingData(orders)
        }
      }
    }
  } 

  useEffect(() => {
    //fetch data here 
    fetchWaitingOrders()
  }, []);

  useEffect(() => {
    const clonedData = [...orderCount];
    clonedData[0] = waitingData.length;

    setOrderCount(clonedData);
  }, [waitingData]);

  useEffect(() => {
    const clonedData = [...orderCount];
    clonedData[1] = processingData.length;
    setOrderCount(clonedData);
  }, [processingData]);

  useEffect(() => {
    const clonedData = [...orderCount];
    clonedData[2] = shippingData.length;
    setOrderCount(clonedData);
  }, [shippingData]);

  useEffect(() => {
    const clonedData = [...orderCount];
    clonedData[3] = completeData.length;
    setOrderCount(clonedData);
  }, [completeData]);

  useEffect(() => {
    const clonedData = [...orderCount];
    clonedData[4] = cancelledData.length;
    setOrderCount(clonedData);
  }, [cancelledData]);

  useEffect(() => {
    const newTabLabels: JSX.Element[] = orderCount.map(
      (countValue: number, index: number) => {
        const label = tabs[index].label;
        const key = tabs[index].key;
        const JSXLabel = getlabelNode(key, label, countValue);

        return JSXLabel;
      }
    );

    setTabLabels(newTabLabels);

    for(let i=0; i < tabs.length; i++)
    {
      if(tabs[i].key == selectedTabKey)
      {
        const newBreadcrumbItems = [...defaultBreadcrumbItems]
        newBreadcrumbItems.push(tabs[i].breadcrumbItem)
        setBreadcrumbItems(newBreadcrumbItems)
        break
      }
    }

  }, [orderCount, selectedTabKey]);

  const getlabelNode = (key: string, name: string, count: number) => {
    let textColor = "text-black font-semibold";
    if (key == selectedTabKey) {
      textColor = "text-blue-500 font-semibold";
    }

    return (
      <div className="w-full">
        <Flex vertical justify="center" align="center">
          <Typography.Text className={textColor}>{name}</Typography.Text>
          <Typography.Text className={textColor}>
            {count > 0 ? count : "-"}
          </Typography.Text>
        </Flex>
      </div>
    );
  };

  function handleTabKeyOnChange(activeKey: string) {
    setSelectedTabKey(activeKey);
    router.push(`/order?tab=${activeKey}`);
  }

  async function handleAskToRequestData(targetTabKey: string)
  {
    let targetTab =  null
    for(let i = 0; i < tabs.length; i++)
    {
      if(targetTabKey == tabs[i].key)
      {
        targetTab = tabs[i]
        break;
      }
    }

    if(targetTab == null)
    {
      return
    }

    await targetTab.refreshDataFunction()
  }

  return (
    <>
      <div className="w-full h-screen bg-white px-4 rounded-lg">
        <Flex
          vertical
          className="w-full mb-4 py-2"
          justify="center"
          align="start"
          gap={6}
        >
          <Flex className="w-full" align="baseline">
            <Breadcrumb items={breadcrumbItems} />
          </Flex>
          <Flex className="w-full" align="baseline">
            <Typography.Text className="text-2xl font-semibold">
              Danh sách đơn hàng
            </Typography.Text>
          </Flex>
        </Flex>
        <div>
          <Tabs
            activeKey={selectedTabKey}
            defaultActiveKey={defaultTabKey}
            type={"card"}
            items={tabs.map((value) => {
              const item = {
                key: value.key,
                label: tabLabels[value.index],
                children: value.children,
              };
              return item;
            })}
            onChange={handleTabKeyOnChange}
          />
        </div>
      </div>
    </>
  );
}
