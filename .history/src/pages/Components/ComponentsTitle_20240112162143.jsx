import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

const ComponentsTitle = (props) => {
  return (
    <>
      <Input
        size="large"
        placeholder={props.placeholder}
        prefix={<SearchOutlined />}
        style={{ margin: "18px 0px", borderRadius: "0px" }}
      />
    </>
  );
};

export default ComponentsTitle;
