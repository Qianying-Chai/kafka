import React from "react";
import "./Style/Button.css";
import { Button } from "antd";

const CancelButton = (props) => {
  return (
    <>
      <Button shape="round" className="cancel-button" {...props}>
        CANCEL
      </Button>
    </>
  );
};

export default CancelButton;
