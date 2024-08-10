import { Button, Modal } from "antd";
import WidgetList from "../WidgetList";
import {
  WidgetCategoryType,
  CollectionPatternType,
  CategoryPatternType,
  ProductPatternType,
  PromotionPatternType,
  BannerPatternType,
} from "@/model/WidgetType";
import { DesignTemplateType } from "@/model/DesignTemplateType";

interface ModalProps {
  template: DesignTemplateType;
  open: boolean;
  handleOk(): void;
  handleCancel(): void;
}
export default function ApplyTemplateModal(props: ModalProps) {
  return (
    <Modal
      title={"Chi tiết template " + props.template.name}
      open={props.open}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button key="cancel" onClick={props.handleCancel}>
          Hủy
        </Button>,
        <Button key="ok" type="primary" onClick={props.handleOk}>
          Áp dụng template
        </Button>,
      ]}
      width={900}
      className="p-5"
    >
      <div className="h-[450px] overflow-x-auto">
        <WidgetList widgets={props.template.design} />
      </div>
    </Modal>
  );
}

// mock data
const widgetData = [
  {
    _id: "collection_ID1",
    type: WidgetCategoryType.COLLECTION,
    order: 1,
    visibility: true,
    element: {
      pattern: CollectionPatternType.GRID,
      collectionIdList: [],
    },
  },
  {
    _id: "collection_ID2",
    type: WidgetCategoryType.COLLECTION,
    order: 8,
    visibility: true,
    element: {
      pattern: CollectionPatternType.CAROUSEL,
      collectionIdList: [],
    },
  },
  {
    _id: "category_ID",
    type: WidgetCategoryType.CATEGORY,
    order: 7,
    visibility: false,
    element: {
      pattern: CategoryPatternType.GRID,
      title: "Danh mục nổi bật",
      categoryIdList: [],
    },
  },
  {
    _id: "product_ID",
    type: WidgetCategoryType.PRODUCT,
    order: 2,
    visibility: true,
    element: {
      pattern: ProductPatternType.GRID,
      title: "Sản phẩm mới",
      collectionId: "",
    },
  },
  {
    _id: "product_ID2",
    type: WidgetCategoryType.PRODUCT,
    order: 4,
    visibility: true,
    element: {
      pattern: ProductPatternType.CAROUSEL,
      title: "Sản phẩm giá hời",
      collectionId: "",
    },
  },
  {
    _id: "product_ID3",
    type: WidgetCategoryType.PRODUCT,
    order: 5,
    visibility: true,
    element: {
      pattern: ProductPatternType.GRID,
      title: "Sản phẩm nổi bật",
      collectionId: "",
    },
  },
  {
    _id: "product_ID4",
    type: WidgetCategoryType.PRODUCT,
    order: 6,
    visibility: true,
    element: {
      pattern: ProductPatternType.CAROUSEL,
      title: "Sản phẩm cho bạn",
      collectionId: "",
    },
  },
  {
    _id: "promotion_ID",
    type: WidgetCategoryType.PROMOTION,
    order: 3,
    visibility: false,
    element: {
      pattern: PromotionPatternType.GRID,
      title: "Voucher trao tay",
      promotionIdList: [],
    },
  },
  {
    _id: "banner_ID",
    type: WidgetCategoryType.BANNER,
    order: 0,
    visibility: true,
    element: {
      pattern: BannerPatternType.CAROUSEL,
      images: [],
    },
  },
];
