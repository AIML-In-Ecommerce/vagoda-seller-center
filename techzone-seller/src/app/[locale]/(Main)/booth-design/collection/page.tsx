"use client";
import DeleteCollectionModal from "@/component/booth-design/collection/modal/DeleteCollectionModal";
import CustomEmpty from "@/component/booth-design/decorator/mini/CustomEmpty";
import { CollectionType } from "@/model/CollectionType";
import { formatDate } from "@/utils/DateFormatter";
import {
  TableColumnType,
  Flex,
  Button,
  Table,
  Badge,
  // Select,
  Typography,
  Layout,
  Breadcrumb,
  Skeleton,
} from "antd";
import Search from "antd/es/input/Search";
import { TableRowSelection } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi2";
import {
  DELETE_DeleteCollection,
  GET_GetCollectionListByShop,
} from "@/apis/collection/CollectionAPI";

interface CollectionColumn {
  key: string;
  name: string;
  number: number;
  createDate: string;
  status: string; // active/inactive
}

export default function CollectionPage() {
  // mock data
  const mockId = "65f1e8bbc4e39014df775166";
  //TODO

  // variables
  const [collections, setCollections] = useState<CollectionType[]>();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [rawData, setRawData] = useState<CollectionColumn[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<CollectionColumn[]>([]);
  const [searchText, setSearchText] = useState("");

  // functions

  // search filter
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (!searchText || searchText === "") {
      setDataToDisplay(rawData);
      return;
    }
    let newData = rawData.filter((d) =>
      d.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDataToDisplay(newData);
  }, [searchText]);

  // delete
  const handleDeleteCollection = () => {
    if (selectedOrderIds.length > 0) setOpenDeleteModal(true);
  };

  const deleteCollection = async () => {
    if (!collections) return;

    let newList = [...collections];
    selectedOrderIds.forEach((selectedId) => {
      newList = newList.filter((w) => w._id !== selectedId);
    });

    // delete using api
    selectedOrderIds.forEach(async (selectedId) => {
      const response = await DELETE_DeleteCollection(selectedId);
      if (response.status === 200) {
        alert("Xoá bộ sưu tập thành công!");
      } else {
        alert("Xoá bộ sưu tập thất bại...");
        // console.log(response.message);
        return;
      }
    });

    console.log("Delete successfully");

    setCollections(newList);
    setOpenDeleteModal(false);
    setSelectedRowKeys([]);
    setSelectedOrderIds([]);
    // TODO: toast update successfully
  };

  const dataColumns: TableColumnType<CollectionColumn>[] = [
    {
      title: "Tên Bộ sưu tập",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "number",
      render: (value: any, collection: CollectionColumn) => {
        if (value) {
        }

        return (
          <Flex vertical wrap={"wrap"} gap={4} justify="center" align="center">
            <Typography.Text>{collection.number}</Typography.Text>
          </Flex>
        );
      },
      width: "14%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      width: "30%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        // {
        //   text: "Tất cả trạng thái",
        //   value: "Tất cả trạng thái",
        // },
        {
          text: (
            <span>
              <Badge color="blue" /> Bật
            </span>
          ),
          value: "Bật",
        },
        {
          text: (
            <span>
              <Badge color="gray" /> Tắt
            </span>
          ),
          value: "Tắt",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
      // || value === "Tất cả trạng thái",
      width: "13%",
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
              href={`./collection/${collection.key}#part-1`}
            >
              Xem chi tiết
            </Button>
          </Flex>
        );
      },
      width: "13%",
    },
  ];

  useEffect(() => {
    if (!collections) return;

    const display = collections.map(
      (value: CollectionType) => {
        const item: CollectionColumn = {
          key: value._id,
          name: value.name,
          number: value.productIdList.length,
          createDate: formatDate(new Date(value.createDate)),
          status: value.isActive ? "Bật" : "Tắt",
        };

        return item;
      },
      [collections]
    );

    setRawData(display);
    setDataToDisplay(display);
  }, [collections]);

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

  // const handleChangePattern = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // call api
  useEffect(() => {
    handleGetCollectionList();
  }, []);

  const handleGetCollectionList = async () => {
    const response = await GET_GetCollectionListByShop(mockId);

    if (response.status === 200) {
      console.log(response.data);
      console.log(response.message);
      if (response.data) setCollections(response.data);
    } else console.log(response.message);
  };

  return (
    <Layout>
      {(collections && (
        <div className="m-5">
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
                title: "Thiết kế gian hàng",
              },
              {
                href: "/booth-design/collection",
                title: "Bộ sưu tập",
              },
            ]}
          />

          <Flex gap="large" style={{ justifyContent: "space-between" }}>
            <Flex gap="large">
              <Button
                className="bg-[#1677ff] text-white font-semibold mt-2"
                href="./collection/new#part-1"
              >
                Tạo mới
              </Button>

              {collections && collections.length > 0 && (
                <Button
                  className="bg-red-500 text-white font-semibold mt-2"
                  onClick={handleDeleteCollection}
                >
                  Xoá
                </Button>
              )}
            </Flex>

            {/* <Flex gap="large" className="my-2"> */}
            <Search
              placeholder="Tìm kiếm bộ sưu tập"
              style={{ width: "400px" }}
              className="my-2"
              onPressEnter={handleSearch}
              onSearch={(e) => setSearchText(e)}
            />

            {/* <Select
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
          /> */}
          </Flex>

          <Table
            rowSelection={rowSelection}
            columns={dataColumns}
            dataSource={dataToDisplay}
            locale={{
              emptyText: <CustomEmpty />,
            }}
          />

          <DeleteCollectionModal
            open={openDeleteModal}
            handleOk={deleteCollection}
            handleCancel={() => setOpenDeleteModal(false)}
          />
        </div>
      )) || <Skeleton active style={{ margin: 10 }} />}
    </Layout>
  );
}
