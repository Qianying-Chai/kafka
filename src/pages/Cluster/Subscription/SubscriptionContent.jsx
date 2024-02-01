import React from "react";
import "../Style/Subscription.css";
import SubscriptionContentTable from "./SubscriptionContentTable";
import categoryConstants from "../../common/categoryConstants";
import ComponentsTitle from "../../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../../Components/ComponentsBreadcrumb";
import ComponentsContent from "../../Components/ComponentsContent";

import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";

const SubscriptionContent = () => {
  const breadcrumb = [
    {
      title: "Home",
    },
    {
      title: "Kafka",
    },
    {
      title: categoryConstants.SUBSCRIPTION,
    },
  ];

  return (
    <>
      <div>
        <ComponentsBreadcrumb items={breadcrumb} />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.SUBSCRIPTION} />
          <Button
            shape="round"
            className="content-banner-button"
            type="primary"
          >
            <Link to={`/kafka/mps-clusters-subscriptions/create`}>
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_SUBSCRIPTION.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
      <ComponentsContent>
        <SubscriptionContentTable />
      </ComponentsContent>
    </>
  );
};
export default SubscriptionContent;
