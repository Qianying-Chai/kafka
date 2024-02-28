import React from "react";
import SubscriptionsProxyContent from "./SubscriptionsProxyContent";
import { ConfigProvider } from "antd";

const SubscriptionsProxy = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Anchor: {
            linkPaddingBlock: 6,
            linkPaddingInlineStart: 30,
            colorPrimary: "#32cd32",
            fontSize: 20,
          },
          Table: {
            headerBg: "#ffffff",
            padding: "12px 8px",
          },
          Tabs: {
            itemSelectedColor: "#41F41",
            inkBarColor: "#06f27b",
            itemColor: "#00000099",
            itemHoverColor: "rgb(4, 31, 65)",
            titleFontSize: 16,
          },
        },

        token: {
          colorLink: "rgb(4, 31, 65)",
          borderRadius: 0,
        },
      }}
    >
      <SubscriptionsProxyContent />
    </ConfigProvider>
  );
};
export default SubscriptionsProxy;
