import React from "react";
import ComponentsTable from "../../Components/ComponentsTable";
import ComponentsInput from "../../Components/ComponentsInput";
import ComponentsPagination from "../../Components/ComponentsPagination";
import categoryConstants from "../../common/categoryConstants";
import ComponentsContent from "../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../Components/ComponentsTitle";
import { Space, Button, ConfigProvider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CreateTopics = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
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
      width: "10%",
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
      width: "12%",
    },
    {
      title: "Application Name",
      key: "Application on Name",
      dataIndex: "Application on Name",
      width: "25%",
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
      title: "Is Owner",
      key: "Is Owner",
      width: "8%",
      ellipsis: true,
      render: (_, record) => (
        <Space size="middle">
          <a>Yes</a>
        </Space>
      ),
    },
    {
      title: "Status",
      key: "Status",
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
              title: categoryConstants.TOPICS,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.TOPICS} />
          <Button
            type="primary"
            shape="round"
            size="medium"
            className="content-banner-button"
          >
            <Link
              to={`/kafka/${categoryConstants.TOPICS.toLowerCase()}/create`}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_TOPIC.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
      <ComponentsContent>
        <p className="content-text">
          List of Topics is provided here. Click on each to view details and
          other info
        </p>
        <ComponentsInput
          placeholder={
            "Search by Name, TR Product, APM ID, Application Name,Is Owner, and Status"
          }
        />
        <ComponentsTable columns={columns} data={data} />
        <ComponentsPagination showQuickJumper defaultPageSize={25} total={25} />
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default CreateTopics;
