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
import { useDispatch } from "react-redux";
import { setPathName } from "../../redux/action";

const Sider = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  const items = [
    {
      key: "Topic as a Service (Lettera)",
      label: <div>Topic as a Service (Lettera)</div>,
      children: [
        {
          key: "Topics",
          label: (
            <div
              onClick={() => {
                dispatch(setPathName(categoryConstants.TOPICS.toLowerCase()));
              }}
            >
              <Link to={`/kafka/${categoryConstants.TOPICS.toLowerCase()}`}>
                {categoryConstants.TOPICS}
              </Link>
            </div>
          ),
          icon: React.createElement(ReadFilled),
        },
        {
          key: "Trash",
          label: (
            <div
              onClick={() => {
                dispatch(setPathName(categoryConstants.TRASH.toLowerCase()));
              }}
            >
              <Link to={`/kafka/${categoryConstants.TRASH.toLowerCase()}`}>
                {categoryConstants.TRASH}
              </Link>
            </div>
          ),
          icon: React.createElement(DeleteFilled),
        },
        {
          key: "Subscriptions",
          label: (
            <div
              onClick={() => {
                dispatch(
                  setPathName(categoryConstants.SUBSCRIPTIONS.toLowerCase())
                );
              }}
            >
              <Link
                to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
              >
                {categoryConstants.SUBSCRIPTIONS}
              </Link>
            </div>
          ),
          icon: React.createElement(PlusCircleFilled),
        },
        {
          key: "Subscription Approvals",
          label: (
            <div
              onClick={() => {
                dispatch(
                  setPathName(
                    categoryConstants.SUBSCRIPTIONS_APPROVALS.toLowerCase()
                  )
                );
              }}
            >
              <Link
                to={`/kafka/${categoryConstants.SUBSCRIPTIONS_APPROVALS.toLowerCase()}`}
              >
                {categoryConstants.SUBSCRIPTIONS_APPROVALS.replace("_", " ")}
              </Link>
            </div>
          ),
          icon: React.createElement(CheckCircleFilled),
        },
        {
          key: "Applications",
          label: (
            <div
              onClick={() => {
                dispatch(
                  setPathName(categoryConstants.APPLICATIONS.toLowerCase())
                );
              }}
            >
              <Link
                to={`/kafka/${categoryConstants.APPLICATIONS.toLowerCase()}`}
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
                dispatch(
                  setPathName(categoryConstants.USER_REQUESTS.toLowerCase())
                );
              }}
            >
              <Link
                to={`/kafka/${categoryConstants.USER_REQUESTS.toLowerCase()}`}
              >
                {categoryConstants.USER_REQUESTS.replace("_", " ")}
              </Link>
            </div>
          ),
          icon: React.createElement(QuestionCircleFilled),
        },
      ],
    },
    {
      label: <div>Clusters (Legacy)</div>,
      key: "Clusters (Legacy)",
      children: [
        {
          key: "Clusters",
          label: (
            <div
              onClick={() => {
                dispatch(setPathName(categoryConstants.CLUSTERS.toLowerCase()));
              }}
            >
              <Link to={`/kafka/${categoryConstants.CLUSTERS.toLowerCase()}`}>
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
                dispatch(
                  setPathName(categoryConstants.MIGRATED_CLUSTERS.toLowerCase())
                );
              }}
            >
              <Link
                to={`/kafka/${categoryConstants.MIGRATED_CLUSTERS.toLowerCase()}`}
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
                dispatch(
                  setPathName(categoryConstants.SUBSCRIPTION.toLowerCase())
                );
              }}
            >
              <Link
                to={`/kafka/mps-clusters-${categoryConstants.SUBSCRIPTION.toLowerCase()}`}
              >
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
                dispatch(
                  setPathName(
                    categoryConstants.USERE_REQUESTS_LEGACY.toLowerCase()
                  )
                );
              }}
            >
              <Link
                to={`/kafka/${categoryConstants.USERE_REQUESTS_LEGACY.toLowerCase()}`}
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
                dispatch(setPathName(categoryConstants.SUPPORT.toLowerCase()));
              }}
            >
              <Link to={`/kafka/${categoryConstants.SUPPORT.toLowerCase()}`}>
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
            itemBorderRadius: 0,
            itemMarginInline: 0,
          },
          Tabs: {
            inkBarColor: "rgb(4, 31, 65)",
          },
        },
        token: { margin: 25, padding: 0 },
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
            marginLeft: "-6px",
          }}
        >
          <div></div>
          <Menu
            mode="inline"
            items={items}
            defaultOpenKeys={["Topic as a Service (Lettera)", "RESOURCES"]}
            // defaultSelectedKeys={"Topics"}
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
