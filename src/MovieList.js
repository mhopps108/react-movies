import React, { useState, useEffect } from "react";
import { Card, Calendar, Row, Col, DatePicker, Button } from "antd";
import { discoveryUrlByWeek, buildDiscoveryUrl, movieLists } from "./tmdb-api";
import { useDataApi } from "./use-data-api.js";
import MovieListItem from "./MovieListItem";
import moment from "moment";
import { Calendar as RMCCalendar } from "rmc-calendar";
import enUS from "rmc-calendar/lib/locale/en_US";
import "rmc-calendar/assets/index.css";

const { WeekPicker } = DatePicker;

function MovieList({ setVisible }) {
  // const url = buildDiscoveryUrl(11);
  const [date, setDate] = useState(new Date());
  const [url, setUrl] = useState(discoveryUrlByWeek());
  const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {
    results: []
  });

  const [rmcvisable, setRMCVisable] = useState(false);

  useEffect(() => {
    setUrl(discoveryUrlByWeek(date));
    doFetch(url);
  }, [date, url, doFetch]);

  useEffect(() => {
    console.log("STATE");
    console.log(`date: ${date}`);
  }, [date]);

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

  const onDatePickerChange = date => {
    const selector = document.getElementById("week-picker");
    if (selector) selector.blur();
    setDate(moment(date));
  };

  return (
    <div className="movie-list-wrapper mx-auto">
      <h1 className="text-center">Now Playing ({data.results.length})</h1>
      <Row>
        <Col span={4}>
          <WeekPicker
            id={"week-picker"}
            // format={"MMM Do YY"}
            format={""}
            // onChange={date => setDate(moment(date))}
            onChange={onDatePickerChange}
            style={{ width: "40px" }}
          />
        </Col>
        <Col span={12}>
          <h4>Date: {dateRangeStr()}</h4>
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={() => setVisible(true)}>
            Open
          </Button>
          <Button type="primary" onClick={() => setRMCVisable(true)}>
            Cal
          </Button>
        </Col>
      </Row>

      <div>
        <RMCCalendar
          locale={enUS}
          visible={rmcvisable}
          onCancel={() => setRMCVisable(false)}
          onConfirm={""}
        />
      </div>

      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div style={{ background: "#696969", padding: "10px" }}>
            <Row gutter={[16, 16]}>
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
