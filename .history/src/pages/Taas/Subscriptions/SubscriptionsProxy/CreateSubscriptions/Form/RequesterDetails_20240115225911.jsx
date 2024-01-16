import React, { useMemo, useState, useRef } from "react";
import "../../../Style/RequesterDetails.css";
import SelectTitle from "../../../../../Components/SelectTitle";
import debounce from "lodash/debounce";
import { Col, Row, Select, Spin, Typography, Collapse } from "antd";
const { Title } = Typography;

const RequesterDetails = () => {
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
        {
          key: "2",
          label: (
            <Row style={{ display: "flex", flexFlow: "nowrap" }}>
              <Col
                span={8}
                style={{
                  marginRight: "12px",
                }}
              >
                <SelectTitle title={"Topic:"} />
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
            </Row>
          ),
        },
        {},
      ],
    },
  ];
  return <Collapse defaultActiveKey={["1"]} ghost items={items}></Collapse>;
};

export default RequesterDetails;
