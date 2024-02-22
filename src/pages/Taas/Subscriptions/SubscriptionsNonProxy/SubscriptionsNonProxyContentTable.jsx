import React, { useEffect, useState, createContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import "../Style/CreateSubscriptionNonproxy.css";
import { setPagination } from "../../../../redux/reducer";
import { apiEndpoint, getEndpoint } from "../../Configure";

import { Table, Modal, Popover } from "antd";
import {
  TableOutlined,
  CheckCircleFilled,
  MoreOutlined,
  CloseCircleFilled,
  QuestionCircleFilled,
} from "@ant-design/icons";

const SubscriptionsNonProxyContentTable = (props) => {
  const { abortFetching, handleGetData } = props;
  const [isAclModalOpen, setIsAclModalOpen] = useState(false);
  const [actionPopoverOpen, setActionPopoverOpen] = useState({});
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [aclData, setAclData] = useState([]);
  const [actionRecord, setActionRecord] = useState([]);

  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination);
  const { pageSize, page, total } = pagination;

  const taasSubNonProxyData = useSelector((state) => state.taasSubNonProxyData);

  const handleSubscriptionsTableChange = (page, _, extra) => {
    abortFetching();
    dispatch(
      setPagination({
        pageSize: page.pageSize,
        page: page.current,
        total: page.total,
      })
    );
  };

  const handleAclClick = (record) => {
    setIsAclModalOpen(true);

    const covData = JSON.parse(
      record.aclConfig
    )?.detail?.customResource?.acls.map((i, index) => ({ ...i, key: index }));
    setAclData(covData);
  };

  const handleAclModalCancel = () => {
    setIsAclModalOpen(false);
  };

  const modalStyles = {
    content: {
      padding: "32px 32px 24px",
      borderRadius: 0,
    },
  };

  const aclColumns = [
    {
      title: "Principal",
      dataIndex: "Principal",
      key: "Principal",
      render: (_, record) => <a>{record.principal}</a>,
    },
    {
      title: "Permission Type",
      dataIndex: "Permission Type",
      key: "Permission Type",
      render: (_, record) => <a>{record.permissionType}</a>,
    },
    {
      title: "Resource",
      dataIndex: "Resource",
      key: "Resource",
      render: (_, record) => <a>{record.resourceType}</a>,
    },
    {
      title: "Operation",
      key: "Operation",
      dataIndex: "Operation",
      render: (_, record) => <a>{record.aclOperation}</a>,
    },
    {
      title: "Pattern",
      key: "Pattern",
      dataIndex: "Operation",
      render: (_, record) => <a>{record.patternType}</a>,
    },
  ];

  const handleActionPopoverOpenChange = (id, newOpen) => {
    setActionPopoverOpen({ [id]: newOpen });
  };

  const hideActionPopover = () => {
    setActionPopoverOpen(false);
  };

  const handlePopoverDeleteSubscription = (record) => {
    setActionRecord(record);

    showActionModal();

    hideActionPopover();
  };

  const showActionModal = () => {
    setIsActionModalOpen(true);
  };

  const handleActionModalDeleteButton = () => {
    setIsActionModalOpen(false);

    getEndpoint(
      apiEndpoint.LEGACY.DELETE_NON_PROXY_SUBSCRIPTION_DEV,
      actionRecord.id
    )
      .then((res) => {
        handleGetData();
        Modal.success({
          title: "SUCCESS",
          content: "Subscription Deleted Successfully !",
          okButtonProps: {
            className: "modal-ok-btn",
          },
          styles: modalStyles,
        });
      })
      .catch((error) => {
        Modal.error({
          title: "ERROR",
          content: "Something went wrong. Please try again later.",
          okButtonProps: {
            className: "modal-ok-btn",
          },
          styles: modalStyles,
        });
      });
  };
  const handleActionModalCancel = () => {
    setIsActionModalOpen(false);
  };

  const subscriptionsColumns = [
    {
      title: "Id",
      key: "Id",
      width: "9%",
      render: (_, record) => <a>{record.id}</a>,
    },
    {
      title: "Topic Name",
      key: "Topic Name",
      width: "30%",
      render: (_, record) => <a>{record.topicName}</a>,
    },
    {
      title: "APM ID",
      key: "APM ID",
      width: "9%",
      render: (_, record) => <a>{record.apmId}</a>,
    },
    {
      title: "Application on Name",
      key: "Application on Name",
      width: "9%",
      render: (_, record) => <a>{record.applicationName}</a>,
    },
    {
      title: "AD Group",
      key: "AD Group",
      width: "9%",
      ellipsis: true,
      render: (_, record) => <a>{record.adGroup}</a>,
    },
    {
      title: "DL Notification on Email",
      key: "DL Notification on Email",
      width: "9%",
      render: (_, record) => <a>{record.dlNotificationOnEmail}</a>,
    },
    {
      title: "Permission",
      key: "Permission",
      width: "9%",
      render: (_, record) => <a>{record.permission}</a>,
    },
    {
      title: "ACL",
      key: "ACL",
      width: "5%",
      render: (_, record) => (
        <TableOutlined
          onClick={() => handleAclClick(record)}
          style={{ color: "#041F41" }}
        />
      ),
    },
    {
      title: "Auto-Approved",
      key: "Auto-Approved",
      width: "9%",
    },
    {
      title: "Status",
      key: "Status",
      width: "14%",
      render: (_, record) => (
        <>
          {record.status.toLowerCase() === "approved" && (
            <>
              {" "}
              <CheckCircleFilled
                style={{ color: "#32cd32", marginRight: "3px" }}
              />
              <span>Approved</span>{" "}
            </>
          )}
          {record.status.toLowerCase() === "denied" && (
            <>
              <CloseCircleFilled style={{ color: "red", marginRight: "3px" }} />
              <span>Denied</span>{" "}
            </>
          )}
          {record.status.toLowerCase() === "requested" && (
            <>
              {" "}
              <QuestionCircleFilled
                style={{ color: "blue", marginRight: "3px" }}
              />
              <span>Requested</span>{" "}
            </>
          )}
        </>
      ),
    },
    {
      title: "",
      key: "Action",
      width: "9%",
      render: (_, record) => (
        <Popover
          content={
            <a
              onClick={() => handlePopoverDeleteSubscription(record)}
              style={{ color: "#0751A9" }}
            >
              Delete Subscription
            </a>
          }
          trigger="click"
          open={actionPopoverOpen[record.id]}
          onOpenChange={(newOpen) =>
            handleActionPopoverOpenChange(record.id, newOpen)
          }
        >
          <MoreOutlined />
        </Popover>
      ),
    },
  ];

  return (
    <>
      <Table
        style={{ border: "1px solid	#d7d7d7", margin: "12px 0" }}
        columns={subscriptionsColumns}
        dataSource={taasSubNonProxyData}
        onChange={handleSubscriptionsTableChange}
        pagination={{
          showSizeChanger: true,
          total: total,
          // size: "small",
        }}
      />

      <Modal
        title="ACL"
        open={isAclModalOpen}
        styles={modalStyles}
        onCancel={handleAclModalCancel}
        width="1000px"
        footer={null}
        closeIcon={false}
      >
        <Table
          columns={aclColumns}
          dataSource={aclData}
          pagination={false}
          style={{ border: "1px solid	#d7d7d7", margin: "12px 0" }}
        />
      </Modal>
      <Modal
        title={`Subscription Id: ${actionRecord.subscriptionsId} `}
        open={isActionModalOpen}
        onCancel={handleActionModalCancel}
        onOk={handleActionModalDeleteButton}
        cancelText={"CANCEL"}
        okText={"DELETE"}
        okButtonProps={{ className: "modal-ok-btn" }}
        cancelButtonProps={{ className: "modal-cancel-btn" }}
        width={400}
        closeIcon={false}
      >
        <p>Do you want to delete subscription ?</p>
      </Modal>
    </>
  );
};
export default SubscriptionsNonProxyContentTable;
