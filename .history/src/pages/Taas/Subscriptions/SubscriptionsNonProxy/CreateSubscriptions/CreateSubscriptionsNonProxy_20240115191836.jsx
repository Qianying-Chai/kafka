import React from "react";
import { Link } from "react-router-dom";
import ComponentsContent from "../../../../Components/ComponentsContent";
import ComponentsDivider from "../../../../Components/ComponentsDivider";
import categoryConstants from "../../../../common/categoryConstants";
import { Typography } from "antd";
const { Title } = Typography;

const CreateSubscriptionsNonProxy = () => {
  return (
    <>
      title={categoryConstants.CREATE_SUBSCRIPTIONS}
      breadcrumbitems=
      {[
        {
          title: "Home",
        },
        {
          title: "Kafka",
        },
        {
          href: `/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`,
          title: categoryConstants.SUBSCRIPTIONS,
        },
        {
          title: categoryConstants.CREATE_SUBSCRIPTIONS,
        },
      ]}
      <Title level={4} style={{ fontWeight: "normal" }}>
        Source Topic Selection
      </Title>
      <div className="bordered-content">
        Define search criteria for the topic selection as specific as possible.
        There will be displayed only first 1000 topics relevant for the APM ID
        and/or Environment and/or Topic Name Filter.
      </div>
      {/* <SourceTopicFormNonProxy /> */}
      <Title level={4} style={{ fontWeight: "normal" }}>
        Target Application Selection
      </Title>
      {/* <TargetApplicationSelectionForm /> */}
      <ComponentsDivider />
      <div className="buttons-wrapper">
        {/* <CancelButton />
        <SubmitButton disabled /> */}
      </div>
    </>
  );
};
export default CreateSubscriptionsNonProxy;
