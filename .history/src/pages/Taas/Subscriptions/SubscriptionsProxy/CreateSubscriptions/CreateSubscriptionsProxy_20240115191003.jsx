import React from "react";
import ComponentsCard from "../../../Components/ComponentsCard";
import categoryConstants from "../../../common/categoryConstants";
import "./Style/CreateSubscriptionNonProxy.css";
import SourceTopicFormNonProxy from "./Forms/SourceTopicFormNonProxy";
import TargetApplicationSelectionForm from "./Forms/TargetApplicationSelectionForm";
import { Typography } from "antd";
import CancelButton from "../../../Components/CancelButton";
import SubmitButton from "../../../Components/SubmitButton";
import ComponentsDivider from "../../../Components/ComponentsDivider";
const { Title } = Typography;

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
          href: `/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`,
          title: categoryConstants.SUBSCRIPTIONS,
        },
        {
          title: categoryConstants.CREATE_SUBSCRIPTIONS.replace("_", " "),
        },
      ]}
    >
      <Title level={4} style={{ fontWeight: "normal" }}>
        Source Topic Selection
      </Title>
      <div className="bordered-content">
        Define search criteria for the topic selection as specific as possible.
        There will be displayed only first 1000 topics relevant for the APM ID
        and/or Environment and/or Topic Name Filter.
      </div>
      <SourceTopicFormNonProxy />
      <Title level={4} style={{ fontWeight: "normal" }}>
        Target Application Selection
      </Title>
      <TargetApplicationSelectionForm />
      <ComponentsDivider />
      <div className="buttons-wrapper">
        <CancelButton />
        <SubmitButton disabled />
      </div>
    </ComponentsCard>
  );
};
export default CreateSubscriptionsProxy;
