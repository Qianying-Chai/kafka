import React from "react";
import ComponentsCard from "../Components/ComponentsCard";
import ComponentsInput from "../Components/ComponentsInput";
import ComponentsTable from "../Components/ComponentsTable";
import ComponentsPagination from "../Components/ComponentsPagination";
import categoryConstants from "../common/categoryConstants";
import Highlighter from "react-highlight-words";
import { Button, Tabs, ConfigProvider, Space, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState, useRef } from "react";

const Subscriptions = () => {
  const [selected, setSelected] = useState("NonProxy");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const onChange = (key) => {
    setSelected(key);
  };
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
      label: "NonProxy",
    },
    {
      key: "Proxy",
      label: "Proxy",
    },
  ];

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
            title: "Topic Name",
            dataIndex: "Topic Name",
            key: "Topic Name",
            width: "30%",
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
            width: "5%",
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
            width: "14%",
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
            width: "5%",
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
      <ComponentsCard
        title={categoryConstants.SUBSCRIPTIONS}
        editebutton={"true"}
      >
        <Tabs
          defaultActiveKey="NonProxy"
          style={{ fontWeight: "bold" }}
          items={items}
          onChange={onChange}
        />
        {selected === "NonProxy" ? (
          <ComponentsInput
            placeholder={
              "Search by Id, Topic Name, APM ID, Application Name, AD Group, DL Notfication Email, Permission, Auto-Approved, and Status"
            }
          />
        ) : (
          ""
        )}
        <ComponentsTable columns={columns} data={data} />
        <ComponentsPagination defaultPageSize={10} total={10} />
      </ComponentsCard>
    </ConfigProvider>
  );
};
export default Subscriptions;
