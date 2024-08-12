"use client";

import {
  Button,
  Divider,
  Empty,
  Flex,
  Table,
  TableColumnType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { OrderPropType } from "@/model/OrderPropType";
import OrderFilterPool, {
  OrderFilterPoolCallbackProps,
} from "../util/OrderFilterPool";
import { WaitingOrderFilterPoolSetting } from "../../../component_config/order/filter_pool/WaitingOrderFilterPoolSetting";
import {
  currencyFormater,
  datetimeFormaterShort,
  MyLocaleRef,
} from "@/component/util/MyFormater";
import { BiInfoCircle } from "react-icons/bi";
import OrderDetailDrawer from "../util/OrderDetailDrawer";
import { TableRowSelection } from "antd/es/table/interface";
import { AuthContext } from "@/context/AuthContext";
import OrderService from "@/services/order.service";
import { NotificationContext } from "@/context/NotificationContext";

interface WaitingOrderTabProps {
  tabKey: string;
  dataSource: OrderPropType[];
  askToRefreshData: (tabKey: string) => void;
}

enum StatusType {
  PENDING,
  EXPIRED,
}

interface DisplayStatus {
  name: string;
  type: StatusType;
}

interface CoordinateInOrder {
  lng: number;
  lat: number;
}

interface WaitingOrder {
  key: string;
  status: DisplayStatus;
  delivery: {
    receiverName: string;
    address: string;
    phoneNumber: string;
    coordinate: CoordinateInOrder | null;
    label: string;
    isDefault: boolean;
  };
  time: {
    orderTime: string;
    deadline: string;
  };
  price: {
    totalProduct: number;
    shippingFee: string;
    totalPrice: string;
    profit: string;
  };
}

const OrderValueTooltip = (
  <Flex vertical>
    <Typography.Text className="text-sm text-white">
      Giá trị = Tổng giá trị đơn hàng + Phí ship - Giảm giá
    </Typography.Text>
    <Typography.Text className="text-sm text-white">
      Doanh thu = Giá trị - Phí nền tảng
    </Typography.Text>
  </Flex>
);

const OrderTimeTooltip = (
  <Flex vertical>
    <Typography.Text className="text-sm text-white">
      Nhận - thời gian đơn hàng được ghi nhận
    </Typography.Text>
    <Typography.Text className="text-sm text-white">
      Hạn - thời gian người bán cần xác nhận trước hạn đó
    </Typography.Text>
  </Flex>
);

const filterPoolSetting = WaitingOrderFilterPoolSetting;

export default function WaitingOrderTab({
  tabKey,
  dataSource,
  askToRefreshData,
}: WaitingOrderTabProps) {
  const waitingTabFilterPoolKey = "waiting-tab-filter-pool-key";
  const [data, setData] = useState<OrderPropType[]>(dataSource);
  const [dataToDisplay, setDataToDisplay] = useState<WaitingOrder[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [selectedOrderDetail, setSelectedOrderDetail] =
    useState<OrderPropType | null>(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState<boolean>(false);

  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  const authContext = useContext(AuthContext);
  const notificationContext = useContext(NotificationContext);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource]);

  const dataColumns: TableColumnType<WaitingOrder>[] = [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      render: (value: any, record: WaitingOrder, index: number) => {
        if (value) {
        }
        const display = () => {
          let statusDisplay = <></>;
          switch (record.status.type) {
            case StatusType.PENDING: {
              statusDisplay = (
                <Tag
                  key={
                    record.status.name +
                    index.toString() +
                    "-" +
                    Date.now().toString()
                  }
                  color={"geekblue"}
                >
                  {record.status.name}
                </Tag>
              );
              break;
            }
            case StatusType.EXPIRED: {
              statusDisplay = (
                <Tag
                  key={
                    record.status.name +
                    index.toString() +
                    "-" +
                    Date.now().toString()
                  }
                  color={"orange"}
                >
                  {record.status.name}
                </Tag>
              );
            }
          }
          return statusDisplay;
        };

        return (
          <Flex vertical wrap={"wrap"} gap={4} justify="center" align="center">
            <Typography.Text>{record.key}</Typography.Text>
            {display()}
          </Flex>
        );
      },
    },
    {
      title: "Vận chuyển đến",
      dataIndex: "delivery",
      render: (value: any, record: WaitingOrder) => {
        if (value) {
        }

        return (
          <Flex vertical justify="center" align="start" wrap={"wrap"}>
            <div>
              <Flex gap={2} align="baseline">
                <Typography.Text className="text-sm">
                  {record.delivery.receiverName}
                </Typography.Text>
                -
                <Typography.Text className="text-blue-600">
                  {record.delivery.phoneNumber}
                </Typography.Text>
              </Flex>
              <Flex gap={2}>
                <Typography.Text className="text-xs text-gray-400">
                  {record.delivery.address}
                </Typography.Text>
              </Flex>
            </div>
          </Flex>
        );
      },
    },
    {
      title: (
        <Flex align="center" gap={4}>
          <Typography.Text>Thời gian xác nhận</Typography.Text>
          <Tooltip title={OrderTimeTooltip}>
            <BiInfoCircle />
          </Tooltip>
        </Flex>
      ),
      dataIndex: "time",
      render: (value: any, record: WaitingOrder) => {
        if (value) {
        }

        return (
          <Flex
            vertical
            className="w-full"
            justify="start"
            align="start"
            gap={4}
          >
            <Flex align="center">
              <Tag color={"blue-inverse"}>Nhận</Tag>
              <Typography.Text>{record.time.orderTime}</Typography.Text>
            </Flex>
            <Flex align="center">
              <Tag color={"orange-inverse"}>Hạn</Tag>
              <Typography.Text>{record.time.deadline}</Typography.Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      title: (
        <Flex align="center" gap={4}>
          <Typography.Text>Giá trị</Typography.Text>
          <Tooltip title={OrderValueTooltip}>
            <BiInfoCircle />
          </Tooltip>
        </Flex>
      ),
      dataIndex: "price",
      render: (value: any, record: WaitingOrder) => {
        if (value) {
        }

        return (
          <Flex vertical justify="start" align="start" gap={2}>
            <Flex justify="start" align="center">
              <Tag color="geekblue">
                Số sản phẩm:
                <Typography.Text className="ml-1 text-xs">
                  {record.price.totalProduct}
                </Typography.Text>
              </Tag>
            </Flex>
            <Typography.Text className="text-sm text-gray-500">
              Giá trị: {record.price.totalPrice}
            </Typography.Text>
            <Typography.Text className="text-sm text-gray-500">
              Ship: {record.price.shippingFee}
            </Typography.Text>
            <Typography.Text className="text-sm">
              Doanh thu: {record.price.profit}
            </Typography.Text>
          </Flex>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "action",
      render: (record: WaitingOrder) => {
        return (
          <Flex vertical justify="start" align="center">
            <Button
              type={"text"}
              onClick={() => {
                handleOpenOrderDetail(record.key);
              }}
            >
              Xem chi tiết
            </Button>
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    console.log(data);
    if (data.length == 0) {
      setDataToDisplay([]);
    } else {
      const display = data.map((value: OrderPropType) => {
        let totalProducts = 0;
        value.products.forEach((selection) => {
          totalProducts += selection.quantity;
        });

        let orderStatus: DisplayStatus = {
          name: "Đang chờ",
          type: StatusType.PENDING,
        };
        const today = new Date();

        const deadlineTime = new Date(
          value.orderStatus[value.orderStatus.length - 1].deadline
        );

        if (today > deadlineTime) {
          orderStatus = {
            name: "Đang chờ và đã quá hạn",
            type: StatusType.EXPIRED,
          };
        }

        const item: WaitingOrder = {
          key: value._id,
          status: orderStatus,
          delivery: {
            receiverName: value.shippingAddress.receiverName,
            address: value.shippingAddress.street,
            phoneNumber: value.shippingAddress.phoneNumber,
            coordinate: value.shippingAddress.coordinate,
            label: value.shippingAddress.label,
            isDefault: value.shippingAddress.isDefault,
          },
          time: {
            orderTime: datetimeFormaterShort(
              MyLocaleRef.VN,
              value.orderStatus[value.orderStatus.length - 1].time
            ),
            deadline: datetimeFormaterShort(
              MyLocaleRef.VN,
              value.orderStatus[value.orderStatus.length - 1].deadline
            ),
          },
          price: {
            totalProduct: totalProducts,
            shippingFee: currencyFormater(MyLocaleRef.VN, value.shippingFee),
            totalPrice: currencyFormater(MyLocaleRef.VN, value.totalPrice),
            profit: currencyFormater(MyLocaleRef.VN, value.profit),
          },
        };

        return item;
      });

      setDataToDisplay(display);
    }
  }, [data]);

  function handleFilterCallback(result: OrderFilterPoolCallbackProps) {
    setData(result.filterData);
  }

  function handleOpenOrderDetail(selectedOrderId: string) {
    const orderDetail = dataSource.find(
      (value: OrderPropType) => value._id == selectedOrderId
    );
    if (orderDetail == undefined) {
      setSelectedOrderDetail(null);
    } else {
      setSelectedOrderDetail(orderDetail);
    }
    setOrderDetailOpen(true);
  }

  function handleOrderDetailDrawerOnClose(params: any | null) {
    if (params == null) {
    }

    setSelectedOrderDetail(null);
    setOrderDetailOpen(false);
  }

  async function handleConfirmOrderOnClick(params: any) {
    const targetOrderId = params as string;
    //TODO: call api to update order status here
    if (authContext.shopInfo == null) {
      return;
    }

    const isUpdateSuccessfully = await OrderService.updateOneOrderStatus(
      authContext.shopInfo._id,
      targetOrderId
    );
    if (isUpdateSuccessfully == null) {
      notificationContext?.notificationAPI.error({
        message: `Xác nhận đơn hàng thất bại`,
        description: `Không thể xác nhận đơn hàng ${targetOrderId}`,
        placement: "top",
      });
    } else {
      notificationContext?.notificationAPI.success({
        message: `Xác nhận đơn hàng thành công`,
        description: `Đã xác nhận đơn hàng ${targetOrderId}`,
        placement: "top",
      });
      askToRefreshData(tabKey);
    }
  }

  async function handleCancelOrderOnClick(params: any) {
    const targetOrderId = params as string;
    //TODO: call api to update order status here
    if (authContext.shopInfo == null) {
      return;
    }

    const isUpdateSuccessfully = await OrderService.cancelOneOrderStatus(
      authContext.shopInfo._id as string,
      targetOrderId
    );
    if (isUpdateSuccessfully == null) {
      notificationContext?.notificationAPI.error({
        message: `Hủy đơn hàng thất bại`,
        description: `Không thể hủy đơn hàng ${targetOrderId}`,
        placement: "top",
      });
    } else {
      notificationContext?.notificationAPI.success({
        message: `Hủy đơn hàng thành công`,
        description: `Đã hủy đơn hàng ${targetOrderId}`,
        placement: "top",
      });
      askToRefreshData(tabKey);
    }
  }

  function handleSelectedRowKeysOnChange(
    newSelectedRowKeys: React.Key[],
    selectedRows: WaitingOrder[]
  ) {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedOrderIds: string[] = selectedRows.map(
      (value: WaitingOrder) => {
        return value.key;
      }
    );
    setSelectedOrderIds(selectedOrderIds);
  }

  async function handleConfirmManyOrder(soids: string[]) {
    if (authContext.shopInfo == null) {
      return;
    }

    const isUpdateSuccessfully = await OrderService.updateManyOrdersStatus(
      authContext.shopInfo._id,
      soids
    );
    if (isUpdateSuccessfully == null) {
      notificationContext?.notificationAPI.error({
        message: `Xác nhận đơn hàng thất bại`,
        description: `Không thể xác các đơn hàng đã chọn`,
        placement: "top",
      });
    } else {
      notificationContext?.notificationAPI.success({
        message: `Xác nhận đơn hàng thành công`,
        description: `Xác nhận các đơn hàng đã chọn thành công`,
        placement: "top",
      });
      askToRefreshData(tabKey);
    }
  }

  const rowSelection: TableRowSelection<WaitingOrder> = {
    selectedRowKeys: selectedRowKeys,
    onChange: handleSelectedRowKeysOnChange,
  };

  return (
    <>
      <Flex vertical className="w-full mb-2" justify="center" align="center">
        <OrderFilterPool
          poolKey={waitingTabFilterPoolKey}
          filterPoolSetting={filterPoolSetting}
          dataSource={dataSource}
          filterCallback={handleFilterCallback}
        />
      </Flex>

      <Divider />

      <Flex className="mb-3" justify="start" align="center" gap={6}>
        <Flex justify="start" align="baseline" gap={4}>
          <Typography.Text className="text-lg font-semibold">
            Đơn hàng:
          </Typography.Text>
          <Typography.Text className="text-lg">{data.length}</Typography.Text>
        </Flex>
        <Divider type="vertical" />
        {selectedOrderIds.length > 0 ? (
          <Button onClick={() => handleConfirmManyOrder(selectedOrderIds)}>
            Xác nhận hàng loạt
          </Button>
        ) : (
          <Button disabled>Xác nhận hàng loạt</Button>
        )}
      </Flex>

      <Table
        rowSelection={rowSelection}
        columns={dataColumns}
        scroll={{ x: 550, y: 400 }}
        dataSource={dataToDisplay}
      />

      <OrderDetailDrawer
        open={orderDetailOpen}
        orderProps={selectedOrderDetail}
        onCloseCallback={handleOrderDetailDrawerOnClose}
        confirmButtonActive
        cancelButtonActive
        confirmButtonOnClick={handleConfirmOrderOnClick}
        cancelButtonOnClick={handleCancelOrderOnClick}
      />
    </>
  );
}
