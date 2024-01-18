import React from "react";
import "../Style/Clusters.css";
import categoryConstants from "../../common/categoryConstants";
import ComponentsTitle from "../../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../../Components/ComponentsBreadcrumb";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ComponentsContent from "../../Components/ComponentsContent";

import { Link } from "react-router-dom";

const MigratedClusters = () => {
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
              title: categoryConstants.CLUSTERS,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.CLUSTERS} />
          <Button
            shape="round"
            className="content-banner-button"
            type="primary"
          >
            <Link
              to={`/kafka/${categoryConstants.CLUSTERS.toLowerCase()}/create`}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_CLUSTER.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
      <ComponentsContent>
        <div className="clusters-content">
          <div id="clusters-text">
            <div className="text">
              A Kafka cluster is a independently deployed instance of Kafka with
              its own set of topics.Each cluster below has only one environment.
              Click on each to view details, topic and other info.
            </div>
            <div className="text">
              This is our legacy offering. Please see our new offering{" "}
              <span className="clusters-taas">
                {" "}
                <Link to={`/kafka/${categoryConstants.TOPICS.toLowerCase()}`}>
                  Topics As a Service(TaaS)
                </Link>
              </span>{" "}
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
      </ComponentsContent>
    </>
  );
};
export default MigratedClusters;
