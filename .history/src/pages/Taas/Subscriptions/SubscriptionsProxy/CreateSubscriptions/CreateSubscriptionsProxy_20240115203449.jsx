import React from "react";
import ComponentsContent from "../../../../Components/ComponentsContent";
import categoryConstants from "../../../../common/categoryConstants";
// import SubScriptionNameForm from "./Forms/SubscriptionNameForm";
// import SourceTopicSelectionFormProxy from "./Forms/SourceTopicSelectionFormProxy";
const CreateSubscriptionsProxy = () => {
  return (
    <>
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
        <Title level={4} style={{ fontWeight: "normal" }}>
          Source Topic Selection
        </Title>

        <div className="bordered-content">
          Define search criteria for the topic selection as specific as
          possible. There will be displayed only first 1000 topics relevant for
          the APM ID and/or Environment and/or Topic Name Filter.
        </div>
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
    </>
  );
};
export default CreateSubscriptionsProxy;
