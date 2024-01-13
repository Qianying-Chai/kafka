import React from "react";
import "./Style/Router.css";
import { Breadcrumb, ConfigProvider } from "antd";
import { useSelector } from "react-redux";

const Breadcrumbs = () => {
  const itemsKey = useSelector((state) => state.itemsKey);

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
export default Breadcrumbs;
