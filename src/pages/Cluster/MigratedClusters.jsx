import React from "react";
import ComponentsCard from "../Components/ComponentsCard";
import "./Style/Clusters.css";
const MigratedClusters = () => {
  return (
    <ComponentsCard editebutton={"true"} title={"Clusters"}>
      <div className="clusters-content">
        <div id="clusters-text">
          <div className="text">
            A Kafka cluster is a independently deployed instance of Kafka with
            its own set of topics.Each cluster below has only one environment.
            Click on each to view details, topic and other info.
          </div>
          <div className="text">
            This is our legacy offering. Please see our new offering{" "}
            <span className="clusters-taas">Topics As a Service(TaaS) </span> to
            be subscribe to one or more toics without a need to care about what
            cluster it is on{" "}
          </div>
        </div>
        <div className="border">
          <p>
            There are currently no resources associated with yout AD Groups.
          </p>
        </div>
      </div>
    </ComponentsCard>
  );
};
export default MigratedClusters;
