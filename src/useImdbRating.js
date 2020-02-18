import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      console.log("FETCH_SUCCESS");
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useImdbRating = () => {
  const [imdbId, setImdbId] = useState();
  const [rating, setRating] = useState();
  // const [state, setUrl] = useDataApi(); // const { data, isLoading, isError } = state;
  const [url, setUrl] = useState();
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: ""
  });

  useEffect(() => {
    if (imdbId) {
      console.log("setting imdb rating url");
      const imdbRatingUrl = `https://p.media-imdb.com/static-content/documents/v1/title/${imdbId}/ratings%3Fjsonp=imdb.rating.run:imdb.api.title.ratings/data.json?u=ur25742841&s=p3`;
      console.log(imdbRatingUrl);
      setUrl(imdbRatingUrl);
    }
  }, [imdbId]);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        console.log("right after await axios");
        console.log(result);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();

    // console.log("state - useDataApi");
    // console.log(state);
    // console.log(`url: ${url}`);

    return () => {
      didCancel = true;
    };
  }, [url]);

  useEffect(() => {
    // if (data && imdbId) {
    // if (data) {
    console.log(`imdb - ratingData - ${imdbId}`);
    console.log(state);
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

  // return [rating, setImdbId];
  // return { data, isLoading, isError, setImdbId };
  return { state, setImdbId };
};

export { useImdbRating };
