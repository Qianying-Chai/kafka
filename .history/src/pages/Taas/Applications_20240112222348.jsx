import React from "react";
import { Space, ConfigProvider } from "antd";
import ComponentsCard from "../Components/ComponentsCard";
import ComponentsTable from "../Components/ComponentsTable";
import ComponentsInput from "../Components/ComponentsInput";
import ComponentsPagination from "../Components/ComponentsPagination";
import categoryConstants from "../common/categoryConstants";
import ComponentsTitle from "../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../Components/ComponentsBreadcrumb";
const Applications = () => {
  const columns = [
    {
      title: "App Name",
      dataIndex: "App Name",
      key: "App Name",
      width: "40%",
      // render: (text) => <a>{text}</a>,
      render: (_, record) => (
        <Space size="middle">
          <a> SOF0001396-testgm-DEV-testgm</a>
        </Space>
      ),
    },
    {
      title: <div>TR Product</div>,
      dataIndex: "Topic Name",
      key: "Topic Name",
      width: "15%",
      render: (_, record) => (
        <Space size="middle">
          <a> 11</a>
        </Space>
      ),
    },
    {
      title: "APM ID",
      dataIndex: "APM ID",
      key: "APM ID",
      width: "15%",
    },
    {
      title: "Application Name",
      key: "Application on Name",
      dataIndex: "Application on Name",
      width: "15%",
      // render: (_, { tags }) => (
      //   <>
      //     {tags.map((tag) => {
      //       let color = tag.length > 5 ? "geekblue" : "green";
      //       if (tag === "loser") {
      //         color = "volcano";
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
      render: (_, record) => (
        <Space size="middle">
          <a> SOF0001396-testgm-DEV-testgm</a>
        </Space>
      ),
    },
    {
      title: "AD Group",
      key: "AD Group",
      width: "15%",
      ellipsis: true,
      render: (_, record) => (
        <Space size="middle">
          <a>Yes</a>
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
        token: {
          borderRadius: 0,
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
              title: "Subscription Requests",
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={"Subscription Requests"} />
        </div>
      </div>
      <ComponentsCard title={categoryConstants.APPLICATIONS}>
        <p className="content-text">
          List of Topics is provided here. Click on each to view details and
          other info
        </p>
        <ComponentsInput
          placeholder={"Search by App Name, TR Product, and APM ID"}
        />
        <ComponentsTable columns={columns} data={data} />
        <ComponentsPagination defaultPageSize={25} total={25} />
      </ComponentsCard>
    </ConfigProvider>
  );
};
export default Applications;
