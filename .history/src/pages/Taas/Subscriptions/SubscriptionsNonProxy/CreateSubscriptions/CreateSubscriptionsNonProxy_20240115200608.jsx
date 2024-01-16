import React from "react";
import ComponentsBreadcrumb from "../../../../Components/ComponentsBreadcrumb";
import ComponentsContent from "../../../../Components/ComponentsContent";
import ComponentsDivider from "../../../../Components/ComponentsDivider";
import ComponentsTitle from "../../../../Components/ComponentsTitle";
import categoryConstants from "../../../../common/categoryConstants";
import SourceTopicFormNonProxy from "./Form/SourceTopicFormNonProxy";
import TargetApplicationSelectionFormNonProxy from "./Form/TargetApplicationSelectionFormNonProxy";
import "../../Style/CreateSubscriptionNonproxy.css";
import { Typography, Button } from "antd";
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
        <SourceTopicFormNonProxy />
        <Title level={4} style={{ fontWeight: "normal" }}>
          Target Application Selection
        </Title>
        <TargetApplicationSelectionFormNonProxy />
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
export default CreateSubscriptionsNonProxy;
