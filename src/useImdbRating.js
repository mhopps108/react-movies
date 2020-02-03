import { useState, useEffect } from "react";
import { useDataApi } from "./useDataApi";

const baseParams =
  "api_key=0d15450f36e2e4eaec96d1e905c43fad&language=en-US&region=US";

const useImdbRating = () => {
  const [imdbId, setImdbId] = useState();
  const [state, setUrl] = useDataApi("");
  const { data, isLoading, isError } = state;
  const [rating, setRating] = useState();
  // let rating = "";

  useEffect(() => {
    // js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";
    // const imdbUrl = "https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json?u=" + user + "&s=" + style;
    const imdbUrl = `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json?u=ur25742841&s=p3`;
    // console.log(`imdbID: ${imdbId}`);
    setUrl(imdbUrl);
  }, [imdbId, setUrl]);

  useEffect(() => {
    // console.log(state);
    if (data) {
      console.log(`imdb - ratingData - ${imdbId}`);
      console.log(data);
      let rate = data.indexOf('"rating":');
      console.log(`ratingIdx: ${rate}`);
      let r = data.substr(rate, 12);
      console.log(`r-sub: ${r}`);
      let rr = r.substring(9, 12);
      console.log(`RATING: ${rr}`);
      setRating(rr);
    }
  }, [state]);

  return [rating, isLoading, isError, setImdbId];
};

export { useImdbRating };