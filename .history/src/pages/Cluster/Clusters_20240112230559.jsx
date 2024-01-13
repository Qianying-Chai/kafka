import React from "react";
import "./Style/Clusters.css";
import ComponentsCard from "../Components/ComponentsCard";
import categoryConstants from "../common/categoryConstants";
import ComponentsTitle from "../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../Components/ComponentsBreadcrumb";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Clusters = () => {
  return (
    <>
      <div>
        <ComponentsBreadcrumb
          items={[
            {
              title: "Home",
            },
            {
              title: "Kafka",
            },
            {
              title: categoryConstants.TOPICS,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.TOPICS} />
          <Button shape="round" size="medium" className="content-banner-button">
            <PlusOutlined />
            {`CREATE ${categoryConstants.TOPICS.toLocaleUpperCase()}`}
          </Button>
        </div>
      </div>
      <ComponentsCard editebutton={"true"} title={categoryConstants.CLUSTERS}>
        <div className="clusters-content">
          <div id="clusters-text">
            <div className="text">
              A Kafka cluster is a independently deployed instance of Kafka with
              its own set of topics.Each cluster below has only one environment.
              Click on each to view details, topic and other info.
            </div>
            <div className="text">
              This is our legacy offering. Please see our new offering{" "}
              <span className="clusters-taas">Topics As a Service(TaaS) </span>{" "}
              to be subscribe to one or more toics without a need to care about
              what cluster it is on{" "}
            </div>
          </div>
          <div className="border">
            <p>
              There are currently no resources associated with yout AD Groups.
            </p>
          </div>
        </div>
      </ComponentsCard>
    </>
  );
};
export default Clusters;
