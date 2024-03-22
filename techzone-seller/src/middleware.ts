import createMiddleware from "next-intl/middleware";
import { locales } from "./language_navigation";
export default createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "never",
});

export const config = {
  matcher: ["/((?!api|_next|(?:[.-]*)\\..*).*)"],
};
