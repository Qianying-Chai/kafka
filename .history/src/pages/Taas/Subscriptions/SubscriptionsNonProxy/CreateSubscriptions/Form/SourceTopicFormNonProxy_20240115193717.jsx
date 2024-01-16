import React, { useMemo, useState, useRef } from "react";
import debounce from "lodash/debounce";
import { Col, Row, ConfigProvider, Select, Spin } from "antd";
import SelectLabel from "../../../../Components/SelectLabel";
import "./Style/SourceTopicForm.css";
const SourceTopicFormNonProxy = () => {
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
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
        },
      }}
    >
      <Row style={{ display: "flex", flexFlow: "nowrap" }}>
        <Col
          span={8}
          style={{
            marginRight: "12px",
          }}
        >
          <SelectLabel label={"APM ID"} />
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
          <div className="select-title">Environment</div>
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
          <div className="select-title">Topic Name Filter</div>
          <Select
            mode="tags"
            className="select"
            onChange={handleChange}
            showSearch={false}
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
          <div className="select-title">
            <span className="select-title-prefix">*</span>Topic Name
          </div>
          <DebounceSelect
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            className="select"
          />
        </Col>
      </Row>
    </ConfigProvider>
  );
};

export default SourceTopicFormNonProxy;
