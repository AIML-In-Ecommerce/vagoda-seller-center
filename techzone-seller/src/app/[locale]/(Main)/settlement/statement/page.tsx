"use client";
import { StatementInput } from "@/apis/SettlementAPI";
import { formatCurrencyFromValue } from "@/component/util/CurrencyDisplay";
import { AuthContext } from "@/context/AuthContext";
import { StatementType } from "@/model/StatementType";
import { SettlementService } from "@/services/Settlement";
import { Breadcrumb, Button, Empty, Table, Tooltip } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useContext, useEffect, useState } from "react";
import { GoInfo } from "react-icons/go";
import { HiOutlineCurrencyDollar, HiOutlineHome } from "react-icons/hi2";

export default function StatementPage() {
  const query = useSearchParams();
  const [totalStatements, setTotalStatements] = useState(0);
  const [allStatements, setAllStatements] = useState<StatementType[]>([]);
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
      dataIndex: "statementDate",
      width: "12%",
      render: (text: string) => new Date(text).toLocaleDateString("en-GB"),
    },
    {
      title: "Kỳ sao kê",
      dataIndex: "period",

      width: "20%",
    },

    {
      title: "Doanh thu",
      dataIndex: "revenue",
      render: (text: number) => formatCurrencyFromValue({ value: text }),
      sorter: (a: StatementType, b: StatementType) => a.revenue - b.revenue,
      width: "20%",
    },

    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_: any, record: StatementType) => {
        return (
          <div className="xl:space-x-1 space-y-2 mx-2">
            <Link href={`statement/detail/${record._id}`}>
              <Button type="primary" className="w-full bg-sky-500 ">
                Xem chi tiết
              </Button>
            </Link>
          </div>
        );
      },
      width: "14%",
    },
  ];

  const fetchRecords = (page: number, pageSize: number) => {
    const updatedQuery = new URLSearchParams(query.toString());
    updatedQuery.set("index", page.toString());
    updatedQuery.set("amount", pageSize.toString());

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${updatedQuery.toString()}`
    );
  };

  const loadAllStatements = async () => {
    if (!authContext.shopInfo) {
      return;
    }
    console.log("Loading");

    const input: StatementInput = { shopId: authContext.shopInfo._id };
    if (query.get("index")) {
      input.index = Number(query.get("index")) ?? undefined;
    }
    if (query.get("amount")) {
      input.amount = Number(query.get("index")) ?? undefined;
    }

    const response: {
      total: number;
      totalPages: number;
      statements: StatementType[];
    } = await SettlementService.getAllStatements(input);
    console.log("Statements loaded", response);
    setAllStatements(response.statements);
    setTotalStatements(response.total);
  };

  useEffect(() => {
    if (authContext.shopInfo) {
      loadAllStatements();
    }
  }, [query, authContext.shopInfo]);

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
          <div className="text-xl text-sky-500 font-bold">
            {formatCurrencyFromValue({
              value: allStatements?.at(-1)?.revenue ?? 0,
            })}
          </div>
        </div>
      </div>
      <div className="bg-white top-4 rounded-lg">
        <Table
          pagination={{
            defaultPageSize: 20,
            pageSizeOptions: ["20", "10", "5"],

            showSizeChanger: true,
            total: totalStatements,
            onChange: (page, pageSize) => {
              fetchRecords(page, pageSize);
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
