import {
  currencyFormater,
  datetimeFormaterShort,
  MyLocaleRef,
} from "@/component/util/MyFormater";
import { OrderPropType } from "@/model/OrderPropType";
import {
  Button,
  Divider,
  Flex,
  Table,
  TableColumnType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import OrderFilterPool, {
  OrderFilterPoolCallbackProps,
} from "../util/OrderFilterPool";
import { TableRowSelection } from "antd/es/table/interface";
import OrderDetailDrawer from "../util/OrderDetailDrawer";
import { CancelledOrderPoolSetting } from "@/component_config/order/filter_pool/CancelledOrderPoolSetting";
import { AuthContext } from "@/context/AuthContext";
import OrderService from "@/services/order.service";
import { NotificationContext } from "@/context/NotificationContext";

interface CancelledOrderTabProp {
  tabKey: string;
  dataSource: OrderPropType[];
  askToRefreshData: (tabKey: string) => void;
}

enum StatusType {
  WAITING_REVIEW,
  EXPIRED_WATING,
  COMPLETED_REVIEW,
}

interface DisplayStatus {
  name: string;
  type: StatusType;
}

interface CoordinateInOrder {
  lng: number;
  lat: number;
}

interface CancelledOrder {
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
      Diễn ra - thời gian đơn hàng được ghi nhận hủy
    </Typography.Text>
    <Typography.Text className="text-sm text-white">
      Hạn xác nhận - thời gian người bán cần xác nhận rằng đơn hàng đã được hủy
      trước hạn
    </Typography.Text>
  </Flex>
);

const filterPoolSetting = CancelledOrderPoolSetting;

export default function CancelledOrderTab({
  tabKey,
  dataSource,
  askToRefreshData,
}: CancelledOrderTabProp) {
  const cancelledTabFilterPoolKey = "cancelled-tab-filter-pool-key";
  const [data, setData] = useState<OrderPropType[]>(dataSource);
  const [dataToDisplay, setDataToDisplay] = useState<CancelledOrder[]>([]);
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

  const dataColumns: TableColumnType<CancelledOrder>[] = [
    {
      title: "Mã đơn hàng",
      dataIndex: "key",
      render: (value: any, record: CancelledOrder, index: number) => {
        if (value) {
        }
        const display = () => {
          let statusDisplay = <></>;
          switch (record.status.type) {
            case StatusType.WAITING_REVIEW: {
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
            case StatusType.EXPIRED_WATING: {
              statusDisplay = (
                <Tag
                  key={
                    record.status.name +
                    index.toString() +
                    "-" +
                    Date.now().toString()
                  }
                  color={"red"}
                >
                  {record.status.name}
                </Tag>
              );
              break;
            }
            case StatusType.COMPLETED_REVIEW: {
              statusDisplay = (
                <Tag
                  key={
                    record.status.name +
                    index.toString() +
                    "-" +
                    Date.now().toString()
                  }
                  color={"green"}
                >
                  {record.status.name}
                </Tag>
              );
              break;
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
      render: (value: any, record: CancelledOrder) => {
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
      render: (value: any, record: CancelledOrder) => {
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
              <Tag color={"blue-inverse"}>Diễn ra</Tag>
              <Typography.Text>{record.time.orderTime}</Typography.Text>
            </Flex>
            <Flex align="center">
              <Tag color={"orange-inverse"}>Hạn xác nhận</Tag>
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
      render: (value: any, record: CancelledOrder) => {
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
      render: (record: CancelledOrder) => {
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
    if (data.length == 0) {
      setDataToDisplay([]);
    } else {
      const display = data.map((value: OrderPropType) => {
        let totalProducts = 0;
        value.products.forEach((selection) => {
          totalProducts += selection.quantity;
        });

        let orderStatus: DisplayStatus = {
          name: "Đang chờ xem xét",
          type: StatusType.WAITING_REVIEW,
        };
        const today = new Date();

        const completedTime =
          value.orderStatus[value.orderStatus.length - 1].complete != null
            ? new Date(
                value.orderStatus[value.orderStatus.length - 1].complete!
              )
            : null;
        const deadlineTime = new Date(
          value.orderStatus[value.orderStatus.length - 1].deadline
        );

        if (today > deadlineTime && completedTime == null) {
          orderStatus = {
            name: "Đang chờ xem xét và quá hạn",
            type: StatusType.EXPIRED_WATING,
          };
        } else if (completedTime != null) {
          orderStatus = {
            name: "Đã xem xét",
            type: StatusType.COMPLETED_REVIEW,
          };
        }

        const item: CancelledOrder = {
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

  function handleFilterCallback(resutl: OrderFilterPoolCallbackProps) {
    setData(resutl.filterData);
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
    if (authContext.shopInfo == null) {
      return;
    }

    const isUpdateSuccessfully = await OrderService.updateOneOrderStatus(
      authContext.shopInfo._id,
      targetOrderId
    );
    if (isUpdateSuccessfully == null) {
      notificationContext?.notificationAPI.error({
        message: `Xác nhận xem xét thất bại`,
        description: `Không thể xác nhận xem xét cho đơn hàng ${targetOrderId}`,
        placement: "top",
      });
    } else {
      console.log("success");
      notificationContext?.notificationAPI.success({
        message: `Xác nhận xem xét thành công`,
        description: `Xác nhận xem xét hủy cho đơn hàng ${targetOrderId}`,
        placement: "top",
      });
      askToRefreshData(tabKey);
    }
  }

  function handleCancelOrderOnClick(params: any) {
    const targetOrderId = params as string;
    //TODO: call api to update order status here
  }

  function handleSelectedRowKeysOnChange(
    newSelectedRowKeys: React.Key[],
    selectedRows: CancelledOrder[]
  ) {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedOrderIds: string[] = selectedRows.map(
      (value: CancelledOrder) => {
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
        message: `Xác nhận xem xét thất bại`,
        description: `Không thể xác nhận xem xét hủy hàng loạt`,
        placement: "top",
      });
    } else {
      notificationContext?.notificationAPI.success({
        message: `Xác nhận xem xét thành công`,
        description: `Xác nhận xem xét hủy hàng loạt cho các đơn hàng`,
        placement: "top",
      });
      askToRefreshData(tabKey);
    }
  }

  const rowSelection: TableRowSelection<CancelledOrder> = {
    selectedRowKeys: selectedRowKeys,
    onChange: handleSelectedRowKeysOnChange,
  };

  return (
    <>
      <Flex vertical className="w-full mb-2" justify="center" align="center">
        <OrderFilterPool
          poolKey={cancelledTabFilterPoolKey}
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
        scroll={{ x: 550, y: 400 }}
        columns={dataColumns}
        dataSource={dataToDisplay}
        showHeader
      />

      <OrderDetailDrawer
        open={orderDetailOpen}
        orderProps={selectedOrderDetail}
        onCloseCallback={handleOrderDetailDrawerOnClose}
        confirmButtonActive
        cancelButtonActive={false}
        confirmButtonOnClick={handleConfirmOrderOnClick}
        cancelButtonOnClick={handleCancelOrderOnClick}
      />
    </>
  );
}
