import { useState, useEffect } from "react";
import { useDataApi } from "./useDataApi";
import { useImdbRating } from "./useImdbRating";

const baseParams = `api_key=0d15450f36e2e4eaec96d1e905c43fad&language=en-US&region=US&include_image_language=en,null&append_to_response=videos,images,release_dates,credits,similar,recommendations`;

const useMovieDetails = () => {
  const [tmdbId, setTmdbId] = useState();
  const [state, setUrl] = useDataApi();
  const { data, isLoading, isError } = state;
  const { imdbState, setImdbId } = useImdbRating();

  useEffect(() => {
    if (tmdbId) {
      const newUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?${baseParams}`;
      setUrl(newUrl);
    }
  }, [tmdbId, setUrl]);

  useEffect(() => {
    if (tmdbId && data && data.imdb_id) {
      setImdbId(data.imdb_id);
    }
  }, [state]);

  return { data, isLoading, isError, setTmdbId };
};

{
  /*
adult: false
backdrop_path: "/mXdTWBU9QqeTb4bupf5qCPnW393.jpg"
belongs_to_collection: null
budget: 33000000
genres: Array[3]
homepage: "https://www.21bridges.movie"
id: 535292
imdb_id: "tt8688634"
original_language: "en"
original_title: "21 Bridges"
overview: "An embattled NYPD detective, is thrust into a citywide manhunt ..."
popularity: 28.546
poster_path: "/bSN9SysoRBMwJKNkfOlQlCw2YQO.jpg"
production_companies: Array[3]
production_countries: Array[1]
release_date: "2019-10-24"
revenue: 47088457
runtime: 99
spoken_languages: Array[1]
status: "Released"
tagline: "The only way out is through him"
title: "21 Bridges"
video: false
vote_average: 6.5
vote_count: 128
*/
}

export { useMovieDetails };
