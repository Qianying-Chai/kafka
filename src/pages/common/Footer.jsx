import React from "react";
import { Layout } from "antd";
import { CompressOutlined } from "@ant-design/icons";
import "./Style/Footer.css";

const Footer = () => {
  return (
    <Layout.Footer className="footer">
      <div className="footer-text-left">
        2011 - 2023 @ Walmart Inc. All Rights Reserved.
      </div>
      <div className="footer-text-right">
        <span className="footer-text-right-walmart">Walmart</span>
        <CompressOutlined className="footer-icon" />
        <span className="footer-text-right-global-tech">Global Tech</span>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
