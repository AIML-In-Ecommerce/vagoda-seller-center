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
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={"en"}>
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
