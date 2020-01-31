import { useState, useEffect } from "react";
import { useDataApi } from "./useDataApi";

const baseParams =
  "api_key=0d15450f36e2e4eaec96d1e905c43fad&language=en-US&region=US";

const useMovieDetails = tmdbId => {
  // const [tmdbId, setTmdbId] = useState(); // 338967
  const starterUrl = "";
  const [state, setUrl] = useDataApi(starterUrl);
  const { data, isLoading, isError } = state;

  useEffect(() => {
    const newUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?${baseParams}`;
    setUrl(newUrl);
  }, [tmdbId, setUrl]);

  return [data, isLoading, isError];
};

export { useMovieDetails };
