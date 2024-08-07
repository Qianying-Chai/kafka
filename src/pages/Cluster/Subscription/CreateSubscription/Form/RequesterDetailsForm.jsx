import React, { useMemo, useState, useRef } from "react";
import SelectTitle from "../../../../Components/SelectTitle";
import debounce from "lodash/debounce";
import { Col, Row, Select, Spin, Typography, Collapse, Input } from "antd";
const { Title } = Typography;

const RequesterDetailsForm = () => {
  const adGroupOptions = [
    {
      label: "DXIO-ADMN",
      value: "DXIO-ADMN",
    },
    {
      label: "mps_admin",
      value: "mps_admin",
    },
    {
      label: "Internet_Download_Users_HO",
      value: "Internet_Download_Users_HO",
    },
    {
      label: "tech-assistant-beta-testers",
      value: "tech-assistant-beta-testers",
    },
    {
      label: "PWV_Users",
      value: "PWV_Users",
    },
    {
      label: "AIVendors",
      value: "AIVendors",
    },
    {
      label: "hub-dev-community",
      value: "hub-dev-community",
    },
  ];

  const applicationTierOptions = [
    {
      label: "Tier 0",
      value: "Tier 0",
      desc: "Tier 0",
    },
    {
      label: "Tier 1",
      value: "Tier 1",
      desc: "Tier 1",
    },
    {
      label: "Tier 2",
      value: "Tier 2",
      desc: "Tier 2",
    },
    {
      label: "Tier 3",
      value: "Tier 3",
      desc: "Tier 3",
    },
  ];
  const items = [
    {
      key: "Requester Details",
      label: (
        <Title
          level={4}
          style={{
            color: "#000000D9",
          }}
        >
          Requester Details
        </Title>
      ),
      children: [
        <div key="requester-details-children">
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"AD Group:"} />
              <Select
                showSearch
                className="create-flow-select"
                options={adGroupOptions}
                placeholder="Select AD Group"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Application Tire:"} />
              <Select
                showSearch
                className="create-flow-select"
                placeholder="Select Application Tire"
                options={applicationTierOptions}
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Data Compliance for the Cluster:"} />
              <Input defaultValue="Sensitive" />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"Team Slack:"} />
              <Input
                placeholder="Input Team Slack"
                className="create-flow-input"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Service Now Group:"} />
              <Input
                placeholder="Input Service Now Group"
                className="create-flow-input"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"XMatters:"} />
              <Input
                placeholder="Input XMatters"
                className="create-flow-input"
              />
            </Col>
          </Row>
        </div>,
      ],
    },
  ];

  return (
    <Collapse
      defaultActiveKey={["Requester Details"]}
      ghost
      items={items}
    ></Collapse>
  );
};

export default RequesterDetailsForm;
