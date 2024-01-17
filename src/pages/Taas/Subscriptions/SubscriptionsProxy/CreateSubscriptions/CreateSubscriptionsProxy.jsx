import React from "react";
import ComponentsContent from "../../../../Components/ComponentsContent";
import categoryConstants from "../../../../common/categoryConstants";
import ComponentsBreadcrumb from "../../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../../Components/ComponentsTitle";
import DeliverySubscriptionForm from "./Form/DeliverySubscriptionForm";
import SourceTopicSelectionForm from "./Form/SourceTopicSelectionForm";
import TargetApplicationSelectionForm from "./Form/TargetApplicationSelectionForm";
import ConsumerDetailsForm from "./Form/ComsumerDetailsForm";
import RequesterDetailsForm from "./Form/RequesterDetailsForm";
import { Button, ConfigProvider, Divider } from "antd";
const CreateSubscriptionsProxy = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorBgTextHover: "F5F5F5",
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
        <DeliverySubscriptionForm />
        <SourceTopicSelectionForm />
        <TargetApplicationSelectionForm />
        <Divider />
        <RequesterDetailsForm />
        <ConsumerDetailsForm />
        <Divider />
        <div className="create-buttons-wrapper">
          <Button shape="round" className="cancel-button">
            CANCEL
          </Button>
          <Button shape="round" disabled className="submit-button">
            SUBMIT
          </Button>
        </div>
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default CreateSubscriptionsProxy;
