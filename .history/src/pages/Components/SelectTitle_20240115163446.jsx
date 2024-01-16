import React from "react";
import "./Style/SelectTitle.css";

const SelectTitle = (props) => {
  return (
    <div className="Select-title-wrapper">
      <span className="prefix">*</span>
      <span className="Select-title">APM ID</span>
    </div>
  );
};

export default SelectTitle;
