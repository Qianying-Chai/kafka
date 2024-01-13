import React from "react";
import "./Style/Trash.css";
import ComponentsInput from "../../Components/ComponentsInput";
import ComponentsContent from "../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../Components/ComponentsTitle";
import ComponentsTable from "../../Components/ComponentsTable";
import { PlusOutlined } from "@ant-design/icons";
import categoryConstants from "../../common/categoryConstants";

import { Button, Space } from "antd";

const Trash = () => {
  const columns = [
    {
      title: <div style={{ paddingLeft: "15px" }}>Name</div>,
      dataIndex: "Name",
      key: "Name",
      width: "10%",
      // render: (text) => <a>{text}</a>,
      render: (_, record) => (
        <Space size="middle">
          <a> SOF0001396-testgm-DEV-testgm</a>
        </Space>
      ),
    },
    {
      title: <div>Partitions</div>,
      dataIndex: "Partitions",
      key: "Partitions",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a> 11</a>
        </Space>
      ),
    },
    {
      title: "Time To Retain Data (in Hours)",
      dataIndex: "Time To Retain Data (in Hours)",
      key: "Time To Retain Data (in Hours)",
      width: "30%",
    },
    {
      title: "Cleanup Policy",
      key: "Cleanup Policy",
      dataIndex: "Cleanup Policy",
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
      title: "Compression Type",
      key: "Compression Type",
      width: "17%",
      ellipsis: true,
      render: (_, record) => (
        <Space size="middle">
          <a>Yes</a>
        </Space>
      ),
    },
    {
      title: "Age (Days)",
      key: "Age (Days)",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
        </Space>
      ),
    },
    {
      title: "CDU",
      key: "CDU",
      width: "7%",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
        </Space>
      ),
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
              title: categoryConstants.TRASH,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.TRASH} />
        </div>
      </div>
      <ComponentsContent>
        <div className="content">
          <ComponentsInput
            placeholder={
              "Search by Name, Partitions, Time To Retain Data (in Hours), Cleanup Policy, and Compression Type"
            }
          />
          <Button
            className="disable-button"
            type="primary"
            disabled
            shape="round"
          >
            RESTORE
          </Button>
          <Button
            type="primary"
            shape="round"
            disabled
            className="disable-button"
          >
            DELETE
          </Button>
        </div>
        <ComponentsTable columns={columns} />
      </ComponentsContent>
    </>
  );
};
export default Trash;
