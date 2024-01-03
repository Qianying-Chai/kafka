import React from "react";
import ComponentsCard from "../Components/ComponentsCard";
import Highlighter from "react-highlight-words";
import { Button, Anchor, ConfigProvider, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState, useRef } from "react";

const Subscriptions = () => {
  const [selected, setSelected] = useState("NonProxy");
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
    render: (text) =>
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
  const columns =
    selected === "NonProxy"
      ? [
          {
            title: "Id",
            dataIndex: "Id",
            key: "Id",
            width: "9%",
            render: (text) => <a>{text}</a>,
          },
          {
            title: <div>Topic Name</div>,
            dataIndex: "Topic Name",
            key: "Topic Name",
            width: "18%",
            render: (_, record) => (
              <Space size="middle">
                <a> SOF0001396-testgm-DEV-testgm</a>
              </Space>
            ),
          },
          {
            title: "APM ID",
            dataIndex: "APM ID",
            key: "APM ID",
            width: "9%",
          },
          {
            title: "Application on Name",
            key: "Application on Name",
            dataIndex: "Application on Name",
            width: "9%",
            render: (_, { tags }) => (
              <>
                {tags.map((tag) => {
                  let color = tag.length > 5 ? "geekblue" : "green";
                  if (tag === "loser") {
                    color = "volcano";
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            ),
          },
          {
            title: "AD Group",
            key: "AD Group",
            width: "9%",
            ellipsis: true,
            render: (_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
              </Space>
            ),
          },
          {
            title: "DL Notification on Email",
            key: "DL Notification on Email",
            width: "9%",
            render: (_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
              </Space>
            ),
          },
          {
            title: "Permission",
            key: "Permission",
            width: "9%",

            render: (_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
              </Space>
            ),
          },
          {
            title: "ACL",
            key: "ACL",
            width: "9%",
            render: (_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
              </Space>
            ),
          },
          {
            title: "Auto-Approved",
            key: "Auto-Approved",
            width: "9%",
            render: (_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
              </Space>
            ),
          },
          {
            title: "Status",
            key: "Status",
            width: "9%",
            render: (_, record) => (
              <Space
                size="middle"
                style={{ wordWrap: "break-word", wordBreak: "break-word" }}
              >
                <a>Invite {record.name}</a>
              </Space>
            ),
          },
          {
            title: "",
            key: "",
            width: "9%",
            render: (_, record) => (
              <Space size="middle">
                <a>Invite {record.name}</a>
              </Space>
            ),
          },
        ]
      : [
          {
            title: "Subscription Name",
            dataIndex: "Subscription Name",
            key: "Subscription Name",
            width: "13%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
          },
          {
            title: "APM Id",
            dataIndex: "APM Id",
            key: "APM Id",
            width: "13%",
            ...getColumnSearchProps("age"),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
          },
          {
            title: "AD Group",
            dataIndex: "AD Group",
            key: "AD Group",
            width: "13%",
            ...getColumnSearchProps("address"),
          },
          {
            title: "End Point URI",
            dataIndex: "End Point URI",
            key: "End Point URI",
            width: "13%",
            ...getColumnSearchProps("address"),
          },
          {
            title: "Topic",
            dataIndex: "Topic",
            key: "Topic",
            width: "13%",
            ...getColumnSearchProps("address"),
          },
          {
            title: "Cluster",
            dataIndex: "Cluster",
            key: "Cluster",
            width: "13%",
            ...getColumnSearchProps("address"),
          },
          {
            title: "Slack Channel",
            dataIndex: "Slack Channel",
            key: "Slack Channel",
            width: "13%",
            ...getColumnSearchProps("address"),
          },
          {
            title: "",
            dataIndex: "",
            key: "",
            ...getColumnSearchProps("address"),
          },
        ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Anchor: {
            linkPaddingBlock: 6,
            linkPaddingInlineStart: 30,
            colorPrimary: "#32cd32",
            fontSize: 18,
          },
          Table: {
            headerBg: "#ffffff",
          },
        },
        token: {
          colorLink: "rgb(4, 31, 65)",
        },
      }}
    >
      <ComponentsCard>
        <Anchor
          direction="horizontal"
          style={{ marginBottom: "18px" }}
          items={[
            {
              key: "NonProxy",
              href: "#NonProxy",
              title: (
                <div
                  style={{
                    color:
                      selected === "NonProxy" ? "rgb(4, 31, 65)" : "#bfbfbf",
                    fontWeight: "bolder",
                  }}
                  onClick={() => {
                    setSelected("NonProxy");
                  }}
                >
                  NonProxy
                </div>
              ),
            },
            {
              key: "Proxy",
              href: "#Proxy",
              title: (
                <div
                  style={{
                    color: selected === "Proxy" ? "rgb(4, 31, 65)" : "#bfbfbf",
                    fontWeight: "bolder",
                  }}
                  onClick={() => {
                    setSelected("Proxy");
                  }}
                >
                  Proxy{" "}
                </div>
              ),
            },
          ]}
        />

        {selected === "NonProxy" ? (
          <Input
            size="large"
            placeholder="Search by Id, Topic Name, APM ID, Application Name, AD Group, DL Notfication Email, Permission, Auto-Approved, and Status"
            prefix={<SearchOutlined />}
            style={{ borderRadius: "0px" }}
          />
        ) : (
          ""
        )}

        <Table
          style={{
            border: "1px solid	#f0f0f0",
            marginTop: selected === "NonProxy" ? "18px" : "36px",
          }}
          columns={columns}
          dataSource={data}
        />
      </ComponentsCard>
    </ConfigProvider>
  );
};
export default Subscriptions;
