import React from "react";
import ComponentsTable from "../../../Components/ComponentsTable";
import ComponentsInput from "../../../Components/ComponentsInput";
import ComponentsContent from "../../../Components/ComponentsContent";
import ComponentsBreadcrumb from "../../../Components/ComponentsBreadcrumb";
import ComponentsTitle from "../../../Components/ComponentsTitle";
import { PlusOutlined } from "@ant-design/icons";
import ComponentsPagination from "../Components/ComponentsPagination";
import categoryConstants from "../common/categoryConstants";
import { Button, Tabs, ConfigProvider } from "antd";

const SubscriptionsNonProxy = () => {
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

  const columns = [
    {
      title: "Id",
      dataIndex: "Id",
      key: "Id",
      width: "9%",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Topic Name",
      dataIndex: "Topic Name",
      key: "Topic Name",
      width: "30%",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a> SOF0001396-testgm-DEV-testgm</a>
      //   </Space>
      // ),
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
    },
    {
      title: "AD Group",
      key: "AD Group",
      width: "9%",
      ellipsis: true,
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //   </Space>
      // ),
    },
    {
      title: "DL Notification on Email",
      key: "DL Notification on Email",
      width: "9%",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //   </Space>
      // ),
    },
    {
      title: "Permission",
      key: "Permission",
      width: "9%",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //   </Space>
      // ),
    },
    {
      title: "ACL",
      key: "ACL",
      width: "5%",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //   </Space>
      // ),
    },
    {
      title: "Auto-Approved",
      key: "Auto-Approved",
      width: "9%",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //   </Space>
      // ),
    },
    {
      title: "Status",
      key: "Status",
      width: "14%",
      // render: (_, record) => (
      //   <Space
      //     size="middle"
      //     style={{ wordWrap: "break-word", wordBreak: "break-word" }}
      //   >
      //     <a>Invite {record.name}</a>
      //   </Space>
      // ),
    },
    {
      title: "",
      key: "",
      width: "9%",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //   </Space>
      // ),
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
          <Button shape="round" size="medium" className="content-banner-button">
            <PlusOutlined />
            {`CREATE ${categoryConstants.TOPICS.toLocaleUpperCase()}`}
          </Button>
        </div>
      </div>
      <ComponentsContent
        title={categoryConstants.SUBSCRIPTIONS}
        editebutton={"true"}
      >
        <Tabs
          defaultActiveKey="NonProxy"
          style={{ fontWeight: "bold" }}
          items={items}
          // onChange={onChange}
        />

        <ComponentsInput
          placeholder={
            "Search by Id, Topic Name, APM ID, Application Name, AD Group, DL Notfication Email, Permission, Auto-Approved, and Status"
          }
        />
        <ComponentsTable columns={columns} data={data} />
        <ComponentsPagination defaultPageSize={10} total={10} />
      </ComponentsContent>
    </ConfigProvider>
  );
};
export default SubscriptionsNonProxy;
