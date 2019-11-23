import React from "react";
import "antd/dist/antd.css";
import { Select } from "antd";
import tmdbData from "./tmdb-data";

const OPTIONS = tmdbData.genres; //.map(item => item.name);

class MultiSelect extends React.Component {
  state = {
    selectedItems: []
  };

  handleChange = selectedItems => {
    console.log(`Selected: handleChange()`);
    console.log(selectedItems);
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;
    const filteredOptions = OPTIONS.filter(
      o => !selectedItems.includes(o.name)
    );

    return (
      <Select
        mode="multiple"
        placeholder="Inserted are removed"
        value={selectedItems}
        onChange={this.handleChange}
        style={{ width: "50%" }}
        showArrow
      >
        {filteredOptions.map(item => (
          <Select.Option key={item.id} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default MultiSelect;
