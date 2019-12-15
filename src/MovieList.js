import React, { useState, useEffect } from "react";
import { Card, Row, Col, DatePicker } from "antd";
import { Drawer, Button, Radio } from "antd";
import SingleSelect from "./useAntSelect";
import { discoveryUrlByWeek, buildDiscoveryUrl, movieLists } from "./tmdb-api";
import { useDataApi } from "./use-data-api.js";
import MovieListItem from "./MovieListItem";
import moment from "moment";
const { WeekPicker } = DatePicker;

function MovieList() {
  // const url = buildDiscoveryUrl(11);
  const [date, setDate] = useState(new Date());
  const [url, setUrl] = useState(discoveryUrlByWeek());
  const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {
    results: []
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setUrl(discoveryUrlByWeek(date));
    doFetch(url);
  }, [date, url, doFetch]);

  // console.log("data");
  // console.log(data);

  const dateRangeStr = () => {
    const s =
      `${moment(date)
        .startOf("week")
        .format("YYYY-MM-DD")}` +
      " -- " +
      `${moment(date)
        .endOf("week")
        .format("YYYY-MM-DD")}`;
    return s;
  };

  return (
    <div className="movie-list-wrapper mx-auto">
      <h1 className="text-center">Now Playing ({data.results.length})</h1>

      <WeekPicker
        format={"MMM Do YY"}
        onChange={date => setDate(moment(date))}
        // style={{ width: "300px" }}
        value={dateRangeStr()}
      />
      <h4>Date: {dateRangeStr()}</h4>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement={"bottom"}
        closable={false}
        onClose={visable => setVisible(!visable)}
        visible={visible}
      >
        <WeekPicker
          format={"MMM Do YY"}
          onChange={date => setDate(moment(date))}
        />
      </Drawer>

      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div style={{ background: "#696969", padding: "30px" }}>
            <Row>
              {data.results.map(movie => (
                <MovieListItem key={movie.id} movie={movie} />
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export { MovieList };
