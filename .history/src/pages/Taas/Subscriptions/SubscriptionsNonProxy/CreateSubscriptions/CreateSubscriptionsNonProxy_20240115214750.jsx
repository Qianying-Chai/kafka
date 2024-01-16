import React from "react";
import ComponentsBreadcrumb from "../../../../Components/ComponentsBreadcrumb";
import ComponentsContent from "../../../../Components/ComponentsContent";
import ComponentsDivider from "../../../../Components/ComponentsDivider";
import ComponentsTitle from "../../../../Components/ComponentsTitle";
import categoryConstants from "../../../../common/categoryConstants";
import SourceTopicForm from "./Form/SourceTopicForm";
import TargetApplicationSelectionForm from "./Form/TargetApplicationSelectionForm";
import "../../Style/CreateSubscriptionNonproxy.css";
import { Typography, Button, ConfigProvider } from "antd";
const { Title } = Typography;

const CreateSubscriptionsNonProxy = () => {
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
        <SourceTopicForm />
        <Title level={4} style={{ fontWeight: "normal" }}>
          Target Application Selection
        </Title>
        <TargetApplicationSelectionForm />
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
export default CreateSubscriptionsNonProxy;
