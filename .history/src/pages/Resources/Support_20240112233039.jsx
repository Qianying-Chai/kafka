import React from "react";
import ComponentsTable from "../Components/ComponentsTable";
import ComponentsInput from "../Components/ComponentsInput";
import ComponentsPagination from "../Components/ComponentsPagination";
import categoryConstants from "../common/categoryConstants";
import ComponentsTitle from "../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../Components/ComponentsBreadcrumb";
import ComponentsContent from "../Components/ComponentsContent";

import { Space, Tag } from "antd";
import { ExportOutlined } from "@ant-design/icons";

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
              title: categoryConstants.USERE_REQUESTS_LEGACY,
            },
          ]}
        />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.USERE_REQUESTS_LEGACY} />
        </div>
      </div>
      <ComponentsContent title={categoryConstants.SUPPORT}></ComponentsContent>
    </>
  );
};
export default Support;
