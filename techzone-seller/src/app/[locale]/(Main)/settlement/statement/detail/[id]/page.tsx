"use client";
import { ProductStatementInput } from "@/apis/SettlementAPI";
import { formatPrice } from "@/component/utils/formatPrice";
import { AuthContext } from "@/context/AuthContext";
import { ProductStatementType } from "@/model/ProductStatementType";
import { SettlementService } from "@/services/Settlement";
import { Breadcrumb, Button, Empty, Table, Tooltip } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CgList } from "react-icons/cg";
import { GoInfo } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";

export default function UpdateProductInfo({
  params,
}: {
  params: { id: string };
}) {
  const query = useSearchParams();
  const authContext = useContext(AuthContext);
  const [allProductStatements, setAllProductStatements] = useState<
    ProductStatementType[]
  >([]);
  const router = useRouter();

  const [total, setTotal] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [period, setPeriod] = useState<string>("");
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

  // const columns = [
  //   {
  //     title: "Tên sản phẩm",
  //     dataIndex: "name",
  //     render: (text: string, record: ProductStatementType, index: number) => (
  //       <div>
  //         {index == 0 ? (
  //           <div></div>
  //         ) : (
  //           <div style={{ display: "flex", alignItems: "center" }}>
  //             <img
  //               src={record.product_avatar ?? ""}
  //               alt={text}
  //               style={{ marginRight: "8px", width: "32px", height: "32px" }}
  //             />
  //             {record.product_name}
  //           </div>
  //         )}
  //       </div>
  //     ),
  //     width: "30%",
  //   },
  //   {
  //     title: "Số lượng",
  //     dataIndex: "amount",
  //     render: (_: any, record: ProductStatementType, index: number) => {
  //       return (
  //         <p className={`${index == 0 ? "font-bold" : ""}`}>
  //           {index == 0 ? totalAmount : record.amount}
  //         </p>
  //       );
  //     },
  //     width: "10%",
  //   },
  //   {
  //     title: "Giá bán",
  //     dataIndex: "price",
  //     width: "15%",
  //     render: (_: any, record: ProductStatementType, index: number) => {
  //       return (
  //         <div>
  //           {index == 0 ? <div></div> : <div className="">{record.price}</div>}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: "Phí nền tảng",
  //     dataIndex: "system_fee",
  //     render: (_: any, record: ProductStatementType, index: number) => {
  //       return (
  //         <div>
  //           {index == 0 ? (
  //             <div></div>
  //           ) : (
  //             <div className="">{record.system_fee}</div>
  //           )}
  //         </div>
  //       );
  //     },
  //     width: "15%",
  //   },

  //   {
  //     title: "Doanh thu",
  //     dataIndex: "revenue",
  //     render: (_: any, record: ProductStatementType, index: number) => {
  //       return (
  //         <p className={`${index == 0 ? "font-bold" : ""}`}>
  //           {index == 0 ? totalRevenue : record.revenue}
  //         </p>
  //       );
  //     },
  //     sorter: (a: ProductStatementType, b: ProductStatementType) =>
  //       a.revenue - b.revenue,
  //     width: "20%",
  //   },
  // ];

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text: string, record: ProductStatementType, index: number) => (
        <div>
          {index == 0 ? (
            <div className="font-bold">{record.product_name}</div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={record.product_avatar ?? ""}
                alt={text}
                style={{ marginRight: "8px", width: "32px", height: "32px" }}
              />
              {record.product_name}
            </div>
          )}
        </div>
      ),
      width: "30%",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      render: (_: any, record: ProductStatementType, index: number) => {
        return (
          <p className={`${index == 0 ? "font-bold " : ""}`}>
            {index == 0 ? totalAmount : record.amount}
          </p>
        );
      },
      width: "10%",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      render: (text: number) => formatPrice(text),
      width: "15%",
    },
    {
      title: "Phí nền tảng",
      dataIndex: "system_fee",
      render: (text: number) => formatPrice(text),
      width: "15%",
    },

    {
      title: "Doanh thu",
      dataIndex: "revenue",
      render: (_: any, record: ProductStatementType, index: number) => {
        return (
          <p className={`${index == 0 ? "font-bold" : ""}`}>
            {index == 0
              ? formatPrice(totalRevenue)
              : formatPrice(record.revenue)}
          </p>
        );
      },
      sorter: (a: ProductStatementType, b: ProductStatementType) =>
        a.revenue - b.revenue,
      width: "20%",
    },
  ];

  const loadProductStatement = async () => {
    const input: ProductStatementInput = { id: params.id };
    if (query.get("index")) {
      input.index = Number(query.get("index")) ?? undefined;
    }
    if (query.get("amount")) {
      input.amount = Number(query.get("index")) ?? undefined;
    }

    const response: {
      total: number;
      totalPages: number;
      totalAmount: number;
      totalRevenue: number;
      period: string;
      productStatements: ProductStatementType[];
    } = await SettlementService.getStatementById(input);
    console.log("THAO", response);
    const summaryRecord: ProductStatementType = {
      _id: "",
      product_avatar: "",
      product_name: "TỔNG",
      amount: response.totalAmount,
      price: null,
      system_fee: null,
      revenue: response.totalRevenue,
    };

    const productStatements = response.productStatements;
    productStatements.unshift(summaryRecord);

    setAllProductStatements(productStatements);
    setTotal(response.total + 1);
    setTotalAmount(response.totalAmount);
    setTotalRevenue(response.totalRevenue);
    setPeriod(response.period);
    setAllProductStatements(response.productStatements);
  };

  useEffect(() => {
    loadProductStatement();
  }, [query]);

  useEffect(() => {
    loadProductStatement();
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
              href: "/settlement/statement",
              title: "Sao kê",
            },
            {
              title: "Chi tiết sao kê",
            },
          ]}
        />

        <div className="flex space-x-2 items-center my-4">
          <Button
            type="text"
            icon={<IoIosArrowBack size={28} />}
            onClick={() => router.push("/settlement/statement")}
          />

          <div className="">
            <p className=" text-xl font-semibold">
              Chi tiết sao kê - ID: {params.id}
            </p>
            <p className="text-xs">Sao kê kỳ: {period}</p>
          </div>
        </div>

        <div className="mt-8 shadow-2xl p-4  space-y-2 border border-1 border-slate-100 rounded-lg w-1/3">
          <div className="flex space-x-2 items-center">
            <CgList size={28} color="#1890ff" />
            <p>Tổng doanh thu</p>
            <Tooltip
              placement="right"
              title={"Tổng doanh số bán hàng của Nhà Bán trong chu kỳ hiện tại"}
            >
              {" "}
              <GoInfo />
            </Tooltip>
          </div>
          <div className="ml-8 text-2xl text-sky-500 font-bold">
            {formatPrice(totalRevenue)} đ
          </div>
        </div>
      </div>
      <div className="bg-white top-4 rounded-lg">
        <Table
          pagination={{
            defaultPageSize: 20,
            pageSizeOptions: ["20", "10", "5"],

            showSizeChanger: true,
            total: total,
            onChange: (page, pageSize) => {
              fetchRecords(page, pageSize);
            },
          }}
          bordered
          columns={columns}
          dataSource={allProductStatements}
          locale={{
            emptyText: (
              <Empty description={<span>Không có dữ liệu hiển thị</span>} />
            ),
          }}
          className=""
          rowClassName={(record, index) => (index === 0 ? "bg-slate-100" : "")}
        />
      </div>
    </div>
  );
}
