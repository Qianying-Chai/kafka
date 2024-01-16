import React from "react";
import ComponentsContent from "../../../../Components/ComponentsContent";
import categoryConstants from "../../../../common/categoryConstants";
// import SubScriptionNameForm from "./Forms/SubscriptionNameForm";
// import SourceTopicSelectionFormProxy from "./Forms/SourceTopicSelectionFormProxy";
const CreateSubscriptionsProxy = () => {
  return (
    <ComponentsContent
      title={categoryConstants.CREATE_SUBSCRIPTION}
      breadcrumbitems={[
        {
          title: "Home",
        },
        {
          title: "Kafka",
        },
        {
          href: `/kafka/${categoryConstants.SUBSCRIPTION.toLowerCase()}_active_tab=proxy`,
          title: categoryConstants.SUBSCRIPTION,
        },
        {
          title: categoryConstants.CREATE_SUBSCRIPTION,
        },
      ]}
    >
      {/* <SubScriptionNameForm />
      <SourceTopicSelectionFormProxy /> */}
    </ComponentsContent>
  );
};
export default CreateSubscriptionsProxy;
