import React from "react";
import ReactDOM from "react-dom";
import { MovieList } from "./MovieList";
import "./styles.css";

import tmdbData from "./tmdb-data";
import MultiSelect from "./useAntMultiSelect";

import "antd/dist/antd.css";
import { Spin, Icon, DatePicker } from "antd";
const { MonthPicker } = DatePicker;

const isLoading = false;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

//<MonthPicker className="mx-auto w-50" />

const Button = stuff => {
  return (
    <button
      onClick={() => {
        console.log(stuff);
      }}
    >
      Click
    </button>
  );
};

function App() {
  return (
    <div className="App">
      <MultiSelect initOptions={tmdbData.genres} placeholder="Genres" />

      <MultiSelect
        initOptions={tmdbData.certifications.US}
        placeholder="Cert"
      />
      <Button stuff={{ keys: "this" }} />
      {console.log(tmdbData)}
      {isLoading && <Spin indicator={antIcon} />}
      <MovieList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
