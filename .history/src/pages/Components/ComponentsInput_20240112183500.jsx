import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const ComponentsInput = (props) => {
  return (
    <>
      <Input
        size="large"
        placeholder={props.placeholder}
        prefix={<SearchOutlined />}
        style={{ borderRadius: "0px" }}
      />
    </>
  );
};

export default ComponentsInput;
