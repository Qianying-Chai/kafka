import React from "react";
import { Typography, ConfigProvider } from "antd";
const { Title } = Typography;

const ComponentsTitle = (props) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            token: {
              colorText: "#041E42",
            },
          },
        }}
      >
        <Title level={2} style={{ fontWeight: "bold" }}>
          {props.title}
        </Title>
      </ConfigProvider>
    </>
  );
};

export default ComponentsTitle;
