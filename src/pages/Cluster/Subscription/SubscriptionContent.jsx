import React, { useEffect, useState } from "react";
import "../Style/Subscription.css";
import categoryConstants from "../../common/categoryConstants";
import ComponentsTitle from "../../Components/ComponentsTitle";
import ComponentsBreadcrumb from "../../Components/ComponentsBreadcrumb";
import ComponentsContent from "../../Components/ComponentsContent";
import ComponentsSpin from "../../Components/ComponentSpin";
import SubscriptionContentTable from "./SubscriptionContentTable";

import {
  setClusterSubData,
  setClusterSubPaginator,
} from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Pagination } from "antd";

const SubscriptionContent = () => {
  const breadcrumb = [
    {
      title: "Home",
    },
    {
      title: "Kafka",
    },
    {
      title: categoryConstants.SUBSCRIPTION,
    },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const clusterSubPaginator = useSelector((state) => state.clusterSubPaginator);
  const { page, pageSize } = clusterSubPaginator;
  const { sorterOrder, sorterKey } = useSelector(
    (state) => state.clusterSubSorter
  );

  const { filterKey, filterValue } = useSelector(
    (state) => state.clusterSubFilter
  );

  const abortController = new AbortController();
  const signal = abortController.signal;

  const handleGetClusterSubData = () => {
    const CLUSTER_SUBSCRIPTION_URL = `http://localhost:1337/api/cluster-subscriptions?pagination[page]=${page}&pagination[pageSize]=${pageSize}${
      filterValue && `&filters[${filterKey}][$contains]=${filterValue}`
    }${sorterOrder && `&sort=${sorterKey}:${sorterOrder}`}`;

    fetch(CLUSTER_SUBSCRIPTION_URL, { signal })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        const covData = [];
        res.data.forEach((i) => {
          covData.push({
            key: i.id,
            mpsAppName: i.attributes.mpsAppName,
            id: i.id,
            apmId: i.attributes.apmId,
            adGroup: i.attributes.adGroup,
            endpoint: i.attributes.endpoint,
            topicName: i.attributes.topicName,
            channelName: i.attributes.channelName,
            clusterName: i.attributes.clusterName,
            regions: i.attributes.regions,
          });
        });

        dispatch(
          setClusterSubPaginator({
            ...clusterSubPaginator,
            total: res.meta.pagination.total,
          })
        );

        dispatch(setClusterSubData(covData));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const abortFetching = () => {
    abortController.abort();
  };
  useEffect(() => {
    handleGetClusterSubData();
  }, [page, pageSize, filterValue, sorterOrder]);

  return (
    <>
      <div>
        <ComponentsBreadcrumb items={breadcrumb} />
        <div className="content-banner">
          <ComponentsTitle title={categoryConstants.SUBSCRIPTION} />
          <Button
            shape="round"
            className="content-banner-button"
            type="primary"
          >
            <Link to={`/kafka/mps-clusters-subscriptions/create`}>
              <PlusOutlined style={{ marginRight: "8px" }} />
              {categoryConstants.CREATE_SUBSCRIPTION.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
      <ComponentsContent>
        {isLoading ? (
          <ComponentsSpin />
        ) : (
          <>
            <SubscriptionContentTable
              abortFetching={abortFetching}
              handleGetClusterSubData={handleGetClusterSubData}
            />
          </>
        )}
      </ComponentsContent>
    </>
  );
};
export default SubscriptionContent;
