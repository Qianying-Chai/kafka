import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const ComponentsInput = (props) => {
  return (
    <>
      <Input
        size="large"
        placeholder={props.placeholder}
        prefix={<SearchOutlined />}
        style={{ margin: "18px 0px", borderRadius: "0px" }}
      />
    </>
  );
};

export default ComponentsInput;
