import React, { useMemo, useRef, useState } from "react";
import SelectTitle from "../../../Components/SelectTitle";
import { Space, Typography } from "antd";

import { Col, Row, Select, Spin } from "antd";
import debounce from "lodash/debounce";

const DetailsForm = () => {
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
    <>
      <Row style={{ display: "flex", flexFlow: "nowrap" }}>
        <Col
          span={12}
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
      </Row>
    </>
  );
};
export default DetailsForm;
