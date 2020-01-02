import React, { useState, useEffect } from "react";
import { Row, Col, InputNumber, Icon } from "antd";
import { Drawer, Button, Radio, Checkbox, Slider } from "antd";
import tmdbData from "./tmdb-data";

/*
// NEEDED: allGenres, allReleaseTyles, allCertifications
*/

function MovieListDrawer({ visible, setVisible, setList }) {
  const tmdbList = tmdbData.list;

  const onListSelection = list => {
    console.log("Selected-List");
    console.log(list);
    setList(list);
    setVisible(false);
  };

  return (
    <div className="drawer-container">
      <Drawer
        title="Movies"
        placement={"left"}
        // placement={"top"}
        closable={true}
        visible={visible}
        onClose={visable => setVisible(!visable)}
        // height={"350"}
        width={"250"}
      >
        <h4>{"TMDb List"}</h4>
        {tmdbList
          .filter(list => list.listtype === "list")
          .map(list => (
            <Row key={list.id}>
              {/* <Button onClick={list => onListSelection(list)}> */}
              <Button onClick={() => onListSelection(list)}>{list.name}</Button>
            </Row>
          ))}
        <br />
        <h4>{"Release Dates"}</h4>
        {tmdbList
          .filter(list => list.listtype === "discovery")
          .map(list => (
            <Row key={list.id}>
              <Button onClick={() => onListSelection(list)}>{list.name}</Button>
            </Row>
          ))}
      </Drawer>
    </div>
  );
}

export { MovieListDrawer };
