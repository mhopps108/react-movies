import React from "react";
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
    <div className="col-sm-6 col-lg-4 px-2 pb-3">
      <div className="card">
        <div className="card-header p-1 text-center">
          <p className="card-title m-0">{title}</p>
        </div>
        <div className="card-body p-1 d-flex">
          <div className="flex-shrink-0 h-100">
            <img className="h-100" src={imgUrl} alt={title} />
          </div>
          <div className="w-100 p-0 d-flex">
            <span className="card-text w-25">{year}</span>
            <span className="card-text w-25">{id}</span>
            <span className="card-text w-25">{vote_average}</span>
          </div>
        </div>
      </div>
    </div>
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
    <div className="movie-list-wrapper mx-auto">
      <h1 className="text-center">Now Playing</h1>
      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div className="container">
            <div className="row">
              {data.results.map(movie => (
                <MovieListItem key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { MovieList };
