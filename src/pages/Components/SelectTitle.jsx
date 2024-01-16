import React from "react";
import "./Style/SelectTitle.css";
import { InfoCircleFilled } from "@ant-design/icons";
const SelectTitle = (props) => {
  return (
    <div className="Select-title-wrapper">
      <span className="prefix">*</span>
      <span className="Select-title">{props.title}</span>
      <InfoCircleFilled />
    </div>
  );
};

export default SelectTitle;
