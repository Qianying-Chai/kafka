import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Style/Subscription.css";
import { apiEndpoint, getEndpoint } from "../../Taas/Configure";
import ComponentsSpin from "../../Components/ComponentSpin";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { MoreOutlined } from "@ant-design/icons";
import { setMpsSubPaginator } from "../../../redux/action";
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paginationFiltersIndex, setPaginationFiltersIndex] = useState("");
  const [tableSorterOrder, setTableSorterOrder] = useState("");
  const [tableSorterKey, setTableSorterKey] = useState("");
  const [tableInputValue, setTableInputValue] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [actionOpen, setActionOpen] = useState({});
  const [modalRadioValue, setModalRadioValue] = useState("Earliest");
  const [offsetResetInputValue, setOffsetResetInputValue] = useState("");
  const [copyOffsetsRadioValue, setCopyOffsetsRadioValue] = useState("Migrate");
  const [selectedRegionValue, setSelectedRegionValue] = useState("");

  const [testValue, setTestValue] = useState("1");

  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.mpsSubPaginator);
  const { pageSize, page, total } = pagination;

  const abortController = new AbortController();
  const signal = abortController.signal;
  const handleGetData = () => {
    const url = `http://localhost:1337/api/cluster-subscriptions?${
      paginationFiltersIndex
        ? `filters[${paginationFiltersIndex}][$contains]=${tableInputValue}`
        : `pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    }${tableSorterOrder ? `&sort=${tableSorterKey}:${tableSorterOrder}` : ""}`;

    fetch(url, { signal })
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

        setData(covData);
        dispatch(
          setMpsSubPaginator({
            ...pagination,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const abortFetching = () => {
    abortController.abort();
  };

  useEffect(() => {
    handleGetData();
  }, [
    pageSize,
    page,
    paginationFiltersIndex,
    tableInputValue,
    tableSorterOrder,
    tableSorterKey,
  ]);

  const handleTableChange = (page, _, extra) => {
    abortFetching();

    if (extra.order === "ascend") {
      setTableSorterOrder("asc");
    } else if (extra.order === "descend") {
      setTableSorterOrder("desc");
    } else {
      return null;
    }
    setTableSorterKey(extra.columnKey);
    console.log({ extra });

    dispatch(
      setMpsSubPaginator({
        ...pagination,
        pageSize: page.pageSize,
        page: page.current,
      })
    );
  };

  const handleInputChange = (dataIndex, value) => {
    abortFetching();
    setPaginationFiltersIndex(dataIndex);
    setTableInputValue(value);
  };

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
    filterDropdown: ({ selectedKeys, confirm }) => (
      <div
        onKeyDown={(e) => e.stopPropagation()}
        style={{ width: "300px", position: "absolute", left: "25px" }}
      >
        <Input
          ref={searchInput}
          placeholder={`Input ${dataIndex} to search`}
          value={selectedKeys[0]}
          onChange={(e) => {
            handleInputChange(dataIndex, e.target.value);
          }}
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
    setActionOpen({ [id]: newOpen });
  };

  const hideAction = () => {
    setActionOpen(false);
  };

  const handleExecution = (type, record) => {
    console.log(record);
    let regions = Object.keys(record.regions);
    let selectedRegion = regions[0];
    let selectedTimeStamp = "";
    let inputConsumerGroup = "";
    let selectedOffsetType = "Earliest";
    let checkCopyToMaps = "Migrate";

    setSelectedRegionValue(selectedRegion);

    const options = regions.map((item) => {
      return {
        value: item,
        label: item,
      };
    });

    const modalStyles = {
      content: {
        padding: "32px 32px 24px",
        borderRadius: 0,
      },
    };

    const handleStateChanges = (radioValue, offsetRadio) => {
      setModalRadioValue(radioValue);
      setCopyOffsetsRadioValue(offsetRadio);
      setOffsetResetInputValue("");
      setSelectedRegionValue("");
    };

    switch (type) {
      case "START":
      case "STOP":
        confirm({
          icon: null,
          title: (
            <div className="modal-title">{`Subscription Name : ${record.mpsAppName}`}</div>
          ),

          content: (
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 0,
                },
              }}
            >
              <AppContext.Consumer>
                {(value) => (
                  <div className="modal-content">
                    <p>{`Do you want to ${
                      type === "START" ? "start" : "stop"
                    } proxy connection?`}</p>
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
                          onSelect={(value) => {
                            selectedRegion = value;
                          }}
                          options={options}
                        />
                        <Input onChange={(e) => setTestValue(e.target.value)} />
                      </div>
                    ) : (
                      <div>Region: {regions}</div>
                    )}
                  </div>
                )}
              </AppContext.Consumer>
            </ConfigProvider>
          ),
          styles: modalStyles,
          okText: type,
          cancelText: "CANCEL",
          okButtonProps: {
            className: "modal-ok-btn",
          },
          cancelButtonProps: {
            className: "modal-cancel-btn",
          },
          onOk() {
            getEndpoint(
              apiEndpoint.MPS.SUPSCRIPTION_PROXY_ACTION,
              {
                start: "aaa",
              },
              type
            )
              .then((res) => {
                modal.success({
                  title: "SUCCESS",
                  content: "Subscription Deleted Successfully !",
                  okButtonProps: {
                    className: "modal-ok-btn",
                  },
                  styles: modalStyles,
                });
              })
              .catch((error) => {
                modal.error({
                  title: "ERROR",
                  content: "Something went wrong. Please try again later.",
                  okButtonProps: {
                    className: "modal-ok-btn",
                  },
                  styles: modalStyles,
                });
              });
          },
          onCancel() {
            Modal.destroyAll();
          },
        });
        break;
      case "DELETE":
        confirm({
          icon: null,
          title: (
            <div className="modal-title">{`Subscription Name : ${record.mpsAppName}`}</div>
          ),
          content: (
            <div className="modal-content">
              Do you want to delete subscription?
            </div>
          ),
          styles: modalStyles,
          onOk() {
            getEndpoint(apiEndpoint.MPS.DELETE_MPS_SUBSCRIPTION_DEV, record.id)
              .then((res) => {
                handleGetData();
                modal.success({
                  title: "SUCCESS",
                  content: "Subscription Deleted Successfully !",
                  okButtonProps: {
                    className: "modal-ok-btn",
                  },
                  styles: modalStyles,
                });
              })
              .catch((error) => {
                modal.error({
                  title: "ERROR",
                  content: "Something went wrong. Please try again later.",
                  okButtonProps: {
                    className: "modal-ok-btn",
                  },
                  styles: modalStyles,
                });
              });
          },
          onCancel() {
            Modal.destroyAll();
          },
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
      case "OFFSET_RESET":
        confirm({
          icon: null,
          title: (
            <div className="modal-title">{`Subscription Name : ${record.mpsAppName}`}</div>
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
                      {record.mpsAppName}?
                    </div>
                    <Radio.Group
                      value={value.modalRadioValue}
                      onChange={(e) => {
                        setModalRadioValue(e.target.value);
                        selectedOffsetType = e.target.value;
                        console.log("e", e.target.value);
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
                          onSelect={(value) => {
                            selectedRegion = value;
                            setSelectedRegionValue(value);
                          }}
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
                          onChange={(dateString) => {
                            selectedTimeStamp = dateString;
                          }}
                          style={{
                            width: 200,
                          }}
                        />
                      </div>
                    )}
                    {value.modalRadioValue === "Copy Offsets" && (
                      <>
                        <Radio.Group
                          defaultValue={"Migrate"}
                          onChange={(e) => {
                            checkCopyToMaps = e.target.value;
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
                              value.copyOffsetsRadioValue === "Migrate"
                                ? value.offsetResetInputValue
                                : `connect-${
                                    record.regions[value.selectedRegionValue]
                                      .connectorName
                                  }`
                            }
                            onChange={(e) => {
                              inputConsumerGroup = e.target.value;
                              setOffsetResetInputValue(e.target.value);
                            }}
                            disabled={
                              value.copyOffsetsRadioValue === "Rollback"
                            }
                          />
                        </div>
                        {console.log(inputConsumerGroup)}
                        <div>
                          To:
                          <Input
                            value={
                              value.copyOffsetsRadioValue === "Rollback"
                                ? value.offsetResetInputValue
                                : `connect-${
                                    record.regions[value.selectedRegionValue]
                                      .connectorName
                                  }`
                            }
                            onChange={(e) => {
                              inputConsumerGroup = e.target.value;
                              setOffsetResetInputValue(e.target.value);
                            }}
                            disabled={value.copyOffsetsRadioValue === "Migrate"}
                          />
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

            console.log(333, type);
            getEndpoint(apiEndpoint.MPS.POST_TAAS_OFFSET_RESET, data, type)
              .then((res) => {
                modal.success({
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
                modal.error({
                  title: "ERROR",
                  content: "Something went wrong. Please try again later.",
                  okButtonProps: {
                    className: "modal-ok-btn",
                  },
                  styles: modalStyles,
                });
              });
          },
          onCancel() {
            handleStateChanges("Earliest", "Migrate");

            Modal.destroyAll();
          },
          okText: "OFFSET RESET",
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
        break;
    }
  };

  const columns = [
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
      sorter: true,
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
                  handleExecution("START", record);

                  hideAction();
                }}
              >
                {" "}
                <a>Start Proxy</a>
              </p>
              <p
                onClick={() => {
                  handleExecution("STOP", record);

                  hideAction();
                }}
              >
                {" "}
                <a>Stop Proxy</a>
              </p>
              <p
                onClick={() => {
                  handleExecution("DELETE", record);

                  hideAction();
                }}
              >
                {" "}
                <a>Delete Subscription</a>
              </p>
              <p
                onClick={() => {
                  handleExecution("OFFSET_RESET", record);
                  hideAction();
                }}
              >
                {" "}
                <a>Offset Reset</a>
              </p>
            </>
          }
          trigger="click"
          open={actionOpen[record.id]}
          onOpenChange={(newOpen) => {
            handleOpenChange(newOpen, record.id);
          }}
        >
          <MoreOutlined />
        </Popover>
      ),
    },
  ];

  return (
    <AppContext.Provider
      value={{
        modalRadioValue: modalRadioValue,
        copyOffsetsRadioValue: copyOffsetsRadioValue,
        selectedRegionValue: selectedRegionValue,
        offsetResetInputValue: offsetResetInputValue,
        testValue: testValue,
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
          onChange={handleTableChange}
        />
      )}

      {contextHolder}
    </AppContext.Provider>
  );
};

export default SubscriptionContentTable;
