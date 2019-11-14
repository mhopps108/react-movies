import React from "react";
import { useDataApi } from "./use-data-api.js";

function MovieListItem({ movie }) {
  //const [id, poster_path, url, title, rating] = props.movie;
  const { id, title, poster_path, release_date, vote_average } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w92/${poster_path}`;
  const year = release_date.substring(0, 4);

  return (
    //<li>
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body p-1 d-flex">
          <div className="w-25 img-wrapper">
            <img src={imgUrl} alt={title} />
          </div>
          <div className="w-75">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{year}</p>
          </div>
        </div>
      </div>
    </div>
    //</li>
  );
}

const movieLists = {
  nowPlaying: {
    name: "Now Playing",
    url:
      "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=0d15450f36e2e4eaec96d1e905c43fad"
  }
};

function MovieList() {
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    movieLists.nowPlaying.url,
    { results: [] }
  );

  return (
    <>
      <h1>Now Playing</h1>
      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="movie-list container">
            <div className="row">
              {data.results.map(movie => (
                <MovieListItem key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { MovieList };
