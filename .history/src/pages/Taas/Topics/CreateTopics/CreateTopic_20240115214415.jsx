import React from "react";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import DetailsForm from "./Form/DetailsForm";
import ComponentsDivider from "../../../Components/ComponentsDivider";
import "../Style/CreateTopic.css";
import { Button } from "antd";

const CreateTopic = () => {
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
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.CREATE_TOPIC} />
        </div>
      </div>
      <ComponentsContent>
        <DetailsForm />
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
export default CreateTopic;
