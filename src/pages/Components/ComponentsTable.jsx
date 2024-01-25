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
      }}
    >
      <Table
        style={{ border: "1px solid	#d7d7d7", margin: "12px 0" }}
        columns={props.columns}
        dataSource={props.data}
        pagination={props.pagination}
      />
    </ConfigProvider>
  );
};

export default ComponentsTable;
