import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_RESET":
      return {
        ...state,
        allResults: []
      };
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        allResults: [
          ...new Set(state.allResults.concat(action.payload.results))
        ]
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

const useMyDataApi = (initialUrl, initialData, maxPages = 5) => {
  let page = 1;
  const [url, setUrl] = useState(`${initialUrl}&page=${page}`);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
    allResults: []
  });

  useEffect(() => {
    let didCancel = false;
    dispatch({ type: "FETCH_RESET" });
    const fetchData = async page => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(`${url}&page=${page}`);
        console.log("result");
        console.log(result);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          console.log("state - useMYDataApi");
          console.log(state.allResults);
          console.log(`Url: ${url}&page=${page}`);
          if (page < result.data.total_pages && page < maxPages) {
            page = page + 1;
            // console.log(`page: ${page} of ${state.data.total_pages}`);

            fetchData(page);
          }
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData(page);

    return () => {
      didCancel = true;
    };
  }, [url]);

  // useEffect(() => {
  //   console.log("state - useMYDataApi");
  //   console.log(state);
  //   console.log(`Url: ${url}&page=${page}`);
  // }, [state, url, page]);

  return [state, setUrl];
};

export { useMyDataApi };
