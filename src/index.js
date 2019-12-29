import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Drawer, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./styles.css";
import { MovieList } from "./MovieList";
import { Filterer } from "./Filterer";
import { MovieListDrawer } from "./MovieListDrawer";
import tmdbData from "./tmdb-data.js";
import { useTmdbListApi } from "./useTmdbListApi";
import { Item } from "rc-menu";

//

function App() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [releaseType, setReleaseType] = useState(4);

  // const [listName, setListName] = useState(tmdbList["popular"]);
  const [title, setTitle] = useState("Movies");

  const [listVisible, setListVisible] = useState(false);
  const [{ data, isLoading, isError }, list, setList] = useTmdbListApi();
  // const tmdbList = tmdbData.tmdbList;

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
      {data && (
        <div>
          {/* <p>{list}</p> */}
          {/* data.map(item => (<p>{Item.name}</p>
          )) */}
        </div>
      )}
      <MovieList
        setVisible={setFilterVisible}
        setListVisible={setListVisible}
        releaseType={releaseType}
      />
      <MovieListDrawer
        visible={listVisible}
        setVisible={setListVisible}
        setList={setList}
      />
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
