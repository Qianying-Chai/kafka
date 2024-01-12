import React from "react";
import Card from "../../Components/ComponentsCard";
import categoryConstants from "../../common/categoryConstants";

const CreateMigratedClusters = () => {
  return (
    <Card
      title={categoryConstants.CREATE_CLUSTERS.replace("_", " ")}
      breadcrumbitems={[
        {
          title: "Home",
        },
        {
          title: "Kafka",
        },
        {
          href: `/kafka/${categoryConstants.CLUSTERS.toLowerCase()}`,
          title: categoryConstants.CLUSTERS,
        },
        {
          title: categoryConstants.CREATE_CLUSTERS.replace("_", " "),
        },
      ]}
    >
      CreateMigratedClusters
    </Card>
  );
};
export default CreateMigratedClusters;
