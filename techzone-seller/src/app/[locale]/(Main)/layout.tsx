import AssistantFloatingButtonGroup from "@/component/AssistantFloatingButtonGroup";
import Navbar from "@/component/Navbar";
import SidebarContentReactiveLayout from "@/component/SidebarContentReactiveLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";
import "../../globals.css";

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AntdRegistry>
        <div className=" w-full bg-cover bg-slate-50 min-h-screen overflow-hidden ">
          <div className="fixed w-full z-50">
            <Navbar />
          </div>
          <div className="flex flex-row mt-16">
            <SidebarContentReactiveLayout>
              {children}
            </SidebarContentReactiveLayout>
          </div>
          <AssistantFloatingButtonGroup />
        </div>
      </AntdRegistry>
    </NextIntlClientProvider>
  );
}
