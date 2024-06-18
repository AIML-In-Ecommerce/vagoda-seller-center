"use client";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface SidebarContentReactiveLayoutProps {
  children: React.ReactNode;
}

function SidebarContentReactiveLayout({
  children,
}: SidebarContentReactiveLayoutProps) {
  const defaultHiddenBlockStyle: React.CSSProperties = {
    width: 100,
    height: "100%",
  };

  const expandedHiddenBlockStyle: React.CSSProperties = {
    width: 220,
    height: "100%",
  };

  const [hiddenBlockStyle, setHiddenBlockStyle] = useState<React.CSSProperties>(
    defaultHiddenBlockStyle
  );

  function handleSidebarCollapsingNotice(value: any) {
    if (value == true) {
      setHiddenBlockStyle(defaultHiddenBlockStyle);
    } else {
      setHiddenBlockStyle(expandedHiddenBlockStyle);
    }
  }

  return (
    <Layout hasSider>
      {" "}
      <Sidebar noticeCollapsingCallback={handleSidebarCollapsingNotice} />
      <div className="invisible" style={hiddenBlockStyle}>
        hidden block
      </div>
      <Content>{children}</Content>
    </Layout>
  );
}

export default SidebarContentReactiveLayout;
