import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Button, Drawer, Row, Col, Icon, DatePicker } from "antd";
import { MovieList } from "./MovieList";
import { useDataApi } from "./useDataApi";
import moment from "moment";
import twix from "twix";
import "antd/dist/antd.css";
import "./styles.css";

var queryString = params => {
  return Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
};

const startOfWeek = date => {
  return (moment(date) || moment()).startOf("week");
};

const endOfWeek = date => {
  return (moment(date) || moment()).endOf("week");
};

function TmdbReleaseDatesList({ list }) {
  const [startDate, setStartDate] = useState(startOfWeek());
  const [releaseType, setReleaseType] = useState(list.releaseType);
  const [page, setPage] = useState(1);

  const baseUrl = "https://api.themoviedb.org/3";
  const params = {
    api_key: "0d15450f36e2e4eaec96d1e905c43fad",
    language: "en-US",
    page: `${page}`,
    region: "US",
    include_adult: "false",
    with_original_language: "en",
    sort_by: "release_date.asc",
    "release_date.gte": `${moment(startDate).format("YYYY-MM-DD")}`,
    "release_date.lte": `${endOfWeek(startDate).format("YYYY-MM-DD")}`,
    with_release_type: `${releaseType}`
  };
  const starterUrl = `${baseUrl}${list.path}?${queryString(params)}`;

  const [state, setUrl] = useDataApi(starterUrl, []);
  const { data, isLoading, isError } = state;
  const { total_results, total_pages, results, dates = null } = data; // useState for page

  const dateString = (start, end) => {
    return `${moment(start).format("MMM DD YYYY")} to ${moment(end).format(
      "MMM DD YYYY"
    )}`;
  };

  const twixDateString = (start, end) => {
    // moment("1982-01-25").twix("1982-02-25", {allDay: true}).format();
    return moment(start)
      .twix(end, { allDay: true })
      .format();
  };

  const pageString = () => {
    return `${page} of ${total_pages}`;
  };
  const resultString = () => {
    return `${results ? results.length : 0} of ${total_results} Movies`;
  };

  useEffect(() => {
    if ("releaseType" in list) {
      setReleaseType(list.releaseType);
    }
    // setStartDate(startOfWeek(startDate));
    // setEndDate(startDate.clone().endOf("week"));

    setUrl(starterUrl);
  }, [list, setUrl, startDate, starterUrl, page]);

  useEffect(() => {
    setPage(1);
  }, [list, startDate]);

  return (
    <>
      <Row style={{ paddingBottom: "10px" }}>
        <Col span={12} style={{ textAlign: "center" }}>
          <Button.Group size="small">
            <Button
              onClick={() => setStartDate(moment(startDate).subtract(7, "d"))}
            >
              <Icon type="left" />
            </Button>
            <Button onClick={() => setStartDate(startOfWeek())}>Today</Button>

            <Button onClick={() => setStartDate(moment(startDate).add(7, "d"))}>
              <Icon type="right" />
            </Button>
          </Button.Group>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <Icon type="calendar" />
          {twixDateString(startOfWeek(startDate), endOfWeek(startDate))}
        </Col>
      </Row>

      <Row style={{ textAlign: "center", paddingBottom: "10px" }}>
        <Button
          disabled={page - 1 <= 0}
          onClick={() => setPage(page => page - 1)}
        >
          <Icon type="left" />
          {page - 1}
        </Button>
        <Button>{pageString()}</Button>
        <Button>{resultString()}</Button>
        <Button
          disabled={page + 1 > total_pages}
          onClick={() => setPage(page => page + 1)}
        >
          {page + 1}
          <Icon type="right" />
        </Button>
      </Row>
      <Row />

      {isLoading ? <p>Loading movies...</p> : <MovieList movies={results} />}
    </>
  );
}

export { TmdbReleaseDatesList };
