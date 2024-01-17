import React, { useMemo, useRef, useState } from "react";
import SelectTitle from "../../../../Components/SelectTitle";
import { Col, Row, Select, Spin } from "antd";
import { UserOutlined, InfoCircleFilled } from "@ant-design/icons";

import debounce from "lodash/debounce";
import { Typography, Input } from "antd";

const { Title } = Typography;
const EnvironmentsForm = () => {
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
        Environments
      </Title>
      <Row gutter={24}>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>Environment
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
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>Regions
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
          <SelectTitle title={"Number of brokers"} />
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
          {/* <Input placeholder="default size" /> */}
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <SelectTitle title={"Storage Size(per broker) in GB"} />
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
export default EnvironmentsForm;
