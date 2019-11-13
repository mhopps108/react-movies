// ignore - movielist.js

import React from "react";
import { useDataApi } from "./use-data-api.js";

function MovieItem({ movie }) {
  //const [id, poster_path, url, title, rating] = props.movie;

  return (
    console.log(movie) ||
    <p>{movie}</p>
  );
}

function MovieList() {
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=0d15450f36e2e4eaec96d1e905c43fad",
    { results: [] }
  );

  const posterImgBase = path => "https://image.tmdb.org/t/p/w92" + path;

  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : 
        {data.results.map(movie => (
          <p>{movie}</p>
        ))}
        //<MovieItem movie={data.results[0]} />
    
        
        //{data.results.map(item => (
          //<MovieItem movie={item}
        //))}
            //<img src={posterImgBase(item.poster_path)} alt="" />
            //<a href={item.url}>{item.title}</a>
        //))}
      )}
    </>
  );
}

export { MovieList };
