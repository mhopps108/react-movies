import React from "react";
import { Card, Row, Col } from "antd";
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

  // try card-deck
  return (
    <Col style={{ padding: "10px" }}>
      <Card title={title}>
        <Row>
          <Col span={8}>
            <img src={imgUrl} alt={title} />
          </Col>
          <Col span={16}>
            <Col className="card-text w-25">{year}</Col>
            <Col className="card-text w-25">{id}</Col>
            <Col className="card-text w-25">{vote_average}</Col>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

const movieLists = {
  nowPlaying: {
    name: "Now Playing",
    url:
      "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=0d15450f36e2e4eaec96d1e905c43fad"
  },
  homeReleases: {
    name: "homeReleases",
    url:
      "https://api.themoviedb.org/3/discover/movie?" +
      "api_key=0d15450f36e2e4eaec96d1e905c43fad" +
      "&language=en-US" +
      "&region=US" +
      "&include_adult=false" +
      "&with_original_language=en" +
      "&page=1" +
      "&sort_by=release_date.asc" +
      "&release_date.gte=2019-11-24" +
      "&release_date.lte=2019-11-30" +
      "&with_release_type=4%7C5"
  }
};

function MovieList() {
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    movieLists.homeReleases.url,
    { results: [] }
  );

  return (
    <div className="movie-list-wrapper mx-auto">
      <h1 className="text-center">Now Playing</h1>
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
