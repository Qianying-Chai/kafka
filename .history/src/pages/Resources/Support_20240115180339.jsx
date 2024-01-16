import React from "react";
import ComponentsTable from "../Components/ComponentsTable";
import ComponentsInput from "../Components/ComponentsInput";
import ComponentsPagination from "../Components/ComponentsPagination";
import categoryConstants from "../common/categoryConstants";
import ComponentsTitle from "../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../Components/ComponentsBreadcrumb";
import ComponentsContent from "../Components/ComponentsContent";

const Support = () => {
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
              title: categoryConstants.SUPPORT,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.SUPPORT} />
        </div>
      </div>
      <ComponentsContent title={categoryConstants.SUPPORT}></ComponentsContent>
    </>
  );
};
export default Support;
