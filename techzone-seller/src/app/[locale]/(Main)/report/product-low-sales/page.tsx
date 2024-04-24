import LowSales from "@/component/report/product/LowSales";
import ProductSalesTrafficPage from "@/component/report/product/ProductSalesTraffic";
import React from "react";

export default function ProductLowSales() {
    //   - Trung tâm phát triển: 
    // 		+ Hiệu quả kinh doanh: Filter (Hôm nay, hôm qua, 7 ngày, 30 ngày, tùy chọn), Chỉ số chính (Doanh số, đơn hàng, doanh thu thuần, Lượt xem, Tỉ lệ chuyển đổi, Giá 		trị đơn hàng trung bình, Đơn hàng hủy), Top 10 sản phẩm, Top 10 thành phố.
    // 		+ Chỉ số sản phẩm:
    // 		+ Chỉ số khuyến mãi: 
    // 		+ Hiệu quả vận hành:
    const props =
    {
        label: 'Doanh số thấp',
        value: 'LowSales',
        url: '/report/product-low-sales',
        children: <LowSales/>
    }

    return (
        <React.Fragment>
            <ProductSalesTrafficPage pageProps={props}/>
        </React.Fragment>
    );
}
