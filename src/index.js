import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import buildDiscoveryUrl from "./tmdb-api";
import tmdbData from "./tmdb-data";
import MultiSelect from "./useAntMultiSelect";
import { MovieList } from "./MovieList";
import "antd/dist/antd.css";
import { Spin, Icon, DatePicker } from "antd";
const { MonthPicker } = DatePicker;

const isLoading = false;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

//<MonthPicker className="mx-auto w-50" />

function App() {
  const u = buildDiscoveryUrl();
  // console.log(`${buildDiscoveryUrl()}`);
  return (
    <div className="App">
      {/* <MultiSelect initOptions={tmdbData.genres} placeholder="Genres" /> */}
      {/* <MultiSelect
        initOptions={tmdbData.certifications.US}
        placeholder="Cert"
      />       */}

      {/* {console.log(tmdbData)} */}
      {/* {isLoading && <Spin indicator={antIcon} />} */}
      <MovieList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
