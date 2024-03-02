import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Style/Subscription.css";
import {
  setClusterSubPaginator,
  setClusterSubFilter,
  setClusterSubSorter,
} from "../../../redux/action";
import { apiEndpoint, getEndpoint } from "../../Taas/Configure";

import Highlighter from "react-highlight-words";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";

import {
  Input,
  Popover,
  Modal,
  Select,
  Table,
  Radio,
  Divider,
  DatePicker,
} from "antd";

const SubscriptionContentTable = ({
  abortFetching,
  handleGetClusterSubData,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [isActionPopoverOpen, setIsActionPopoverOpen] = useState({});
  const [actionData, setActionData] = useState({});
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [clickedPopoverItem, setClickedPopoverItem] = useState("");

  const [modalRadioValue, setModalRadioValue] = useState("Earliest");
  const [offsetResetInputValue, setOffsetResetInputValue] = useState("");
  const [copyOffsetsRadioValue, setCopyOffsetsRadioValue] = useState("Migrate");
  const [selectedOffsetType, setSelectedOffsetType] = useState("Earliest");
  const [selectedTimeStamp, setSelectedTimeStamp] = useState("");
  const [checkCopyToMaps, setCheckCopyToMaps] = useState("Migrate");
  const [inputConsumerGroup, setInputConsumerGroup] = useState("");

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const searchInput = useRef(null);
  const dispatch = useDispatch();

  const clusterSubPaginator = useSelector((state) => state.clusterSubPaginator);
  const { total } = clusterSubPaginator;
  const clusterSubData = useSelector((state) => state.clusterSubData);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleClusterTableInput = (dataIndex, value) => {
    abortFetching();
    dispatch(
      setClusterSubFilter({
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
          onChange={(e) => handleClusterTableInput(dataIndex, e.target.value)}
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

  const handleModalCancelBtn = () => {
    setIsActionModalOpen(false);
  };

  const handleStartStopBtn = (actionType) => {
    setIsActionModalOpen(false);
    getEndpoint(apiEndpoint.MPS.SUPSCRIPTION_PROXY_ACTION, actionType)
      .then((res) => {
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

  const handleDeleteSubBtn = () => {
    setIsActionModalOpen(false);
    getEndpoint(apiEndpoint.MPS.DELETE_MPS_SUBSCRIPTION_DEV, "", actionData.id)
      .then((res) => {
        handleGetClusterSubData();
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

  const handleOffsetResetBtn = () => {
    setIsActionModalOpen(false);
    let data = {};
    switch (selectedOffsetType) {
      case "Earliest":
        data = { offsetSpec: "EARLISET" };
        break;
      case "Latest":
        data = { offsetSpec: "LATEST" };
        break;
      case "To Timestamp":
        data = {
          offsetSpec: "TO_TIMESTAMP",
          moveToDate: selectedTimeStamp,
        };
        break;
      case "Copy Offsets":
        data = {
          offsetSpec: "COPY_OFFSETS",
          consumerGroup: inputConsumerGroup,
          copyToMPS: checkCopyToMaps,
        };
        break;
      default:
        break;
    }
    getEndpoint(apiEndpoint.MPS.POST_TAAS_OFFSET_RESET, "", data)
      .then((res) => {
        Modal.success({
          title: "SUCCESS",
          content: "Subscription Deleted Successfully !",
          okButtonProps: {
            className: "modal-ok-btn",
          },
          styles: modalStyles,
        });

        handleStateChanges("Earliest", "Migrate");
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

  const handlePopoverItemClick = (record, type) => {
    const regions = Object.keys(record.regions);
    setActionData(record);
    showActionModal();
    hideActionPopover();
    setClickedPopoverItem(type);
    setRegions(regions);
    setSelectedRegion(regions[0]);
  };

  const handleStateChanges = (radioValue, offsetRadio) => {
    setModalRadioValue(radioValue);
    setCopyOffsetsRadioValue(offsetRadio);
    setOffsetResetInputValue("");
    setSelectedRegion("");
  };

  const actionModuleSelectoptions = regions.map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  const clusterSubTablecolumns = [
    {
      title: "Subscription Name",
      key: "mpsAppName",
      width: "13%",
      ellipsis: true,
      sorter: true,
      ...getColumnSearchProps("mpsAppName"),
      render: (_, record) => <a>{record.mpsAppName}</a>,
    },
    {
      title: "APM Id",
      key: "apmId",
      width: "13%",
      ...getColumnSearchProps("apmId"),
      render: (_, record) => <a>{record.apmId}</a>,
    },
    {
      title: "AD Group",
      key: "adGroup",
      width: "13%",
      ...getColumnSearchProps("adGroup"),
      render: (_, record) => <a>{record.adGroup}</a>,
    },
    {
      title: "End Point URI",
      key: "endpoint",
      width: "13%",
      ...getColumnSearchProps("endpoint"),
      render: (_, record) => <a>{record.endpoint}</a>,
    },
    {
      title: "Topic",
      key: "topicName",
      width: "13%",
      ...getColumnSearchProps("topicName"),
      render: (_, record) => <a>{record.topicName}</a>,
    },
    {
      title: "Cluster",
      key: "clusterName",
      width: "13%",
      ...getColumnSearchProps("clusterName"),
      render: (_, record) => <a>{record.clusterName}</a>,
    },
    {
      title: "Slack Channel",
      key: "channelName",
      width: "13%",
      ...getColumnSearchProps("channelName"),
      render: (_, record) => <a>{record.channelName}</a>,
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (_, record) => (
        <Popover
          content={
            <>
              <p
                onClick={() => {
                  handlePopoverItemClick(record, "Start Proxy");
                }}
              >
                {" "}
                <a style={{ color: "#0751A9" }}>Start Proxy</a>
              </p>
              <p
                onClick={() => {
                  handlePopoverItemClick(record, "Stop Proxy");
                }}
              >
                {" "}
                <a style={{ color: "#0751A9" }}>Stop Proxy</a>
              </p>
              <p
                onClick={() => {
                  handlePopoverItemClick(record, "Delete Subscription");
                }}
              >
                {" "}
                <a style={{ color: "#0751A9" }}>Delete Subscription</a>
              </p>
              <p
                onClick={() => {
                  handlePopoverItemClick(record, "Offset Reset");
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

  const handleClusterSubTableChange = (pagination, _, extra) => {
    abortFetching();

    if (extra.order === "ascend") {
      dispatch(
        setClusterSubSorter({
          sorterOrder: "asc",
          sorterKey: extra.columnKey,
        })
      );
    } else if (extra.order === "descend") {
      dispatch(
        setClusterSubSorter({
          sorterOrder: "desc",
          sorterKey: extra.columnKey,
        })
      );
    } else {
      dispatch(
        setClusterSubSorter({
          sorterOrder: "",
          sorterKey: "",
        })
      );
    }

    dispatch(
      setClusterSubPaginator({
        ...clusterSubPaginator,
        pageSize: pagination.pageSize,
        page: pagination.current,
      })
    );
  };
  const modalStyles = {
    content: {
      padding: "32px 32px 24px",
      borderRadius: 0,
    },
  };

  return (
    <>
      <Table
        style={{ border: "1px solid	#d7d7d7", margin: "12px 0" }}
        columns={clusterSubTablecolumns}
        dataSource={clusterSubData}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          total: total,
        }}
        onChange={handleClusterSubTableChange}
      />
      {(clickedPopoverItem === "Start Proxy" ||
        clickedPopoverItem === "Stop Proxy") && (
        <Modal
          title={`Subscription Name: ${actionData.mpsAppName} `}
          open={isActionModalOpen}
          onCancel={handleModalCancelBtn}
          onOk={() => handleStartStopBtn(clickedPopoverItem)}
          cancelText={"CANCEL"}
          okText={clickedPopoverItem === "Start Proxy" ? "START" : "STOP"}
          okButtonProps={{ className: "modal-ok-btn" }}
          cancelButtonProps={{ className: "modal-cancel-btn" }}
          width={416}
          closeIcon={false}
          // style={{ color: "#000000D9" }}
        >
          <p>{`Do you want to ${clickedPopoverItem.toLocaleLowerCase()} connection?`}</p>
          {regions.length > 1 ? (
            <div>
              <span className="modal-select-prefix">Select Region:</span>{" "}
              <Select
                defaultValue={selectedRegion}
                style={{
                  width: 160,
                }}
                onSelect={(value) => {
                  setSelectedRegion(value);
                }}
                options={actionModuleSelectoptions}
              />
            </div>
          ) : (
            <div>Region: {regions}</div>
          )}
        </Modal>
      )}
      {clickedPopoverItem === "Delete Subscription" && (
        <Modal
          title={`Subscription Name: ${actionData.mpsAppName} `}
          open={isActionModalOpen}
          onCancel={handleModalCancelBtn}
          onOk={handleDeleteSubBtn}
          cancelText={"CANCEL"}
          okText={"DELETE"}
          okButtonProps={{ className: "modal-ok-btn" }}
          cancelButtonProps={{ className: "modal-cancel-btn" }}
          width={416}
          closeIcon={false}
        >
          <p>
            This operation cannot be undone. This will permanently delete the
            subscription.
          </p>
          <p>
            This subscription will be deleted in following regions:{" "}
            <span style={{ fontWeight: "bolder" }}>{regions.join(", ")}</span>
          </p>
        </Modal>
      )}
      {clickedPopoverItem === "Offset Reset" && (
        <Modal
          title={`Subscription Name: ${actionData.mpsAppName} `}
          open={isActionModalOpen}
          onCancel={handleModalCancelBtn}
          onOk={handleOffsetResetBtn}
          cancelText={"CANCEL"}
          okText={clickedPopoverItem.toUpperCase()}
          okButtonProps={{ className: "modal-ok-btn" }}
          cancelButtonProps={{ className: "modal-cancel-btn" }}
          width={416}
          closeIcon={false}
        >
          <div>
            <div>
              please select offset action to subscription{" "}
              {actionData.subscriptionname}?
            </div>
            <Radio.Group
              value={modalRadioValue}
              onChange={(e) => {
                setModalRadioValue(e.target.value);
                setSelectedOffsetType(e.target.value);
              }}
              className="modal-radio-group"
            >
              <Radio value={"Earliest"}>Earliest</Radio>
              <Radio value={"Latest"}>Latest</Radio>
              <Radio value={"To Timestamp"}>To Timestamp</Radio>
              <Radio value={"Copy Offsets"}>Copy Offsets</Radio>
            </Radio.Group>
            <div className="radioReminder">
              {modalRadioValue === "Earliest" && (
                <p>
                  {" "}
                  MPS consumer group will be moved to earliest offsets only if
                  the consumer group exists.
                </p>
              )}
              {modalRadioValue === "Latest" && (
                <p>
                  MPS consumer group will be moved to LATEST only if consumer
                  roup exists.
                </p>
              )}
              {modalRadioValue === "To Timestamp" && (
                <p>
                  MPS consumer group will be moved to specific timestamp only if
                  the consumer group exists.
                </p>
              )}
              {modalRadioValue === "Copy Offsets" && (
                <>
                  <p>
                    {" "}
                    For Migrate, offsets will be copied from Application
                    consumer group to MPS consumer group.
                  </p>
                  <p>
                    {" "}
                    For Rollback, offset will be copied from MPS consumer group
                    to application conusmer group.
                  </p>
                </>
              )}
            </div>
            <Divider />
            {regions.length > 1 ? (
              <div>
                <span className="modal-select-prefix">Select Region:</span>{" "}
                <Select
                  defaultValue={selectedRegion}
                  onSelect={(value) => {
                    setSelectedRegion(value);
                  }}
                  style={{
                    width: 160,
                  }}
                  options={actionModuleSelectoptions}
                />
              </div>
            ) : (
              <div>Region: {regions}</div>
            )}
            {modalRadioValue === "To Timestamp" && (
              <div className="modal-select-wrapper">
                <span className="modal-select-prefix">Select Timestamp:</span>{" "}
                <DatePicker
                  showTime
                  onChange={(dateString) => {
                    setSelectedTimeStamp(dateString);
                  }}
                  style={{
                    width: 200,
                  }}
                />
              </div>
            )}
            {modalRadioValue === "Copy Offsets" && (
              <>
                <Radio.Group
                  defaultValue={"Migrate"}
                  onChange={(e) => {
                    setCheckCopyToMaps(e.target.value);
                    setCopyOffsetsRadioValue(e.target.value);
                    setOffsetResetInputValue("");
                  }}
                  className="modal-radio-group"
                >
                  <Radio value={"Migrate"}>Migrate</Radio>
                  <Radio value={"Rollback"}>Rollback</Radio>
                </Radio.Group>
                <div>
                  From:
                  <Input
                    value={
                      copyOffsetsRadioValue === "Migrate"
                        ? offsetResetInputValue
                        : `connect-${actionData?.regions[selectedRegion]?.connectorName}`
                    }
                    onChange={(e) => {
                      setInputConsumerGroup(e.target.value);
                      setOffsetResetInputValue(e.target.value);
                    }}
                    disabled={copyOffsetsRadioValue === "Rollback"}
                  />
                </div>
                <div>
                  To:
                  <Input
                    value={
                      copyOffsetsRadioValue === "Rollback"
                        ? offsetResetInputValue
                        : `connect-${actionData?.regions[selectedRegion]?.connectorName}`
                    }
                    onChange={(e) => {
                      setInputConsumerGroup(e.target.value);
                      setOffsetResetInputValue(e.target.value);
                    }}
                    disabled={copyOffsetsRadioValue === "Migrate"}
                  />
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default SubscriptionContentTable;
