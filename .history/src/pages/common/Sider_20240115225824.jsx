import React from "react";
import { Link } from "react-router-dom";
import "./Style/Sider.css";
import {
  ReadFilled,
  DeleteFilled,
  PlusCircleFilled,
  CheckCircleFilled,
  QuestionCircleFilled,
  HddFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Layout, Menu, theme, ConfigProvider } from "antd";
import categoryConstants from "./categoryConstants";

const Sider = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "Topic as a Service (Lettera)",
      label: "Topic as a Service (Lettera)",
      children: [
        {
          key: "Topics",
          label: (
            <Link to={`kafka/${categoryConstants.TOPICS.toLowerCase()}`}>
              {categoryConstants.TOPICS}
            </Link>
          ),
          icon: React.createElement(ReadFilled),
        },
        {
          key: "Trash",
          label: (
            <Link to={`kafka/${categoryConstants.TRASH.toLowerCase()}`}>
              {categoryConstants.TRASH}
            </Link>
          ),
          icon: React.createElement(DeleteFilled),
        },
        {
          key: "Subscriptions",
          label: (
            <Link
              to={`kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
            >
              {categoryConstants.SUBSCRIPTIONS}
            </Link>
          ),
          icon: React.createElement(PlusCircleFilled),
        },
        {
          key: "Subscription Approvals",
          label: (
            <Link to={`kafka/subscriptionRequests`}>
              {categoryConstants.SUBSCRIPTIONS_APPROVALS.replace("_", " ")}
            </Link>
          ),
          icon: React.createElement(CheckCircleFilled),
        },
        {
          key: "Applications",
          label: (
            <Link to={`kafka/${categoryConstants.APPLICATIONS.toLowerCase()}`}>
              {categoryConstants.APPLICATIONS}
            </Link>
          ),
          icon: React.createElement(ReadFilled),
        },
        {
          key: "User Requests",
          label: (
            <Link to={`kafka/requests`}>
              {categoryConstants.USER_REQUESTS.replace("_", " ")}
            </Link>
          ),
          icon: React.createElement(QuestionCircleFilled),
        },
      ],
    },
    {
      label: <div>Cluster (Legacy)</div>,
      key: "Cluster (Legacy)",
      children: [
        {
          key: "Clusters",
          label: (
            <Link to={`kafka/${categoryConstants.CLUSTERS.toLowerCase()}`}>
              {categoryConstants.CLUSTERS}
            </Link>
          ),
          icon: React.createElement(HddFilled),
        },
        {
          key: "Migrated Clusters",
          label: (
            <Link to={`kafka/migrated-clusters`}>
              {categoryConstants.MIGRATED_CLUSTERS.replace("_", " ")}
            </Link>
          ),
          icon: React.createElement(HddFilled),
        },
        {
          key: "Subscription",
          label: (
            <Link to={`kafka/mps-clusters-subscriptions`}>
              {categoryConstants.SUBSCRIPTION}
            </Link>
          ),
          icon: React.createElement(PlusCircleFilled),
        },
        {
          key: "User Requests (Legacy)",
          label: (
            <Link to={`kafka/legacy-requests`}>User Requests (Legacy)</Link>
          ),
          icon: React.createElement(QuestionCircleFilled),
        },
      ],
    },
    {
      label: <div>RESOURCES</div>,
      type: "group",
      key: "RESOURCES",
      children: [
        {
          key: "Supprot",
          label: (
            <Link to={`kafka/${categoryConstants.SUPPORT.toLowerCase()}`}>
              {categoryConstants.SUPPORT}
            </Link>
          ),
          icon: React.createElement(SettingFilled),
        },
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverBg: "",
            itemHoverColor: "#1890ff",
            padding: 30,
          },
          Tabs: {
            inkBarColor: "rgb(4, 31, 65)",
          },
        },
      }}
    >
      <Layout.Sider
        className="sider"
        width={"250px"}
        style={{
          background: colorBgContainer,
        }}
      >
        <div className="slider-top">
          <span className="slider-top-content">KAFKA</span>
        </div>
        <div
          style={{
            marginLeft: "-12px",
          }}
        >
          <Menu
            mode="inline"
            items={items}
            defaultOpenKeys={["Topic as a Service (Lettera)", "RESOURCES"]}
            style={{
              color: "#041f41",
            }}
          />
        </div>
      </Layout.Sider>
    </ConfigProvider>
  );
};
export default Sider;
