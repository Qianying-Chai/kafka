import React from "react";
import ComponentsBreadcrumb from "../../../../Components/ComponentsBreadcrumb";
import ComponentsContent from "../../../../Components/ComponentsContent";
import ComponentsTitle from "../../../../Components/ComponentsTitle";
import categoryConstants from "../../../../common/categoryConstants";
import SourceTopicForm from "./Form/SourceTopicForm";
import TargetApplicationSelectionForm from "./Form/TargetApplicationSelectionForm";
import "../../Style/CreateSubscriptionNonproxy.css";
import { Button, ConfigProvider, Divider } from "antd";

const CreateSubscriptionsNonProxy = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorBgTextHover: "F5F5F5",
          colorSplit: "rgba(0, 0, 0, 0.85)",
          marginLG: 16,
          colorPrimaryHover: "#0958d9",
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
        <TargetApplicationSelectionForm />
        <Divider />
        <div className="create-buttons-wrapper">
          <Button shape="round" className="cancel-button">
            CANCEL
          </Button>
          <Button shape="round" disabled className="disable-submit-button">
            SUBMIT
          </Button>
        </div>
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default CreateSubscriptionsNonProxy;
