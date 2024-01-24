import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsInput from "../../../Components/ComponentsInput";
import ComponentsTable from "../../../Components/ComponentsTable";
import ComponentsPagination from "../../../Components/ComponentsPagination";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import { setTaasSubNonProxyData } from "../../../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, ConfigProvider, Space, Tag } from "antd";
import { Alert, Flex, Spin } from "antd";
import {
  TableOutlined,
  CheckCircleFilled,
  MoreOutlined,
} from "@ant-design/icons";
const SubscriptionsNonProxy = () => {
  const breadcrumb = [
    {
      title: "Home",
    },
    {
      title: "Kafka",
    },
    {
      title: categoryConstants.SUBSCRIPTIONS,
    },
  ];

  const items = [
    {
      key: "NonProxy",
      label: (
        <Link
          to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
        >
          NonProxy
        </Link>
      ),
    },
    {
      key: "Proxy",
      label: (
        <Link
          to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy`}
        >
          Proxy
        </Link>
      ),
    },
  ];

  const columns = [
    {
      title: "Id",
      key: "Id",
      width: "9%",
      render: (_, record) => <a>{record.id}</a>,
    },
    {
      title: "Topic Name",
      key: "Topic Name",
      width: "30%",
      render: (_, record) => <a>{record.topicName}</a>,
    },
    {
      title: "APM ID",
      key: "APM ID",
      width: "9%",
      render: (_, record) => <a>{record.apmId}</a>,
    },
    {
      title: "Application on Name",
      key: "Application on Name",
      width: "9%",
      render: (_, record) => <a>{record.applicationName}</a>,
    },
    {
      title: "AD Group",
      key: "AD Group",
      width: "9%",
      ellipsis: true,
      render: (_, record) => <a>{record.adGroup}</a>,
    },
    {
      title: "DL Notification on Email",
      key: "DL Notification on Email",
      width: "9%",
      render: (_, record) => <a>{record.dlNotificationOnEmail}</a>,
    },
    {
      title: "Permission",
      key: "Permission",
      width: "9%",
      render: (_, record) => <a>{record.permission}</a>,
    },
    {
      title: "ACL",
      key: "ACL",
      width: "5%",
      render: (_, record) => (
        <a>
          <TableOutlined />
        </a>
      ),
    },
    {
      title: "Auto-Approved",
      key: "Auto-Approved",
      width: "9%",
    },
    {
      title: "Status",
      key: "Status",
      width: "14%",
      render: (_, record) => (
        <>
          <CheckCircleFilled style={{ marginRight: "3px" }} />
          <a>
            {record.status.charAt(0) + record.status.slice(1).toLowerCase()}
          </a>
        </>
      ),
    },
    {
      title: "",
      key: "",
      width: "9%",
      render: (_, record) => (
        <a>
          <MoreOutlined />
        </a>
      ),
    },
  ];

  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // const dispatch = useDispatch();

  useEffect(() => {
    const url = "http://localhost:1337/api/subscriptions";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        let covData = [];
        res.data.forEach((item) => {
          covData.push({
            key: item.id,
            id: item.id,
            topicName: item.attributes.topicName,
            apmId: item.attributes.apmId,
            applicationName: item.attributes.applicationName,
            adGroup: item.attributes.activeDirectoryGroup,
            dlNotificationOnEmail: item.attributes.distributionEmail,
            permission: item.attributes.permission,
            autoApproved: "",
            status: item.attributes.status,
          });
        });
        setData(covData);

        // dispatch(setTaasSubNonProxyData(covData));
      })
      .catch((error) => console.log(222, error));
  }, []);

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
          colorLink: "#000000D9",
          borderRadius: 0,
        },
      }}
    >
      <div>
        <ComponentsBreadcrumb items={breadcrumb} />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.SUBSCRIPTIONS} />
          <Button
            shape="round"
            size="medium"
            className="content-banner-button"
            type="primary"
          >
            <Link
              to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy/create-non-proxy`}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_SUBSCRIPTION.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>

      <ComponentsContent>
        <Tabs
          defaultActiveKey="NonProxy"
          style={{ fontWeight: "bold" }}
          items={items}
        />
        {isloading ? (
          <Spin size="large">
            <div className="content" />
          </Spin>
        ) : (
          <>
            <ComponentsInput
              placeholder={
                "Search by Id, Topic Name, APM ID, Application Name, AD Group, DL Notfication Email, Permission, Auto-Approved, and Status"
              }
            />
            <ComponentsTable columns={columns} data={data} />
          </>
        )}
        <ComponentsPagination defaultPageSize={10} total={data.length} />
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default SubscriptionsNonProxy;
