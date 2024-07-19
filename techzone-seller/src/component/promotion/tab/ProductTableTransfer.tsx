"use client";
import React, { useEffect, useState } from 'react';
import { Space, Switch, Table, Tag, Transfer } from 'antd';
import type { GetProp, TableColumnsType, TableProps, TransferProps } from 'antd';
import { ProductService } from '@/services/Product';
import { _ProductType } from '@/model/ProductType';
import { Currency } from '@/component/util/CurrencyDisplay';

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];


interface ProductType {
    key: string;
    title: string;
    finalPrice: number;
    tag: string[];
}

interface TableTransferProps extends TransferProps<TransferItem> {
    dataSource: ProductType[];
    leftColumns: TableColumnsType<ProductType>;
    rightColumns: TableColumnsType<ProductType>;
}

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: TableTransferProps) => (
    <Transfer {...restProps}>
        {({
            direction,
            filteredItems,
            onItemSelect,
            onItemSelectAll,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection: TableRowSelection<TransferItem> = {
                getCheckboxProps: () => ({ disabled: listDisabled }),
                onChange(selectedRowKeys) {
                    onItemSelectAll(selectedRowKeys as string[], 'replace');
                },
                selectedRowKeys: listSelectedKeys,
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? 'none' : undefined }}
                    onRow={({ key, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) {
                                return;
                            }
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);

const columns: TableColumnsType<ProductType> = [
    {
        dataIndex: 'title',
        title: 'Sản phẩm',
        width: '40%',
    },
    {
        dataIndex: 'tag',
        title: 'Danh mục',
        render: (tag: string[]) => <div className="flex flex-row gap-2">
            {
                tag ? tag.map((item) =>
                    <Tag style={{ marginInlineEnd: 0 }} color="cyan">
                        {item.toUpperCase()}
                    </Tag >) : <Tag style={{ marginInlineEnd: 0 }} color="grey">
                    {"KHÔNG".toUpperCase()}
                </Tag>
            }
        </div>
    },
    {
        dataIndex: 'finalPrice',
        title: 'Giá bán',
        render: (finalPrice: number) => <Currency value={finalPrice}
            locales={"vi-VN"}
            currency={"VND"}
            minimumFractionDigits={0} />
    },
];

interface ProductTableTransferProps {
    currentKeyword: string;
    targetProducts: any[];
    setTargetProducts: (products: any[]) => void;
}

export default function ProductTableTransfer(props: ProductTableTransferProps) {
    const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
    const [disabled, setDisabled] = useState(false);
    const [keyword, setKeyword] = useState<string>(props.currentKeyword);
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response: {
                total: number,
                totalPages: number,
                products: _ProductType[];
            } = await ProductService.getProductByFilter({ keyword: keyword });
            console.log('RESPONSE:', response);
            props.setTargetProducts(products);
            if (response) {
                const simplifyProducts = response.products.map((product: _ProductType, key) => {
                    const categories: string[] = [];
                    if (product.category) {
                        categories.push(product.category.name);
                        if (product.subCategory) {
                            categories.push(product.subCategory.name);
                            if (product.subCategoryType) {
                                categories.push(product.subCategoryType.name);
                            }
                        }
                    }
                    const simplifyProduct: ProductType = {
                        key: product._id ?? key,
                        title: product.name ?? "product_name",
                        tag: categories,
                        finalPrice: product.finalPrice ?? 0
                    };
                    return simplifyProduct;
                })
                setProducts(simplifyProducts);
            }
        }
        fetchProducts();
    }, [keyword])

    useEffect(() => {
        console.log("ProductList: ", products);

    }, [products])

    const onChange: TableTransferProps['onChange'] = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const toggleDisabled = (checked: boolean) => {
        setDisabled(checked);
    };

    return (
        <>
            <TableTransfer
                dataSource={products}
                targetKeys={targetKeys}
                disabled={disabled}
                showSearch
                showSelectAll={false}
                titles={[
                    <div className="text-blue-700 cursor-pointer hover:text-blue-900">Chọn tất cả</div>,
                    <div className="text-blue-700 cursor-pointer hover:text-blue-900">Xóa tất cả</div>]}
                selectAllLabels={[
                    ({ selectedCount, totalCount }) => (
                        <span>
                            Danh sách sản phẩm ({totalCount})
                        </span>
                    ), ({ selectedCount, totalCount }) => (
                        <span>
                            Sản phẩm đã chọn ({selectedCount}/{totalCount})
                        </span>
                    )
                ]}
                onChange={onChange}
                filterOption={(inputValue, item) =>
                    item.title!.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                }
                leftColumns={columns}
                rightColumns={columns}
            />
        </>
    );
};
