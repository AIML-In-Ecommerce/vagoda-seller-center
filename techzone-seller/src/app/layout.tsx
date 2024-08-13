import type { Metadata } from "next";

import AuthContextProvider from "@/context/AuthContext";
import { ReactNode } from "react";
import "./globals.css";

// import UserLayout from "@/component/UserLayout";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Vagoda  - Seller Center ",
  description: "Seller Center",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={"en"}>
      {/* <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <body className="w-full">
        <AuthContextProvider>
          {/* <SocketProvider> */}
          {children}
          {/* </SocketProvider> */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
