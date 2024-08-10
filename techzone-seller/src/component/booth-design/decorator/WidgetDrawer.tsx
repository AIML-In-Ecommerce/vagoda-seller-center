import {
  WidgetCategoryType,
  BannerPatternType,
  CategoryPatternType,
  ProductPatternType,
  PromotionPatternType,
  CollectionPatternType,
} from "@/model/WidgetType";
import {
  CloseOutlined,
  GroupOutlined,
  InsertRowBelowOutlined,
  // PicLeftOutlined,
  PercentageOutlined,
  PicCenterOutlined,
  FontColorsOutlined,
  AppstoreOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Drawer, Flex } from "antd";
import MiniDesignPattern from "./mini/MiniDesignPattern";

interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  addWidget: (type: string, pattern: string, order: number) => void;
  order: number;
}

export default function WidgetDrawer(props: DrawerProps) {
  const drawerBannerItems = [
    {
      title: "Băng chuyền",
      icon: (
        <PicCenterOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Băng chuyền cho hình ảnh quảng cáo",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723189813/banner_carousel_julzjw.png",
      type: WidgetCategoryType.BANNER,
      pattern: BannerPatternType.CAROUSEL,
    },
    // {
    //   title: "Hình & chữ",
    //   icon: (
    //     <PicLeftOutlined
    //       style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
    //     />
    //   ),
    // },
  ];
  const drawerCategoryItems = [
    {
      title: "Danh mục dạng lưới",
      icon: (
        <FontColorsOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Danh sách danh mục để lọc sản phẩm của cửa hàng",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723189813/category_kvjrkv.png",
      type: WidgetCategoryType.CATEGORY,
      pattern: CategoryPatternType.GRID,
    },
    // {
    //   title: "Danh mục hình & chữ",
    //   icon: (
    //     <PicLeftOutlined
    //       style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
    //     />
    //   ),
    // },
  ];
  const drawerProductItems = [
    {
      title: "Sản phẩm dạng lưới",
      icon: (
        <GroupOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Danh sách dạng lưới của các sản phẩm trong 1 bộ sưu tập",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723189813/product1_zy6dlf.png",
      type: WidgetCategoryType.PRODUCT,
      pattern: ProductPatternType.GRID,
    },
    {
      title: "Sản phẩm dạng băng chuyền",
      icon: (
        <InsertRowBelowOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description:
        "Danh sách dạng băng chuyền của các sản phẩm trong 1 bộ sưu tập",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723189813/product2_ezmuft.png",
      type: WidgetCategoryType.PRODUCT,
      pattern: ProductPatternType.CAROUSEL,
    },
    // {
    //   title: "Sản phẩm, hình & chữ",
    //   icon: (
    //     <PicLeftOutlined
    //       style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
    //     />
    //   ),
    // },
  ];
  const drawerPromotionItems = [
    {
      title: "Mã giảm giá",
      icon: (
        <PercentageOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Danh sách mã giảm giá",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723190550/promotion_wjbmn3.png",
      type: WidgetCategoryType.PROMOTION,
      pattern: PromotionPatternType.GRID,
    },
  ];
  const drawerCollectionItems = [
    {
      title: "Bộ sưu tập dạng lưới",
      icon: (
        <AppstoreOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Danh sách dạng lưới của các bộ sưu tập",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723189813/collection1_hdn6gm.png",
      type: WidgetCategoryType.COLLECTION,
      pattern: CollectionPatternType.GRID,
    },
    {
      title: "Bộ sưu tập dạng băng chuyền",
      icon: (
        <ProductOutlined
          style={{ fontSize: "32px", marginTop: "8px", marginLeft: "8px" }}
        />
      ),
      description: "Danh sách dạng băng chuyền của các bộ sưu tập",
      image:
        "https://res.cloudinary.com/dscan7kgm/image/upload/v1723189813/collection2_fvcvp0.png",
      type: WidgetCategoryType.COLLECTION,
      pattern: CollectionPatternType.CAROUSEL,
    },
  ];

  return (
    <Drawer
      title="Mẫu thiết kế"
      placement="left"
      width={400}
      closeIcon={false}
      open={props.openDrawer}
      extra={
        <CloseOutlined
          onClick={() => {
            props.setOpenDrawer(false);
          }}
          style={{ cursor: "pointer" }}
        />
      }
    >
      <div className="overflow-y-auto overflow-x-hidden">
        <div className="font-semibold uppercase">banner</div>
        <Flex>
          {drawerBannerItems.map((drawerItem, i) => (
            <div
              key={i}
              onClick={() =>
                props.addWidget(
                  drawerItem.type,
                  drawerItem.pattern,
                  props.order
                )
              }
            >
              <MiniDesignPattern
                title={drawerItem.title}
                icon={drawerItem.icon}
                previewImageUrl={drawerItem.image}
                description={drawerItem.description}
              />
            </div>
          ))}
        </Flex>

        <div className="font-semibold uppercase">danh mục</div>
        <Flex>
          {drawerCategoryItems.map((drawerItem, i) => (
            <div
              key={i}
              onClick={() =>
                props.addWidget(
                  drawerItem.type,
                  drawerItem.pattern,
                  props.order
                )
              }
            >
              <MiniDesignPattern
                title={drawerItem.title}
                icon={drawerItem.icon}
                previewImageUrl={drawerItem.image}
                description={drawerItem.description}
              />
            </div>
          ))}
        </Flex>

        <div className="font-semibold uppercase">sản phẩm</div>
        <Flex>
          {drawerProductItems.map((drawerItem, i) => (
            <div
              key={i}
              onClick={() =>
                props.addWidget(
                  drawerItem.type,
                  drawerItem.pattern,
                  props.order
                )
              }
            >
              <MiniDesignPattern
                title={drawerItem.title}
                icon={drawerItem.icon}
                previewImageUrl={drawerItem.image}
                description={drawerItem.description}
              />
            </div>
          ))}
        </Flex>

        <div className="font-semibold uppercase">bộ sưu tập</div>
        <Flex>
          {drawerCollectionItems.map((drawerItem, i) => (
            <div
              key={i}
              onClick={() =>
                props.addWidget(
                  drawerItem.type,
                  drawerItem.pattern,
                  props.order
                )
              }
            >
              <MiniDesignPattern
                title={drawerItem.title}
                icon={drawerItem.icon}
                previewImageUrl={drawerItem.image}
                description={drawerItem.description}
              />
            </div>
          ))}
        </Flex>

        <div className="font-semibold uppercase">khuyến mãi</div>
        <Flex>
          {drawerPromotionItems.map((drawerItem, i) => (
            <div
              key={i}
              onClick={() =>
                props.addWidget(
                  drawerItem.type,
                  drawerItem.pattern,
                  props.order
                )
              }
            >
              <MiniDesignPattern
                title={drawerItem.title}
                icon={drawerItem.icon}
                previewImageUrl={drawerItem.image}
                description={drawerItem.description}
              />
            </div>
          ))}
        </Flex>
      </div>
    </Drawer>
  );
}
