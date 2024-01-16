import React, { useMemo, useRef, useState } from "react";
import ComponentsTable from "../../../Components/ComponentsTable";
import ComponentsInput from "../../../Components/ComponentsInput";
import ComponentsPagination from "../../../Components/ComponentsPagination";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import SelectTitle from "../../../Components/SelectTitle";
import { Space, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { Title } = Typography;

import { Select, Spin } from "antd";
import debounce from "lodash/debounce";

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
        <SelectTitle title={"APM ID"} />
        <Row style={{ display: "flex", flexFlow: "nowrap" }}>
          <Col
            span={12}
            style={{
              marginRight: "12px",
            }}
          >
            <SelectLabel label={"APM ID"} />
            <DebounceSelect
              mode="multiple"
              value={value}
              fetchOptions={fetchUserList}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              className="select"
            />
          </Col>
        </Row>
      </ComponentsContent>
    </>
  );
};
export default CreateTopic;
