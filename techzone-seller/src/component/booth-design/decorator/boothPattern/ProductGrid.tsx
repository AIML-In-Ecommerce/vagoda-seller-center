"use client";
import ProductItem from "@/component/booth-design/decorator/mini/ProductItem";
import { ProductType } from "@/model/ProductType";
import { ProductElement, WidgetType } from "@/model/WidgetType";
import { Divider, List } from "antd";
import CustomEmpty from "../mini/CustomEmpty";
import { CollectionType } from "@/model/CollectionType";
import { useEffect, useMemo, useState } from "react";
import { GET_GetCollection } from "@/app/apis/collection/CollectionAPI";
import { POST_GetProductList } from "@/app/apis/product/ProductAPI";

interface ProductGridProps {
  widget: WidgetType;
}

export default function ProductGrid(props: ProductGridProps) {
  // var
  const element = useMemo(() => {
    return props.widget.element as ProductElement;
  }, [props.widget.element]);

  const [collection, setCollection] = useState<CollectionType>();
  const [products, setProducts] = useState<ProductType[]>([]);

  // call api
  useEffect(() => {
    handleGetCollection();
  }, [element, element.collectionId]);

  useEffect(() => {
    handleGetProductList();
  }, [element, collection]);

  const handleGetCollection = async () => {
    const response = await GET_GetCollection(element.collectionId);
    if (response.status == 200) {
      if (response.data) {
        setCollection(response.data);
        // console.log("collection", response.data);
      }
    }
  };

  const handleGetProductList = async () => {
    if (!collection) return;
    const response = await POST_GetProductList(collection.productIdList);
    if (response.status == 200) {
      if (response.data) {
        setProducts(response.data);
        // console.log("product", data);
      }
    }
  };

  return (
    <div className="bg-white my-5 py-5 px-10 rounded-xl">
      {/* <Typography.Text className="text-xl font-semibold w-full">
        {element.title}
      </Typography.Text>
      <div className="invisible h-5">hidden block</div> */}

      {element.title && (
        <div className="w-full flex align-middle justify-center items-center">
          <div className="w-1/2">
            <Divider
              style={{
                border: "2px solid silver",
                borderTop: 0,
                borderBottom: 0,
                borderLeft: 0,
                borderRight: 0,
                paddingBottom: 0,
                marginBottom: 40,
              }}
            >
              <div className="px-5 text-lg uppercase">{element.title}</div>
            </Divider>
          </div>
        </div>
      )}

      <List
        grid={{
          gutter: 5,
          xs: 0,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={products}
        locale={{
          emptyText: <CustomEmpty />,
        }}
        renderItem={(item) => (
          <List.Item>
            <ProductItem
              imageLink={item.imageLink}
              name={item.name}
              rating={item.rating}
              soldAmount={item.soldAmount}
              price={item.price}
              isFlashSale={item.flashSale}
              originalPrice={item.originalPrice}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
