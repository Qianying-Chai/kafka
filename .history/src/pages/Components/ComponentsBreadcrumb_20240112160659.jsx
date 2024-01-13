import React from "react";
import { Breadcrumb, ConfigProvider } from "antd";

const ComponentsBreadcrumb = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            lastItemColor: "#075179",
            linkColor: "#000000d9",
            linkHoverColor: "",
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
