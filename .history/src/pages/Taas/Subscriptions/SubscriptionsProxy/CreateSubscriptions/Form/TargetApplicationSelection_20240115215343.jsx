import React, { useMemo, useState, useRef } from "react";
import debounce from "lodash/debounce";
import { Col, Row, Select, Spin, Divider, Typography } from "antd";
import SelectTitle from "../../../../../Components/SelectTitle";
const { Title } = Typography;
const TargetApplicationSelection = () => {
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

  return (
    <>
      {" "}
      <Title level={4} style={{ fontWeight: "normal", paddingTop: "20px" }}>
        Target Application Selection
      </Title>
      <Row style={{ display: "flex", flexFlow: "nowrap" }}>
        <Col
          span={8}
          style={{
            marginRight: "12px",
          }}
        >
          <SelectTitle title={"APM ID"} />
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
        <Col
          span={8}
          style={{
            padding: "0 12px",
          }}
        >
          <SelectTitle title={"Application Name / App Key"} />
          <Select
            mode="tags"
            className="select"
            placeholder="Select Application Name/App Key"
            onChange={handleChange}
            showSearch={false}
            disabled
          />
        </Col>
        <Col
          span={8}
          style={{
            padding: "0 12px",
          }}
        >
          <SelectTitle title={"Environment"} />
          <Select
            mode="tags"
            className="select"
            placeholder="Select Environment"
            onChange={handleChange}
            showSearch={false}
            disabled
          />
        </Col>
      </Row>
    </>
  );
};

export default TargetApplicationSelection;
