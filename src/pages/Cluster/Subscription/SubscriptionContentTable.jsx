import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Style/Subscription.css";
import ComponentsSpin from "../../Components/ComponentSpin";

import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { MoreOutlined } from "@ant-design/icons";
import { setPagination } from "../../../redux/reducer";
import { AppContext } from "./AppContext";
import {
  Input,
  ConfigProvider,
  Popover,
  Modal,
  Select,
  Table,
  Radio,
  Divider,
  DatePicker,
} from "antd";

const SubscriptionContentTable = () => {
  const [modal, contextHolder] = Modal.useModal();
  const { confirm } = modal;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [open, setOpen] = useState({});
  const [modalRadioValue, setModalRadioValue] = useState("Earliest");
  const [copyOffsetsRadioValue, setCopyOffsetsRadioValue] = useState("Migrate");

  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination);
  const { pageSize, page, total } = pagination;

  const handleChangePagination = (page) => {
    dispatch(
      setPagination({
        ...pagination,
        pageSize: page.pageSize,
        page: page.current,
      })
    );
  };

  const handleGetData = () => {
    const url = `http://localhost:1337/api/cluster-subscriptions?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        const covData = [];
        res.data.forEach((i) => {
          covData.push({
            key: i.id,
            subscriptionname: i.attributes.mpsAppName,
            id: i.id,
            apmid: i.attributes.apmId,
            adgroup: i.attributes.adGroup,
            endpointurl: i.attributes.endpoint,
            topic: i.attributes.topicName,
            slackchannel: i.attributes.channelName,
            cluster: i.attributes.clusterName,
            regions: i.attributes.regions,
          });
        });
        setData(covData);

        dispatch(
          setPagination({
            ...pagination,
            total: res.meta.pagination.total,
          })
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleGetData();
  }, [pageSize, page]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        onKeyDown={(e) => e.stopPropagation()}
        style={{ width: "300px", position: "absolute", left: "25px" }}
      >
        <Input
          ref={searchInput}
          placeholder={`Input ${dataIndex} to search`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
    setOpen({ [id]: newOpen });
  };

  const hide = () => {
    setOpen(false);
  };

  const START_STOP = "START_STOP";
  const DELETE = "DELETE";
  const OFFSET_RESET = "OFFSET_RESET";

  const handleExecution = (type, state, record) => {
    let regions = record.regions.split(",");
    let selectedRegion = regions[0];
    let timestamp = "";

    const options = regions.map((item) => {
      return {
        value: item,
        label: item,
      };
    });

    const onModalRadioChange = (e) => {
      setModalRadioValue(e.target.value);
    };

    const onCopyOffsetsRadioChange = (e) => {
      setCopyOffsetsRadioValue(e.target.value);
    };

    const onDateChange = (date, dateString) => {
      console.log(date, dateString);
      timestamp = dateString;
    };

    const modalStyles = {
      content: {
        padding: "32px 32px 24px",
        borderRadius: 0,
      },
    };

    switch (type) {
      case START_STOP:
        confirm({
          icon: null,
          title: (
            <div className="modal-title">{`Subscription Name : ${record.subscriptionname}`}</div>
          ),

          content: (
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 0,
                },
              }}
            >
              <div className="modal-content">
                <p>{`Do you want to ${
                  state === "start" ? "start" : "stop"
                } proxy connection?`}</p>
                {regions.length > 1 ? (
                  <div>
                    <span className="modal-select-prefix">Select Region:</span>{" "}
                    <Select
                      defaultValue={selectedRegion}
                      style={{
                        width: 160,
                      }}
                      options={options}
                    />
                  </div>
                ) : (
                  <div>Region: {regions}</div>
                )}
              </div>
            </ConfigProvider>
          ),
          styles: modalStyles,
          okText: "START",
          cancelText: "CANCEL",
          okButtonProps: {
            className: "modal-ok-btn",
          },
          cancelButtonProps: {
            className: "modal-cancel-btn",
          },
          onOk() {
            modal.error({
              title: "ERROR",
              content: "Something went wrong. Please try again later.",
              okButtonProps: {
                className: "modal-ok-btn",
              },
              styles: modalStyles,
            });
          },
          onCancel() {},
        });

        break;
      case DELETE:
        confirm({
          icon: null,
          title: (
            <div className="modal-title">{`Subscription Name : ${record.subscriptionname}`}</div>
          ),
          content: (
            <div className="modal-content">
              Do you want to delete subscription?
            </div>
          ),
          styles: modalStyles,
          onOk() {
            modal.success({
              title: "SUCCESS",
              content: "Subscription Deleted Successfully !",
              okButtonProps: {
                className: "modal-ok-btn",
              },
              styles: modalStyles,
            });
          },
          onCancel() {},
          okText: "DELETE",
          cancelText: "CANCEL",
          okButtonProps: {
            className: "modal-ok-btn",
          },
          cancelButtonProps: {
            className: "modal-cancel-btn",
          },
        });
        break;
      case OFFSET_RESET:
        confirm({
          icon: null,
          title: (
            <div className="modal-title">{`Subscription Name : ${record.subscriptionname}`}</div>
          ),
          content: (
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 0,
                  marginLG: 10,
                  colorPrimary: "#41F41",
                },
              }}
            >
              <AppContext.Consumer>
                {(value) => (
                  <div className="modal-content">
                    <div>
                      please select offset action to subscription{" "}
                      {record.subscriptionname}?
                    </div>
                    <Radio.Group
                      value={value.modalRadioValue}
                      onChange={(e) => {
                        onModalRadioChange(e);
                      }}
                      className="modal-radio-group"
                    >
                      <Radio value={"Earliest"}>Earliest</Radio>
                      <Radio value={"Latest"}>Latest</Radio>
                      <Radio value={"To Timestamp"}>To Timestamp</Radio>
                      <Radio value={"Copy Offsets"}>Copy Offsets</Radio>
                    </Radio.Group>
                    <div className="radioReminder">
                      {value.modalRadioValue === "Earliest" && (
                        <p>
                          {" "}
                          MPS consumer group will be moved to earliest offsets
                          only if the consumer group exists.
                        </p>
                      )}
                      {value.modalRadioValue === "Latest" && (
                        <p>
                          MPS consumer group will be moved to LATEST only if
                          consumer roup exists.
                        </p>
                      )}
                      {value.modalRadioValue === "To Timestamp" && (
                        <p>
                          MPS consumer group will be moved to specific timestamp
                          only if the consumer group exists.
                        </p>
                      )}
                      {value.modalRadioValue === "Copy Offsets" && (
                        <>
                          <p>
                            {" "}
                            For Migrate, offsets will be copied from Application
                            consumer group to MPS consumer group.
                          </p>
                          <p>
                            {" "}
                            For Rollback, offset will be copied from MPS
                            consumer group to application conusmer group.
                          </p>
                        </>
                      )}
                    </div>
                    <Divider />
                    {regions.length > 1 ? (
                      <div>
                        <span className="modal-select-prefix">
                          Select Region:
                        </span>{" "}
                        <Select
                          defaultValue={selectedRegion}
                          style={{
                            width: 160,
                          }}
                          options={options}
                        />
                      </div>
                    ) : (
                      <div>Region: {regions}</div>
                    )}
                    {value.modalRadioValue === "To Timestamp" && (
                      <div className="modal-select-wrapper">
                        <span className="modal-select-prefix">
                          Select Timestamp:
                        </span>{" "}
                        <DatePicker
                          showTime
                          onChange={onDateChange}
                          style={{
                            width: 200,
                          }}
                        />
                      </div>
                    )}
                    {value.modalRadioValue === "Copy Offsets" && (
                      <>
                        <Radio.Group
                          value={value.copyOffsetsRadioValue}
                          onChange={(e) => {
                            onCopyOffsetsRadioChange(e);
                          }}
                          className="modal-radio-group"
                        >
                          <Radio value={"Migrate"}>Migrate</Radio>
                          <Radio value={"Rollback"}>Rollback</Radio>
                        </Radio.Group>
                        <div>
                          <span>From:</span>
                          <Input />
                        </div>
                        <div>
                          <span>To:</span>
                          <Input />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </AppContext.Consumer>
            </ConfigProvider>
          ),
          styles: modalStyles,
          width: 620,
          onOk() {
            modal.error({
              title: "ERROR",
              content: "500 :",
              okButtonProps: {
                className: "modal-ok-btn",
              },
              styles: modalStyles,
            });
          },
          onCancel() {},
          okText: "DELETE",
          cancelText: "CANCEL",
          okButtonProps: {
            className: "modal-ok-btn",
          },
          cancelButtonProps: {
            className: "modal-cancel-btn",
          },
        });
        break;

      default:
        return null;
    }
  };

  const columns = [
    {
      title: "Subscription Name",
      dataIndex: "Subscription Name",
      key: "Subscription Name",
      width: "13%",
      ellipsis: true,
      ...getColumnSearchProps("Subscription Name"),
      sorter: (a, b) => a.subscriptionname.length - b.subscriptionname.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => <a>{record.subscriptionname}</a>,
    },
    {
      title: "APM Id",
      dataIndex: "APM Id",
      key: "APM Id",
      width: "13%",
      ...getColumnSearchProps("APM Id"),
      sorter: (a, b) => a.apmid.length - b.apmid.length,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => <a>{record.apmid}</a>,
    },
    {
      title: "AD Group",
      dataIndex: "AD Group",
      key: "AD Group",
      width: "13%",
      ...getColumnSearchProps("AD Group"),
      render: (_, record) => <a>{record.adgroup}</a>,
    },
    {
      title: "End Point URI",
      dataIndex: "End Point URI",
      key: "End Point URI",
      width: "13%",
      ...getColumnSearchProps("End Point URI"),
      render: (_, record) => <a>{record.endpointurl}</a>,
    },
    {
      title: "Topic",
      dataIndex: "Topic",
      key: "Topic",
      width: "13%",
      ...getColumnSearchProps("Topic"),
      render: (_, record) => <a>{record.topic}</a>,
    },
    {
      title: "Cluster",
      dataIndex: "Cluster",
      key: "Cluster",
      width: "13%",
      ...getColumnSearchProps("Cluster"),
      render: (_, record) => <a>{record.cluster}</a>,
    },
    {
      title: "Slack Channel",
      dataIndex: "Slack Channel",
      key: "Slack Channel",
      width: "13%",
      ...getColumnSearchProps("Slack Channel"),
      render: (_, record) => <a>{record.slackchannel}</a>,
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: "5%",
      render: (_, record) => (
        <Popover
          content={
            <>
              <p
                onClick={() => {
                  handleExecution(START_STOP, "start", record);
                  hide();
                }}
              >
                {" "}
                <a>Start Proxy</a>
              </p>
              <p
                onClick={() => {
                  handleExecution(START_STOP, "stop", record);
                  hide();
                }}
              >
                {" "}
                <a>Stop Proxy</a>
              </p>
              <p
                onClick={() => {
                  handleExecution(DELETE, _, record);
                  hide();
                }}
              >
                {" "}
                <a>Delete Subscription</a>
              </p>
              <p
                onClick={() => {
                  handleExecution(OFFSET_RESET, _, record);
                  hide();
                }}
              >
                {" "}
                <a>Offset Reset</a>
              </p>
            </>
          }
          trigger="click"
          open={open[record.id]}
          onOpenChange={(newOpen) => {
            handleOpenChange(newOpen, record.id);
          }}
        >
          <MoreOutlined />
        </Popover>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AppContext.Provider
      value={{
        modalRadioValue: modalRadioValue,
        copyOffsetsRadioValue: copyOffsetsRadioValue,
      }}
    >
      {isLoading ? (
        <ComponentsSpin />
      ) : (
        <Table
          style={{ border: "1px solid	#d7d7d7", margin: "12px 0" }}
          columns={columns}
          dataSource={data}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            total: total,
            // size: "small",
          }}
          onChange={handleChangePagination}
        />
      )}

      {contextHolder}
    </AppContext.Provider>
  );
};
export default SubscriptionContentTable;
