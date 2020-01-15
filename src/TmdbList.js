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
  // const [listVisible, setListVisible] = useState(false);

  const baseUrl = "https://api.themoviedb.org/3";
  const defaultParams = {
    api_key: "0d15450f36e2e4eaec96d1e905c43fad",
    language: "en-US",
    // page: `${page}`,
    page: "1",
    region: "US"
  };
  const starterUrl = `${baseUrl}${list.path}?${queryString(defaultParams)}`;

  const [state, setUrl] = useDataApi(starterUrl, []);
  const { data, isLoading, isError } = state;
  const { page, total_results, total_pages, results } = data;

  // const dateRangeStr = () => {
  //   const s = `${moment(startDate).format("MMM DD YYYY")} to ${moment(
  //     endDate
  //   ).format("MMM DD YYYY")}`;
  //   return s;
  // };

  return (
    <div>
      {/* <div>
        {startDate && (
          <Row style={{ textAlign: "center" }}>
            <h4>{dateRangeStr()}</h4>
          </Row>
        )}
      </div> */}

      {isLoading ? (
        <p>Loading movies...</p>
      ) : (
        // <MovieList movies={data.results} />
        <MovieList movies={results} />
      )}
    </div>
  );
}

export { TmdbList };
