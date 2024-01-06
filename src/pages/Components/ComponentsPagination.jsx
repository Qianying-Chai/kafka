import { Pagination, ConfigProvider } from "antd";
const ComponentsPagination = (props) => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 0,
          },
        }}
      >
        <Pagination
          defaultCurrent={1}
          size="small"
          showSizeChanger
          showQuickJumper={props.showQuickJumper}
          defaultPageSize={props.defaultPageSize}
          total={props.total}
          style={{ display: "flex", justifyContent: "end" }}
        />
      </ConfigProvider>
    </>
  );
};

export default ComponentsPagination;
