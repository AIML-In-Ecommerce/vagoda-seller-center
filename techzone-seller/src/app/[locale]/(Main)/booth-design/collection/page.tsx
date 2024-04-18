"use client";

import { CollectionType } from "@/model/CollectionType";
import { TableColumnType, Flex, Button, Table, Badge, Select } from "antd";
import Search from "antd/es/input/Search";
import { TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";

interface CollectionColumn {
  key: string;
  name: string;
  number: number;
  createDate: string;
  status: string; //? active/inactive?
}

export default function CollectionPage() {
  // mock data
  const collections: CollectionType[] = [
    {
      _id: "id1",
      name: "Collection 1",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "id2",
      name: "Collection 2",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
    {
      _id: "id3",
      name: "Collection 3",
      productIdList: [],
      createDate: "string",
      isActive: true,
    },
  ];

  // variables
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<CollectionColumn[]>([]);

  const dataColumns: TableColumnType<CollectionColumn>[] = [
    {
      title: "Tên Bộ sưu tập",
      dataIndex: "name",
      // render: (value: any, record: CollectionColumn, index: number) =>
      // {
      //     if(value)
      //     {}
      //     const display = () =>
      //     {
      //         let statusDisplay = <></>
      //         switch(record.status.type)
      //         {
      //             case StatusType.PENDING:
      //                 {
      //                     statusDisplay = <Tag key={record.status.name+index.toString()+"-"+Date.now().toString()} color={"geekblue"}>{record.status.name}</Tag>
      //                     break;
      //                 }
      //             case StatusType.EXPIRED:
      //                 {
      //                     statusDisplay = <Tag key={record.status.name+index.toString()+"-"+Date.now().toString()} color={"orange"}>{record.status.name}</Tag>
      //                 }
      //         }
      //         return statusDisplay
      //     }

      //     return(
      //         <Flex vertical wrap={"wrap"} gap={4} justify="center" align="center">
      //             <Typography.Text>
      //                 {record.key}
      //             </Typography.Text>
      //             {display()}
      //         </Flex>
      //     )
      // }
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "number",
    },
    {
      title: "Ngày tạo",
      dataIndex: "day",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "action",
      render: (collection: CollectionColumn) => {
        return (
          <Flex vertical justify="start" align="center">
            <Button
              type={"text"}
              // onClick={() => {handleOpenOrderDetail(record.key)}}
            >
              Xem chi tiết
            </Button>
          </Flex>
        );
      },
    },
  ];

  function handleSelectedRowKeysOnChange(
    newSelectedRowKeys: React.Key[],
    selectedRows: CollectionColumn[]
  ) {
    setSelectedRowKeys(newSelectedRowKeys);
    const selectedOrderIds: string[] = selectedRows.map(
      (value: CollectionColumn) => {
        return value.key;
      }
    );
    setSelectedOrderIds(selectedOrderIds);
  }

  const rowSelection: TableRowSelection<CollectionColumn> = {
    selectedRowKeys: selectedRowKeys,
    onChange: handleSelectedRowKeysOnChange,
  };

  const handleChangePattern = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="mr-5">
      <Button className="bg-[#1677ff] text-white font-semibold mt-2">
        Tạo mới
      </Button>

      <Flex gap="large" className="my-2">
        <Search placeholder="Tìm kiếm bộ sưu tập" style={{ width: "300px" }} />

        <Select
          defaultValue={"1"}
          style={{ width: "200px" }}
          onChange={handleChangePattern}
          options={[
            {
              value: "1",
              label: <Flex gap="small">Tất cả trạng thái</Flex>,
            },
            {
              value: "2",
              label: (
                <Flex gap="small">
                  <Badge color="blue" />
                  Bật
                </Flex>
              ),
            },
            {
              value: "3",
              label: (
                <Flex gap="small">
                  <Badge color="gray" />
                  Tắt
                </Flex>
              ),
            },
          ]}
        />
      </Flex>

      <Table
        rowSelection={rowSelection}
        columns={dataColumns}
        dataSource={dataToDisplay}
      />
    </div>
  );
}
