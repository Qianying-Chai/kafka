import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import ComponentsSpin from "../../../Components/ComponentSpin";
import SubscriptionsProxyContentTable from "./SubscriptionsProxyContentTable";
import { setTaasSubProxyData } from "../../../../redux/reducer";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";

const SubscriptionsProxyContent = () => {
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

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const handleGetSubProxyData = () => {
    const MPS_SUBSCRIPTION_URL = "http://localhost:1337/api/mps-subscriptions";
    fetch(MPS_SUBSCRIPTION_URL)
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
        dispatch(setTaasSubProxyData(covData));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetSubProxyData();
  }, []);

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
        {isLoading ? <ComponentsSpin /> : <SubscriptionsProxyContentTable />}
      </ComponentsContent>
    </>
  );
};
export default SubscriptionsProxyContent;
