import React from "react";
import { useDataApi } from "./use-data-api.js";

function MovieListItem({ movie }) {
  //const [id, poster_path, url, title, rating] = props.movie;
  const { id, title, poster_path, release_date, vote_average } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w92/${poster_path}`;
  const year = release_date.substring(0, 4);

  return (
    <li>
      <img src={imgUrl} alt={title} />
      <span>{title}</span>
      <span>{year}</span>
    </li>
  );
}

function MovieList() {
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=0d15450f36e2e4eaec96d1e905c43fad",
    { results: [] }
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul className="movies">
          {data.results.map(movie => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </div>
  );
}

export { MovieList };
