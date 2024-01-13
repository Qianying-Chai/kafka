import React from "react";
import "./Style/ComponentsCard.css";
import { Layout, theme, Button, ConfigProvider } from "antd";
import { useState } from "react";

const ComponentsCard = (props) => {
  const { editebutton, title } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size, setSize] = useState("medium");

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
