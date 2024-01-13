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
    <ConfigProvider
      theme={{
        token: {
          // colorPrimaryHover: "#1890ff",
        },
      }}
    >
      <div className="content-banner">
        <span className="content-banner-title">{title}</span>
        {editebutton ? (
          <Button
            type="primary"
            shape="round"
            size={size}
            className="content-banner-button"
          >
            {`+ CREATE ${title.toUpperCase()}`}
          </Button>
        ) : (
          ""
        )}
      </div>
      <Layout.Content
        style={{
          padding: "20px 32px 32px",
          minHeight: 280,
          background: colorBgContainer,
        }}
        {...props}
      ></Layout.Content>
    </ConfigProvider>
  );
};
export default ComponentsCard;
