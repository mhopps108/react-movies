import React, { useState, useEffect, useRef, useReducer } from "react";
import ReactDOM from "react-dom";

import { Button, Drawer, Row, Col, Icon, DatePicker } from "antd";
import { MovieList } from "./MovieList";
// import { useDataApi } from "./useDataApi";
import { useMyDataApi } from "./useMyDataApi";
// import { useAllPagesDataApi } from "./useAllPagesDataApi";
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
    region: "US",
    include_adult: "false",
    with_original_language: "en",
    sort_by: "release_date.asc",
    // page: `${page}`,
    "release_date.gte": `${startOfWeek(startDate).format("YYYY-MM-DD")}`,
    "release_date.lte": `${endOfWeek(startDate).format("YYYY-MM-DD")}`,
    with_release_type: `${releaseType}`
  };
  const starterUrl = `${baseUrl}${list.path}?${queryString(params)}`;

  const [state, setUrl] = useMyDataApi(starterUrl, []);
  const { data, isLoading, isError, allResults } = state;
  const { total_results, total_pages, results, dates = null } = data; // useState for page

  const twixDateString = (start, end) => {
    return moment(start)
      .twix(end, { allDay: true })
      .format();
  };

  useEffect(() => {
    if ("releaseType" in list) {
      setReleaseType(list.releaseType);
    }
    setUrl(starterUrl);
  }, [list, startDate, starterUrl]);

  useEffect(() => {
    setPage(1);
  }, [list, startDate]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center ",
          padding: "5px 10px",
          backgroundColor: "white"
        }}
      >
        <p style={{ fontSize: "4vw", padding: 0, margin: 0 }}>{list.name}</p>
        <p style={{ fontSize: "4vw", padding: 0, margin: 0 }}>
          #{allResults.length}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center ",
          padding: "5px 10px",
          backgroundColor: "white"
        }}
      >
        <Button
          style={{ border: "none" }}
          size=""
          onClick={() => setStartDate(moment(startDate).subtract(7, "d"))}
        >
          <Icon type="left" />
        </Button>
        <Button
          style={{ border: "none" }}
          onClick={() => setStartDate(startOfWeek())}
        >
          <Icon type="calendar" />{" "}
          {twixDateString(startOfWeek(startDate), endOfWeek(startDate))}
        </Button>
        <Button
          style={{ border: "none" }}
          size=""
          onClick={() => setStartDate(moment(startDate).add(7, "d"))}
        >
          <Icon type="right" />
        </Button>

        {/* <Button.Group size="small">
          <Button
            onClick={() => setStartDate(moment(startDate).subtract(7, "d"))}
          >
            <Icon type="left" />
          </Button>
          <Button onClick={() => setStartDate(startOfWeek())}>Today</Button>
          <Button>
            <Icon type="calendar" />{" "}
            {twixDateString(startOfWeek(startDate), endOfWeek(startDate))}
          </Button>
          <Button onClick={() => setStartDate(moment(startDate).add(7, "d"))}>
            <Icon type="right" />
          </Button>
        </Button.Group> */}
      </div>

      {isError && <p>Error</p>}
      {/* {isLoading ? <p>Loading movies...</p> : <MovieList movies={results} />} */}
      {isLoading ? <p>Loading movies...</p> : <MovieList movies={allResults} />}
      {/* {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        <MovieList movies={movieState.movies} />
      )} */}
    </>
  );
}

export { TmdbReleaseDatesList };
