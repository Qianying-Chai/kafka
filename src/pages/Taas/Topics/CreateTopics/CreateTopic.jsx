import React from "react";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import DetailsForm from "./Form/DetailsForm";
import ComponentsDivider from "../../../Components/ComponentsDivider";
import "../../../Taas/Style/CreateFlow.css";
import { Button, ConfigProvider } from "antd";

const CreateTopic = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorBgTextHover: "F5F5F5",
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
        <div className="create-buttons-wrapper">
          <Button shape="round" className="cancel-button">
            CANCEL
          </Button>
          <Button shape="round" disabled className="submit-button">
            SUBMIT
          </Button>
        </div>
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default CreateTopic;