import React from "react";
import ComponentsCard from "../Components/ComponentsCard";
import Highlighter from "react-highlight-words";
import { ConfigProvider, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

const SubscriptionApprovals = () => {
  const [selected, setSelected] = useState("NonProxy");
  const columns = [
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
      title: "Application Name",
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
        <span>
          List of subscription requests to be approved is provided here. Approve
          or reject each request.
        </span>
        <div>
          <Input
            size="large"
            placeholder="Search by Id, Topic Name, APM ID, Application Name, AD Group, DL Notfication Email,_ _operationType, Auto-Approved, and Status"
            prefix={<SearchOutlined />}
            style={{ margin: "18px 0", borderRadius: "0px" }}
          />
        </div>
        <Table
          style={{ border: "1px solid	#f0f0f0" }}
          columns={columns}
          dataSource={data}
        />
      </ComponentsCard>
    </ConfigProvider>
  );
};
export default SubscriptionApprovals;
