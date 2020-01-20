import React, { useState, useEffect, useRef, useReducer } from "react";
import ReactDOM from "react-dom";

import { Button, Drawer, Row, Col, Icon, DatePicker } from "antd";
import { MovieList } from "./MovieList";
import { useDataApi } from "./useDataApi";
import { useAllPagesDataApi } from "./useAllPagesDataApi";
import moment from "moment";
import twix from "twix";
import "antd/dist/antd.css";
import "./styles.css";

const movieFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        // movies: [...state.movies, ...action.payload]
        movies: state.movies.concat(action.payload)
        // movies: action.payload
      };
    case "FETCH_NEW":
      return {
        ...state,
        movies: []
      };
    default:
      throw new Error();
  }
};

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
  // const [movies, setMovies] = useState([]);
  const [movieState, movieDispatch] = useReducer(movieFetchReducer, {
    movies: [],
    other: true
  });

  const baseUrl = "https://api.themoviedb.org/3";
  const params = {
    api_key: "0d15450f36e2e4eaec96d1e905c43fad",
    language: "en-US",
    region: "US",
    include_adult: "false",
    with_original_language: "en",
    sort_by: "release_date.asc",
    page: `${page}`,
    "release_date.gte": `${startOfWeek(startDate).format("YYYY-MM-DD")}`,
    "release_date.lte": `${endOfWeek(startDate).format("YYYY-MM-DD")}`,
    with_release_type: `${releaseType}`
  };
  const starterUrl = `${baseUrl}${list.path}?${queryString(params)}`;
  const basicUrl = `${baseUrl}${list.path}`;

  // const [state, setUrl] = useDataApi(starterUrl, []);
  // const { data, isLoading, isError } = state;
  // const { total_results, total_pages, results, dates = null } = data; // useState for page
  // const [state, setUrl] = useAllPagesDataApi(starterUrl, []);
  const [state, setUrl] = useAllPagesDataApi(basicUrl, params, []);
  const { data, isLoading, isError } = state;
  const { total_results, total_pages, results, dates = null } = data; // useState for page

  const twixDateString = (start, end) => {
    return moment(start)
      .twix(end, { allDay: true })
      .format();
  };

  const pageString = () => {
    return `${page} of ${total_pages}`;
  };

  const resultString = () => `${total_results} Movies`;

  useEffect(() => {
    if ("releaseType" in list) {
      setReleaseType(list.releaseType);
    }
    setUrl(starterUrl);
  }, [list, setUrl, startDate, starterUrl, page]);

  useEffect(() => {
    setPage(1);
    movieDispatch({ type: "FETCH_NEW" });
  }, [list, startDate]);

  useEffect(() => {
    if (total_pages) {
      if (page < total_pages) {
        setPage(page + 1);
      }
    }

    console.log("movieState");
    console.log(movieState);
    console.log(`total_pages: ${total_pages}`);
  }, [total_pages, setPage, page]);

  useEffect(() => {
    movieDispatch({ type: "FETCH_SUCCESS", payload: results });
  }, [results]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center ",
          padding: "0 10px"
        }}
      >
        <p style={{ fontSize: "4vw" }}>{list.name}</p>
        <p style={{ fontSize: "3vw" }}>{resultString()}</p>
      </div>
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

      <Row style={{ textAlign: "right", paddingBottom: "10px" }}>
        <Button.Group size="small">
          <Button
            disabled={page - 1 <= 0}
            onClick={() => setPage(page => page - 1)}
          >
            <Icon type="left" />
            {page - 1}
          </Button>
          <Button>{pageString()}</Button>
          {/* <Button>{resultString()}</Button> */}
          <Button
            disabled={page + 1 > total_pages}
            onClick={() => setPage(page => page + 1)}
          >
            {page + 1}
            <Icon type="right" />
          </Button>
        </Button.Group>
      </Row>
      <Row />
      {isError && <p>Error</p>}
      {/* {isLoading ? <p>Loading movies...</p> : <MovieList movies={results} />} */}
      {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        <MovieList movies={movieState.movies} />
      )}
    </>
  );
}

export { TmdbReleaseDatesList };
