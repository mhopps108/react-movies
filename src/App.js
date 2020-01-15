import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Button, Drawer, Row, Col, Icon, DatePicker } from "antd";

// import { MovieList } from "./MovieList";
import { Filterer } from "./Filterer";
import { MovieListDrawer } from "./MovieListDrawer";
// import { useTmdbUrl } from "./useTmdbUrl";

import tmdbData from "./tmdb-data";
import { TmdbList } from "./TmdbList";
import { TmdbReleaseDatesList } from "./TmdbReleaseDatesList";

import moment from "moment";
import "antd/dist/antd.css";
import "./styles.css";

function App() {
  // const [filterVisible, setFilterVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const starterList = tmdbData.list.find(
    list => list.name === "Home Release Dates"
  );
  const [list, setList] = useState(starterList);

  return (
    <div className="App">
      <div>
        <Row>
          <Col span={4}>
            <Button type="" onClick={() => setListVisible(true)}>
              List
            </Button>
          </Col>
          <Col span={16} style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "5vw" }}>{list.name}</h2>
          </Col>
          <Col span={4}>
            {/* <Button type="" onClick={() => setFilterVisible(true)}> */}
            <Button type="" onClick={() => setListVisible(true)}>
              Open
            </Button>
          </Col>
        </Row>
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
