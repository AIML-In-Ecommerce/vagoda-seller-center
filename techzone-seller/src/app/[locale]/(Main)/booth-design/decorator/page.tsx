"use client";

import {
  Affix,
  Breadcrumb,
  Button,
  ConfigProvider,
  FloatButton,
  Input,
  notification,
  NotificationArgsProps,
  Skeleton,
  Tabs,
} from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import Banner from "@/component/booth-design/decorator/mini/Banner";
import WidgetEditorBar from "@/component/booth-design/decorator/WidgetEditorBar";
import WidgetList from "@/component/booth-design/decorator/WidgetList";
import {
  WidgetType,
  WidgetCategoryType,
  CategoryPatternType,
  BannerPatternType,
  ProductPatternType,
  PromotionPatternType,
  CollectionPatternType,
} from "@/model/WidgetType";
import WidgetDrawer from "@/component/booth-design/decorator/WidgetDrawer";
import { AddWidgetHandle } from "@/component/booth-design/decorator/widgetUtils/AddWidgetHandle";
import DeleteWidgetModal from "@/component/booth-design/decorator/modal/DeleteWidgetModal";
import { HiOutlineHome } from "react-icons/hi2";
import { Link } from "react-scroll";
import { ShopInfoDesignType, ShopType } from "@/model/ShopType";
import {
  GET_GetShop,
  POST_UseTemplate,
  PUT_UpdateShopDesign,
  PUT_UpdateShopInfoDesign,
} from "@/apis/shop/ShopAPI";
import {
  DELETE_DeleteWidget,
  GET_GetTemplates,
  POST_CreateWidget,
  POST_GetWidgetList,
  PUT_UpdateWidgetVisibility,
} from "@/apis/widget/WidgetAPI";
import { GoSearch } from "react-icons/go";
import { AuthContext } from "@/context/AuthContext";
import TemplateDrawer from "@/component/booth-design/decorator/TemplateDrawer";
import TemplateDetailModal from "@/component/booth-design/decorator/modal/TemplateDetailModal";
import ApplyTemplateModal from "@/component/booth-design/decorator/modal/ApplyTemplateModal";
import { DesignTemplateType } from "@/model/DesignTemplateType";

type NotificationPlacement = NotificationArgsProps["placement"];

