import { useState, useEffect } from "react";
import { useDataApi } from "./useDataApi";

const useImdbRating = () => {
  // const [imdbId, setImdbId] = useState(null);
  const [imdbId, setImdbId] = useState("tt5033998");
  const [rating, setRating] = useState();
  const [state, setUrl] = useDataApi();
  const { data, isLoading, isError } = state;

  useEffect(() => {
    // if (imdbId) {
    console.log("setting imdb rating url");
    const imdbRatingUrl = `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json?u=ur25742841&s=p3`;
    console.log(imdbRatingUrl);
    setUrl(imdbRatingUrl);
    // }
  }, [imdbId, setUrl]);

  useEffect(() => {
    // if (data && imdbId) {
    console.log(`imdb - ratingData - ${imdbId}`);
    console.log(data);

    console.log("this-shit");

    // let rate = data.indexOf('"rating":');
    // console.log(`ratingIdx: ${rate}`);
    // let r = data.substr(rate, 12);
    // console.log(`r-sub: ${r}`);
    // let rr = r.substring(9, 12);
    // console.log(`RATING: ${rr}`);
    // setRating(rr);
    // }
  }, [state]);

  return [rating, setImdbId];
};

export { useImdbRating };
