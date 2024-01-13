import React from "react";
import "./Style/ComponentsCard.css";
import { Layout, theme } from "antd";

const ComponentsCard = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout.Content
        style={{
          padding: "20px 32px 32px",
          minHeight: 280,
          background: colorBgContainer,
        }}
        {...props}
      ></Layout.Content>
    </>
  );
};
export default ComponentsCard;
