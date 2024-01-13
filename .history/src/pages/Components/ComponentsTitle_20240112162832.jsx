import React from "react";
import { Typography } from "antd";
const { Title, ConfigProvider } = Typography;

const ComponentsTitle = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          token: {
            colorText: "#041E42",
          },
        },
      }}
    >
      <Title level={2}>111</Title>
    </ConfigProvider>
  );
};

export default ComponentsTitle;
