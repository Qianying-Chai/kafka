import { ConfigProvider, Table } from "antd";

const ComponentsTable = ({ columns, data, pagination, onChange }) => {
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
          colorLink: "#0751A9",
        },
      }}
    >
      <Table
        style={{ border: "1px solid	#d7d7d7", margin: "12px 0" }}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

export default ComponentsTable;
