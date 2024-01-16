import React from "react";
import ComponentsCard from "../../../Components/ComponentsCard";
import categoryConstants from "../../../common/categoryConstants";
import SubScriptionNameForm from "./Forms/SubscriptionNameForm";
import SourceTopicSelectionFormProxy from "./Forms/SourceTopicSelectionFormProxy";
const CreateSubscriptionsProxy = () => {
  return (
    <ComponentsCard
      title={categoryConstants.CREATE_SUBSCRIPTIONS.replace("_", " ")}
      breadcrumbitems={[
        {
          title: "Home",
        },
        {
          title: "Kafka",
        },
        {
          href: `/kafka/${categoryConstants.SUBSCRIPTION.toLowerCase()}_active_tab=proxy`,
          title: categoryConstants.SUBSCRIPTIONS,
        },
        {
          title: categoryConstants.CREATE_SUBSCRIPTION.replace("_", " "),
        },
      ]}
    >
      {/* <SubScriptionNameForm />
      <SourceTopicSelectionFormProxy /> */}
    </ComponentsCard>
  );
};
export default CreateSubscriptionsProxy;
