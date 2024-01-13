// import React from "react";
import { Typography, ConfigProvider } from "antd";
const { Title } = Typography;

const ComponentsTitle = (props) => {
  console.log(props.title);
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
        <Title level={2}>111</Title>
      </ConfigProvider>
    </>
  );
};

export default ComponentsTitle;
