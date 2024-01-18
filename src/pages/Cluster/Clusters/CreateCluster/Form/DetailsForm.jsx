import React, { useMemo, useRef, useState } from "react";
import SelectTitle from "../../../../Components/SelectTitle";
import { Col, Row, Select, Spin } from "antd";
import { UserOutlined, InfoCircleFilled } from "@ant-design/icons";

import debounce from "lodash/debounce";
import { Typography, Input, Space } from "antd";

const { Title } = Typography;
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
  const applicationTierOptions = [
    {
      label: "Tier 0",
      value: "Tier 0",
      desc: "Tier 0",
    },
    {
      label: "Tier 1",
      value: "Tier 1",
      desc: "Tier 1",
    },
    {
      label: "Tier 2",
      value: "Tier 2",
      desc: "Tier 2",
    },
    {
      label: "Tier 3",
      value: "Tier 3",
      desc: "Tier 3",
    },
  ];
  const trProductOptions = [
    {
      label: (
        <div>
          <UserOutlined />
          <span> 3555 | GTP - Messaging Platform - Lettera</span>
        </div>
      ),
      value: "1",
    },
  ];

  const adGroupOptions = [
    {
      label: "DXIO-ADMN",
      value: "DXIO-ADMN",
    },
    {
      label: "mps_admin",
      value: "mps_admin",
    },
    {
      label: "Internet_Download_Users_HO",
      value: "Internet_Download_Users_HO",
    },
    {
      label: "tech-assistant-beta-testers",
      value: "tech-assistant-beta-testers",
    },
    {
      label: "PWV_Users",
      value: "PWV_Users",
    },
    {
      label: "AIVendors",
      value: "AIVendors",
    },
    {
      label: "hub-dev-community",
      value: "hub-dev-community",
    },
  ];

  const dataClassificationOptions = [
    {
      label: "Non-Sensitive",
      value: "Non-Sensitive",
    },
    {
      label: "Sensitive",
      value: "Sensitive",
    },
    {
      label: "Highly Sensitive",
      value: "Highly Sensitive",
    },
  ];
  const marketOptions = [
    {
      label: "USGM",
      value: "USGM",
    },
    {
      label: "USGR",
      value: "USGR",
    },
    {
      label: "USSAMS",
      value: "USSAMS",
    },
    {
      label: "UKGM",
      value: "UKGM",
    },
    {
      label: "UKGR",
      value: "UKGR",
    },
    {
      label: "MXGR",
      value: "MXGR",
    },
    {
      label: "MXGM",
      value: "MXGM",
    },
    {
      label: "MXSAMS",
      value: "MXSAMS",
    },
  ];

  const dataComplianceOptions = [
    {
      label: "HIPAA",
      value: "HIPAA",
    },
    {
      label: "SOX",
      value: "SOX",
    },
    {
      label: "HIPPA and SOX",
      value: "HIPPA and SOX",
    },
    {
      label: "SECURED",
      value: "SECURED",
    },
    {
      label: "UNSECURED (not recommended)",
      value: "UNSECURED (not recommended)",
    },
  ];

  return (
    <div>
      <Title level={4} style={{ fontWeight: "normal", color: "#000000D9" }}>
        Details
      </Title>
      <Row gutter={24}>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>Name
          </div>
          <Input className="create-flow-input" />
        </Col>
        <Col span={8}>
          <SelectTitle title={"APM ID"} />
          <DebounceSelect
            className="create-flow-select"
            mode="multiple"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"TR Product"} />
          <Select
            showSearch
            className="create-flow-select"
            defaultValue={["1"]}
            options={trProductOptions}
          />
        </Col>
      </Row>
      <div style={{ height: "24px" }}></div>
      <Row gutter={24}>
        <Col span={8}>
          <SelectTitle title={"AD Group"} />
          <Select
            showSearch
            className="create-flow-select"
            options={adGroupOptions}
          />
        </Col>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span>Team Slack</span>
            <InfoCircleFilled style={{ marginLeft: "5px" }} />
          </div>
          <Input className="create-flow-input" />
        </Col>
        <Col span={8}>
          <SelectTitle title={"DL Notification Email"} />
          <Input className="create-flow-input" />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <SelectTitle title={"ServiceNow Group"} />
          <Input className="create-flow-input" />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Data Classification"} />
          <Select
            showSearch
            className="create-flow-select"
            options={dataClassificationOptions}
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Application Tier"} />
          <Select
            showSearch
            className="create-flow-select"
            defaultValue={["Tier 3"]}
            options={applicationTierOptions}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <div className="Select-title-wrapper">
            <span className="prefix">*</span>Market
          </div>
          <Select
            showSearch
            className="create-flow-select"
            options={marketOptions}
          />
        </Col>
        <Col span={8}>
          <SelectTitle title={"Data Compliance for the Cluster"} />
          <Select
            showSearch
            className="create-flow-select"
            options={dataComplianceOptions}
          />
        </Col>
      </Row>
    </div>
  );
};
export default DetailsForm;
