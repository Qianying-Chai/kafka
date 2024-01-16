import React, { useMemo, useRef, useState } from "react";
import SelectTitle from "../../../../Components/SelectTitle";
import "../../Style/DetailsForm.css";
import { Col, Row, Select, Spin, ConfigProvider } from "antd";
import debounce from "lodash/debounce";

const SubscriptionNameForm = () => {
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
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 0,
        },
      }}
    >
      <Row style={{ display: "flex", flexFlow: "nowrap" }}>
        <Col
          span={6}
          className="col"
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
          span={18}
          style={{
            padding: "0 12px",
          }}
        >
          <SelectTitle title={"Application Name / App Key"} />
          <Select
            mode="tags"
            className="select"
            placeholder="Select Application Name or create a new one by App Key"
            showSearch={false}
            suffixIcon=""
          />
        </Col>
      </Row>
    </ConfigProvider>
  );
};
export default SubscriptionNameForm;
