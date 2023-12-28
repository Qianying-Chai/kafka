import React from "react";
import ComponentsCard from "../Components/ComponentsCard";
import { Anchor, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

const Subscriptions = () => {
  const [selected, setSelected] = useState("NonProxy");

  return (
    <ConfigProvider
      theme={{
        components: {
          Anchor: {
            linkPaddingBlock: 6,
            linkPaddingInlineStart: 30,
            colorPrimary: "#32cd32",
            fontSize: 18,
          },
        },
      }}
    >
      <ComponentsCard>
        <div
          style={
            {
              // marginBottom: "5px",
            }
          }
        >
          <Anchor
            direction="horizontal"
            items={[
              {
                key: "NonProxy",
                href: "#NonProxy",
                title: (
                  <div
                    style={{
                      color:
                        selected === "NonProxy" ? "rgb(4, 31, 65)" : "#bfbfbf",
                      fontWeight: "bolder",
                    }}
                    onClick={() => {
                      setSelected("NonProxy");
                    }}
                  >
                    NonProxy
                  </div>
                ),
              },
              {
                key: "Proxy",
                href: "#Proxy",
                title: (
                  <div
                    style={{
                      color:
                        selected === "Proxy" ? "rgb(4, 31, 65)" : "#bfbfbf",
                      fontWeight: "bolder",
                    }}
                    onClick={() => {
                      setSelected("Proxy");
                    }}
                  >
                    Proxy{" "}
                  </div>
                ),
              },
            ]}
          />
        </div>
        <div>
          <Input
            size="large"
            placeholder="Search by Id, Topic Name, APM ID, Application Name, AD Group, DL Notfication Email, Permission, Auto-Approved, and Status"
            prefix={<SearchOutlined />}
            style={{ margin: "18px 0", borderRadius: "0px" }}
          />
        </div>
      </ComponentsCard>
    </ConfigProvider>
  );
};
export default Subscriptions;
