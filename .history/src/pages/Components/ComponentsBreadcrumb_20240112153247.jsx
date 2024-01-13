import React from "react";

import { Breadcrumb, ConfigProvider } from "antd";

const ComponentsBreadcrumb = () => {
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
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        separator=""
        items={[
          {
            href: "",
            title: "Home",
          },
          {
            type: "separator",
            separator: ">",
          },
          {
            href: "",
            title: "Kafka",
          },
          {
            type: "separator",
            separator: itemsKey === "" ? "" : ">",
          },
          {
            href: `/${itemsKey}`,
            title: itemsKey,
          },
        ]}
      ></Breadcrumb>
    </ConfigProvider>
  );
};
export default ComponentsBreadcrumb;
