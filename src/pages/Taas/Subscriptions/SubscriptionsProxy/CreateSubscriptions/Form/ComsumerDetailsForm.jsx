import React, { useMemo, useState, useRef } from "react";
import "../../../Style/RequesterDetails.css";
import SelectTitle from "../../../../../Components/SelectTitle";
import debounce from "lodash/debounce";
import { InfoCircleFilled } from "@ant-design/icons";
import {
  Col,
  Row,
  Select,
  Spin,
  Typography,
  Collapse,
  Input,
  Checkbox,
  ConfigProvider,
} from "antd";
const { Title } = Typography;

const ConsumerDetailsForm = () => {
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
      key: "Comsumer Details",
      label: (
        <Title
          level={4}
          style={{
            color: "#000000D9",
          }}
        >
          Comsumer Details
        </Title>
      ),
      children: [
        <div key=" comsumer-details-children">
          <Row gutter={24}>
            <Col span={6}>
              <Checkbox className="create-flow-checkbox">
                {" "}
                <span className="Select-title">Partition Ordering</span>
                <InfoCircleFilled />
              </Checkbox>
            </Col>
            <Col span={6}>
              <Checkbox className="create-flow-checkbox">
                {" "}
                <span className="Select-title">Compression</span>
                <InfoCircleFilled />
              </Checkbox>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"Name:"} />
              <Input placeholder="Input Name" className="create-flow-input" />
            </Col>
            <Col span={8}>
              <SelectTitle title={"SR Consumer Key:"} />
              <Input
                placeholder="Input SR Consumer Key"
                className="create-flow-input"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"SR Environment:"} />
              <Input
                placeholder="Input SR Environment"
                className="create-flow-input"
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"Retry Count:"} />
              <Input
                placeholder="Input Retry Count"
                className="create-flow-input"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Parallelism:"} />
              <Input
                placeholder="Input Parallelism"
                className="create-flow-input"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"DLQ Topic:"} />
              <Input
                placeholder="Input DLQ Topic"
                className="create-flow-input"
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"Endpoint URL:"} />
              <DebounceSelect
                className="create-flow-select"
                mode="multiple"
                value={value}
                fetchOptions={fetchUserList}
                placeholder="Input Endpoint URL"
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Namespace:"} />
              <Input
                placeholder="Input Namespace"
                className="create-flow-input"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Message Filter"} />
              <Input
                placeholder="Input Message Filter "
                className="create-flow-input"
              />
            </Col>
          </Row>
        </div>,
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#41F41",
        },
      }}
    >
      <Collapse
        defaultActiveKey={["Comsumer Details"]}
        ghost
        items={items}
      ></Collapse>
    </ConfigProvider>
  );
};

export default ConsumerDetailsForm;
