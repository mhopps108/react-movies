import React, { useState } from "react";
import "antd/dist/antd.css";
import { Select } from "antd";

function SingleSelect({ initOptions, setSelected, startVal = "" }) {
  const [options, setOptions] = useState(initOptions);

  return (
    <Select
      defaultValue={startVal}
      style={{ width: 100 }}
      onChange={value => setSelected(value)}
    >
      {options.map(item => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}

export default SingleSelect;
