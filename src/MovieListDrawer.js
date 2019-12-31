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
        placement={"left"}
        closable={true}
        visible={visible}
        onClose={visable => setVisible(!visable)}
        // height={"250"}
        width={"250"}
      >
        {tmdbList.map(list => (
          <Row>
            <Button key={list.name} type="link" onClick={() => setList(list)}>
              {list.name}
            </Button>
          </Row>
        ))}
      </Drawer>
    </div>
  );
}

export { MovieListDrawer };
