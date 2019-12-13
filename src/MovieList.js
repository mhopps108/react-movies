import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import SingleSelect from "./useAntSelect";
import { buildDiscoveryUrl, movieLists } from "./tmdb-api";
import { useDataApi } from "./use-data-api.js";

/*
MM dd     Title     btn
Year  Runtime  Cert
Ratings Imdb tmdb?
Genres(3)
*/
function MovieListItem({ movie }) {
  const { id, title, poster_path, release_date, vote_average } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w92/${poster_path}`;
  const year = release_date.substring(0, 4);

  return (
    <Col style={{ padding: "10px" }}>
      <Card title={title}>
        <Row>
          <Col span={8}>
            <img src={imgUrl} alt={title} />
          </Col>
          <Col span={16}>
            <Col className="card-text w-25">Release: {release_date}</Col>
            <Col className="card-text w-25">tmdbid: {id}</Col>
            <Col className="card-text w-25">Vote: {vote_average}/10</Col>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

function MovieList() {
  const MONTHS = [
    { name: "Jan", id: "0" },
    { name: "Feb", id: "1" },
    { name: "Mar", id: "2" },
    { name: "Apr", id: "3" },
    { name: "May", id: "4" },
    { name: "Jun", id: "5" },
    { name: "Jul", id: "6" },
    { name: "Aug", id: "7" },
    { name: "Sep", id: "8" },
    { name: "Oct", id: "9" },
    { name: "Nov", id: "10" },
    { name: "Dec", id: "11" }
  ];
  const [month, setMonth] = useState(new Date().getMonth());
  const url = buildDiscoveryUrl(month);
  const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {
    results: []
  });

  useEffect(() => {
    console.log(`Month: ${month}`);
    doFetch(buildDiscoveryUrl(month));
  }, [month, doFetch]);

  console.log("data");
  console.log(data);

  return (
    <div className="movie-list-wrapper mx-auto">
      <h1 className="text-center">Now Playing ({data.results.length})</h1>

      <SingleSelect
        initOptions={MONTHS}
        setSelected={setMonth}
        startVal={MONTHS[month].name}
      />

      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div style={{ background: "#696969", padding: "30px" }}>
            <Row>
              {data.results.map(movie => (
                <MovieListItem key={movie.id} movie={movie} />
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export { MovieList };
