import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SubscriptionsNonProxyContentTable from "./SubscriptionsNonProxyContentTable";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsSpin from "../../../Components/ComponentSpin";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";

import {
  setTaasSubNonProxyPaginator,
  setTaasSubNonProxyData,
} from "../../../../redux/action";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Tabs, Input } from "antd";

const SubscriptionsNonProxyContent = () => {
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

  const [isloading, setIsLoading] = useState(true);
  const [tableFilterInputValue, setTableFilterInputValue] = useState("");

  const dispatch = useDispatch();
  const taasSubNonProxyPaginator = useSelector(
    (state) => state.taasSubNonProxyPaginator
  );

  const { pageSize, page } = taasSubNonProxyPaginator;

  const tabItems = [
    {
      key: "NonProxy",
      label: (
        <Link
          to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
        >
          <span style={{ color: "#41F41" }}>NonProxy</span>
        </Link>
      ),
    },
    {
      key: "Proxy",
      label: (
        <Link
          to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy`}
        >
          <span style={{ color: "#00000099" }}>Proxy</span>
        </Link>
      ),
    },
  ];

  const abortController = new AbortController();
  const signal = abortController.signal;

  const handleGetData = () => {
    const qs = require("qs");
    const filter = qs.stringify(
      {
        filters: {
          $or: [
            {
              id: {
                $contains: tableFilterInputValue,
              },
            },
            {
              topicName: {
                $contains: tableFilterInputValue,
              },
            },
            {
              apmId: {
                $contains: tableFilterInputValue,
              },
            },
            {
              applicationName: {
                $contains: tableFilterInputValue,
              },
            },
            {
              activeDirectoryGroup: {
                $contains: tableFilterInputValue,
              },
            },
            {
              distributionEmail: {
                $contains: tableFilterInputValue,
              },
            },
            {
              permission: {
                $contains: tableFilterInputValue,
              },
            },
            {
              status: {
                $contains: tableFilterInputValue,
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = tableFilterInputValue
      ? `http://localhost:1337/api/subscriptions?${filter}`
      : `http://localhost:1337/api/subscriptions?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    fetch(url, { signal })
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
            aclConfig: item.attributes.aclConfig,
            subscriptionsId: item.attributes.subscriptionsId,
          });
        });
        dispatch(setTaasSubNonProxyData(covData));

        dispatch(
          setTaasSubNonProxyPaginator({
            ...taasSubNonProxyPaginator,
            total: res.meta.pagination.total,
          })
        );
      })
      .catch((error) => console.log(222, error));
  };

  const abortFetching = () => {
    abortController.abort();
  };

  useEffect(() => {
    handleGetData();
  }, [pageSize, page, tableFilterInputValue]);

  const handleNonProxyInputChange = (value) => {
    abortFetching();
    setTableFilterInputValue(value);
  };

  return (
    <>
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
          items={tabItems}
        />
        {isloading ? (
          <ComponentsSpin />
        ) : (
          <>
            <Input
              placeholder={
                "Search by Id, Topic Name, APM ID, Application Name, AD Group, DL Notfication Email, Permission, Auto-Approved, and Status"
              }
              size="large"
              prefix={<SearchOutlined />}
              style={{ marginBottom: "5px" }}
              value={tableFilterInputValue}
              onChange={(e) => handleNonProxyInputChange(e.target.value)}
            />
            <SubscriptionsNonProxyContentTable
              abortFetching={abortFetching}
              handleGetData={handleGetData}
            />
          </>
        )}
      </ComponentsContent>
    </>
  );
};
export default SubscriptionsNonProxyContent;
