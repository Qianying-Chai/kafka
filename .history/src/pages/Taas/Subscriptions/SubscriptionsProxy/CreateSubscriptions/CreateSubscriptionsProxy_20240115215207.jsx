import React from "react";
import ComponentsContent from "../../../../Components/ComponentsContent";
import categoryConstants from "../../../../common/categoryConstants";
import ComponentsBreadcrumb from "../../../../Components/ComponentsBreadcrumb";
import ComponentsDivider from "../../../../Components/ComponentsDivider";
import ComponentsTitle from "../../../../Components/ComponentsTitle";
import SubscriptionName from "./Form/SubscriptionName";
import SourceTopicSelection from "./Form/SourceTopicSelection";
import TargetApplicationSelection from "./Form/TargetApplicationSelection";
import { Typography, Button, ConfigProvider, Divider } from "antd";
const { Title } = Typography;
const CreateSubscriptionsProxy = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
        },
      }}
    >
      <div>
        <ComponentsBreadcrumb
          items={[
            {
              title: "Home",
            },
            {
              title: "Kafka",
            },
            {
              title: categoryConstants.SUBSCRIPTIONS,
              href: `/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`,
            },
            {
              title: categoryConstants.CREATE_SUBSCRIPTION,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.CREATE_SUBSCRIPTION} />
        </div>
      </div>
      <ComponentsContent>
        <SubscriptionName />

        <SourceTopicSelection />
        <Title level={4} style={{ fontWeight: "normal", paddingTop: "20px" }}>
          Target Application Selection
        </Title>
        <TargetApplicationSelection />
        <Divider />
        <ComponentsDivider />
        <div className="buttons-wrapper">
          <Button shape="round" size={"medium"} className="cancel-button">
            CANCEL
          </Button>
          <Button
            shape="round"
            size={"medium"}
            disabled
            className="submit-button"
          >
            SUBMIT
          </Button>
        </div>
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default CreateSubscriptionsProxy;
