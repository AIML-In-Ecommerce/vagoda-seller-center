import {
  BannerElement,
  BannerPatternType,
  CategoryElement,
  CategoryPatternType,
  ProductElement,
  ProductPatternType,
  PromotionElement,
  PromotionPatternType,
  WidgetCategoryType,
} from "@/model/WidgetType";
import {
  GroupOutlined,
  InsertRowBelowOutlined,
  PercentageOutlined,
  PicCenterOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";

interface IconProps {
  type: WidgetCategoryType;
  element:
    | BannerElement
    | ProductElement
    | CategoryElement
    | PromotionElement
    | undefined;
}

export default function WidgetTypeIcon(props: IconProps) {
  return (
    <div>
      {/* banner element */}
      {props.type === WidgetCategoryType.BANNER &&
        props.element &&
        props.element.pattern === BannerPatternType.CAROUSEL && (
          <PicCenterOutlined style={{ fontSize: "20px" }} />
        )}

      {/* category element */}
      {props.type === WidgetCategoryType.CATEGORY &&
        props.element &&
        props.element.pattern === CategoryPatternType.GRID && (
          <FontColorsOutlined style={{ fontSize: "20px" }} />
        )}

      {/* product element */}
      {props.type === WidgetCategoryType.PRODUCT &&
        props.element &&
        props.element.pattern === ProductPatternType.GRID && (
          <GroupOutlined style={{ fontSize: "20px" }} />
        )}
      {props.type === WidgetCategoryType.PRODUCT &&
        props.element &&
        props.element.pattern === ProductPatternType.CAROUSEL && (
          <InsertRowBelowOutlined style={{ fontSize: "20px" }} />
        )}

      {/* promotion element */}
      {props.type === WidgetCategoryType.PROMOTION &&
        props.element &&
        props.element.pattern === PromotionPatternType.GRID && (
          <PercentageOutlined style={{ fontSize: "20px" }} />
        )}
    </div>
  );
}
