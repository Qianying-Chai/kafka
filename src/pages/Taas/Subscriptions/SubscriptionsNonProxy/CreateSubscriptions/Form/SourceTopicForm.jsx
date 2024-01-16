import React, { useMemo, useState, useRef } from "react";
import SelectTitle from "../../../../../Components/SelectTitle";
import debounce from "lodash/debounce";
import { Col, Row, Select, Spin, Typography } from "antd";
const { Title } = Typography;
const SourceTopicForm = () => {
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
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Title level={4} style={{ fontWeight: "normal", color: "#000000D9" }}>
        Source Topic Selection
      </Title>

      <div className="bordered-content">
        Define search criteria for the topic selection as specific as possible.
        There will be displayed only first 1000 topics relevant for the APM ID
        and/or Environment and/or Topic Name Filter.
      </div>
      <Row style={{ display: "flex", flexFlow: "nowrap" }}>
        <Col
          span={8}
          style={{
            marginRight: "12px",
          }}
        >
          <SelectTitle title={"APM ID"} />
          <DebounceSelect
            className="select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            style={{
              width: "100%",
              margin: "0 0 10px",
            }}
          />
        </Col>
        <Col
          span={8}
          style={{
            padding: "0 12px",
          }}
        >
          <div className="Select-title-wrapper">Environment</div>
          <DebounceSelect
            className="select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Col>
        <Col
          span={8}
          style={{
            padding: "0 12px",
          }}
        >
          <div className="Select-title-wrapper">Topic Name Filter</div>
          <Select
            mode="tags"
            className="select"
            onChange={handleChange}
            showSearch={false}
            suffixIcon=""
          />
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            marginRight: "12px",
          }}
        >
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>Topic Name
          </div>
          <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Select Topic Name"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            className="select"
          />
        </Col>
      </Row>
    </>
  );
};

export default SourceTopicForm;
