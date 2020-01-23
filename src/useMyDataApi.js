import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
        // allResults: []
      };
    case "FETCH_RESET":
      return {
        ...state,
        isLoading: true,
        isError: false,
        allResults: []
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        // allResults: state.allResults.concat(action.payload.results)
        allResults: [
          ...new Set(state.allResults.concat(action.payload.results))
        ]
        // allResults: [
        //   ...new Set([...state.allResults, ...action.payload.results])
        // ]
        // allResults: [
        //   ...state.allResults,
        //   ...action.payload.results.filter(item =>
        //     state.allResults.includes(item)
        //   )
        // ]
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

const useMyDataApi = (initialUrl, startPage, initialData) => {
  // const [page, setPage] = useState(startPage);
  let page = startPage;
  const [url, setUrl] = useState(`${initialUrl}&page=${page}`);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
    allResults: []
  });

  useEffect(() => {
    let didCancel = false;
    let hasMore = true;
    if (page === 1) {
      dispatch({ type: "FETCH_RESET" });
    }
    const fetchData = async page => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(`${url}&page=${page}`);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          if (page < result.data.total_pages) {
            // setPage(page => page + 1);
            console.log("HAS-MORE");
            page = page + 1;
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

  useEffect(() => {
    console.log("state - useMYDataApi");
    console.log(state);
    console.log(`page: ${page} of ${state.data.total_pages}`);
    console.log(`url: ${url}`);
  }, [state]);

  return [state, setUrl];
};

export { useMyDataApi };
