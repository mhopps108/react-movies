import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Select } from "antd";
import tmdbData from "./tmdb-data";

//const OPTIONS = tmdbData.genres; //.map(item => item.name);

function MultiSelect({ initOptions, placeholder }) {
  const [options, setOptions] = useState(initOptions);
  const [filtered, setFiltered] = useState(options);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setFiltered(() => {
      return options.filter(o => !selected.includes(o.name));
    });
  }, [selected, options]);

  return (
    <Select
      mode="multiple"
      placeholder={placeholder}
      value={selected}
      onChange={item => setSelected(item)}
      style={{ width: "50%" }}
      showArrow
    >
      {filtered.map(item => (
        <Select.Option key={item.id} value={item.name}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}

export default MultiSelect;
