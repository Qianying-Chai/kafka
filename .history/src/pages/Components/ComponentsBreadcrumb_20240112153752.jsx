import React from "react";
import { Breadcrumb, ConfigProvider } from "antd";

const ComponentsBreadcrumb = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            lastItemColor: "#000000d9",
            linkColor: "#075179",
          },
        },
      }}
    >
      <div>
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
          separator=">"
          items={props.items}
        ></Breadcrumb>
      </div>
    </ConfigProvider>
  );
};
export default ComponentsBreadcrumb;
