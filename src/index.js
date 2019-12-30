import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Drawer, Row, Col } from "antd";
import { Calendar, DatePicker, Icon } from "antd";

import { MovieList } from "./MovieList";
import { Filterer } from "./Filterer";
import { MovieListDrawer } from "./MovieListDrawer";

import { useDataApi } from "./useDataApi.js";
import { useTmdbListApi } from "./useTmdbListApi";

import moment from "moment";
import tmdbData from "./tmdb-data.js";
import { discoveryUrlByWeek } from "./tmdb-api";
import "antd/dist/antd.css";
import "./styles.css";

const { WeekPicker } = DatePicker;

//

function App() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [releaseType, setReleaseType] = useState(4);

  // const [listName, setListName] = useState(tmdbList["popular"]);
  const [title, setTitle] = useState("Movies");

  const [listVisible, setListVisible] = useState(false);
  const [{ data, isLoading, isError }, list, setList] = useTmdbListApi();
  const tmdbList = tmdbData.list;

  const [date, setDate] = useState(moment());
  const [url, setUrl] = useState(discoveryUrlByWeek());
  // const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {
  //   results: []
  // });
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   setUrl(discoveryUrlByWeek(date, releaseType, page));
  //   doFetch(url);
  //   console.log("data");
  //   console.log(data);
  // }, [date, url, doFetch, releaseType, page]);

  useEffect(() => {
    console.log(`list: ${list}`);
    console.log(`data:`);
    console.log(data);
    // setList(tmdbList.popular);
    setTitle(`${list.name} Movies`);
  }, [list, data]);

  // useEffect(() => {
  //   // setUrl(discoveryUrlByWeek(date, releaseType, page));
  //   // doFetch(url);
  //   // setList()
  //   console.log("data");
  //   console.log(data);
  //   console.log(list);
  // }, [list]);

  const dateRangeStr = () => {
    const s =
      `${moment(date)
        .startOf("week")
        .format("MMM DD YYYY")}` +
      " to " +
      `${moment(date)
        .endOf("week")
        .format("MMM DD YYYY")}`;
    return s;
  };

  useEffect(() => {
    if (releaseType === 3) {
      setTitle("Theatrical Movies");
    }
    if (releaseType === 4) {
      setTitle("Digital Movies");
    }
    if (releaseType === 5) {
      setTitle("Bluray Movies");
    }
  }, [releaseType]);

  return (
    <div className="App">
      <h1 className="text-center">{title}</h1>
      <div>
        <Row>
          <Col span={10}>
            <WeekPicker
              id={"week-picker"}
              format={"MMM Do YY"}
              onChange={date => setDate(moment(date))}
            />
          </Col>
          <Col span={14}>
            <h4>{dateRangeStr()}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" onClick={() => setFilterVisible(true)}>
              Open
            </Button>
            <Button type="primary" onClick={() => setListVisible(true)}>
              List
            </Button>
          </Col>
        </Row>
        <Row>
          <Button.Group size="default">
            <Button onClick={() => setDate(moment(date).subtract(7, "d"))}>
              <Icon type="left" />
              Last Week
            </Button>
            <Button onClick={() => setDate(moment())}>
              <Icon type="calendar" />
              Today
            </Button>
            <Button onClick={() => setDate(moment(date).add(7, "d"))}>
              Next Week
              <Icon type="right" />
            </Button>
          </Button.Group>
        </Row>
        <Row>
          <Button.Group size="default">
            <Button
              disabled={data.page - 1 <= 0}
              onClick={() => setPage(page => page - 1)}
            >
              <Icon type="left" />
              {data.page - 1}
            </Button>
            <Button onClick={() => ""}>
              {data.page} of {data.total_pages}
            </Button>
            <Button>
              {data.length} / {data.total_results}
            </Button>
            <Button
              disabled={data.page + 1 > data.total_pages}
              onClick={() => setPage(page => page + 1)}
            >
              {data.page + 1}
              <Icon type="right" />
            </Button>
          </Button.Group>
        </Row>
      </div>

      <MovieList movies={data.results} />
      <MovieListDrawer
        visible={listVisible}
        setVisible={setListVisible}
        setList={setList}
      />
      <Filterer
        visible={filterVisible}
        setVisible={setFilterVisible}
        releaseType={releaseType}
        setReleaseType={setReleaseType}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
