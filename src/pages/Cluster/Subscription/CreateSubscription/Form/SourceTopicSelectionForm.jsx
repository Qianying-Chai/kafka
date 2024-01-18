import React from "react";
import SelectTitle from "../../../../Components/SelectTitle";
import { Col, Row, Select, Typography } from "antd";
const { Title } = Typography;

const SourceTopicSelectionForm = () => {
  return (
    <>
      <Title
        level={4}
        style={{
          paddingTop: "20px",
          color: "#000000D9",
        }}
      >
        Source Topic Selection
      </Title>
      <Row gutter={24}>
        <Col span={8}>
          <SelectTitle title={"Cluster:"} />
          <Select
            showSearch
            className="create-flow-select"
            placeholder="Select Cluster"
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Topic:"} />
          <Select
            showSearch
            className="create-flow-select"
            disabled
            placeholder="Select Topic"
          />
        </Col>
      </Row>
    </>
  );
};

export default SourceTopicSelectionForm;
