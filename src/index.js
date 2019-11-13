import React from "react";
import ReactDOM from "react-dom";
import { MovieList } from "./MovieList";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Now Playing</h1>
      <MovieList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
