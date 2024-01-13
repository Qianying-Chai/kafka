import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

const ComponentsTitle = (props) => {
  return (
    <>
      <Title level={3}>{props.title}</Title>
    </>
  );
};
export default ComponentsTitle;
