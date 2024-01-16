import React from "react";
import "./Style/SelectTitle.css";

const SelectTitle = (props) => {
  return (
    <div>
      <span className="prefix">*</span>
      <span className="Select-title">{props.SelectTitle}</span>
    </div>
  );
};

export default SelectTitle;
