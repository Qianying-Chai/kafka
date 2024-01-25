import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import ComponentsTable from "../../Components/ComponentsTable";
import categoryConstants from "../../common/categoryConstants";
import ComponentsTitle from "../../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../../Components/ComponentsBreadcrumb";
import ComponentsSpin from "../../Components/ComponentSpin";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import ComponentsContent from "../../Components/ComponentsContent";
import { Link } from "react-router-dom";
import { Button, Input, ConfigProvider, Popover } from "antd";

const Subscription = () => {
  const breadcrumb = [
    {
      title: "Home",
    },
    {
      title: "Kafka",
    },
    {
      title: categoryConstants.SUBSCRIPTION,
    },
  ];

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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        onKeyDown={(e) => e.stopPropagation()}
        style={{ width: "300px", position: "absolute", left: "25px" }}
      >
        <Input
          ref={searchInput}
          placeholder={`Input ${dataIndex} to search`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            display: "block",
            width: "100%",
            marginRight: "10px",
          }}
        />
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

  // const [open, setOpen] = useState({});

  // const hide = () => {
  //   setOpen(false);
  // };

  // const handleOpenChange = (newOpen, id) => {
  //   setOpen({ [id]: newOpen });
  //   console.log(1111, open, 222, open[id]);
  // };

  const [open, setOpen] = useState({});
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen, id) => {
    setOpen({ [id]: newOpen });
  };

  const columns = [
    {
      title: "Subscription Name",
      dataIndex: "Subscription Name",
      key: "Subscription Name",
      width: "13%",
      ellipsis: true,
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
      title: "Cluster",
      dataIndex: "Cluster",
      key: "Cluster",
      width: "13%",
      ...getColumnSearchProps("Cluster"),
      render: (_, record) => <a>{record.cluster}</a>,
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
      dataIndex: "Action",
      key: "Action",
      width: "5%",
      //   render: (_, record) => (
      //     <Popover
      //       content={<a onClick={hide}>Close</a>}
      //       title="Title"
      //       trigger="click"
      //       open={open.id}
      //       onOpenChange={(newOpen) => handleOpenChange(newOpen, record.id)}
      //     >
      //       <MoreOutlined />
      //     </Popover>
      //   ),

      render: (_, record) => (
        <Popover
          content={<a onClick={hide}>Close</a>}
          title="Title"
          trigger="click"
          open={open[record.id]}
          onOpenChange={(newOpen) => {
            handleOpenChange(newOpen, record.id);
          }}
        >
          <MoreOutlined />
        </Popover>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const CULSTER_SUBSCRIPTION_URL =
      "http://localhost:1337/api/cluster-subscriptions";
    fetch(CULSTER_SUBSCRIPTION_URL)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        const covData = [];
        res.data.forEach((i) =>
          covData.push({
            key: i.id,
            subscriptionname: i.attributes.mpsAppName,
            id: i.id,
            apmid: i.attributes.apmId,
            adgroup: i.attributes.adGroup,
            endpointurl: i.attributes.endpoint,
            topic: i.attributes.topicName,
            slackchannel: i.attributes.channelName,
            cluster: i.attributes.clusterName,
          })
        );
        setData(covData);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#ffffff",
          },
        },
        token: {
          colorLink: "#0751A9",
        },
      }}
    >
      <div>
        <ComponentsBreadcrumb items={breadcrumb} />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.SUBSCRIPTION} />
          <Button
            shape="round"
            className="content-banner-button"
            type="primary"
          >
            <Link to={`/kafka/mps-clusters-subscriptions/create`}>
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_SUBSCRIPTION.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
      <ComponentsContent>
        {isLoading ? (
          <ComponentsSpin />
        ) : (
          <ComponentsTable
            columns={columns}
            data={data}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              total: data.length,
              defaultPageSize: 10,
              // size: "small",
            }}
          />
        )}
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default Subscription;
