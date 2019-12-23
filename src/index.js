import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles.css";
import { MovieList } from "./MovieList";
import { Filterer } from "./Filterer";

function App() {
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <div className="App">
      <MovieList setVisible={setFilterVisible} />
      <Filterer visible={filterVisible} setVisible={setFilterVisible} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
