import React from "react";
import ComponentsContent from "../../Components/ComponentsContent";

import ComponentsTable from "../../Components/ComponentsTable";
import ComponentsInput from "../../Components/ComponentsInput";
import ComponentsPagination from "../../Components/ComponentsPagination";
import categoryConstants from "../../common/categoryConstants";
import ComponentsTitle from "../../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../../Components/ComponentsBreadcrumb";

import { Space, Tag } from "antd";

const UserRequests = () => {
  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
      width: "6%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: "40%",
      render: (_, record) => (
        <Space size="middle">
          <a> SOF0001396-testgm-DEV-testgm</a>
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      width: "10%",
    },
    {
      title: "Operation",
      key: "Operation",
      dataIndex: "Operation",
      width: "12%",
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
      width: "17%",
      ellipsis: true,
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
        </Space>
      ),
    },
    {
      title: "Created By",
      key: "Created By",
      width: "18%",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
        </Space>
      ),
    },
    {
      title: "Created Date",
      key: "Created Date",
      width: "18%",

      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
        </Space>
      ),
    },
    {
      title: "Provisioning Status",
      key: "Provisioning Status",
      width: "12%",
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
    <>
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
              title: "Applications",
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.APPLICATIONS} />
        </div>
      </div>
      {/* <ComponentsTi title={categoryConstants.USER_REQUESTS}> */}
      {/* <p className="content-text">User Requests</p>
      <ComponentsInput
        placeholder={
          "Search by Name, Type, Oeration, AD Group, Created Date, and Provisioning Status"
        }
      />
      <ComponentsTable columns={columns} data={data} />
      <ComponentsPagination defaultPageSize={25} total={25} /> */}
      {/* </ComponentsTi> */}
    </>
  );
};
export default UserRequests;
