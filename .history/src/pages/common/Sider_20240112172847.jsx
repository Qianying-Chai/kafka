import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { setItemsKey } from "../../redux/action";

const Sider = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  const items = [
    {
      key: "Topic as a Service (Lettera)",
      label: "Topic as a Service (Lettera)",
      children: [
        {
          key: "Topics",
          label: (
            <Link to={`/kafka/${categoryConstants.TOPICS.toLowerCase()}`}>
              {categoryConstants.TOPICS}
            </Link>
          ),
          icon: React.createElement(ReadFilled),
        },
        {
          key: "Trash",
          label: (
            <Link to={`/kafka/${categoryConstants.TRASH.toLowerCase()}`}>
              {categoryConstants.TRASH}
            </Link>
          ),
          icon: React.createElement(DeleteFilled),
        },
        {
          key: "Subscriptions",
          label: (
            <Link
              to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}`}
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
            <div
              onClick={() => {
                dispatch(setItemsKey("Applications"));
              }}
            >
              <Link
                to={`kafka/${categoryConstants.APPLICATIONS.toLowerCase()}`}
              >
                {categoryConstants.APPLICATIONS}
              </Link>
            </div>
          ),
          icon: React.createElement(ReadFilled),
        },
        {
          key: "User Requests",
          label: (
            <div
              onClick={() => {
                dispatch(setItemsKey("User Requests"));
              }}
            >
              <Link to={`/${categoryConstants.USER_REQUESTS.toLowerCase()}`}>
                {categoryConstants.USER_REQUESTS.replace("_", " ")}
              </Link>
            </div>
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
            <div
              onClick={() => {
                dispatch(setItemsKey("Clusters"));
              }}
            >
              <Link to={`/${categoryConstants.CLUSTERS.toLowerCase()}`}>
                {categoryConstants.CLUSTERS}
              </Link>
            </div>
          ),
          icon: React.createElement(HddFilled),
        },
        {
          key: "Migrated Clusters",
          label: (
            <div
              onClick={() => {
                dispatch(setItemsKey("Migrated Clusters"));
              }}
            >
              <Link
                to={`/${categoryConstants.MIGRATED_CLUSTERS.toLowerCase()}`}
              >
                {categoryConstants.MIGRATED_CLUSTERS.replace("_", " ")}
              </Link>
            </div>
          ),
          icon: React.createElement(HddFilled),
        },
        {
          key: "Subscription",
          label: (
            <div
              onClick={() => {
                dispatch(setItemsKey("Subscription"));
              }}
            >
              <Link to={`/${categoryConstants.SUBSCRIPTION.toLowerCase()}`}>
                {categoryConstants.SUBSCRIPTION}
              </Link>
            </div>
          ),
          icon: React.createElement(PlusCircleFilled),
        },
        {
          key: "User Requests (Legacy)",
          label: (
            <div
              onClick={() => {
                dispatch(setItemsKey("User Requests (Legacy)"));
              }}
            >
              <Link
                to={`/${categoryConstants.USERE_REQUESTS_LEGACY.toLowerCase()}`}
              >
                User Requests (Legacy)
              </Link>
            </div>
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
            <div
              onClick={() => {
                dispatch(setItemsKey("Supprot"));
              }}
            >
              <Link to={`/${categoryConstants.SUPPORT.toLowerCase()}`}>
                {categoryConstants.SUPPORT}
              </Link>
            </div>
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
          <div></div>
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
