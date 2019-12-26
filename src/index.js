import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./styles.css";
import { MovieList } from "./MovieList";
import { Filterer } from "./Filterer";

//

function App() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [releaseType, setReleaseType] = useState(4);

  const [title, setTitle] = useState("Movies");

  useEffect(() => {
    if (releaseType === 3) {
      setTitle("Theatrical Movies");
    }
    if (releaseType === 4) {
      setTitle("Digital Movies");
    }
    if (releaseType === 5) {
      setTitle("Bluray Movies");
    }
  }, [releaseType]);

  return (
    <div className="App">
      <h1 className="text-center">{title}</h1>
      <MovieList setVisible={setFilterVisible} releaseType={releaseType} />
      <Filterer
        visible={filterVisible}
        setVisible={setFilterVisible}
        releaseType={releaseType}
        setReleaseType={setReleaseType}
      />
      
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
