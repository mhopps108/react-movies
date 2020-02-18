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
      console.log("FETCH_FAILURE");
      // console.log(action.payload);
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
  const [imdbRating, setImdbRating] = useState({ rating: 0, ratingCount: 0 });
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
        const result = await axios(url, {
          "Access-Control-Allow-Origin": "*"
        });
        console.log("right after await axios");
        console.log(result);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        console.log("error");
        console.log(error);
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    if (url && imdbId) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [url]);

  useEffect(() => {
    if (state.data) {
      let ratingdata = state.data;
      console.log(`imdb - ratingData - ${imdbId}`);

      if (ratingdata.startsWith("imdb.rating.run(")) {
        ratingdata = ratingdata.slice(16, -1);
        let ratingjson = JSON.parse(ratingdata);
        console.log("ratingjson");
        console.log(ratingjson);
        setImdbRating({
          rating: ratingjson.resource.rating,
          ratingCount: ratingjson.resource.ratingCount
        });
      }
    }
  }, [state]);

  useEffect(() => {
    console.log("imdbRating - useImdbRating");
    console.log(imdbRating);
  }, [imdbRating]);

  return { imdbRating, setImdbId };
};

export { useImdbRating };
