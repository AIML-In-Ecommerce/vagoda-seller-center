"use client";
import { formatPrice } from "@/component/utils/formatPrice";
import { AuthContext } from "@/context/AuthContext";
import { StatementType } from "@/model/StatementType";
import { Breadcrumb, Button, Empty, Table, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { GoInfo } from "react-icons/go";
import { HiOutlineCurrencyDollar, HiOutlineHome } from "react-icons/hi2";
const statements: StatementType[] = [
  {
    _id: "1",
    name: "Statement 1",
    date: "2024-08-01",
    period: "August 2024",
    revenue: 1500.0,
  },
  {
    _id: "2",
    name: "Statement 2",
    date: "2024-07-01",
    period: "July 2024",
    revenue: 2000.0,
  },
  {
    _id: "3",
    name: "Statement 3",
    date: "2024-06-01",
    period: "June 2024",
    revenue: 1800.0,
  },
];

export default function StatementPage() {
  const [totalStatements, setTotalStatements] = useState(0);
  const [allStatements, setAllStatements] =
    useState<StatementType[]>(statements);
  const authContext = useContext(AuthContext);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",

      width: "10%",
    },
    {
      title: "Tên sao kê",
      dataIndex: "name",

      width: "20%",
    },
    {
      title: "Ngày sao kê",
      dataIndex: "date",
      width: "12%",
    },
    {
      title: "Kỳ sao kê",
      dataIndex: "period",

      width: "20%",
    },

    {
      title: "Doanh thu",
      dataIndex: "revenue",
      render: (text: number) => formatPrice(text),
      sorter: (a: StatementType, b: StatementType) => a.revenue - b.revenue,
      width: "20%",
    },

    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: StatementType) => {
        return (
          <div className="xl:space-x-1 space-y-2 mx-2">
            <Button
              type="primary"
              className="w-full bg-sky-500 "
              // onClick={() => showDrawer(record)}
            >
              Xem chi tiết
            </Button>
          </div>
        );
      },
      width: "14%",
    },
  ];

  useEffect(() => {
    const loadAllStatements = async () => {
      if (!authContext.shopInfo) {
        return;
      }
      console.log("Loading");

      // const response: {
      //   total: number;
      //   totalPages: number;
      //   products: _ProductType[];
      // } = await ProductService.getProductByFilter(
      //   filter,
      //   authContext.shopInfo._id ?? ""
      // );
      setAllStatements(statements);
      setTotalStatements(statements.length);
    };

    loadAllStatements;
  }, []);

  return (
    <div className="mt-4 mr-1 space-y-2">
      <div className="space-y-2 bg-white p-4">
        <Breadcrumb
          className="text-xs"
          items={[
            {
              href: "/",
              title: (
                <div className="flex items-center">
                  <HiOutlineHome size={15} />
                </div>
              ),
            },
            {
              href: "/settlement/my-balance",
              title: "Quản lý tài chính",
            },
            {
              title: "Sao kê",
            },
          ]}
        />
        <div className="flex space-x-2 items-center mb-4">
          <HiOutlineCurrencyDollar size={28} />
          <p className="uppercase text-xl font-semibold">Sao kê</p>
        </div>
        <div className="mt-8 shadow-2xl p-4 min-w-32 max-w-48 space-y-2 border border-1 border-slate-100 rounded-lg">
          <div className="flex space-x-2 items-center">
            <p>Doanh thu kỳ hiện tại</p>
            <Tooltip
              placement="right"
              title={"Doanh thu của chu kỳ sao kê đang diễn ra"}
            >
              {" "}
              <GoInfo />
            </Tooltip>
          </div>
          <div className="text-xl text-sky-500 font-bold">100.000.000 đ</div>
        </div>
      </div>
      <div className="bg-white top-4 rounded-lg">
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                // () => showDrawer(record);
              },
            };
          }}
          pagination={{
            defaultPageSize: 20,
            pageSizeOptions: ["20", "10", "5"],

            showSizeChanger: true,
            total: totalStatements,
            onChange: (page, pageSize) => {
              //   fetchRecords(page, pageSize);
            },
          }}
          bordered
          columns={columns}
          dataSource={allStatements}
          locale={{
            emptyText: (
              <Empty description={<span>Không có dữ liệu hiển thị</span>} />
            ),
          }}
          className=""
        />
      </div>
    </div>
  );
}
