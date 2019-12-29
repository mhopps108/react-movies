import React, { useState, useEffect } from "react";
import { Row, Col, InputNumber, Icon } from "antd";
import { Drawer, Button, Radio, Checkbox, Slider } from "antd";
import tmdbData from "./tmdb-data.js";

/*
// NEEDED: allGenres, allReleaseTyles, allCertifications
*/

function MovieListDrawer({ visible, setVisible, setList }) {
  const tmdbList = tmdbData.list;

  return (
    <div className="drawer-container">
      <Drawer
        title="Filter"
        placement={"bottom"}
        closable={true}
        visible={visible}
        onClose={visable => setVisible(!visable)}
        height={"250"}
        // width={"375"}
      >
        {tmdbList.map(list => (
          <Button type="link" onClick={() => setList(list)}>
            {list.name}
          </Button>
        ))}
      </Drawer>
    </div>
  );
}

export { MovieListDrawer };
