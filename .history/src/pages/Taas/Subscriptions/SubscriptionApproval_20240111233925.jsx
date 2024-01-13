import React from "react";
import ComponentsCard from "../Components/ComponentsCard";
import ComponentsInput from "../Components/ComponentsInput";
import ComponentsTable from "../Components/ComponentsTable";
import ComponentsPagination from "../Components/ComponentsPagination";
import { ConfigProvider, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SubscriptionApprovals = () => {
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
      width: "13%",
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
      <ComponentsCard title={"Subscription Approvals"}>
        <span>
          List of Subscription requests to be approved is provided here. Approve
          or reject each request.
        </span>
        <div>
          <ComponentsInput placeholder="Search by Id, Topic Name, APM ID, Application Name, AD Group, DL Notfication Email,_ _operationType, Auto-Approved, and Status" />
        </div>
        <ComponentsTable columns={columns} data={data} />
        <ComponentsPagination defaultPageSize={10} total={10} />
      </ComponentsCard>
    </ConfigProvider>
  );
};
export default SubscriptionApprovals;
