import React from "react";

import { Space, Tag, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ExportOutlined } from "@ant-design/icons";
import ComponentsTable from "../Components/ComponentsTable";
import ComponentsInput from "../Components/ComponentsInput";
import ComponentsPagination from "../Components/ComponentsPagination";
import categoryConstants from "../common/categoryConstants";
import ComponentsTitle from "../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../Components/ComponentsBreadcrumb";
import ComponentsContent from "../Components/ComponentsContent";

const UserRequestsLegacy = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      width: "35%",
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
      title: (
        <div>
          Provisioning Status
          <ExportOutlined style={{ fontSize: "14px" }} />
        </div>
      ),
      key: "Provisioning Status",
      width: "16%",
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
              title: categoryConstants.SUBSCRIPTION,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.SUBSCRIPTION} />
          <Button shape="round" size="medium" className="content-banner-button">
            <PlusOutlined />
            {`CREATE ${categoryConstants.SUBSCRIPTION.toLocaleUpperCase()}`}
          </Button>
        </div>
      </div>
      <ComponentsCard title={categoryConstants.USERE_REQUESTS_LEGACY}>
        <p>
          Legacy page for user requests. Please visit out{" "}
          <span style={{ color: "#0958d9" }}>TaaS User Requests </span>for our
          new one
        </p>
        <ComponentsInput
          placeholder={
            "Search by Name, Type, Oeration, AD Group, Created Date, and Provisioning Status"
          }
        />
        <ComponentsTable columns={columns} data={data} />
        <ComponentsPagination defaultPageSize={25} total={25} />
      </ComponentsCard>
    </>
  );
};
export default UserRequestsLegacy;
