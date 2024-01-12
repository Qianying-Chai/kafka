import React from "react";
import "./Style/SelectLabel.css";
import { InfoCircleFilled } from "@ant-design/icons";

const SelectLabel = (props) => {
  return (
    <div className="select-title-wrapper" {...props}>
      <span className="select-title-prefix">*</span>
      <span id="select-title">{props.label}</span>
      <InfoCircleFilled />
    </div>
  );
};

export default SelectLabel;
