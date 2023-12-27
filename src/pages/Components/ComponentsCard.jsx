import React from "react";
import "./Style/ComponentsCard.css";
import { Layout, theme } from "antd";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
const ComponentsCard = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [size, setSize] = useState("medium");
  const itemsKey = useSelector((state) => state.itemsKey);
  return (
    <div>
      <div className="content-banner">
        <span className="content-banner-title">{itemsKey}</span>
        <Button
          type="primary"
          shape="round"
          size={size}
          className="content-banner-button"
        >
          {`+ CREATE ${itemsKey.toUpperCase()}`}
        </Button>
      </div>
      <Layout.Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
        {...props}
      ></Layout.Content>
    </div>
  );
};
export default ComponentsCard;
