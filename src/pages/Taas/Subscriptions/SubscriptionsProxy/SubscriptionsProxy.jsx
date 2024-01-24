import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsTable from "../../../Components/ComponentsTable";
import ComponentsPagination from "../../../Components/ComponentsPagination";
import categoryConstants from "../../../common/categoryConstants";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, ConfigProvider, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";

import { Input } from "antd";

const SubscriptionsProxy = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    onCell: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const items = [
    {
      key: "NonProxy",
      label: (
        <Link
          to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
        >
          NonProxy
        </Link>
      ),
    },
    {
      key: "Proxy",
      label: (
        <Link
          to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy`}
        >
          Proxy
        </Link>
      ),
    },
  ];

  const columns = [
    {
      title: "Subscription Name",
      dataIndex: "Subscription Name",
      key: "Subscription Name",
      width: "13%",
      ...getColumnSearchProps("Subscription Name"),
      sorter: (a, b) => a.subscriptionname.length - b.subscriptionname.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => <a>{record.subscriptionname}</a>,
    },
    {
      title: "APM Id",
      dataIndex: "APM Id",
      key: "APM Id",
      width: "13%",
      ...getColumnSearchProps("APM Id"),
      sorter: (a, b) => a.apmid.length - b.apmid.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => <a>{record.apmid}</a>,
    },
    {
      title: "AD Group",
      dataIndex: "AD Group",
      key: "AD Group",
      width: "13%",
      ...getColumnSearchProps("AD Group"),
      render: (_, record) => <a>{record.adgroup}</a>,
    },
    {
      title: "End Point URI",
      dataIndex: "End Point URI",
      key: "End Point URI",
      width: "13%",
      ellipsis: true,
      ...getColumnSearchProps("End Point URI"),
      render: (_, record) => <a>{record.endpointurl}</a>,
    },
    {
      title: "Topic",
      dataIndex: "Topic",
      key: "Topic",
      width: "13%",
      ...getColumnSearchProps("Topic"),
      render: (_, record) => <a>{record.topic}</a>,
    },
    {
      title: "Slack Channel",
      dataIndex: "Slack Channel",
      key: "Slack Channel",
      width: "13%",
      ...getColumnSearchProps("Slack Channel"),
      render: (_, record) => <a>{record.slackchannel}</a>,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      width: "5%",
      render: (_, record) => (
        <a>
          <MoreOutlined />
        </a>
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const MPS_SUBSCRIPTION_URL = "http://localhost:1337/api/mps-subscriptions";
    fetch(MPS_SUBSCRIPTION_URL)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        let covData = [];
        res.data.forEach((i) => {
          covData.push({
            key: i.id,
            subscriptionname: i.attributes.topicName,
            id: i.id,
            apmid: i.attributes.apmId,
            adgroup: i.attributes.adGroup,
            endpointurl: i.attributes.endpoint,
            topic: i.attributes.topicName,
            slackchannel: i.attributes.channelName,
          });
        });
        setData(covData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ConfigProvider
      theme={{
        components: {
          Anchor: {
            linkPaddingBlock: 6,
            linkPaddingInlineStart: 30,
            colorPrimary: "#32cd32",
            fontSize: 20,
          },
          Table: {
            headerBg: "#ffffff",
            padding: "12px 8px",
          },
          Tabs: {
            itemSelectedColor: "#41F41",
            inkBarColor: "#06f27b",
            itemColor: "#00000099",
            itemHoverColor: "rgb(4, 31, 65)",
            titleFontSize: 16,
          },
        },

        token: {
          colorLink: "rgb(4, 31, 65)",
        },
      }}
    >
      <div>
        <ComponentsBreadcrumb
          items={[
            {
              title: "Home",
            },
            {
              title: "Kafka",
            },
            {
              title: categoryConstants.SUBSCRIPTIONS,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.SUBSCRIPTIONS} />
          <Button
            shape="round"
            size="medium"
            className="content-banner-button"
            type="primary"
          >
            <Link
              to={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy/create`}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_SUBSCRIPTION.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
      <ComponentsContent>
        <Tabs
          defaultActiveKey="Proxy"
          style={{ fontWeight: "bold" }}
          items={items}
          // onChange={onChange}
        />
        <ComponentsTable columns={columns} data={data} />
        <ComponentsPagination defaultPageSize={10} total={data.length} />
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default SubscriptionsProxy;
