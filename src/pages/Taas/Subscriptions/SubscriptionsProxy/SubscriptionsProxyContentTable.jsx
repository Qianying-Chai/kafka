import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTaasSubProxyPaginator,
  setTaasSubProxySorter,
  setTaasSubProxyFilter,
} from "../../../../redux/action";

import Highlighter from "react-highlight-words";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import { Input, Table, Popover, Modal } from "antd";

const SubscriptionsProxyContentTable = (props) => {
  const { abortFetching } = props;
  const [isActionPopoverOpen, setIsActionPopoverOpen] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [actionData, setActionData] = useState({});
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [clickedPopoverItem, setClickedPopoverItem] = useState("");
  const searchInput = useRef(null);

  const dispatch = useDispatch();
  const taasSubProxyPaginator = useSelector(
    (state) => state.taasSubProxyPaginator
  );
  const { total } = taasSubProxyPaginator;

  const taasSubProxyData = useSelector((state) => state.taasSubProxyData);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText("");
  // };

  const handleProxyTableInput = (dataIndex, value) => {
    abortFetching();
    dispatch(
      setTaasSubProxyFilter({
        filterKey: dataIndex,
        filterValue: value,
      })
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ selectedKeys, confirm }) => (
      <div
        onKeyDown={(e) => e.stopPropagation()}
        style={{ width: "300px", position: "absolute", left: "25px" }}
      >
        <Input
          ref={searchInput}
          placeholder={`Input ${dataIndex} to search`}
          value={selectedKeys[0]}
          onChange={(e) => handleProxyTableInput(dataIndex, e.target.value)}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            display: "block",
            width: "100%",
            marginRight: "10px",
          }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      } else {
      }
    },
    onCell: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleOpenChange = (newOpen, id) => {
    setIsActionPopoverOpen({ [id]: newOpen });
  };

  const hideActionPopover = () => {
    setIsActionPopoverOpen(false);
  };

  const showActionModal = () => {
    setIsActionModalOpen(true);
  };

  const handleStartProxyCancelBtn = () => {
    setIsActionModalOpen(false);
  };

  const handleStartProxyStartBtn = () => {
    setIsActionModalOpen(false);
  };

  const handleStartProxyClick = (record) => {
    setActionData(record);
    showActionModal();
    hideActionPopover();
    setClickedPopoverItem("Start Proxy");
  };

  const handleStopProxyClick = (record) => {
    setActionData(record);
    showActionModal();
    hideActionPopover();
    setClickedPopoverItem("Stop Proxy");
  };

  const handleDeleteSubClick = (record) => {
    setActionData(record);
    showActionModal();
    hideActionPopover();
    setClickedPopoverItem("Delete Subscription");
  };

  const handleOffsetResetClick = (record) => {
    setActionData(record);
    showActionModal();
    hideActionPopover();
    setClickedPopoverItem("Offset Reset");
  };

  console.log(actionData);

  const subProxyTableColumns = [
    {
      title: "Subscription Name",
      key: "mpsAppName",
      width: "13%",
      sorter: true,
      ...getColumnSearchProps("mpsAppName"),
      render: (_, record) => <a>{record.subscriptionname}</a>,
    },
    {
      title: "APM Id",
      key: "apmId",
      width: "13%",
      ...getColumnSearchProps("apmId"),
      render: (_, record) => <a>{record.apmid}</a>,
    },
    {
      title: "AD Group",
      key: "adGroup",
      width: "13%",
      ...getColumnSearchProps("adGroup"),
      render: (_, record) => <a>{record.adgroup}</a>,
    },
    {
      title: "End Point URI",
      key: "endpoint",
      width: "13%",
      ellipsis: true,
      ...getColumnSearchProps("endpoint"),
      render: (_, record) => <a>{record.endpointurl}</a>,
    },
    {
      title: "Topic",
      key: "topicName",
      width: "13%",
      ...getColumnSearchProps("topicName"),
      render: (_, record) => <a>{record.topic}</a>,
    },
    {
      title: "Slack Channel",
      key: "channelName",
      width: "13%",
      ...getColumnSearchProps("channelName"),
      render: (_, record) => <a>{record.slackchannel}</a>,
    },
    {
      title: "Action",
      key: "",
      width: "5%",
      render: (_, record) => (
        <Popover
          content={
            <>
              <p
                onClick={() => {
                  handleStartProxyClick(record);
                }}
              >
                {" "}
                <a style={{ color: "#0751A9" }}>Start Proxy</a>
              </p>
              <p
                onClick={() => {
                  handleStopProxyClick(record);
                }}
              >
                {" "}
                <a style={{ color: "#0751A9" }}>Stop Proxy</a>
              </p>
              <p
                onClick={() => {
                  handleDeleteSubClick(record);
                }}
              >
                {" "}
                <a style={{ color: "#0751A9" }}>Delete Subscription</a>
              </p>
              <p
                onClick={() => {
                  handleOffsetResetClick(record);
                }}
              >
                {" "}
                <a style={{ color: "#0751A9" }}>Offset Reset</a>
              </p>
            </>
          }
          trigger="click"
          open={isActionPopoverOpen[record.id]}
          onOpenChange={(newOpen) => {
            handleOpenChange(newOpen, record.id);
          }}
        >
          <MoreOutlined />
        </Popover>
      ),
    },
  ];

  const handleSubProxyTableChange = (pagination, _, extra) => {
    abortFetching();

    if (extra.order === "ascend") {
      dispatch(
        setTaasSubProxySorter({
          sorterOrder: "asc",
          sorterKey: extra.columnKey,
        })
      );
    } else if (extra.order === "descend") {
      dispatch(
        setTaasSubProxySorter({
          sorterOrder: "desc",
          sorterKey: extra.columnKey,
        })
      );
    } else {
      dispatch(
        setTaasSubProxySorter({
          sorterOrder: "",
          sorterKey: "",
        })
      );
    }

    dispatch(
      setTaasSubProxyPaginator({
        ...taasSubProxyPaginator,
        pageSize: pagination.pageSize,
        page: pagination.current,
      })
    );
  };

  return (
    <>
      <Table
        style={{ border: "1px solid	#d7d7d7", margin: "12px 0" }}
        columns={subProxyTableColumns}
        dataSource={taasSubProxyData}
        pagination={{
          total: total,
          // size: "small",
        }}
        onChange={handleSubProxyTableChange}
      />
      {clickedPopoverItem === "Start Proxy" && (
        <Modal
          title={`Subscription Id: ${actionData.subscriptionname} `}
          open={isActionModalOpen}
          onCancel={handleStartProxyCancelBtn}
          onOk={handleStartProxyStartBtn}
          cancelText={"CANCEL"}
          okText={"DELETE"}
          okButtonProps={{ className: "modal-ok-btn" }}
          cancelButtonProps={{ className: "modal-cancel-btn" }}
          width={400}
          closeIcon={false}
        >
          <p>Do you want to delete subscription ?</p>
        </Modal>
      )}
    </>
  );
};
export default SubscriptionsProxyContentTable;
