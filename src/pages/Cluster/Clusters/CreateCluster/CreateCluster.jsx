import React from "react";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import ComponentsDivider from "../../../Components/ComponentsDivider";
import DetailsForm from "./Form/DetailsForm";
import EnvironmentsForm from "./Form/EnvironmentsForm";
import "../../../Taas/Style/CreateFlow.css";
import { Button, ConfigProvider } from "antd";

const CreateCluster = () => {
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
        <DetailsForm />
        <EnvironmentsForm />
        <ComponentsDivider />
        <div className="create-buttons-wrapper">
          <Button shape="round" className="cancel-button">
            CANCEL
          </Button>
          <Button
            shape="round"
            className="submit-button primary-submit-button "
          >
            SUBMIT
          </Button>
        </div>
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default CreateCluster;
