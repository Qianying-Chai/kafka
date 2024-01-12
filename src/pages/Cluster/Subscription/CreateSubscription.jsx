import React from "react";
import Card from "../../Components/ComponentsCard";
import categoryConstants from "../../common/categoryConstants";

const CreateSubscription = () => {
  return (
    <Card
      title={categoryConstants.CREATE_TOPICS.replace("_", " ")}
      breadcrumbitems={[
        {
          title: "Home",
        },
        {
          title: "Kafka",
        },
        {
          href: `/kafka/${categoryConstants.SUBSCRIPTION.toLowerCase()}`,
          title: categoryConstants.SUBSCRIPTION,
        },
        {
          title: categoryConstants.CREATE_SUBSCRIPTION.replace("_", " "),
        },
      ]}
    >
      CreateSubscription
    </Card>
  );
};
export default CreateSubscription;
