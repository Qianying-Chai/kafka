import React from "react";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import DetailsForm from "./Form/DetailsForm";
import EnvironmentsForm from "./Form/EnvironmentsForm";
import "../../../Taas/Style/CreateFlow.css";
import { Button, ConfigProvider, Divider, Form } from "antd";

const CreateCluster = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
          colorBgTextHover: "F5F5F5",
          colorSplit: "rgba(0, 0, 0, 0.85)",
          marginLG: 16,
          colorPrimaryHover: "#0958d9",
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
              title: categoryConstants.CLUSTERS,
              href: `/kafka/${categoryConstants.CLUSTERS.toLowerCase()}`,
            },
            {
              title: categoryConstants.CREATE_CLUSTER,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.CREATE_CLUSTER} />
        </div>
      </div>
      <ComponentsContent>
        <Form>
          <DetailsForm />
          <EnvironmentsForm />
          <Divider />
          <div className="create-buttons-wrapper">
            <Button shape="round" className="cancel-button">
              CANCEL
            </Button>
            <Button
              type="primary"
              shape="round"
              className="submit-button primary-submit-button "
            >
              SUBMIT
            </Button>
          </div>
        </Form>
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default CreateCluster;
