import React from "react";
import ReactDOM from "react-dom";
import { MovieList } from "./MovieList";
import "./styles.css";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import 'antd/dist/antd.css';
import { Spin, Icon } from 'antd';

const isLoading = false;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

function App() {
  return (
    <div className="App">
      { isLoading && <Spin indicator={antIcon} /> }
      <MovieList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
