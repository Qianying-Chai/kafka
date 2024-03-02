import React from "react";
import ComponentsContent from "../../../Components/ComponentsContent";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import DeliverySubscriptionNameForm from "./Form/DeliverySubscriptionNameForm";
import SourceTopicSelectionForm from "./Form/SourceTopicSelectionForm";
import TargetApplicationForm from "./Form/TargetApplicationSelection";
import RequesterDetailsForm from "./Form/RequesterDetailsForm";
import ConsumerDetailsForm from "../../../Taas/Subscriptions/SubscriptionsProxy/CreateSubscriptions/Form/ComsumerDetailsForm";
import { Button, ConfigProvider, Divider, Form } from "antd";
const CreateSubscription = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorBgTextHover: "F5F5F5",
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
        <Form>
          <Form.Item>
            <DeliverySubscriptionNameForm />
            <SourceTopicSelectionForm />
            <TargetApplicationForm />
            <RequesterDetailsForm />
            <ConsumerDetailsForm />
          </Form.Item>
          <Divider />
          <Form.Item>
            <div className="create-buttons-wrapper">
              <Button shape="round" className="cancel-button">
                CANCEL
              </Button>
              <Button shape="round" disabled className="disable-submit-button">
                SUBMIT
              </Button>
            </div>
          </Form.Item>
        </Form>
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default CreateSubscription;
