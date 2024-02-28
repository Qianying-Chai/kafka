import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import ComponentsSpin from "../../../Components/ComponentSpin";
import SubscriptionsProxyContentTable from "./SubscriptionsProxyContentTable";

import {
  setTaasSubProxyPaginator,
  setTaasSubProxyData,
} from "../../../../redux/action";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";

const SubscriptionsProxyContent = () => {
  const [isLoading, setIsLoading] = useState(true);

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

  const tabsItems = [
    {
      key: "NonProxy",
      label: (
        <Link
          to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
        >
          <span style={{ color: "#00000099" }}>NonProxy</span>
        </Link>
      ),
    },
    {
      key: "Proxy",
      label: (
        <Link
          to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy`}
        >
          <span style={{ color: "#41F41" }}>Proxy</span>
        </Link>
      ),
    },
  ];

  const dispatch = useDispatch();
  const taasSubProxyPaginator = useSelector(
    (state) => state.taasSubProxyPaginator
  );
  const { page, pageSize } = taasSubProxyPaginator;

  const { sorterOrder, sorterKey } = useSelector(
    (state) => state.taasSubProxySorter
  );
  const { filterKey, filterValue } = useSelector(
    (state) => state.taasSubProxyFilter
  );

  const abortController = new AbortController();
  const signal = abortController.signal;

  const handleGetSubProxyData = () => {
    const MPS_SUBSCRIPTION_URL = `http://localhost:1337/api/mps-subscriptions?${
      filterValue || sorterOrder
        ? ""
        : `pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    }${filterValue && `filters[${filterKey}][$contains]=${filterValue}`}${
      sorterOrder && `&sort=${sorterKey}:${sorterOrder}`
    }`;
    fetch(MPS_SUBSCRIPTION_URL, { signal })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        let covData = [];
        res.data.forEach((i) => {
          covData.push({
            key: i.id,
            subscriptionname: i.attributes.mpsAppName,
            id: i.id,
            apmid: i.attributes.apmId,
            adgroup: i.attributes.adGroup,
            endpointurl: i.attributes.endpoint,
            topic: i.attributes.topicName,
            slackchannel: i.attributes.channelName,
          });
        });

        dispatch(
          setTaasSubProxyPaginator({
            ...taasSubProxyPaginator,
            total: res.meta.pagination.total,
          })
        );

        dispatch(setTaasSubProxyData(covData));
      })
      .catch((error) => console.log(error));
  };

  const abortFetching = () => {
    abortController.abort();
  };

  useEffect(() => {
    handleGetSubProxyData();
  }, [page, pageSize, filterValue, sorterOrder]);

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
              to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy/create`}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_SUBSCRIPTION.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
      <ComponentsContent>
        <Tabs
          defaultActiveKey="Proxy"
          style={{ fontWeight: "bold" }}
          items={tabsItems}
        />
        {isLoading ? (
          <ComponentsSpin />
        ) : (
          <SubscriptionsProxyContentTable abortFetching={abortFetching} />
        )}
      </ComponentsContent>
    </>
  );
};
export default SubscriptionsProxyContent;
