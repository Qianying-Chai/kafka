import React from "react";
import { Button } from "antd";
import "./Style/Button.css";

const SubmitButton = (props) => {
  return (
    <>
      <Button shape="round" className="submit-button" {...props}>
        SUBMIT
      </Button>
    </>
  );
};

export default SubmitButton;
