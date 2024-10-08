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
  WidgetType,
} from "@/model/WidgetType";
import BannerCarousel from "./boothPattern/BannerCarousel";
import ProductCarousel from "./boothPattern/ProductCarousel";
import ProductGrid from "./boothPattern/ProductGrid";
import PromotionGrid from "./boothPattern/PromotionGrid";
import CategoryGrid from "./boothPattern/CategoryGrid";
import { useMemo } from "react";
import CollectionCarousel from "./boothPattern/CollectionCarousel";
import CollectionGrid from "./boothPattern/CollectionGrid";

interface WidgetListProps {
  widgets: WidgetType[];
}

export default function WidgetList(props: WidgetListProps) {
  return (
    <div className="overflow-hidden">
      {props.widgets
        .sort((a, b) => a.order - b.order)
        .map((item, index) => (
          <div key={index}>
            <section id={item._id}>
              <div className="uppercase font-semibold text-gray-500">
                widget {index + 1}
              </div>
              {item.visibility === true && <Widget widget={item} />}
            </section>
          </div>
        ))}
    </div>
  );
}

interface WidgetProps {
  widget: WidgetType;
}

// filtering types
export function Widget(props: WidgetProps) {
  return (
    <div>
      {props.widget.type === WidgetCategoryType.BANNER && (
        <BannerWidget widget={props.widget} />
      )}

      {props.widget.type === WidgetCategoryType.PRODUCT && (
        <ProductWidget widget={props.widget} />
      )}

      {props.widget.type === WidgetCategoryType.CATEGORY && (
        <CategoryWidget widget={props.widget} />
      )}

      {props.widget.type === WidgetCategoryType.PROMOTION && (
        <PromotionWidget widget={props.widget} />
      )}

      {props.widget.type === WidgetCategoryType.COLLECTION && (
        <CollectionWidget widget={props.widget} />
      )}
    </div>
  );
}

function ProductWidget(props: WidgetProps) {
  const element = useMemo(() => {
    return props.widget.element as ProductElement;
  }, [props.widget.element]);

  return (
    <div>
      {element && element.pattern === ProductPatternType.CAROUSEL && (
        <ProductCarousel widget={props.widget} />
      )}
      {element && element.pattern === ProductPatternType.GRID && (
        <ProductGrid widget={props.widget} />
      )}
    </div>
  );
}

function BannerWidget(props: WidgetProps) {
  const element = props.widget.element as BannerElement;

  return (
    <div>
      {element && element.pattern === BannerPatternType.CAROUSEL && (
        <BannerCarousel widget={props.widget} />
      )}
    </div>
  );
}

function CategoryWidget(props: WidgetProps) {
  const element = props.widget.element as CategoryElement;

  return (
    <div>
      {element && element.pattern === CategoryPatternType.GRID && (
        <CategoryGrid widget={props.widget} />
      )}
    </div>
  );
}

function PromotionWidget(props: WidgetProps) {
  const element = props.widget.element as PromotionElement;

  return (
    <div>
      {element && element.pattern === PromotionPatternType.GRID && (
        <PromotionGrid widget={props.widget} />
      )}
    </div>
  );
}

function CollectionWidget(props: WidgetProps) {
  const element = props.widget.element as CollectionElement;

  return (
    <div>
      {element && element.pattern === CollectionPatternType.GRID && (
        <CollectionGrid widget={props.widget} />
      )}

      {element && element.pattern === CollectionPatternType.CAROUSEL && (
        <CollectionCarousel widget={props.widget} />
      )}
    </div>
  );
}

const MockData = [
  {
    _id: "sp-01",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    flashSale: true,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-02",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    flashSale: false,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-03",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 18000000,
    flashSale: true,
    originalPrice: 20000000,
    category: "",
  },
  {
    _id: "sp-04",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    flashSale: true,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-05",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    flashSale: false,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-06",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 18000000,
    flashSale: true,
    originalPrice: 20000000,
    category: "",
  },
  {
    _id: "sp-07",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    flashSale: true,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-08",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    flashSale: false,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-09",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 18000000,
    flashSale: true,
    originalPrice: 20000000,
    category: "",
  },
  {
    _id: "sp-10",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    flashSale: true,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-11",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    flashSale: false,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-12",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 18000000,
    flashSale: true,
    originalPrice: 20000000,
    category: "",
  },
];
