import { useState, useEffect } from "react";
import axios from "axios";
import tmdbData from "./tmdb-data.js";
import { useDataApi } from "./useDataApi.js";

var queryString = params =>
  Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");

const useTmdbUrl = () => {
  const tmdbLists = tmdbData.list;
  const [list, setList] = useState(tmdbLists[1]);

  const baseUrl = "https://api.themoviedb.org/3";
  const starterUrl = `${baseUrl}${list.path}?${queryString(defaultParams)}`;

  const [{ data, isLoading, isError, setUrl }] = useDataApi(starterUrl, {
    results: []
  });

  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  // sortby, release type,

  const defaultParams = {
    api_key: "0d15450f36e2e4eaec96d1e905c43fad",
    language: "en-US",
    page: "1",
    region: "US"
  };
  const discoveryParms = {
    ...defaultParams,
    include_adult: "false",
    with_original_language: "en",
    sort_by: "release_date.asc",
    "release_date.gte": `${startDate.format("YYYY-MM-DD")}`,
    "release_date.lte": `${endDate.format("YYYY-MM-DD")}`,
    with_release_type: "4|5"
  };
  const [params, setParams] = useState("");

  useEffect(() => {
    // const newUrl = baseUrl + queryString(...defaultParams, ...params);
    // setUrl(newUrl);
    // console.log("useTmdbList - list");
    // console.log(tmdbLists);
    // const listUrl = `${baseUrl}${list.path}`;
  }, [params]);

  return [{ data, isLoading, isError }, list, setList];
};

export { useTmdbUrl };
