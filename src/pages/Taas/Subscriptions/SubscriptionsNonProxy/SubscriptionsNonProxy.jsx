import React from "react";
import SubscriptionsNonProxyContent from "./SubscriptionsNonProxyContent";

import { ConfigProvider } from "antd";

const SubscriptionsNonProxy = () => {
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
            headerColor: "#041F41",
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
          colorLink: "#000000D9",
          borderRadius: 0,
        },
      }}
    >
      <SubscriptionsNonProxyContent />
    </ConfigProvider>
  );
};
export default SubscriptionsNonProxy;
