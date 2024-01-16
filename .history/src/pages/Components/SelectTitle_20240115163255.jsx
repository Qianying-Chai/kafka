import React from "react";
import "./Style/SelectTitle.css";
import { Radio, Typography } from "antd";
const { Paragraph } = Typography;

const SelectTitle = (props) => {
  return (
    <Typography.Title level={5} style={{ margin: 0 }}>
      <span className="prefix">*</span>
      <span className="Select-title">{props.SelectTitle}</span>
    </Typography.Title>
  );
};

export default SelectTitle;
