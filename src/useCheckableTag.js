import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Tag } from "antd";

const { CheckableTag } = Tag;

function NamedTag({ startName }) {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState(startName);

  const onChange = () => {
    setChecked(!checked);
    console.log(`checked: ${checked}`);
  };

  return (
    <CheckableTag checked={checked} onChange={onChange} visible={true}>
      {name}
    </CheckableTag>
  );
}

// <NamedTag startName={"more"}>another</NamedTag>
