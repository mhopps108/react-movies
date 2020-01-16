import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Button, Drawer, Row, Col, Icon, DatePicker } from "antd";
import { MovieList } from "./MovieList";
import { useDataApi } from "./useDataApi";
import moment from "moment";
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
    <div>
      <div>
        <Row style={{ textAlign: "center" }}>
          <h4>{dateString(startOfWeek(startDate), endOfWeek(startDate))}</h4>
        </Row>

        <Row style={{ textAlign: "center" }}>
          <Button.Group size="default">
            <Button
              onClick={() => setStartDate(moment(startDate).subtract(7, "d"))}
            >
              <Icon type="left" />
            </Button>
            <Button onClick={() => setStartDate(moment().startOf("week"))}>
              <Icon type="calendar" />
              Today
            </Button>
            <Button>
              {dateString(startOfWeek(startDate), endOfWeek(startDate))}
            </Button>
            <Button onClick={() => setStartDate(moment(startDate).add(7, "d"))}>
              <Icon type="right" />
            </Button>
          </Button.Group>
        </Row>

        <Row style={{ textAlign: "center" }}>
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
      </div>

      <div>
        {dates && (
          <Row style={{ textAlign: "center" }}>
            <h4>{dateString(startOfWeek(startDate), endOfWeek(startDate))}</h4>
          </Row>
        )}
      </div>

      {isLoading ? <p>Loading movies...</p> : <MovieList movies={results} />}
    </div>
  );
}

export { TmdbReleaseDatesList };
