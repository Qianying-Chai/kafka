import React, { useMemo, useRef, useState } from "react";
import SelectTitle from "../../../../Components/SelectTitle";
import { Col, Row, Select, Spin } from "antd";
import { UserOutlined, InfoCircleFilled } from "@ant-design/icons";

import debounce from "lodash/debounce";
import { Typography, Input } from "antd";

const { Title } = Typography;
const DetailsForm = () => {
  function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
          setOptions(newOptions);
          setFetching(false);
        });
      };
      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    );
  }
  async function fetchUserList(username) {
    console.log("fetching user", username);
    return fetch("https://randomuser.me/api/?results=5")
      .then((response) => response.json())
      .then((body) =>
        body.results.map((user) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }))
      );
  }
  const [value, setValue] = useState([]);

  return (
    <div>
      <Title level={4} style={{ fontWeight: "normal", color: "#000000D9" }}>
        Details
      </Title>
      <Row gutter={24}>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>Name
          </div>
          <Input placeholder="Input Name" className="create-flow-input" />
        </Col>
        <Col span={8}>
          <SelectTitle title={"APM ID"} />
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"TR Product"} />
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            placeholder="3555 | GTP - Messaging Platform - Lettera"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
          {/* <Input placeholder="default size" /> */}
        </Col>
      </Row>
      <Row gutter={24} style={{ paddingTop: "20px" }}>
        <Col span={8}>
          <SelectTitle title={"AD Group"} />
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Col>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span>Team Slack</span>
            <InfoCircleFilled style={{ marginLeft: "5px" }} />
          </div>
          <Input className="create-flow-input" />
        </Col>
        <Col span={8}>
          <SelectTitle title={"DL Notification Email"} />
          <Input className="create-flow-input" />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <SelectTitle title={"ServiceNow Group"} />
          <Input className="create-flow-input" />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Data Classification"} />
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Application Tier"} />
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            placeholder="Tier 3"
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>Market
          </div>
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Data Compliance for the Cluster"} />
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
export default DetailsForm;
