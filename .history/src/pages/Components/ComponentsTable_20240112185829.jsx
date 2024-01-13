import { ConfigProvider, Table } from "antd";

const ComponentsTable = (props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#ffffff",
            headerColor: "#041F41",
          },
        },
        token: {
          colorLink: "rgb(4, 31, 65)",
          borderRadius: 0,
        },
      }}
    >
      <Table
        style={{ border: "1px solid	#d7d7d7", margin: "12px" }}
        columns={props.columns}
        dataSource={props.data}
        pagination={false}
      />
    </ConfigProvider>
  );
};

export default ComponentsTable;