export default function BoothDecoratorPage() {
  // mock data
  const shopInfoData = {
    color: "white",
    name: "",
    avatarUrl: "",
    bannerUrl: "",
  };

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

  // variables n methods

  const authContext = useContext(AuthContext);
  const shopId = authContext.shopInfo?._id;

  const tabItems = [
    "Cửa Hàng",
    "Tất Cả Sản Phẩm",
    "Bộ Sưu Tập",
    "Hồ Sơ Cửa Hàng",
  ];

  const tempWidget = {
    _id: "",
    type: WidgetCategoryType.PRODUCT,
    order: 0,
    visibility: false,
    element: undefined,
  };

  const [shopInfo, setShopInfo] = useState<ShopInfoDesignType>(shopInfoData);
  const [shop, setShop] = useState<ShopType>();
  const [widgets, setWidgets] = useState<WidgetType[]>([]);

  // notification
  const [api, contextHolder] = notification.useNotification();

  const placement: NotificationPlacement = "topRight"; //topLeft, bottomRight, bottomLeft
  const openNotification = (title: string, content: ReactElement) => {
    api.info({
      message: `${title}`,
      description: content,
      placement,
    });
  };

  // widget drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  // template
  const [openTemplateDrawer, setOpenTemplateDrawer] = useState(false);
  const [openTemplateDetail, setOpenTemplateDetail] = useState(false);
  const [openTemplateModal, setOpenTemplateModal] = useState(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<DesignTemplateType>();
  const [templates, setTemplates] = useState<DesignTemplateType[]>([]);

  // add widget
  const addWidget = async (type: string, pattern: string, order: number) => {
    // console.log("addWidget", type, pattern, order);
    let newWidget = AddWidgetHandle({ type, pattern, order });

    // call api to create new widget
    const response = await POST_CreateWidget(newWidget);
    if (response.status == 200 && shop && response.data) {
      // update shop design
      shop.design.push(response.data._id);
      const shopUpdateResponse = await PUT_UpdateShopDesign(
        shop._id,
        shop.design
      );

      if (shopUpdateResponse.status == 200) {
        setShop(shop);
        setWidgets([...widgets, response.data]);
        setOpenDrawer(false);
      } else console.log(response.message);
    } else console.log(response.message);
  };

  // update widget's visibility
  const toggleInvisibilityWidget = async (widget: WidgetType) => {
    widget.visibility = !widget.visibility;

    // call api to update widget
    const response = await PUT_UpdateWidgetVisibility(
      widget._id,
      widget.visibility
    );
    if (response.status !== 200) {
      console.log("Widget ", response.message);
    }

    setWidgets([...widgets]);

    openNotification("Cập nhật thành công!", <></>);
  };

  // delete widget
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletableWidget, setDeletableWidget] =
    useState<WidgetType>(tempWidget);

  const handleDeleteWidget = (widget: WidgetType) => {
    setDeletableWidget(widget);
    setOpenDeleteModal(true);
  };

  const deleteWidget = async () => {
    // call api to delete widget
    const response = await DELETE_DeleteWidget(deletableWidget._id);
    if (response.status == 200 && shop) {
      // update shop design
      shop.design = shop.design.filter((d) => d !== deletableWidget._id);
      const shopUpdateResponse = await PUT_UpdateShopDesign(
        shop._id,
        shop.design
      );

      if (shopUpdateResponse.status == 200) {
        setShop(shop);
        let newList = widgets.filter((w) => w._id !== deletableWidget._id);
        setWidgets(newList);

        setOpenDeleteModal(false);
        setDeletableWidget(tempWidget);

        openNotification("Xóa thành công!", <></>);
      } else console.log(response.message);
    } else console.log(response.message);
  };

  const handleOpenTemplateDetail = (
    value: boolean,
    selectedTemplate: DesignTemplateType
  ) => {
    setOpenTemplateDetail(value);
    setSelectedTemplate(selectedTemplate);
  };

  // call api
  useEffect(() => {
    handleGetTemplates();
  }, []);

  useEffect(() => {
    handleGetShop();
  }, [shopId]);

  useEffect(() => {
    if (!shop) return;
    if (shop.shopInfoDesign) {
      setShopInfo({
        color: shop.shopInfoDesign.color,
        name: shop.name,
        avatarUrl: shop.shopInfoDesign.avatarUrl,
        bannerUrl: shop.shopInfoDesign.bannerUrl,
      });
    } else
      setShopInfo({
        color: "white",
        name: shop.name,
        avatarUrl: "",
        bannerUrl: "",
      });

    if (shop.design && shop.design.length > 0) {
      // get widgets and update them
      handleGetWidgetList(shop.design);
    }
  }, [shop]);

  const handleGetShop = async () => {
    if (!shopId) return;
    const response = await GET_GetShop(shopId);
    if (response.status == 200) {
      // console.log(response.message);
      // console.log(response.data);

      if (response.data) {
        setShop(response.data);
      }
    }
  };

  const handleGetWidgetList = async (ids: string[]) => {
    const response = await POST_GetWidgetList(ids);
    if (response.status == 200) {
      // console.log(response.message);
      // console.log(response.data);

      if (response.data) {
        setWidgets(response.data);
      }
    }
  };

  const handleUpdateShopInfo = async (design: ShopInfoDesignType) => {
    if (!shop) return;
    // call api to update
    const response = await PUT_UpdateShopInfoDesign(shop._id, design);
    if (response.status == 200) {
      setShopInfo(design);
      openNotification("Cập nhật thành công", <></>);
    } else console.log(response.message);
  };

  const handleGetTemplates = async () => {
    const response = await GET_GetTemplates();
    if (response.status == 200) {
      console.log(response.message);
      console.log(response.data);

      if (response.data) {
        setTemplates(response.data);
      }
    }
  };

  const handleUseTemplate = async (
    design: WidgetType[],
    templateId: string
  ) => {
    if (!shop || !design) return;
    const response = await POST_UseTemplate(shop._id, design, templateId);

    if (response) {
      const response2 = await POST_GetWidgetList(response);
      if (response2.status == 200) {
        // console.log(response.message);
        // console.log(response.data);

        if (response2.data) {
          setWidgets(response2.data);
        }
      }
      setOpenTemplateModal(false);
      setSelectedTemplate(undefined);
    }
  };

  return (
    <div>
      {contextHolder}
      {(widgets && shopId && (
        <div className="m-5 grid grid-cols-3 h-fit min-h-screen">
          <div className="col-span-2">
            <div className="bg-white p-2 mb-1">
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
                    href: "/product/list",
                    title: "Trang trí gian hàng",
                  },
                ]}
              />
            </div>

            <section id="general-info">
              {(shopInfo && (
                <Banner
                  color={shopInfo.color}
                  name={shopInfo.name}
                  avatarUrl={shopInfo.avatarUrl}
                  bannerUrl={shopInfo.bannerUrl}
                />
              )) || <Skeleton active style={{ margin: 10 }} />}
            </section>

            <div className="overflow-hidden">
              <ConfigProvider
                theme={{
                  components: {
                    Tabs: {
                      // inkBarColor: "#c4996c",
                      // itemActiveColor: "#c4996c",
                      // itemHoverColor: "#c4996c",
                      // itemSelectedColor: "#c4996c",
                      inkBarColor: "#5c6856",
                      itemActiveColor: "#5c6856",
                      itemHoverColor: "#5c6856",
                      itemSelectedColor: "#5c6856",
                    },
                  },
                }}
              >
                <Tabs
                  defaultActiveKey="0"
                  size="middle"
                  style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
                  items={tabItems.map((item, i) => {
                    return {
                      label: item,
                      key: i.toString(),
                      children: <div />,
                      disabled: true,
                    };
                  })}
                  tabBarExtraContent={
                    <Input
                      disabled
                      size="middle"
                      placeholder="Tìm sản phẩm tại cửa hàng"
                      suffix={<GoSearch color="#5c6856" />}
                      className="rounded-full w-64 m-1 "
                    />
                  }
                />
              </ConfigProvider>
            </div>

            <div className="m-2">
              <WidgetList widgets={widgets} />
              <section id="new-widget" className="invisible">
                New widget
              </section>
            </div>

            <Link
              activeClass="active"
              to="new-widget"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              // onSetActive={handleSetActive}
            >
              <Button
                block
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                + Thêm widget
              </Button>
            </Link>
          </div>

          <div className="col-span-1 ml-2">
            <Affix offsetTop={80}>
              <Link
                activeClass="active"
                to="general-info"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
              >
                <Button
                  className="mb-2 mr-5 w-full min-w-80 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-purple-600 hover:font-semibold text-white"
                  block
                  onClick={() => {
                    setOpenTemplateDrawer(true);
                  }}
                >
                  Áp dụng template
                </Button>
              </Link>

              <Link
                activeClass="active"
                to="new-widget"
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                // onSetActive={handleSetActive}
              >
                <Button
                  className="mb-2 mr-5 w-full min-w-80"
                  block
                  onClick={() => {
                    setOpenDrawer(true);
                  }}
                >
                  + Thêm widget
                </Button>
              </Link>

              {(shopInfo && (
                <WidgetEditorBar
                  widgets={widgets}
                  setWidgets={setWidgets}
                  toggleInvisibilityWidget={toggleInvisibilityWidget}
                  deleteWidget={handleDeleteWidget}
                  shopInfo={shopInfo}
                  setShopInfo={handleUpdateShopInfo}
                  notify={openNotification}
                />
              )) || <Skeleton active style={{ margin: 10 }} />}
            </Affix>
          </div>

          <WidgetDrawer
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            addWidget={addWidget}
            order={widgets.length}
          />

          <TemplateDrawer
            templates={templates}
            openDrawer={openTemplateDrawer}
            setOpenDrawer={setOpenTemplateDrawer}
            setOpenDetail={handleOpenTemplateDetail}
          />

          <FloatButton.BackTop tooltip={<div>Lướt lên đầu</div>} />

          <DeleteWidgetModal
            open={openDeleteModal}
            handleOk={() => deleteWidget()}
            handleCancel={() => setOpenDeleteModal(false)}
          />

          {selectedTemplate && (
            <ApplyTemplateModal
              open={openTemplateModal}
              handleOk={() => {
                handleUseTemplate(
                  selectedTemplate.design,
                  selectedTemplate._id
                );
              }}
              handleCancel={() => {
                setOpenTemplateModal(false);
                setSelectedTemplate(undefined);
              }}
            />
          )}

          {selectedTemplate && (
            <TemplateDetailModal
              template={selectedTemplate}
              open={openTemplateDetail}
              handleOk={() => {
                setOpenTemplateModal(true);
                setOpenTemplateDetail(false);
              }}
              handleCancel={() => {
                setOpenTemplateDetail(false);
                setSelectedTemplate(undefined);
              }}
            />
          )}
        </div>
      )) || <Skeleton active style={{ margin: 10 }} />}
    </div>
  );
}
