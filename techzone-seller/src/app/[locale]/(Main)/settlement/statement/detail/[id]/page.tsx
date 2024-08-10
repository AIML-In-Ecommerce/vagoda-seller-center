"use client";
import { formatPrice } from "@/component/utils/formatPrice";
import { AuthContext } from "@/context/AuthContext";
import { ProductStatementType } from "@/model/ProductStatementType";
import { StatementType } from "@/model/StatementType";
import { Breadcrumb, Empty, Table, Tooltip } from "antd";
import { useContext, useEffect, useState } from "react";
import { CgList } from "react-icons/cg";
import { GoInfo } from "react-icons/go";
import { HiOutlineHome } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";

const productStatements: ProductStatementType[] = [
  {
    _id: "1",
    product_name: "Product A",
    amount: 10,
    price: 100,
    system_fee: 5,
    revenue: 950,
  },
  {
    _id: "2",
    product_name: "Product B",
    amount: 5,
    price: 200,
    system_fee: 10,
    revenue: 990,
  },
  {
    _id: "3",
    product_name: "Product C",
    amount: 8,
    price: 150,
    system_fee: 7.5,
    revenue: 1120,
  },
];

export default function UpdateProductInfo({
  params,
}: {
  params: { id: string };
}) {
  const [statement, setStatement] = useState<StatementType>({
    _id: "1",
    name: "Statement 1",
    date: "2024-08-01",
    period: "01/08/2020 -16/08/2020",
    revenue: 15000000,
  });
  const authContext = useContext(AuthContext);
  const [allProductStatements, setAllProductStatements] =
    useState<ProductStatementType[]>(productStatements);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",

      width: "30%",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      render: (_: any, record: ProductStatementType, index: number) => {
        return (
          <p className={`${index == 0 ? "font-semibold" : ""}`}>
            {record.amount}
          </p>
        );
      },
      width: "10%",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      width: "15%",
    },
    {
      title: "Phí nền tảng",
      dataIndex: "system_fee",

      width: "15%",
    },

    {
      title: "Doanh thu",
      dataIndex: "revenue",
      render: (_: any, record: ProductStatementType, index: number) => {
        return (
          <p className={`${index == 0 ? "font-semibold" : ""}`}>
            {record.revenue}
          </p>
        );
      },
      sorter: (a: ProductStatementType, b: ProductStatementType) =>
        a.revenue - b.revenue,
      width: "20%",
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
      setStatement({
        _id: "1",
        name: "Statement 1",
        date: "2024-08-01",
        period: "August 2024",
        revenue: 1500.0,
      });
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
              href: "/settlement/statement",
              title: "Sao kê",
            },
            {
              title: "Chi tiết sao kê",
            },
          ]}
        />
        <div className="flex space-x-2 items-center my-4">
          <IoIosArrowBack size={28} />
          <div className="">
            <p className=" text-xl font-semibold">
              Chi tiết sao kê - ID: {params.id}
            </p>
            <p className="text-xs">Sao kê kỳ: {statement?.period}</p>
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
            {formatPrice(statement.revenue)} đ
          </div>
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
            total: 9,
            onChange: (page, pageSize) => {
              //   fetchRecords(page, pageSize);
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
        />
      </div>
    </div>
  );
}
