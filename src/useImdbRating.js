import { useState, useEffect } from "react";
import { useDataApi } from "./useDataApi";

const useImdbRating = () => {
  const [imdbId, setImdbId] = useState();
  const [rating, setRating] = useState();
  const [state, setUrl] = useDataApi("");
  const { data, isLoading, isError } = state;

  useEffect(() => {
    const imdbRatigtUrl = `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json?u=ur25742841&s=p3`;
    setUrl(imdbRatigtUrl);
  }, [imdbId, setUrl]);

  useEffect(() => {
    if (data) {
      console.log(`imdb - ratingData - ${imdbId}`);
      console.log(data);
      let rate = data.indexOf('"rating":');
      // console.log(`ratingIdx: ${rate}`);
      let r = data.substr(rate, 12);
      // console.log(`r-sub: ${r}`);
      let rr = r.substring(9, 12);
      console.log(`RATING: ${rr}`);
      setRating(rr);
    }
  }, [state]);

  return [rating, setImdbId];
};

export { useImdbRating };
