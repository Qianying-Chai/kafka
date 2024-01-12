import React from "react";
import { Link } from "react-router-dom";
import "./Style/ComponentsCard.css";
import { Layout, theme, Button, ConfigProvider, Breadcrumb } from "antd";

const ComponentsCard = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { editebutton, title, breadcrumbitems } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            linkColor: "#0751A9",
            lastItemColor: "#000000D9",
            itemColor: "#0751A9",
            linkHoverColor: "#0751A9",
          },
        },
        token: {
          colorPrimaryHover: "#1890ff",
          colorBgTextHover: "#F5F5F5",
        },
      }}
    >
      <Layout
        style={{
          padding: "24px 50px",
          height: "fit-content",
        }}
      >
        <div>
          <Breadcrumb
            style={{
              marginBottom: "30px",
            }}
            separator=">"
            items={breadcrumbitems}
          ></Breadcrumb>
          <div className="content-banner">
            <span className="content-banner-title">{title}</span>
            {editebutton ? (
              <Button
                type="primary"
                shape="round"
                size={"medium"}
                className="content-banner-button"
              >
                <Link to={"create"}>{`CREATE ${title.toUpperCase()}`}</Link>
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
        <Layout.Content
          style={{
            padding: "20px 32px 32px",
            minHeight: 280,
            background: colorBgContainer,
          }}
          {...props}
        ></Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};
export default ComponentsCard;
