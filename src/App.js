import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Button, Drawer, Row, Col, Icon, DatePicker } from "antd";

import { MovieList } from "./MovieList";
import { Filterer } from "./Filterer";
import { MovieListDrawer } from "./MovieListDrawer";
import { useTmdbUrl } from "./useTmdbUrl";

import { TmdbList } from "./TmdbList";
import tmdbData from "./tmdb-data";
import moment from "moment";
import "antd/dist/antd.css";
import "./styles.css";

// const { MonthPicker, WeekPicker } = DatePicker;

function App() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);

  const tmdbLists = tmdbData.list;
  const starterList = tmdbLists.find(list => list.name === "Popular Movies");
  const [list, setList] = useState(starterList);

  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   list,
  //   setList,
  //   setReleaseType,
  //   setPage,
  //   startDate,
  //   setStartDate,
  //   endDate
  // } = useTmdbUrl();
  // console.log(data);
  // // const page = 0,
  // //   total_results = 0,
  // //   total_pages = 0,
  // //   results = 0;
  // const { page, total_results, total_pages, results } = data;

  // const dateRangeStr = () => {
  //   const s = `${moment(startDate).format("MMM DD YYYY")} to ${moment(
  //     endDate
  //   ).format("MMM DD YYYY")}`;
  //   return s;
  // };

  return (
    <div className="App">
      <div>
        {/* <Row>
          <Col>
            <MonthPicker onChange={onMonthChange} placeholder="Select month" />
            <WeekPicker onChange={onMonthChange} placeholder="Select week" />
          </Col>
        </Row>
        <br /> */}
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

        {/* {startDate && (
          <Row style={{ textAlign: "center" }}>
            <h4>{dateRangeStr()}</h4>
          </Row>
        )} */}

        {/* {list.source === "discovery" && (
          <>
            <Row style={{ textAlign: "center" }}>
              <Button.Group size="default">
                <Button
                  onClick={() =>
                    setStartDate(moment(startDate).subtract(7, "d"))
                  }
                >
                  <Icon type="left" />
                  Last Week
                </Button>
                <Button onClick={() => setStartDate(moment().startOf("week"))}>
                  <Icon type="calendar" />
                  Today
                </Button>
                <Button
                  onClick={() => setStartDate(moment(startDate).add(7, "d"))}
                >
                  Next Week
                  <Icon type="right" />
                </Button>
              </Button.Group>
            </Row>
          </>
        )} */}

        {/* <Row style={{ textAlign: "center" }}>
          <Button.Group>
            <Button
              disabled={page - 1 <= 0}
              onClick={() => setPage(page => page - 1)}
            >
              <Icon type="left" />
              {page - 1}
            </Button>
            <Button onClick={() => setPage(1)}>
              {page} of {total_pages}
            </Button>
            <Button>
              {results.length} / {total_results}
            </Button>
            <Button
              disabled={page + 1 > total_pages}
              onClick={() => setPage(page => page + 1)}
            >
              {page + 1}
              <Icon type="right" />
            </Button>
          </Button.Group>
        </Row> */}
      </div>

      {/* {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        // <MovieList movies={data.results} />
        <MovieList movies={results} />
      )} */}

      <MovieListDrawer
        visible={listVisible}
        setVisible={setListVisible}
        currentList={list}
        setList={setList}
      />
      <TmdbList list={list} />

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
