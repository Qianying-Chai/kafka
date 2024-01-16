import React from "react";
import ComponentsTable from "../../../Components/ComponentsTable";
import ComponentsInput from "../../../Components/ComponentsInput";
import ComponentsPagination from "../../../Components/ComponentsPagination";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";

import { Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
          <Button
            type="primary"
            shape="round"
            size="medium"
            className="content-banner-button"
          >
            <Link
              to={`/kafka/${categoryConstants.TOPICS.toLowerCase()}/create`}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_TOPIC.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
      <ComponentsContent></ComponentsContent>
    </>
  );
};
export default CreateTopic;
