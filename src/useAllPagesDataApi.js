import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useDataApi } from "./useDataApi";
import moment from "moment";

const startOfWeek = date => {
  return (moment(date) || moment()).startOf("week");
};

const endOfWeek = date => {
  return (moment(date) || moment()).endOf("week");
};

const paramsReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page < action.totalPages ? state.page + 1 : state.page
      };
    case "NEXT_WEEK":
      return {
        ...state,
        "release_date.gte": moment(state.startDate).add(7, "d"),
        "release_date.lte": moment(state.startDate).add(7, "d")
      };
    case "PREV_WEEK":
      return {
        ...state,
        "release_date.gte": moment(state.startDate).subtract(7, "d"),
        "release_date.lte": moment(state.startDate).subtract(7, "d")
      };
    default:
      throw new Error();
  }
};

var queryString = params => {
  return Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
};

const useAllPagesDataApi = (initialUrl, initialParams, initialData) => {
  const [baseUrl, setBaseUrl] = useState(initialUrl);
  const [movies, setMovies] = useState([]);
  const [params, paramsDispatch] = useReducer(paramsReducer, {
    ...initialParams
  });

  const [fetchState, setUrl] = useDataApi(
    `${baseUrl}?${queryString(params)}`,
    initialData
  );
  const { data, isLoading, isError } = fetchState;
  // const { total_results, total_pages, results, dates = null } = data; // useState for page

  useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      const newUrl = `${baseUrl}?${queryString(params)}`;
      setUrl(newUrl);

      console.log("state - useAllPagesDataApi");
      console.log(fetchState);
      console.log(`newUrl: ${newUrl}`);
    }

    return () => {
      didCancel = true;
    };
  }, [params, setUrl, baseUrl]);

  useEffect(() => {
    paramsDispatch({
      type: "NEXT_PAGE",
      totalpages: data.total_pages
    });
    if (data.results) {
      movies.concat(data.results);
    }
    // setUrl(`${url}?${queryString(params)}`);
  }, [data]);

  // return { isLoading, isError, total_results, results };
  return { data, isLoading, isError, setBaseUrl, paramsDispatch };
};

export { useAllPagesDataApi };
