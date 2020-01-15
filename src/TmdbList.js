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

  const [state, setUrl] = useDataApi(starterUrl, []);
  const { data, isLoading, isError } = state;
  const { page, total_results, total_pages, results, dates = null } = data;

  const dateString = (start, end) => {
    return `${moment(start).format("MMM DD YYYY")} to ${moment(end).format(
      "MMM DD YYYY"
    )}`;
  };

  useEffect(() => {
    setUrl(starterUrl);
  }, [list, setUrl]);

  return (
    <div>
      <div>
        {dates && (
          <Row style={{ textAlign: "center" }}>
            <h4>{dateString(dates.minimum, dates.maximum)}</h4>
          </Row>
        )}
      </div>

      {isLoading ? <p>Loading movies...</p> : <MovieList movies={results} />}
    </div>
  );
}

export { TmdbList };
