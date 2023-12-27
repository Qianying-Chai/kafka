import React from "react";
import "./Style/Header.css";
import { CompressOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useState } from "react";
const Header = () => {
  const [login, setLogin] = useState(true);

  // console.log(login);
  return (
    <Layout>
      <Layout.Header className="header">
        <div className="header-content-left">
          <CompressOutlined className="header-left-icon" />
          <span className="header-left-divider">|</span>
          <span className="header-left-dx-console">DX Console </span>
        </div>
        <div className="header-content-right">
          <div className="user">
            <div className="user-icon">TV</div>
            {login ? (
              <DownOutlined
                className="login-button"
                onClick={() => {
                  setLogin((state) => !state);
                }}
              />
            ) : (
              <UpOutlined
                className="logout-button"
                onClick={() => {
                  setLogin((state) => !state);
                }}
              />
            )}
          </div>
          <div
            className="logout-pop-up"
            style={{
              display: login ? "none" : "block",
            }}
          >
            LOGOUT
          </div>
        </div>
      </Layout.Header>
    </Layout>
  );
};
export default Header;
