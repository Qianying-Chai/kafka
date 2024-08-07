import React, { useMemo, useState, useRef } from "react";
import debounce from "lodash/debounce";
import { Col, Row, Select, Spin, Typography, ConfigProvider } from "antd";
import SelectTitle from "../../../../../Components/SelectTitle";
const { Title } = Typography;
const TargetApplicationSelectionForm = () => {
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
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const ApplicationNameOptions = [
    {
      label: "Failed fetching options from url: ",
      value: "Application Name",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionActiveBg: "#ffffff",
          },
        },
        token: {
          colorText: "#d9d9d9",
        },
      }}
    >
      <Title level={4} style={{ fontWeight: "normal", color: "#000000D9" }}>
        Target Application Selection
      </Title>
      <Row gutter={24}>
        <Col span={12}>
          <SelectTitle title={"APM ID"} />
          <DebounceSelect
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            className="create-flow-select"
          />
        </Col>
        <Col span={12}>
          <SelectTitle title={"Application Name / App Key"} />
          <Select
            mode="tags"
            className="create-flow-select"
            placeholder="Select Application Name or create a new one by App Key"
            onChange={handleChange}
            showSearch={false}
            suffixIcon=""
            options={ApplicationNameOptions}
          />
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default TargetApplicationSelectionForm;
