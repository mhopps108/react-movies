import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles.css";
import { MovieList } from "./MovieList";

function App() {
  // const u = buildDiscoveryUrl();
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
