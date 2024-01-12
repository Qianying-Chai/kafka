import React, { useMemo, useState, useRef } from "react";
import debounce from "lodash/debounce";
import { Col, Row, ConfigProvider, Select, Spin } from "antd";
import SelectLabel from "../../../../Components/SelectLabel";
import "./Style/SourceTopicForm.css";
const SourceTopicSelectionFormProxy = () => {
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
          <SelectLabel label={"Topic:"} />
          <DebounceSelect
            placeholder="Select Topic"
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
      </Row>
    </ConfigProvider>
  );
};

export default SourceTopicSelectionFormProxy;
