import React, { useRef, useState } from "react";
import SelectTitle from "../../../../Components/SelectTitle";
import { Col, Row, Divider, Input, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const DeliverySubscriptionNameForm = () => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  return (
    <>
      <Row gutter={24}>
        <Col span={8}>
          <SelectTitle title={"Subscription Name:"} />
          <Select
            className="create-flow-select"
            placeholder="Select Subscription Name"
            showSearch
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <div
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <div>
                    <Input
                      placeholder="Create new Subscription Name"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                      addonBefore="mps-"
                      style={{ width: "90%" }}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    ></Button>
                  </div>
                  <p className="select-help">
                    Subscription Name should not be more than 35 characters.
                  </p>
                </div>
              </>
            )}
            // options={items.map((item) => ({
            //   label: item,
            //   value: item,
            // }))}
          />
        </Col>
      </Row>
    </>
  );
};
export default DeliverySubscriptionNameForm;
