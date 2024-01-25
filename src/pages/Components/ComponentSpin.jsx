import { Spin, ConfigProvider } from "antd";

const ComponentsSpin = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fa8c16",
        },
      }}
    >
      <Spin size="large" style={{ marginTop: "20px" }}>
        <div className="content" />
      </Spin>
    </ConfigProvider>
  );
};

export default ComponentsSpin;
