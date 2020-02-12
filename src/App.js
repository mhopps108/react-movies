import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Button, Drawer, Row, Col, Icon, DatePicker } from "antd";
// import { MovieList } from "./MovieList";
import { Filterer } from "./Filterer";
import { MovieListDrawer } from "./MovieListDrawer";

import tmdbData from "./tmdb-data";
import { TmdbList } from "./TmdbList";
import { TmdbReleaseDatesList } from "./TmdbReleaseDatesList";

import moment from "moment";
import "antd/dist/antd.css";
import "./styles.css";

function App() {
  // const [filterVisible, setFilterVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const starterList = tmdbData.list.find(list => list.id === 22);
  const [list, setList] = useState(starterList);

  return (
    <div className="App" style={{ maxWidth: "1000px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center ",
          padding: "5px 10px",
          borderBottom: "1px solid #ccc",
          background: "#3f4c6b",
          color: "#ddd"
        }}
      >
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: 600,
            padding: 0,
            margin: 0
          }}
        >
          {/* {list.name} */}
          {"A Movie Site"}
        </p>

        <Button
          style={{ border: "none", padding: "8px", background: "none" }}
          onClick={() => setListVisible(true)}
        >
          <Icon
            type="menu"
            style={{
              fontSize: "1rem",
              color: "#eee"
            }}
          />
        </Button>

        {/* <Col span={4}>
            <Button type="" onClick={() => setFilterVisible(true)}>
            <Button type="" onClick={() => setListVisible(true)}>
              Open
            </Button>
          </Col> */}
      </div>

      <MovieListDrawer
        visible={listVisible}
        setVisible={setListVisible}
        currentList={list}
        setList={setList}
      />
      {list.source === "tmdb" ? (
        <TmdbList list={list} />
      ) : (
        <TmdbReleaseDatesList list={list} />
      )}

      {/* <Filterer
        visible={filterVisible}
        setVisible={setFilterVisible}
        releaseType={releaseType}
        setReleaseType={setReleaseType}
      /> */}
    </div>
  );
}

export default App;
