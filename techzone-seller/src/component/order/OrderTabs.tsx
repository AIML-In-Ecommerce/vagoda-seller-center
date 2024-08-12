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
import { NotificationContext } from "@/context/NotificationContext";

interface OrderTabsProps {}

const defaultBreadcrumbItems: ItemType[] = [
  {
    title: (
      <div className="flex items-center">
        <HiOutlineHome size={15} />
      </div>
    ),
    href: "/",
  },
  {
    title: <p>Danh sách đơn hàng</p>,
    href: `/order?tab=awaiting_confirmation`,
  },
];

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

  const authContext = useContext(AuthContext);

  const [waitingData, setWaitingData] = useState<OrderPropType[]>([]);
  const [processingData, setProcessingData] = useState<OrderPropType[]>([]);
  const [shippingData, setShippingData] = useState<OrderPropType[]>([]);
  const [completeData, setCompleteData] = useState<OrderPropType[]>([]);
  const [cancelledData, setCancelledData] = useState<OrderPropType[]>([]);

  const [breadcrumbItems, setBreadcrumbItems] = useState<ItemType[]>(
    defaultBreadcrumbItems
  );

  const notificationContext = useContext(NotificationContext);

  const tabs = [
    {
      index: 0,
      key: "awaiting_confirmation",
      label: "Chờ xác nhận",
      breadcrumbItem: {
        title: "Đang chờ xác nhận",
        href: `/order?tab=${defaultTabKey}`,
      },
      dataSource: waitingData,
      refreshDataFunction: refetchAfterExecutingOnWaitingTabs,
      // children: <WaitingOrderTab tabKey={"awaiting_confirmation"} dataSource={waitingData} askToRefreshData={handleAskToRequestData}/>,
      children: WaitingOrderTab,
    },
    {
      index: 1,
      key: "processing",
      label: "Đang xử lý",
      breadcrumbItem: {
        title: "Đang xử lý",
        href: `/order?tab=processing`,
      },
      dataSource: processingData,
      refreshDataFunction: refetchAfterExecutingOnProcessingTabs,
      // children: <ProcessingOrderTab dataSource={processingData} />,
      children: ProcessingOrderTab,
    },
    {
      index: 2,
      key: "shipping",
      label: "Đang vận chuyển",
      breadcrumbItem: {
        title: "Đang vận chuyển",
        href: `/order?tab=shipping`,
      },
      dataSource: shippingData,
      refreshDataFunction: refetchAfterExecutingOnShippingTabs,
      // children: <ShippingOrderTab dataSource={shippingData} />,
      children: ShippingOrderTab,
    },
    {
      index: 3,
      key: "delivered",
      label: "Đã giao hàng",
      breadcrumbItem: {
        title: "Đã giao hàng",
        href: `/order?tab=delivered`,
      },
      dataSource: completeData,
      refreshDataFunction: fetchCompletedOrders,
      // children: <CompletedOrderTab dataSource={completeData} />,
      children: CompletedOrderTab,
    },
    {
      index: 4,
      key: "canceled",
      label: "Đã hủy",
      breadcrumbItem: {
        title: "Đã hủy",
        href: `/order?tab=canceled`,
      },
      dataSource: cancelledData,
      refreshDataFunction: () => fetchCancelledOrders,
      // children: <CancelledOrderTab dataSource={cancelledData} />,
      children: CancelledOrderTab,
    },
  ];

  // const [tabDisplays, setTabDisplays] = useState<any[]>(tabs)

  // const { socket, isConnected } = useContext(SocketIOContext);

  // useEffect(() => {
  //   console.log("socket connection ...");
  //   console.log(isConnected);
  // }, [isConnected]);

  async function fetchWaitingOrders() {
    if (authContext.shopInfo != null) {
      // const accessToken = authContext.methods.getAccessToken() as string
      const orders = await OrderService.getOrders(
        authContext.shopInfo._id as string,
        OrderStatusValues.PENDING
      );
      if (orders != null) {
        setWaitingData(orders);
        // const newTabs = [...tabDisplays]
        // newTabs[0].dataSource = orders
        // setTabDisplays(newTabs)
      }
    }
  }

  async function fetchProcessingOrders() {
    if (authContext.shopInfo != null) {
      // const accessToken = authContext.methods.getAccessToken() as string
      const orders = await OrderService.getOrders(
        authContext.shopInfo._id,
        OrderStatusValues.PROCESSING
      );
      if (orders != null) {
        setProcessingData(orders);
        // const newTabs = [...tabDisplays]
        // newTabs[0].dataSource = orders
        // setTabDisplays(newTabs)
      }
    }
  }

  async function fetchShippingOrders() {
    if (authContext.shopInfo != null) {
      // const accessToken = authContext.methods.getAccessToken() as string
      const orders = await OrderService.getOrders(
        authContext.shopInfo._id,
        OrderStatusValues.SHIPPING
      );
      if (orders != null) {
        setShippingData(orders);
        // const newTabs = [...tabDisplays]
        // newTabs[0].dataSource = orders
        // setTabDisplays(newTabs)
      }
    }
  }

  async function fetchCompletedOrders() {
    if (authContext.shopInfo != null) {
      // const accessToken = authContext.methods.getAccessToken() as string
      const orders = await OrderService.getOrders(
        authContext.shopInfo._id,
        OrderStatusValues.COMPLETED
      );
      if (orders != null) {
        setCompleteData(orders);
        // const newTabs = [...tabDisplays]
        // newTabs[0].dataSource = orders
        // setTabDisplays(newTabs)
      }
    }
  }

  async function fetchCancelledOrders() {
    if (authContext.shopInfo != null) {
      // const accessToken = authContext.methods.getAccessToken() as string
      const orders = await OrderService.getOrders(
        authContext.shopInfo._id,
        OrderStatusValues.CANCELLED
      );
      if (orders != null) {
        setCancelledData(orders);
        // const newTabs = [...tabDisplays]
        // newTabs[0].dataSource = orders
        // setTabDisplays(newTabs)
      }
    }
  }

  async function refetchAfterExecutingOnWaitingTabs() {
    await fetchWaitingOrders();
    await fetchProcessingOrders();
    await fetchCancelledOrders();
  }

  async function refetchAfterExecutingOnProcessingTabs() {
    await fetchProcessingOrders();
    await fetchShippingOrders();
    await fetchCancelledOrders();
  }

  async function refetchAfterExecutingOnShippingTabs() {
    await fetchShippingOrders();
    await fetchCompletedOrders();
  }

  useEffect(() => {
    //fetch data here
    fetchWaitingOrders();
  }, [authContext.shopInfo]);

  useEffect(() => {
    fetchProcessingOrders();
  }, [authContext.shopInfo]);

  useEffect(() => {
    fetchShippingOrders();
  }, [authContext.shopInfo]);

  useEffect(() => {
    fetchCompletedOrders();
  }, [authContext.shopInfo]);

  useEffect(() => {
    fetchCancelledOrders();
  }, [authContext.shopInfo]);

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

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].key == selectedTabKey) {
        const newBreadcrumbItems = [...defaultBreadcrumbItems];
        newBreadcrumbItems.push(tabs[i].breadcrumbItem);
        setBreadcrumbItems(newBreadcrumbItems);
        break;
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

  async function handleAskToRequestData(targetTabKey: string) {
    console.log(targetTabKey);
    let targetTab = null;
    for (let i = 0; i < tabs.length; i++) {
      if (targetTabKey == tabs[i].key) {
        targetTab = tabs[i];
        break;
      }
    }

    console.log(targetTab);
    if (targetTab == null) {
      return;
    }

    await targetTab.refreshDataFunction();
  }

  return (
    <>
      <div className="w-full bg-white px-4 rounded-lg">
        {notificationContext?.notificationContextHolder}
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
                children: (
                  <value.children
                    tabKey={value.key}
                    dataSource={value.dataSource}
                    askToRefreshData={handleAskToRequestData}
                  />
                ),
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
