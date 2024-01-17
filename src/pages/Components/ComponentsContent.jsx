import React from "react";
import "./Style/ComponentsContent.css";
import { Layout, theme } from "antd";

const ComponentsContent = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout.Content
        style={{
          padding: "20px 32px 32px",
          minHeight: 280,
          background: colorBgContainer,
        }}
        {...props}
      ></Layout.Content>
    </div>
  );
};
export default ComponentsContent;
