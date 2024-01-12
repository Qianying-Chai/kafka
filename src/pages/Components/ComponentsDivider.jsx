import React from "react";
import { Divider, ConfigProvider } from "antd";

const ComponentsDivider = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorSplit: "rgba(0, 0, 0, 0.85)",
          marginLG: 16,
          colorBgContainer: "#ffffff",
        },
      }}
    >
      <Divider />
    </ConfigProvider>
  );
};
export default ComponentsDivider;
