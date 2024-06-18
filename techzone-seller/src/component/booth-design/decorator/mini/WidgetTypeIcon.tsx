import {
  BannerElement,
  BannerPatternType,
  CategoryElement,
  CategoryPatternType,
  CollectionElement,
  CollectionPatternType,
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
  AppstoreOutlined,
  ProductOutlined,
} from "@ant-design/icons";

interface IconProps {
  type: WidgetCategoryType;
  element:
    | BannerElement
    | ProductElement
    | CategoryElement
    | PromotionElement
    | CollectionElement
    | undefined;
}

interface NameProps {
  type: WidgetCategoryType;
  element:
    | BannerElement
    | ProductElement
    | CategoryElement
    | PromotionElement
    | CollectionElement
    | undefined;
  order: number;
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

      {/* collection element */}
      {props.type === WidgetCategoryType.COLLECTION &&
        props.element &&
        props.element.pattern === CollectionPatternType.GRID && (
          <AppstoreOutlined style={{ fontSize: "20px" }} />
        )}
      {props.type === WidgetCategoryType.COLLECTION &&
        props.element &&
        props.element.pattern === CollectionPatternType.CAROUSEL && (
          <ProductOutlined style={{ fontSize: "20px" }} />
        )}
    </div>
  );
}

export function WidgetTypeName(props: NameProps) {
  return (
    <div className="flex gap-1">
      <div>{props.order + 1}.</div>

      {/* banner element */}
      {props.type === WidgetCategoryType.BANNER &&
        props.element &&
        props.element.pattern === BannerPatternType.CAROUSEL && (
          <div>Băng chuyền</div>
        )}

      {/* category element */}
      {props.type === WidgetCategoryType.CATEGORY &&
        props.element &&
        props.element.pattern === CategoryPatternType.GRID && (
          <div>Danh mục dạng lưới</div>
        )}

      {/* product element */}
      {props.type === WidgetCategoryType.PRODUCT &&
        props.element &&
        props.element.pattern === ProductPatternType.GRID && (
          <div>Sản phẩm dạng lưới</div>
        )}
      {props.type === WidgetCategoryType.PRODUCT &&
        props.element &&
        props.element.pattern === ProductPatternType.CAROUSEL && (
          <div>Sản phẩm dạng băng chuyền</div>
        )}

      {/* promotion element */}
      {props.type === WidgetCategoryType.PROMOTION &&
        props.element &&
        props.element.pattern === PromotionPatternType.GRID && (
          <div>Mã giảm giá</div>
        )}

      {/* collection element */}
      {props.type === WidgetCategoryType.COLLECTION &&
        props.element &&
        props.element.pattern === CollectionPatternType.GRID && (
          <div>Bộ sưu tập dạng lưới</div>
        )}
      {props.type === WidgetCategoryType.COLLECTION &&
        props.element &&
        props.element.pattern === CollectionPatternType.CAROUSEL && (
          <div>Bộ sưu tập dạng băng chuyền</div>
        )}
    </div>
  );
}
