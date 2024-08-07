import React from "react";
import "../Style/Subscription.css";
import SubscriptionContent from "./SubscriptionContent";
import { ConfigProvider } from "antd";

const Subscription = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#ffffff",
            headerColor: "#041F41",
          },
        },
        token: {
          borderRadius: 0,
          colorLink: "#0751A9",
        },
      }}
    >
      <SubscriptionContent />
    </ConfigProvider>
  );
};
export default Subscription;
