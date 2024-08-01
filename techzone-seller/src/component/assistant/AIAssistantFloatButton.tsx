"use client";

import {
  Button,
  Card,
  Flex,
  Modal,
  Popover,
  Image,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { BiRefresh, BiSupport } from "react-icons/bi";
import {
  IoCloseOutline,
  IoExpandOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { LuSendHorizonal, LuShrink } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa6";
import { FiMic } from "react-icons/fi";

// import InfiniteProductsList, {
//   InfiniteScrollProductsProps,
// } from "../utils/InfiniteProductsList";
// import InfinitePromotionList, {
//   InfinitePromotionListProps,
// } from "../utils/InfinitePromotionList";
import { BsChatDots } from "react-icons/bs";

import "@/custom_css/AntdFullscreenModal.css";
import { FaSkating } from "react-icons/fa";
import InfiniteChart from "../utils/InfiniteChart";
import LineChart from "../utils/Chart/LineChart";
import BarChart from "../utils/Chart/BarChar";
import PieChart from "../utils/Chart/PieChart";
import "../../custom_css/Loader.css";
// import InfiniteCart from "../utils/InfiniteCart";
import { ShopInfoType } from "@/model/ShopInfoType";
import VoiceChat from "../utils/VoiceChat";
import { AuthContext } from "@/context/AuthContext";
const authLocalStorageID = "#auth-context-user-info-record-ID";

interface AIAssistantFloatButtonProps {}

enum AssistantMessageTypes {
  User = "User",
  Assistant = "Assistant",
}

type InputType = "VOICE" | "KEYBOARD";

type ToolType =
  | "product_getter"
  | "promotion_getter"
  | "cart_adding"
  | "gen_chart"
  | "text";

type AIState = "THINKING" | "RESPONSED";

interface AssistantMessageProps {
  role: AssistantMessageTypes;
  message: string;
  type: string;
  data: any;
}

const GreetingMessage: AssistantMessageProps = {
  role: AssistantMessageTypes.Assistant,
  message:
    "Xin chào! Mình là trợ lý AI của Vagoda.\nMình sẵn sàng giúp đỡ bạn những câu hỏi về tư vấn, tìm kiếm sản phẩm.\n Hôm nay bạn cần mình hỗ trợ gì hông? ^^",
  type: "text",
  data: "",
};

const AIAssistantLocalStorageKeyword = "ai_assistant";

const AIAssistantImageLink =
  "https://cdn-icons-png.freepik.com/512/9732/9732800.png";

// const InfiniteProductsListSetup: InfiniteScrollProductsProps = {
//   productsPerRow: 4,
//   overFlowMaxHeight: "100dvh",
//   productItemSize: "small",
// };

// const InfinitePromotionListSetup: InfinitePromotionListProps = {
//   overflowMaxHeight: "100dvh",
// };

const testCaseNumber = 3;

const fakeResponse = {
  type: "cart_adding",
  data: [
    {
      _id: "666acc8ed40492953e97649d",
      name: "Áo sơ mi nam ngắn tay cổ vest form đẹp LADOS 8085 vải đũi thấm hút, sang trọng dễ phối đồ",
      description:
        '<p class="QN2lPu">&Aacute;o sơ mi nam ngắn tay cổ vest form đẹp LADOS 8085 vải đũi thấm h&uacute;t, sang trọng dễ phối đồ</p>\n<p class="QN2lPu">⏩ Th&ocirc;ng tin sản phẩm:</p>\n<p class="QN2lPu">👉 Chất liệu: chất đũi thấm h&uacute;t tốt, tho&aacute;ng m&aacute;t</p>\n<p class="QN2lPu">👉 &Aacute;o thấm h&uacute;t mồ h&ocirc;i tốt</p>\n<p class="QN2lPu">👉 Form rộng vừa, đứng form &aacute;o cực kỳ trẻ trung năng động</p>\n<p class="QN2lPu">👉 Chất vải d&agrave;y đẹp, kh&ocirc;ng x&ugrave; l&ocirc;ng, kh&ocirc;ng phai m&agrave;u</p>\n<p class="QN2lPu">👉 Đường may cực tỉ mỉ cực đẹp</p>\n<p class="QN2lPu">👉 C&oacute; thể mặc đi l&agrave;m, đi chơi, đặc biệt đi tiệc sự kiện , cực sang trọng</p>\n<p class="QN2lPu">&nbsp;</p>\n<p class="QN2lPu">⏩Được sản xuất v&agrave; bảo h&agrave;nh bởi C&ocirc;ng ty TNHH MTV LADOS VIỆT NAM</p>\n<p class="QN2lPu"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ley33b4kzpmyac" alt="" width="573" height="573"></p>\n<p class="QN2lPu"><video style="width: 612px; height: 306px; display: table; margin-left: auto; margin-right: auto;" controls="controls" width="612" height="306"> <source src="https://cvf.shopee.vn/file/api/v4/11110105/mms/vn-11110105-6ke15-lu7a25d0b1n547.16000081713323497.mp4" type="video/mp4"></video></p>\n<p class="QN2lPu"><strong>TH&Ocirc;NG TIN THƯƠNG HIỆU</strong></p>\n<p class="QN2lPu"><strong>LADOS </strong>l&agrave; Nh&agrave; ph&acirc;n phối chuy&ecirc;n sỉ &amp; lẻ c&aacute;c mặt h&agrave;ng thời trang chất lượng v&agrave; gi&aacute; cả phải chăng với thương hiệu LADOS. Ch&uacute;ng t&ocirc;i h&acirc;n hạnh v&agrave; lu&ocirc;n cố gắng để mang đến cho qu&yacute; kh&aacute;ch những sản phẩm chất lượng với gi&aacute; cả tốt nhất v&agrave; dịch vụ uy t&iacute;n. Tất cả c&aacute;c sản phẩm của shop đều được ch&uacute;ng t&ocirc;i tuyển chọn một c&aacute;ch kỹ lưỡng sao cho ph&ugrave; hợp với phong c&aacute;ch Ch&acirc;u &Aacute; v&agrave; bắt nhịp c&ugrave;ng xu hướng trẻ. Đến với ch&uacute;ng t&ocirc;i kh&aacute;ch h&agrave;ng c&oacute; thể y&ecirc;n t&acirc;m mua h&agrave;ng với nhiều mẫu m&atilde; được cập nhật thường xuy&ecirc;n v&agrave; nhiều khuyến mại hấp dẫn.</p>\n<p class="QN2lPu">📣 CH&Iacute;NH S&Aacute;CH MUA H&Agrave;NG</p>\n<p class="QN2lPu">👉 Cam kết chất lượng v&agrave; mẫu m&atilde; sản phẩm giống với h&igrave;nh ảnh.</p>\n<p class="QN2lPu">👉 Ho&agrave;n tiền nếu sản phẩm kh&ocirc;ng giống với m&ocirc; tả.</p>\n<p class="QN2lPu">👉 ĐỔI TRẢ TRONG 7 NG&Agrave;Y NẾU KH&Ocirc;NG Đ&Uacute;NG MI&Ecirc;U TẢ</p>\n<p class="QN2lPu">👉 CAM KẾT H&Agrave;NG CH&Iacute;NH H&Atilde;NG 100%</p>\n<p class="QN2lPu">👉 CAM KẾT ẢNH SHOP TỰ CHỤP</p>\n<p class="QN2lPu">👉 freeship cho đơn h&agrave;ng tr&ecirc;n 150k</p>\n<p class="QN2lPu">&nbsp;</p>\n<div class="ddict_btn" style="top: 355px; left: 511.177px;"><img src="chrome-extension://bpggmmljdiliancllaapiggllnkbjocb/logo/48.png"></div>',
      material: "Vải đũi cao cấp",
      originalPrice: 309000,
      finalPrice: 159000,
      shop: "BLACK",
      brand: "LADOS",
      soldQuantity: 0,
      avgRating: 0,
      images: [
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718275185/Widget/oroclhcyutmgsbukefyg.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718275201/Widget/wnpjfzrxtq9mdzysvvk3.jpg",
      ],
    },
    {
      _id: "666936d1ed8287518a3a4312",
      name: "Áo khoác nữ",
      description:
        '<h2 style="text-align: center;"><span style="font-family: \'comic sans ms\', sans-serif;"><em><strong>&Aacute;o Kho&aacute;c D&ugrave; M&ugrave;a H&egrave; Năng Động</strong></em></span></h2>\n<p><span style="font-family: \'courier new\', courier, monospace;">Kh&aacute;m ph&aacute; phong c&aacute;ch thời trang năng động v&agrave; hiện đại với chiếc &aacute;o kho&aacute;c d&ugrave; m&ugrave;a h&egrave;, sản phẩm ho&agrave;n hảo d&agrave;nh cho những ng&agrave;y nắng rực rỡ. Được thiết kế tinh tế v&agrave; tỉ mỉ, &aacute;o kho&aacute;c d&ugrave; kh&ocirc;ng chỉ mang lại sự thoải m&aacute;i tối đa m&agrave; c&ograve;n gi&uacute;p bạn nổi bật trong bất kỳ hoạt động n&agrave;o.</span></p>\n<p><span style="font-family: \'courier new\', courier, monospace;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.pinimg.com/564x/ac/52/db/ac52dbef28595e3ef4864eb13c8db214.jpg" width="296" height="296"> <br></span></p>\n<p><span style="font-family: \'courier new\', courier, monospace;"><strong>Đặc điểm nổi bật:</strong></span></p>\n<ul>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Chất liệu cao cấp:</strong> &Aacute;o kho&aacute;c được l&agrave;m từ chất liệu d&ugrave; nhẹ, tho&aacute;ng m&aacute;t, chống thấm nước v&agrave; chống gi&oacute; hiệu quả, gi&uacute;p bảo vệ bạn trong mọi điều kiện thời tiết.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Thiết kế hiện đại:</strong> Kiểu d&aacute;ng trẻ trung, năng động với c&aacute;c đường cắt may tỉ mỉ, ph&ugrave; hợp với nhiều phong c&aacute;ch thời trang. M&agrave;u sắc đa dạng v&agrave; bắt mắt, dễ d&agrave;ng phối hợp với c&aacute;c trang phục kh&aacute;c.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Tiện &iacute;ch tối đa:</strong> &Aacute;o kho&aacute;c c&oacute; nhiều t&uacute;i tiện dụng, bao gồm t&uacute;i ngo&agrave;i v&agrave; t&uacute;i trong, gi&uacute;p bạn dễ d&agrave;ng mang theo c&aacute;c vật dụng c&aacute; nh&acirc;n. D&acirc;y k&eacute;o chắc chắn v&agrave; mượt m&agrave;, đảm bảo độ bền l&acirc;u d&agrave;i.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>T&iacute;nh năng tho&aacute;ng kh&iacute;:</strong> Lớp l&oacute;t b&ecirc;n trong được thiết kế với c&aacute;c lỗ th&ocirc;ng hơi th&ocirc;ng minh, gi&uacute;p bạn lu&ocirc;n cảm thấy thoải m&aacute;i v&agrave; tho&aacute;ng m&aacute;t, ngay cả trong những ng&agrave;y h&egrave; oi bức.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Đa dụng v&agrave; linh hoạt:</strong> Ph&ugrave; hợp cho nhiều hoạt động như đi chơi, dạo phố, leo n&uacute;i, hay c&aacute;c chuyến du lịch ngắn ng&agrave;y. &Aacute;o kho&aacute;c dễ d&agrave;ng gấp gọn v&agrave; mang theo bất kỳ đ&acirc;u.<img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.pinimg.com/564x/e4/94/6f/e4946f6c5f8ac6e8ebee47e76ffffff6.jpg" width="485" height="485"></span></li>\n</ul>\n<p><span style="font-family: \'courier new\', courier, monospace;">H&atilde;y sắm ngay chiếc &aacute;o kho&aacute;c d&ugrave; m&ugrave;a h&egrave; năng động n&agrave;y để bổ sung v&agrave;o tủ đồ của bạn, đảm bảo bạn lu&ocirc;n tự tin v&agrave; phong c&aacute;ch trong mọi ho&agrave;n cảnh.</span></p>',
      material: "Vải dù",
      originalPrice: 200000,
      finalPrice: 123000,
      shop: "BLACK",
      brand: "Channel",
      soldQuantity: 0,
      avgRating: 0,
      images: [
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171318/Widget/rjtgf5rdidbmok2qllps.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171327/Widget/wwzsrtzgoluhamwkzne3.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171339/Widget/dszchqzddjz1v0eq5ljf.jpg",
      ],
    },
    {
      _id: "666936d1ed8287518a3a4312",
      name: "Áo khoác nữ",
      description:
        '<h2 style="text-align: center;"><span style="font-family: \'comic sans ms\', sans-serif;"><em><strong>&Aacute;o Kho&aacute;c D&ugrave; M&ugrave;a H&egrave; Năng Động</strong></em></span></h2>\n<p><span style="font-family: \'courier new\', courier, monospace;">Kh&aacute;m ph&aacute; phong c&aacute;ch thời trang năng động v&agrave; hiện đại với chiếc &aacute;o kho&aacute;c d&ugrave; m&ugrave;a h&egrave;, sản phẩm ho&agrave;n hảo d&agrave;nh cho những ng&agrave;y nắng rực rỡ. Được thiết kế tinh tế v&agrave; tỉ mỉ, &aacute;o kho&aacute;c d&ugrave; kh&ocirc;ng chỉ mang lại sự thoải m&aacute;i tối đa m&agrave; c&ograve;n gi&uacute;p bạn nổi bật trong bất kỳ hoạt động n&agrave;o.</span></p>\n<p><span style="font-family: \'courier new\', courier, monospace;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.pinimg.com/564x/ac/52/db/ac52dbef28595e3ef4864eb13c8db214.jpg" width="296" height="296"> <br></span></p>\n<p><span style="font-family: \'courier new\', courier, monospace;"><strong>Đặc điểm nổi bật:</strong></span></p>\n<ul>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Chất liệu cao cấp:</strong> &Aacute;o kho&aacute;c được l&agrave;m từ chất liệu d&ugrave; nhẹ, tho&aacute;ng m&aacute;t, chống thấm nước v&agrave; chống gi&oacute; hiệu quả, gi&uacute;p bảo vệ bạn trong mọi điều kiện thời tiết.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Thiết kế hiện đại:</strong> Kiểu d&aacute;ng trẻ trung, năng động với c&aacute;c đường cắt may tỉ mỉ, ph&ugrave; hợp với nhiều phong c&aacute;ch thời trang. M&agrave;u sắc đa dạng v&agrave; bắt mắt, dễ d&agrave;ng phối hợp với c&aacute;c trang phục kh&aacute;c.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Tiện &iacute;ch tối đa:</strong> &Aacute;o kho&aacute;c c&oacute; nhiều t&uacute;i tiện dụng, bao gồm t&uacute;i ngo&agrave;i v&agrave; t&uacute;i trong, gi&uacute;p bạn dễ d&agrave;ng mang theo c&aacute;c vật dụng c&aacute; nh&acirc;n. D&acirc;y k&eacute;o chắc chắn v&agrave; mượt m&agrave;, đảm bảo độ bền l&acirc;u d&agrave;i.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>T&iacute;nh năng tho&aacute;ng kh&iacute;:</strong> Lớp l&oacute;t b&ecirc;n trong được thiết kế với c&aacute;c lỗ th&ocirc;ng hơi th&ocirc;ng minh, gi&uacute;p bạn lu&ocirc;n cảm thấy thoải m&aacute;i v&agrave; tho&aacute;ng m&aacute;t, ngay cả trong những ng&agrave;y h&egrave; oi bức.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Đa dụng v&agrave; linh hoạt:</strong> Ph&ugrave; hợp cho nhiều hoạt động như đi chơi, dạo phố, leo n&uacute;i, hay c&aacute;c chuyến du lịch ngắn ng&agrave;y. &Aacute;o kho&aacute;c dễ d&agrave;ng gấp gọn v&agrave; mang theo bất kỳ đ&acirc;u.<img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.pinimg.com/564x/e4/94/6f/e4946f6c5f8ac6e8ebee47e76ffffff6.jpg" width="485" height="485"></span></li>\n</ul>\n<p><span style="font-family: \'courier new\', courier, monospace;">H&atilde;y sắm ngay chiếc &aacute;o kho&aacute;c d&ugrave; m&ugrave;a h&egrave; năng động n&agrave;y để bổ sung v&agrave;o tủ đồ của bạn, đảm bảo bạn lu&ocirc;n tự tin v&agrave; phong c&aacute;ch trong mọi ho&agrave;n cảnh.</span></p>',
      material: "Vải dù",
      originalPrice: 200000,
      finalPrice: 123000,
      shop: "BLACK",
      brand: "Channel",
      soldQuantity: 0,
      avgRating: 0,
      images: [
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171318/Widget/rjtgf5rdidbmok2qllps.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171327/Widget/wwzsrtzgoluhamwkzne3.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171339/Widget/dszchqzddjz1v0eq5ljf.jpg",
      ],
    },
    {
      _id: "666936d1ed8287518a3a4312",
      name: "Áo khoác nữ",
      description:
        '<h2 style="text-align: center;"><span style="font-family: \'comic sans ms\', sans-serif;"><em><strong>&Aacute;o Kho&aacute;c D&ugrave; M&ugrave;a H&egrave; Năng Động</strong></em></span></h2>\n<p><span style="font-family: \'courier new\', courier, monospace;">Kh&aacute;m ph&aacute; phong c&aacute;ch thời trang năng động v&agrave; hiện đại với chiếc &aacute;o kho&aacute;c d&ugrave; m&ugrave;a h&egrave;, sản phẩm ho&agrave;n hảo d&agrave;nh cho những ng&agrave;y nắng rực rỡ. Được thiết kế tinh tế v&agrave; tỉ mỉ, &aacute;o kho&aacute;c d&ugrave; kh&ocirc;ng chỉ mang lại sự thoải m&aacute;i tối đa m&agrave; c&ograve;n gi&uacute;p bạn nổi bật trong bất kỳ hoạt động n&agrave;o.</span></p>\n<p><span style="font-family: \'courier new\', courier, monospace;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.pinimg.com/564x/ac/52/db/ac52dbef28595e3ef4864eb13c8db214.jpg" width="296" height="296"> <br></span></p>\n<p><span style="font-family: \'courier new\', courier, monospace;"><strong>Đặc điểm nổi bật:</strong></span></p>\n<ul>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Chất liệu cao cấp:</strong> &Aacute;o kho&aacute;c được l&agrave;m từ chất liệu d&ugrave; nhẹ, tho&aacute;ng m&aacute;t, chống thấm nước v&agrave; chống gi&oacute; hiệu quả, gi&uacute;p bảo vệ bạn trong mọi điều kiện thời tiết.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Thiết kế hiện đại:</strong> Kiểu d&aacute;ng trẻ trung, năng động với c&aacute;c đường cắt may tỉ mỉ, ph&ugrave; hợp với nhiều phong c&aacute;ch thời trang. M&agrave;u sắc đa dạng v&agrave; bắt mắt, dễ d&agrave;ng phối hợp với c&aacute;c trang phục kh&aacute;c.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Tiện &iacute;ch tối đa:</strong> &Aacute;o kho&aacute;c c&oacute; nhiều t&uacute;i tiện dụng, bao gồm t&uacute;i ngo&agrave;i v&agrave; t&uacute;i trong, gi&uacute;p bạn dễ d&agrave;ng mang theo c&aacute;c vật dụng c&aacute; nh&acirc;n. D&acirc;y k&eacute;o chắc chắn v&agrave; mượt m&agrave;, đảm bảo độ bền l&acirc;u d&agrave;i.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>T&iacute;nh năng tho&aacute;ng kh&iacute;:</strong> Lớp l&oacute;t b&ecirc;n trong được thiết kế với c&aacute;c lỗ th&ocirc;ng hơi th&ocirc;ng minh, gi&uacute;p bạn lu&ocirc;n cảm thấy thoải m&aacute;i v&agrave; tho&aacute;ng m&aacute;t, ngay cả trong những ng&agrave;y h&egrave; oi bức.</span></li>\n<li style="font-family: \'courier new\', courier, monospace;"><span style="font-family: \'courier new\', courier, monospace;"><strong>Đa dụng v&agrave; linh hoạt:</strong> Ph&ugrave; hợp cho nhiều hoạt động như đi chơi, dạo phố, leo n&uacute;i, hay c&aacute;c chuyến du lịch ngắn ng&agrave;y. &Aacute;o kho&aacute;c dễ d&agrave;ng gấp gọn v&agrave; mang theo bất kỳ đ&acirc;u.<img style="display: block; margin-left: auto; margin-right: auto;" src="https://i.pinimg.com/564x/e4/94/6f/e4946f6c5f8ac6e8ebee47e76ffffff6.jpg" width="485" height="485"></span></li>\n</ul>\n<p><span style="font-family: \'courier new\', courier, monospace;">H&atilde;y sắm ngay chiếc &aacute;o kho&aacute;c d&ugrave; m&ugrave;a h&egrave; năng động n&agrave;y để bổ sung v&agrave;o tủ đồ của bạn, đảm bảo bạn lu&ocirc;n tự tin v&agrave; phong c&aacute;ch trong mọi ho&agrave;n cảnh.</span></p>',
      material: "Vải dù",
      originalPrice: 200000,
      finalPrice: 123000,
      shop: "BLACK",
      brand: "Channel",
      soldQuantity: 0,
      avgRating: 0,
      images: [
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171318/Widget/rjtgf5rdidbmok2qllps.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171327/Widget/wwzsrtzgoluhamwkzne3.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718171339/Widget/dszchqzddjz1v0eq5ljf.jpg",
      ],
    },
    {
      _id: "666acc8ed40492953e97649d",
      name: "Áo sơ mi nam ngắn tay cổ vest form đẹp LADOS 8085 vải đũi thấm hút, sang trọng dễ phối đồ",
      description:
        '<p class="QN2lPu">&Aacute;o sơ mi nam ngắn tay cổ vest form đẹp LADOS 8085 vải đũi thấm h&uacute;t, sang trọng dễ phối đồ</p>\n<p class="QN2lPu">⏩ Th&ocirc;ng tin sản phẩm:</p>\n<p class="QN2lPu">👉 Chất liệu: chất đũi thấm h&uacute;t tốt, tho&aacute;ng m&aacute;t</p>\n<p class="QN2lPu">👉 &Aacute;o thấm h&uacute;t mồ h&ocirc;i tốt</p>\n<p class="QN2lPu">👉 Form rộng vừa, đứng form &aacute;o cực kỳ trẻ trung năng động</p>\n<p class="QN2lPu">👉 Chất vải d&agrave;y đẹp, kh&ocirc;ng x&ugrave; l&ocirc;ng, kh&ocirc;ng phai m&agrave;u</p>\n<p class="QN2lPu">👉 Đường may cực tỉ mỉ cực đẹp</p>\n<p class="QN2lPu">👉 C&oacute; thể mặc đi l&agrave;m, đi chơi, đặc biệt đi tiệc sự kiện , cực sang trọng</p>\n<p class="QN2lPu">&nbsp;</p>\n<p class="QN2lPu">⏩Được sản xuất v&agrave; bảo h&agrave;nh bởi C&ocirc;ng ty TNHH MTV LADOS VIỆT NAM</p>\n<p class="QN2lPu"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ley33b4kzpmyac" alt="" width="573" height="573"></p>\n<p class="QN2lPu"><video style="width: 612px; height: 306px; display: table; margin-left: auto; margin-right: auto;" controls="controls" width="612" height="306"> <source src="https://cvf.shopee.vn/file/api/v4/11110105/mms/vn-11110105-6ke15-lu7a25d0b1n547.16000081713323497.mp4" type="video/mp4"></video></p>\n<p class="QN2lPu"><strong>TH&Ocirc;NG TIN THƯƠNG HIỆU</strong></p>\n<p class="QN2lPu"><strong>LADOS </strong>l&agrave; Nh&agrave; ph&acirc;n phối chuy&ecirc;n sỉ &amp; lẻ c&aacute;c mặt h&agrave;ng thời trang chất lượng v&agrave; gi&aacute; cả phải chăng với thương hiệu LADOS. Ch&uacute;ng t&ocirc;i h&acirc;n hạnh v&agrave; lu&ocirc;n cố gắng để mang đến cho qu&yacute; kh&aacute;ch những sản phẩm chất lượng với gi&aacute; cả tốt nhất v&agrave; dịch vụ uy t&iacute;n. Tất cả c&aacute;c sản phẩm của shop đều được ch&uacute;ng t&ocirc;i tuyển chọn một c&aacute;ch kỹ lưỡng sao cho ph&ugrave; hợp với phong c&aacute;ch Ch&acirc;u &Aacute; v&agrave; bắt nhịp c&ugrave;ng xu hướng trẻ. Đến với ch&uacute;ng t&ocirc;i kh&aacute;ch h&agrave;ng c&oacute; thể y&ecirc;n t&acirc;m mua h&agrave;ng với nhiều mẫu m&atilde; được cập nhật thường xuy&ecirc;n v&agrave; nhiều khuyến mại hấp dẫn.</p>\n<p class="QN2lPu">📣 CH&Iacute;NH S&Aacute;CH MUA H&Agrave;NG</p>\n<p class="QN2lPu">👉 Cam kết chất lượng v&agrave; mẫu m&atilde; sản phẩm giống với h&igrave;nh ảnh.</p>\n<p class="QN2lPu">👉 Ho&agrave;n tiền nếu sản phẩm kh&ocirc;ng giống với m&ocirc; tả.</p>\n<p class="QN2lPu">👉 ĐỔI TRẢ TRONG 7 NG&Agrave;Y NẾU KH&Ocirc;NG Đ&Uacute;NG MI&Ecirc;U TẢ</p>\n<p class="QN2lPu">👉 CAM KẾT H&Agrave;NG CH&Iacute;NH H&Atilde;NG 100%</p>\n<p class="QN2lPu">👉 CAM KẾT ẢNH SHOP TỰ CHỤP</p>\n<p class="QN2lPu">👉 freeship cho đơn h&agrave;ng tr&ecirc;n 150k</p>\n<p class="QN2lPu">&nbsp;</p>\n<div class="ddict_btn" style="top: 355px; left: 511.177px;"><img src="chrome-extension://bpggmmljdiliancllaapiggllnkbjocb/logo/48.png"></div>',
      material: "Vải đũi cao cấp",
      originalPrice: 309000,
      finalPrice: 159000,
      shop: "BLACK",
      brand: "LADOS",
      soldQuantity: 0,
      avgRating: 0,
      images: [
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718275185/Widget/oroclhcyutmgsbukefyg.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718275201/Widget/wnpjfzrxtq9mdzysvvk3.jpg",
      ],
    },

    {
      _id: "666acc8ed40492953e97649d",
      name: "Áo sơ mi nam ngắn tay cổ vest form đẹp LADOS 8085 vải đũi thấm hút, sang trọng dễ phối đồ",
      description:
        '<p class="QN2lPu">&Aacute;o sơ mi nam ngắn tay cổ vest form đẹp LADOS 8085 vải đũi thấm h&uacute;t, sang trọng dễ phối đồ</p>\n<p class="QN2lPu">⏩ Th&ocirc;ng tin sản phẩm:</p>\n<p class="QN2lPu">👉 Chất liệu: chất đũi thấm h&uacute;t tốt, tho&aacute;ng m&aacute;t</p>\n<p class="QN2lPu">👉 &Aacute;o thấm h&uacute;t mồ h&ocirc;i tốt</p>\n<p class="QN2lPu">👉 Form rộng vừa, đứng form &aacute;o cực kỳ trẻ trung năng động</p>\n<p class="QN2lPu">👉 Chất vải d&agrave;y đẹp, kh&ocirc;ng x&ugrave; l&ocirc;ng, kh&ocirc;ng phai m&agrave;u</p>\n<p class="QN2lPu">👉 Đường may cực tỉ mỉ cực đẹp</p>\n<p class="QN2lPu">👉 C&oacute; thể mặc đi l&agrave;m, đi chơi, đặc biệt đi tiệc sự kiện , cực sang trọng</p>\n<p class="QN2lPu">&nbsp;</p>\n<p class="QN2lPu">⏩Được sản xuất v&agrave; bảo h&agrave;nh bởi C&ocirc;ng ty TNHH MTV LADOS VIỆT NAM</p>\n<p class="QN2lPu"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ley33b4kzpmyac" alt="" width="573" height="573"></p>\n<p class="QN2lPu"><video style="width: 612px; height: 306px; display: table; margin-left: auto; margin-right: auto;" controls="controls" width="612" height="306"> <source src="https://cvf.shopee.vn/file/api/v4/11110105/mms/vn-11110105-6ke15-lu7a25d0b1n547.16000081713323497.mp4" type="video/mp4"></video></p>\n<p class="QN2lPu"><strong>TH&Ocirc;NG TIN THƯƠNG HIỆU</strong></p>\n<p class="QN2lPu"><strong>LADOS </strong>l&agrave; Nh&agrave; ph&acirc;n phối chuy&ecirc;n sỉ &amp; lẻ c&aacute;c mặt h&agrave;ng thời trang chất lượng v&agrave; gi&aacute; cả phải chăng với thương hiệu LADOS. Ch&uacute;ng t&ocirc;i h&acirc;n hạnh v&agrave; lu&ocirc;n cố gắng để mang đến cho qu&yacute; kh&aacute;ch những sản phẩm chất lượng với gi&aacute; cả tốt nhất v&agrave; dịch vụ uy t&iacute;n. Tất cả c&aacute;c sản phẩm của shop đều được ch&uacute;ng t&ocirc;i tuyển chọn một c&aacute;ch kỹ lưỡng sao cho ph&ugrave; hợp với phong c&aacute;ch Ch&acirc;u &Aacute; v&agrave; bắt nhịp c&ugrave;ng xu hướng trẻ. Đến với ch&uacute;ng t&ocirc;i kh&aacute;ch h&agrave;ng c&oacute; thể y&ecirc;n t&acirc;m mua h&agrave;ng với nhiều mẫu m&atilde; được cập nhật thường xuy&ecirc;n v&agrave; nhiều khuyến mại hấp dẫn.</p>\n<p class="QN2lPu">📣 CH&Iacute;NH S&Aacute;CH MUA H&Agrave;NG</p>\n<p class="QN2lPu">👉 Cam kết chất lượng v&agrave; mẫu m&atilde; sản phẩm giống với h&igrave;nh ảnh.</p>\n<p class="QN2lPu">👉 Ho&agrave;n tiền nếu sản phẩm kh&ocirc;ng giống với m&ocirc; tả.</p>\n<p class="QN2lPu">👉 ĐỔI TRẢ TRONG 7 NG&Agrave;Y NẾU KH&Ocirc;NG Đ&Uacute;NG MI&Ecirc;U TẢ</p>\n<p class="QN2lPu">👉 CAM KẾT H&Agrave;NG CH&Iacute;NH H&Atilde;NG 100%</p>\n<p class="QN2lPu">👉 CAM KẾT ẢNH SHOP TỰ CHỤP</p>\n<p class="QN2lPu">👉 freeship cho đơn h&agrave;ng tr&ecirc;n 150k</p>\n<p class="QN2lPu">&nbsp;</p>\n<div class="ddict_btn" style="top: 355px; left: 511.177px;"><img src="chrome-extension://bpggmmljdiliancllaapiggllnkbjocb/logo/48.png"></div>',
      material: "Vải đũi cao cấp",
      originalPrice: 309000,
      finalPrice: 159000,
      shop: "BLACK",
      brand: "LADOS",
      soldQuantity: 0,
      avgRating: 0,
      images: [
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718275185/Widget/oroclhcyutmgsbukefyg.jpg",
        "https://res.cloudinary.com/dfw5bndoc/image/upload/v1718275201/Widget/wnpjfzrxtq9mdzysvvk3.jpg",
      ],
    },
  ],
  message:
    "Dưới đây là một số gợi ý sản phẩm áo cho bạn: \n1. Áo khoác nữ - Áo Khoác Dù Mùa Hè Năng Động với giá 123.000đ. \n2. Áo sơ mi nam ngắn tay cổ vest form đẹp LADOS 8085 vải đũi thấm hút, sang trọng dễ phối đồ với giá 159.000đ. \n3. Áo thun - Áo thun mùa hè năng động với giá 100.000đ. \nHy vọng bạn sẽ thích những gợi ý này!",
};

interface ExtendedProductMessageBoxProps {
  images: string[];
  handleExpandButtonOnClick: () => void;
}

interface ExtendedCartMessageBoxProps {
  handleExpandButtonOnClick: () => void;
}

interface ExtendedChartMessageBoxProps {
  handleExpandButtonOnClick: () => void;
}

const ExtendedProductMessageBox: React.FC<ExtendedProductMessageBoxProps> = ({
  images,
  handleExpandButtonOnClick,
}) => {
  const maxVisibleImages = 3;
  const remainingImagesCount = images.length - maxVisibleImages;

  return (
    <div
      className="flex p-2 border border-slate-200 rounded space-x-2 w-fit hover:bg-[#f5f5f4] cursor-pointer"
      onClick={handleExpandButtonOnClick}
    >
      {images.slice(0, maxVisibleImages).map((image, index) => (
        <div key={index} className="relative">
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="h-16 w-16 object-cover rounded"
          />
          {index === maxVisibleImages - 1 && remainingImagesCount > 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
              <span className="text-white text-lg font-semibold">
                +{remainingImagesCount}
              </span>
            </div>
          )}
        </div>
      ))}
      {images.length > maxVisibleImages && (
        <div className="flex justify-center items-center text-xs font-semibold">
          Xem thêm sản phẩm
        </div>
      )}
    </div>
  );
};

const ExtendedCartMessageBox: React.FC<ExtendedCartMessageBoxProps> = ({
  handleExpandButtonOnClick,
}) => {
  return (
    <div
      className="flex p-2 border border-slate-200 rounded space-x-2 w-fit hover:bg-[#f5f5f4] cursor-pointer"
      onClick={handleExpandButtonOnClick}
    >
      <div className="flex flex-row gap-2 justify-center items-center text-xs font-semibold">
        <FiShoppingCart />
        <span>Xem giỏ hàng</span>
      </div>
    </div>
  );
};

const ExtendedChartMessageBox: React.FC<ExtendedChartMessageBoxProps> = ({
  handleExpandButtonOnClick,
}) => {
  return (
    <div
      className="flex p-2 border border-slate-200 rounded space-x-2 w-fit hover:bg-[#f5f5f4] cursor-pointer"
      onClick={handleExpandButtonOnClick}
    >
      <div className="flex flex-row gap-2 justify-center items-center text-xs font-semibold">
        <FaChartLine />
        <span>Xem biểu đồ</span>
      </div>
    </div>
  );
};

export default function AIAssistantFloatButton({}: AIAssistantFloatButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<AssistantMessageProps[]>([
    GreetingMessage,
  ]);
  const [isExpandedPopUp, setIsExpandedPopUp] = useState<boolean>(false);
  const [bigModalOpen, setBigModalOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string | undefined>(undefined);
  const [extendedMessage, setExtendedMessage] = useState<ToolType>();
  const [aiState, setAiState] = useState<AIState>("RESPONSED");
  const [inputType, setInputType] = useState<InputType>("KEYBOARD");
  const buttonRef = useRef<HTMLDivElement>(null);
  const userInputRef = useRef<string>("");
  const AI_DOMAIN = process.env.NEXT_PUBLIC_AI_DOMAIN as string;

  const authContext = useContext(AuthContext)

  const sendClick = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  const setUserInputRef = (transcript: string) => {
    userInputRef.current = transcript;
  };

  const ref = useRef(null);
  useEffect(() => {
    require("@lottiefiles/lottie-player");
  });

  //ref: https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const extendMessagesEndRef = useRef<null | HTMLDivElement>(null);

  function initLoading() {
    const storageInfo = localStorage.getItem(authLocalStorageID);
    if (storageInfo != null) {
      return JSON.parse(storageInfo) as ShopInfoType;
    } else {
      return null;
    }
  }

  const userInfo = useMemo(() =>
  {
    if(authContext.shopInfo == null)
    {
      return null
    }
    else
    {
      return authContext.shopInfo as ShopInfoType
    }
  }, [authContext.shopInfo])

  const greetingLottie = (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/d3a73d67-08a9-479a-8701-e520c58a41c2/e9YSew8NYj.json"
      style={{ height: "100%" }}
    ></lottie-player>
  );

  const notFoundLottie = (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/4cc4d748-fec0-409d-b71a-5d2bf0823eb2/4jt7N8Ajrd.json"
      style={{ height: "60%" }}
    ></lottie-player>
  );

  const greetingReactNode = (
    <Flex
      className="w-full h-full bg-white"
      vertical
      justify="start"
      align="center"
    >
      <div className="w-3/5 h-3/5">{greetingLottie}</div>
      <Typography className="text-blue-800 font-semibold">
        <Flex justify="center" align="center" gap={4}>
          <BsChatDots className="text-lg" />
          Mình đã sẵn sàng để hỗ trợ bạn ^^
        </Flex>
      </Typography>
    </Flex>
  );

  const [extraSupportDisplay, setExtraSupportDisplay] =
    useState<JSX.Element>(greetingReactNode);

  //get cached messages of the previous conversation
  useEffect(() => {
    if (localStorage) {
      const jsonStringifiedMessages = localStorage.getItem(
        AIAssistantLocalStorageKeyword,
      );

      if (jsonStringifiedMessages != null) {
        const initMessages = JSON.parse(
          jsonStringifiedMessages,
        ) as AssistantMessageProps[];
        setMessages(initMessages);
      } else {
        setMessages([GreetingMessage]);
      }
    }
  }, []);

  function scrollToBottom() {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }

    if (extendMessagesEndRef.current) {
      extendMessagesEndRef.current.scrollTop =
        extendMessagesEndRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [open, bigModalOpen]);

  function setExtendedDisplay(response: any) {
    switch (response.type) {
      case "product_getter":
        setExtendedMessage("product_getter");
        // return (
        //   <InfiniteProductsList
        //     setupProps={InfiniteProductsListSetup}
        //     additionalData={response.data}
        //   />
        // );
        return greetingReactNode;
      case "promotion_getter":
        setExtendedMessage("promotion_getter");
        // return <InfinitePromotionList setup={InfinitePromotionListSetup} />;
        return greetingReactNode;
      case "cart_adding":
        setExtendedMessage("cart_adding");
        // return <InfiniteCart />;
        return greetingReactNode;
      case "gen_chart":
        setExtendedMessage("gen_chart");
        switch (response.data.type) {
          case "line":
            return (
              <LineChart
                data={response.data.data}
                title={response.data.title}
              />
            );
          case "bar":
            return (
              <BarChart data={response.data.data} title={response.data.title} />
            );
          case "pie":
            return (
              <PieChart data={response.data.data} title={response.data.title} />
            );
        }
      default:
        return greetingReactNode;
    }
  }

  function handleOpenAssistant() {
    if (isExpandedPopUp) {
      setBigModalOpen(true);
    } else {
      setOpen(!open);
    }
  }

  function handleCloseAssistant() {
    if (isExpandedPopUp) {
      setBigModalOpen(false);
    } else {
      setOpen(false);
    }
  }

  function handleDeleteMessages() {
    const newMessages = messages.slice(0, 1);
    setMessages(newMessages);
    setExtraSupportDisplay(greetingReactNode);
    if (localStorage) {
      const stringifiedMessages = JSON.stringify(newMessages);
      localStorage.setItem(AIAssistantLocalStorageKeyword, stringifiedMessages);
    }
  }

  ////////////////////////////////////////////////////////////////////////

  function renderExtendedMessageBox(message: AssistantMessageProps) {
    switch (message.type) {
      case "product_getter":
        let extendedData = message.data.map((item: any) => item.images[0]);
        return (
          <ExtendedProductMessageBox
            images={extendedData}
            handleExpandButtonOnClick={handleExpandButtonOnClick}
          />
        );
      case "cart_adding":
        return (
          <ExtendedCartMessageBox
            handleExpandButtonOnClick={handleExpandButtonOnClick}
          />
        );
      case "gen_chart":
        return (
          <ExtendedChartMessageBox
            handleExpandButtonOnClick={handleExpandButtonOnClick}
          />
        );
      default:
        return <></>;
    }
  }

  function getAIAssistantMessageDisplay(
    message: AssistantMessageProps,
    index: number,
  ) {
    return (
      <Flex
        vertical
        key={Date.now().toString() + index.toString()}
        className="w-full my-2"
      >
        <Flex className="w-full" justify="start" align="center" gap={8}>
          <Flex className="h-full" justify="center" align="start">
            <Image
              className="rounded-full"
              width={35}
              height={35}
              src={AIAssistantImageLink}
              preview={false}
            />
          </Flex>
          <Flex vertical gap={6} className="w-9/12">
            <Flex className="w-full" justify="start" align="center">
              <Tag bordered={false} color={"#f5f5f4"} className="rounded-xl">
                <Flex
                  className="px-1 pt-2"
                  vertical
                  justify="center"
                  align="start"
                >
                  <Typography.Text className="text-amber-900 text-sm font-semibold mb-1">
                    Trợ lý AI
                  </Typography.Text>
                  <div className="markdown">
                    <ReactMarkdown className="text-wrap text-sm text-black pb-2">
                      {message.message}
                    </ReactMarkdown>
                  </div>
                </Flex>
              </Tag>
            </Flex>
            {message.type != "text" &&
              message.data != "" &&
              renderExtendedMessageBox(message)}
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function getUserMessageDisplay(
    message: AssistantMessageProps,
    index: number,
  ) {
    return (
      <Flex
        className="w-full my-2"
        key={Date.now().toString() + index.toString()}
        justify="end"
        align="center"
      >
        <Flex className="w-7/12" justify="end" align="center">
          {/* <Tag color={"#92400e"}> */}
          <Tag
            color={"#797979"}
            className="rounded-xl flex justify-center items-center"
          >
            <p className="text-wrap text-sm text-white my-2">
              {message.message}
            </p>
          </Tag>
        </Flex>
      </Flex>
    );
  }

  function getMessageDisplay(message: AssistantMessageProps, index: number) {
    if (message.role == AssistantMessageTypes.Assistant) {
      return getAIAssistantMessageDisplay(message, index);
    } else if (message.role == AssistantMessageTypes.User) {
      return getUserMessageDisplay(message, index);
    } else {
      return <></>;
    }
  }

  function handleExpandButtonOnClick() {
    setIsExpandedPopUp(true);
    setBigModalOpen(true);
    setOpen(false);
  }

  function handleShrinkButtonOnClick() {
    setIsExpandedPopUp(false);
    setBigModalOpen(false);
    setOpen(true);
  }

  function handleRefreshMessages() {
    if (localStorage) {
      const stringifiedMessages = localStorage.getItem(
        AIAssistantLocalStorageKeyword,
      );

      if (stringifiedMessages != null) {
        const newMessages = JSON.parse(
          stringifiedMessages,
        ) as AssistantMessageProps[];
        setMessages(newMessages);
      }
    }
  }

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const handleSendButtonOnClick = async () => {
    // if (userInput == undefined) {
    //   return;
    // }

    console.log("User Input: ", userInput);
    console.log("User Input Ref: ", userInputRef.current);

    const message: AssistantMessageProps = {
      role: AssistantMessageTypes.User,
      message: userInput as string,
      type: "text",
      data: [],
    };

    if (userInputRef.current != "") {
      message.message = userInputRef.current as string;
    } else {
      message.message = userInput as string;
    }

    const history_conservation = [...messages];

    console.log("History: ", history_conservation);

    setUserInput(undefined);

    let prompt = "USER_ID " + " " + userInfo?._id + ": " + message.message;

    const postBody = {
      history_conservation: history_conservation,
      prompt: prompt,
    };
    console.log("PostBody: ", postBody);

    history_conservation.push(message);

    setMessages(history_conservation);
    try {
      setAiState("THINKING");

      const rawResponse = await axios.post(
        `${AI_DOMAIN}/chat/agent`,
        postBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (rawResponse.status == 200) {
        console.log("AI Response: ", rawResponse.data);
        setExtendedDisplay(<></>);

        let type = "";
        let message = "";
        let data = "";
        if (!isJsonString(rawResponse.data.data)) {
          message = rawResponse.data.data;
        } else {
          let response = JSON.parse(rawResponse.data.data);
          console.log("Valid Response Data");

          message = response.message != undefined ? response.message : "";
          type = response.type != undefined ? response.type : "";
          data = response.data != undefined ? response.data : "";
          setExtraSupportDisplay(setExtendedDisplay(response));
        }

        const assistantResponse: AssistantMessageProps = {
          role: AssistantMessageTypes.Assistant,
          message: message,
          type: type,
          data: data,
        };

        const newResponseMessages = [...history_conservation];
        newResponseMessages.push(assistantResponse);
        setMessages(newResponseMessages);
        setAiState("RESPONSED");

        if (localStorage) {
          const stringifiedMessages = JSON.stringify(newResponseMessages);
          localStorage.setItem(
            AIAssistantLocalStorageKeyword,
            stringifiedMessages,
          );
        }
      }
    } catch (error) {
      console.error("Error in conservation:", error);
    }

    // setAiState("THINKING");
    // setTimeout(() => {
    //   setAiState("RESPONSED");
    //   const assistantResponse: AssistantMessageProps = {
    //     role: AssistantMessageTypes.Assistant,
    //     message: fakeResponse.message,
    //     type: fakeResponse.type,
    //     data: fakeResponse.data,
    //   };

    //   const newResponseMessages = [...history_conservation];
    //   newResponseMessages.push(assistantResponse);
    //   setMessages(newResponseMessages);
    //   if (localStorage) {
    //     const stringifiedMessages = JSON.stringify(history_conservation);
    //     localStorage.setItem(
    //       AIAssistantLocalStorageKeyword,
    //       stringifiedMessages,
    //     );
    //   }
    //   setExtraSupportDisplay(setExtendedDisplay(fakeResponse));
    // }, 5000);
  };

  const ExpandOrShrinkButton =
    isExpandedPopUp == false ? (
      <Tooltip placement="top" title="Mở rộng">
        <Button
          size="small"
          className="rounded-full border-transparent"
          onClick={handleExpandButtonOnClick}
        >
          <IoExpandOutline />
        </Button>
      </Tooltip>
    ) : (
      <Tooltip placement="top" title="Thu nhỏ">
        <Button
          size="small"
          className="rounded-full border-transparent"
          onClick={handleShrinkButtonOnClick}
        >
          <LuShrink />
        </Button>
      </Tooltip>
    );

  const extraAiAssistantPopoverContentButton = (
    <Flex className="w-full h-full" justify="end" align="center" gap={6}>
      <Tooltip placement="top" title="Đồng bộ">
        <Button
          size="small"
          className="rounded-full border-transparent"
          onClick={handleRefreshMessages}
        >
          <BiRefresh />
        </Button>
      </Tooltip>
      {ExpandOrShrinkButton}
      <Tooltip placement="top" title="Xoá đoạn chat">
        <Button
          size="small"
          className="rounded-full border-transparent"
          onClick={handleDeleteMessages}
        >
          <IoTrashBinOutline />
        </Button>
      </Tooltip>
      <Tooltip placement="top" title="Đóng đoạn chat">
        <Button
          size="small"
          className="rounded-full border-transparent"
          onClick={handleCloseAssistant}
        >
          <IoCloseOutline />
        </Button>
      </Tooltip>
    </Flex>
  );

  const SendButtonStyle =
    userInput != undefined && userInput.length > 0
      ? "bg-blue-600 rounded-xl text-white hover:bg-blue-600"
      : "disabled rounded-xl";
  const isSendButtonDisabled =
    userInput != undefined && userInput.length > 0 ? false : true;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isSendButtonDisabled) {
      e.preventDefault();
      handleSendButtonOnClick();
    }
  };

  const CardActions = (
    <>
      {inputType == "KEYBOARD" ? (
        <div className="w-full h-full">
          {/* <div className="relative h-10 w-full"></div> */}
          <Flex
            className="w-full absolute bottom-0 left-0 px-5"
            justify="center"
            align="end"
            gap={4}
          >
            <div className="w-full flex flex-row justify-center items-center border rounded-xl ">
              <TextArea
                className="w-full max-h-96 overflow-y-auto border-none rounded-xl"
                autoSize={true}
                value={userInput}
                placeholder="Nhập nội dung cần hỗ trợ"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setUserInput(e.target.value)
                }
                onKeyPress={handleKeyPress}
              />
              <div
                className="p-2 rounded-xl hover:bg-slate-200 cursor-pointer"
                ref={buttonRef}
                onClick={() => setInputType("VOICE")}
              >
                <FiMic />
              </div>
            </div>

            {/* <Input className="w-full" multiple={true} value={userInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}/> */}
            <Button
              disabled={isSendButtonDisabled}
              className={SendButtonStyle}
              onClick={(e) => handleSendButtonOnClick()}
              type="default"
            >
              <LuSendHorizonal className="font-light" />
            </Button>
          </Flex>
        </div>
      ) : (
        <VoiceChat
          setInputType={setInputType}
          setUserInput={setUserInput}
          handleSendButtonOnClick={handleSendButtonOnClick}
          setUserInputRef={setUserInputRef}
        />
      )}
    </>
  );

  const cardTitle = (
    <Flex className="pb-3" justify="start" align="center" gap={8}>
      <Image
        preview={false}
        src={AIAssistantImageLink}
        width={30}
        height={30}
      />
      <Typography.Text className="text-lg">Trợ lý AI</Typography.Text>
    </Flex>
  );

  const AIAssistantPopoverContent = (
    <Card
      style={{ boxShadow: "none" }}
      title={cardTitle}
      bordered={false}
      extra={extraAiAssistantPopoverContentButton}
    >
      <Flex
        className="overflow-y-auto h-96 max-h-96 max-w-screen-md mb-8 pr-2"
        vertical
        justify="start"
        align="center"
        gap={4}
        ref={messageEndRef}
      >
        {messages.map((message: AssistantMessageProps, index: number) => {
          return getMessageDisplay(message, index);
        })}
        {aiState === "THINKING" && (
          <Flex vertical key={"thinking"} className="w-full my-2">
            <Flex className="w-full" justify="start" align="center" gap={8}>
              <Flex className="h-full" justify="center" align="start">
                <Image
                  className="rounded-full"
                  width={35}
                  height={35}
                  src={AIAssistantImageLink}
                  preview={false}
                />
              </Flex>
              <Flex vertical gap={6} className="w-9/12">
                <Flex className="w-full" justify="start" align="center">
                  <Tag bordered={false} color={"#f5f5f4"}>
                    <Flex
                      className="px-1 pt-2"
                      vertical
                      justify="center"
                      align="start"
                    >
                      <Typography.Text className="text-amber-900 text-sm font-semibold mb-1">
                        Trợ lý AI
                      </Typography.Text>
                      <span className="progress p-3 mr-[12px] mb-2"></span>
                    </Flex>
                  </Tag>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      {CardActions}
    </Card>
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Popover
        open={open}
        trigger={"click"}
        placement="leftBottom"
        content={AIAssistantPopoverContent}
      >
        <Flex vertical align="center" justify="end">
          <Tooltip trigger={"hover"} title={""} placement="left">
            <button
              type="button"
              className="bg-stone-600 hover:bg-[#797979] w-16 min-w-16 h-20 min-h-16 rounded-md border-0 "
              onClick={handleOpenAssistant}
            >
              <Flex
                vertical
                className="w-full h-full py-4"
                justify="center"
                align="center"
              >
                <BiSupport className="w-full h-full text-sm text-white" />
                <Typography.Text className="text-xs h-auto text-white font-medium overflow-hidden">
                  Trợ lý
                </Typography.Text>
              </Flex>
            </button>
          </Tooltip>
        </Flex>
      </Popover>
      <Modal
        className="fullscreen-modal"
        style={{ top: 0, left: 0, margin: 0 }}
        width={"100%"}
        closable={false}
        footer={[]}
        open={bigModalOpen}
      >
        <Flex className="w-full h-full bg-gray-100">
          <Card
            className="w-2/5 "
            style={{ boxShadow: "none", borderRadius: "0 0 0 0" }}
            title={cardTitle}
            bordered={false}
            extra={extraAiAssistantPopoverContentButton}
          >
            <Flex
              key={"modal-conversation-content"}
              style={{ maxHeight: `calc(100dvh/100*75)`, height: "100dvh" }}
              className="overflow-y-auto pr-2"
              vertical
              justify="start"
              align="center"
              gap={4}
              ref={extendMessagesEndRef}
            >
              {messages.map((message: AssistantMessageProps, index: number) => {
                return getMessageDisplay(message, index);
              })}

              {aiState === "THINKING" && (
                <Flex vertical key={"thinking"} className="w-full my-2">
                  <Flex
                    className="w-full"
                    justify="start"
                    align="center"
                    gap={8}
                  >
                    <Flex className="h-full" justify="center" align="start">
                      <Image
                        className="rounded-full"
                        width={35}
                        height={35}
                        src={AIAssistantImageLink}
                        preview={false}
                      />
                    </Flex>
                    <Flex vertical gap={6} className="w-9/12">
                      <Flex className="w-full" justify="start" align="center">
                        <Tag bordered={false} color={"#f5f5f4"}>
                          <Flex
                            className="px-1 pt-2"
                            vertical
                            justify="center"
                            align="start"
                          >
                            <Typography.Text className="text-amber-900 text-sm font-semibold mb-1">
                              Trợ lý AI
                            </Typography.Text>
                            <span className="progress p-3 mr-[12px] mb-2"></span>
                          </Flex>
                        </Tag>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Flex>
            {CardActions}
          </Card>
          <div className="w-3/5 ">{extraSupportDisplay}</div>
        </Flex>
      </Modal>
      {/* <FloatButton className="w-full h-full" shape="square" icon={<BiSupport />} type="primary"/> */}
    </>
  );
}
