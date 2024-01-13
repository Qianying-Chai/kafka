import React from "react";
import { Typography } from "antd";
const { Title, ConfigProvider } = Typography;

const ComponentsTitle = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            lastItemColor: "#000000D9",
            linkColor: "#075179",
            itemColor: "#0751A9",
            linkHoverColor: "#F5F5F5",
          },
          token: {
            colorBgTextHover: "#F5F5F5",
          },
        },
      }}
    >
      <Title level={2}>{props.title}</Title>
    </ConfigProvider>
  );
};

export default ComponentsTitle;
