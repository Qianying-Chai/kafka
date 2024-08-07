import React, { useMemo, useState, useRef } from "react";
import "../../../Style/RequesterDetails.css";
import SelectTitle from "../../../../../Components/SelectTitle";
import debounce from "lodash/debounce";
import { Col, Row, Select, Spin, Typography, Collapse, Input } from "antd";
const { Title } = Typography;

const RequesterDetailsForm = () => {
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

  const dataComplianceOptions = [
    {
      label: "GENERAL",
      value: "GENERAL",
    },
    {
      label: "UNSECURED",
      value: "UNSECURED",
    },
    {
      label: "SECURED",
      value: "SECURED",
    },
    {
      label: "HIPAA",
      value: "HIPAA",
    },
    {
      label: "SOX",
      value: "SOX",
    },
    {
      label: "PII",
      value: "PII",
    },
    {
      label: "PCI",
      value: "PCI",
    },
    {
      label: "HIPAA_SOX",
      value: "HIPAA_SOX",
    },
  ];

  const trProductIdOptions = [
    {
      label: "2525 | DP-DIM-ISP",
      value: "Tier 3",
      desc: "Tier 3",
    },
  ];
  const dataClassificationOptions = [
    {
      label: "NON-SENSITIVE",
      value: "NON-SENSITIVE",
    },
    {
      label: "SENSITIVE",
      value: "SENSITIVE",
    },
    {
      label: "HIGHLY_SENSITIVE",
      value: "HIGHLY_SensitiveSENSITIVE",
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
        <div key="requester-details-children">
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"AD Group:"} />
              <Select
                showSearch
                className="create-flow-select"
                options={adGroupOptions}
                placeholder="Select AD Group"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Application Tire:"} />

              <Select
                showSearch
                className="create-flow-select"
                placeholder="Select Application Tire"
                options={applicationTierOptions}
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Data Compliance for the Cluster:"} />

              <Select
                showSearch
                className="create-flow-select"
                placeholder="Select Data Compliance for the Cluster"
                options={dataComplianceOptions}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"Team Slack:"} />
              <Input
                placeholder="Input Team Slack"
                className="create-flow-input"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Service Now Group:"} />
              <Input
                placeholder="Input Service Now Group"
                className="create-flow-input"
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"XMatters:"} />
              <Input
                placeholder="Input XMatters"
                className="create-flow-input"
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"TR Product ID:"} />
              <Select
                showSearch
                className="create-flow-select"
                placeholder="Select TR Product ID"
                options={trProductIdOptions}
              />
            </Col>
            <Col span={8}>
              <SelectTitle title={"Distribution Email:"} />
              <Input
                placeholder="Input Distribution Email"
                className="create-flow-input"
              />
            </Col>

            <Col span={8}>
              <SelectTitle title={"Data Classification"} />
              <Select
                showSearch
                className="create-flow-select"
                options={dataClassificationOptions}
                placeholder="Select Data Classification"
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <SelectTitle title={"Market:"} />
              <Select
                showSearch
                placeholder="Select Market"
                className="create-flow-select"
                options={marketOptions}
              />
            </Col>
          </Row>
        </div>,
      ],
    },
  ];

  return (
    <Collapse
      defaultActiveKey={["Requester Details"]}
      ghost
      items={items}
    ></Collapse>
  );
};

export default RequesterDetailsForm;
