import React from "react";
import { Divider } from "antd";
const ComponentsDivider = () => (
  <ConfigProvider
    theme={{
      token: {
        borderRadius: 0,
      },
    }}
  >
    {" "}
    <Divider />
  </ConfigProvider>
);
export default ComponentsDivider;
