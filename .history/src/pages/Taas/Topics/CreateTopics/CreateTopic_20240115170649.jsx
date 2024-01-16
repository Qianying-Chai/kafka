import React, { useMemo, useRef, useState } from "react";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import DetailsForm from "./Form/DetailsForm";
import { Typography } from "antd";

const { Title } = Typography;

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
        <Title level={4} style={{ fontWeight: "normal" }}>
          Details
        </Title>

        <DetailsForm />
      </ComponentsContent>
    </>
  );
};
export default CreateTopic;
