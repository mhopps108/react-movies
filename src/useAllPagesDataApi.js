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

const paramsReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + 1
      };
    case "FETCH_SUCCESS":
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

var queryString = params => {
  return Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
};

const useAllPagesDataApi = (initialUrl, initialParams, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  // const [, setParams] = useState(initialParams);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });
  const [params, paramsDispatch] = useReducer(paramsReducer, {
    ...initialParams
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          // console.log("result");
          // console.log(result);
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();

    console.log("state - useDataApi");
    console.log(state);
    console.log(`url: ${url}`);

    return () => {
      didCancel = true;
    };
  }, [url]);

  useEffect(() => {
    if (params.page < state.data.total_pages) {
      paramsDispatch({ type: "NEXT_PAGE" });
      setUrl(`${url}?${queryString(params)}`);
    }
  }, [state, setUrl]);

  return [state, setUrl];
};

export { useAllPagesDataApi };
