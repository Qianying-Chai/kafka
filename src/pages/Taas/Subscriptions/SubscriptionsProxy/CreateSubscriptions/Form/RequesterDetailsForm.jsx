import React, { useMemo, useState, useRef } from "react";
import "../../../Style/RequesterDetails.css";
import SelectTitle from "../../../../../Components/SelectTitle";
import debounce from "lodash/debounce";
import { Col, Row, Select, Spin, Typography, Collapse, Input } from "antd";
const { Title } = Typography;

const RequesterDetailsForm = () => {
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

  const [value, setValue] = useState([]);

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
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
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
              <DebounceSelect
                className="create-flow-select"
                mode="multiple"
                value={value}
                fetchOptions={fetchUserList}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                placeholder="Select AD Group:"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Application Tire:"} />
              <Select
                mode="tags"
                className="create-flow-select"
                placeholder="Select Application Tire"
                showSearch={false}
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Data Compliance for the Cluster:"} />
              <Input placeholder="Input Data Compliance for the Cluster" />
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
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"TR Product ID:"} />
              <DebounceSelect
                className="create-flow-select"
                mode="multiple"
                value={value}
                fetchOptions={fetchUserList}
                placeholder="Select TR Product ID"
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Distribution Email:"} />
              <Input
                placeholder="Input Distribution Email"
                className="create-flow-input"
              />
            </Col>

            <Col span={8}>
              <SelectTitle title={"Data Classification"} />
              <Input
                placeholder="Select Data Classification"
                className="create-flow-input"
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"Market:"} />
              <DebounceSelect
                className="create-flow-select"
                mode="multiple"
                value={value}
                fetchOptions={fetchUserList}
                placeholder="Select Market"
                onChange={(newValue) => {
                  setValue(newValue);
                }}
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
