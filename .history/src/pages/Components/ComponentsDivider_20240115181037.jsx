import React from "react";
import { Divider, ConfigProvider } from "antd";
const ComponentsDivider = () => (
  <ConfigProvider
    theme={{
      token: {
        colorSplit: "rgba(0, 0, 0, 0.85)",
      },
    }}
  >
    {" "}
    <Divider />
  </ConfigProvider>
);
export default ComponentsDivider;
