import {
  WidgetCategoryType,
  BannerPatternType,
  CategoryPatternType,
  ProductPatternType,
  PromotionPatternType,
} from "@/model/WidgetType";
import {
  CloseOutlined,
  GroupOutlined,
  InsertRowBelowOutlined,
  // PicLeftOutlined,
  PercentageOutlined,
  PicCenterOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import { Drawer, Flex } from "antd";
import MiniDesignPattern from "./mini/MiniDesignPattern";
import CustomEmpty from "./mini/CustomEmpty";

interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  addWidget: (type: number, pattern: number, order: number) => void;
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

      type: WidgetCategoryType.PROMOTION,
      pattern: PromotionPatternType.GRID,
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
                previewImageUrl={""}
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
                previewImageUrl={""}
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
                previewImageUrl={""}
              />
            </div>
          ))}
        </Flex>

        <div className="font-semibold uppercase">bộ sưu tập</div>
        <CustomEmpty />

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
                previewImageUrl={""}
              />
            </div>
          ))}
        </Flex>
      </div>
    </Drawer>
  );
}
