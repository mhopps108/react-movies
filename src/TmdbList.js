import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Button, Drawer, Row, Col, Icon, DatePicker } from "antd";
import { MovieList, MovieSectionList } from "./MovieList";
import { useDataApi } from "./useDataApi";
import { useMyDataApi } from "./useMyDataApi";
import moment from "moment";
import "antd/dist/antd.css";
import "./styles.css";

var queryString = params => {
  return Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
};

function TmdbList({ list }) {
  const baseUrl = "https://api.themoviedb.org/3";
  const params = {
    api_key: "0d15450f36e2e4eaec96d1e905c43fad",
    language: "en-US",
    // page: `${page}`,
    page: "1",
    region: "US"
  };
  const starterUrl = `${baseUrl}${list.path}?${queryString(params)}`;

  // const [state, setUrl] = useDataApi(starterUrl, []);
  // const { data, isLoading, isError } = state;
  // const { page, total_results, total_pages, results, dates = null } = data;

  const [state, setUrl] = useMyDataApi(starterUrl, []);
  const { data, isLoading, isError, allResults } = state;
  const { total_results, total_pages, results, dates = null } = data; // useState for page
  const [movies, setMovies] = useState([]);

  const dateString = (start, end) => {
    return `${moment(start).format("MMM DD YYYY")} to ${moment(end).format(
      "MMM DD YYYY"
    )}`;
  };

  useEffect(() => {
    setUrl(starterUrl);
  }, [list, setUrl]);

  useEffect(() => {
    if (!dates) {
      setMovies(allResults);
    } else {
      let sorted = {};
      console.log("allResults");
      console.log(allResults);
      allResults.forEach(item => {
        if (item) {
          if (item.release_date in sorted) {
            sorted[item.release_date].push(item);
          } else {
            sorted[item.release_date] = [];
            sorted[item.release_date].push(item);
          }
        }
      });
      var orderedDates = {};
      Object.keys(sorted)
        .sort((a, b) => moment(a, "YYYYMMDD") - moment(b, "YYYYMMDD"))
        .forEach(key => (orderedDates[key] = sorted[key]));
      console.log("orderedDates");
      console.log(orderedDates);
      setMovies(orderedDates);
    }
  }, [allResults]);

  // useEffect(() => {
  //   setPage(1);
  // }, [list, startDate]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center ",
          padding: "5px 10px",
          backgroundColor: "white"
        }}
      >
        <p style={{ fontSize: "4vw", fontWeight: 700, padding: 0, margin: 0 }}>
          {list.name}
        </p>
        <p style={{ fontSize: "4vw", padding: 0, margin: 0 }}>
          #{allResults.length}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center ",
          padding: "5px 10px",
          backgroundColor: "white"
        }}
      >
        {dates && (
          <p
            style={{ fontSize: "4vw", fontWeight: 700, padding: 0, margin: 0 }}
          >
            {dateString(dates.minimum, dates.maximum)}
          </p>
        )}
      </div>

      {/* {isLoading ? <p>Loading movies...</p> : <MovieList movies={results} />} */}
      {/* {isLoading ? <p>Loading movies...</p> : <MovieList movies={movies} />} */}
      {/* {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        <MovieSectionList movies={movies} />
      )} */}
      {isLoading && <p>Loading movies...</p>}
      {!isLoading && !dates && <MovieList movies={allResults} />}
      {!isLoading && dates && <MovieSectionList movies={movies} />}
    </div>
  );
}

export { TmdbList };
