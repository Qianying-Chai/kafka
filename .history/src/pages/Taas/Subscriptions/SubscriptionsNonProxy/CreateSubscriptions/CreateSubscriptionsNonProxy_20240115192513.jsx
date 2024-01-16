import React from "react";
import ComponentsBreadcrumb from "../../../../Components/ComponentsBreadcrumb";
import ComponentsContent from "../../../../Components/ComponentsContent";
import ComponentsDivider from "../../../../Components/ComponentsDivider";
import categoryConstants from "../../../../common/categoryConstants";
import { Typography } from "antd";
const { Title } = Typography;

const CreateSubscriptionsNonProxy = () => {
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
              title: categoryConstants.TOPICS,
              href: `/kafka/${categoryConstants.TOPICS.toLowerCase()}`,
            },
            {
              title: categoryConstants.CREATE_TOPIC,
            },
          ]}
        />
        <Title level={4} style={{ fontWeight: "normal" }}>
          Source Topic Selection
        </Title>
        <div className="bordered-content">
          Define search criteria for the topic selection as specific as
          possible. There will be displayed only first 1000 topics relevant for
          the APM ID and/or Environment and/or Topic Name Filter.
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
      </div>
    </>
  );
};
export default CreateSubscriptionsNonProxy;
