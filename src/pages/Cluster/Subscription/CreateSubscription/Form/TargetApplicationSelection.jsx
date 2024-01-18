import React from "react";
import SelectTitle from "../../../../Components/SelectTitle";
import { Col, Row, Select, Typography, Input } from "antd";
const { Title } = Typography;

const TargetApplicationForm = () => {
  return (
    <>
      <Title
        level={4}
        style={{
          paddingTop: "20px",
          color: "#000000D9",
        }}
      >
        Target Application Form
      </Title>
      <Row gutter={24}>
        <Col span={8}>
          <SelectTitle title={"APM ID:"} />
          <Select
            showSearch
            className="create-flow-select"
            placeholder="Input to Search APM ID"
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Environment:"} />
          <Select
            showSearch
            className="create-flow-select"
            disabled
            placeholder="Select Environment"
          />
        </Col>
      </Row>
    </>
  );
};

export default TargetApplicationForm;
