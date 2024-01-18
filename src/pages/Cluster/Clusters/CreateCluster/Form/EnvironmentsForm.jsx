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

  const environmentOptions = [
    {
      label: "PROD",
      value: "PROD",
    },
  ];

  const regionsOptions = [
    {
      label: "CDC & NDC",
      value: "CDC & NDC",
    },
    {
      label: "Azure UK South & Azure UK West",
      value: "Azure UK South & Azure UK West",
    },
    {
      label: "Azure US West & South Central",
      value: "Azure US West & South Central",
    },
    {
      label: "MC US Central and West",
      value: "MC US Central and West",
    },
    {
      label: "MC US Central",
      value: "MC US Central",
    },
    {
      label: "MC US West",
      value: "MC US West",
    },
    {
      label: "MC US East",
      value: "MC US East",
    },
    {
      label: "Azure China East2",
      value: "Azure China East2",
    },
  ];

  const numberOfBrokersOptions = [
    {
      label: "6",
      value: "6",
    },
    {
      label: "9",
      value: "9",
    },
    {
      label: "15",
      value: "15",
    },
  ];
  const storageSizeOptions = [
    {
      label: "1024",
      value: "1024",
    },
    {
      label: "2048",
      value: "2048",
    },
    {
      label: "3072",
      value: "3072",
    },
  ];

  const tShirtSizeOptions = [
    {
      label: "Small",
      value: "Small",
    },
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "Large",
      value: "Large",
    },
  ];
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
          <Select
            showSearch
            className="create-flow-select"
            options={environmentOptions}
          />
        </Col>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>Regions
          </div>
          <Select
            showSearch
            className="create-flow-select"
            options={regionsOptions}
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Number of brokers"} />
          <Select
            showSearch
            className="create-flow-select"
            options={numberOfBrokersOptions}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <SelectTitle title={"Storage Size(per broker) in GB"} />
          <Select
            showSearch
            className="create-flow-select"
            options={storageSizeOptions}
          />
        </Col>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>T-ShirtSize
          </div>
          <Select
            showSearch
            className="create-flow-select"
            options={tShirtSizeOptions}
            defaultValue={["Large"]}
          />
        </Col>
      </Row>
    </div>
  );
};
export default EnvironmentsForm;
