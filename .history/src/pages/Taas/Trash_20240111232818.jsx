import React from "react";
import ComponentsInput from "../Components/ComponentsInput";
import ComponentsCard from "../Components/ComponentsCard";
import ComponentsTable from "../Components/ComponentsTable";
import { Button, Space } from "antd";
import "./Style/Trash.css";

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
    <ComponentsCard title={"Trash List"}>
      <div className="top-bar">
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
    </ComponentsCard>
  );
};
export default Trash;
