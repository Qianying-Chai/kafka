import React from "react";
import "./Style/SelectTitle.css";
import { InfoCircleTwoTone } from "@ant-design/icons";
const SelectTitle = (props) => {
  return (
    <div className="Select-title-wrapper">
      <span className="prefix">*</span>
      <span className="Select-title">APM ID</span>
      <InfoCircleTwoTone />
    </div>
  );
};

export default SelectTitle;
