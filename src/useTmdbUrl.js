import { useState, useEffect } from "react";
import axios from "axios";
import tmdbData from "./tmdb-data.js";
import { useDataApi } from "./useDataApi.js";
import moment from "moment";

var queryString = params =>
  Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");

const useTmdbUrl = () => {
  const tmdbLists = tmdbData.list;
  const [list, setList] = useState(tmdbLists[1]);

  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState(moment().startOf("week"));
  const [endDate, setEndDate] = useState(moment(startDate).endOf("week"));

  const [sortBy, setSortBy] = useState("release_date.asc");
  const [releaseType, setReleaseType] = useState("4|5");

  const baseUrl = "https://api.themoviedb.org/3";
  const defaultParams = {
    api_key: "0d15450f36e2e4eaec96d1e905c43fad",
    language: "en-US",
    page: `${page}`,
    region: "US"
  };
  const discoveryParams = {
    ...defaultParams,
    include_adult: "false",
    with_original_language: "en",
    sort_by: `${sortBy}`,
    "release_date.gte": `${moment(startDate).format("YYYY-MM-DD")}`,
    "release_date.lte": `${moment(endDate).format("YYYY-MM-DD")}`,
    with_release_type: `${releaseType}`
  };
  const [params, setParams] = useState("");

  const starterUrl = `${baseUrl}${list.path}?${queryString(defaultParams)}`;
  // console.log(`starterUrl: ${starterUrl}`);
  const [{ data, isLoading, isError, setUrl }] = useDataApi(starterUrl, {
    results: []
  });

  useEffect(() => {
    let newUrl = "";
    console.log(`list-type: ${list.type}`);
    if (list.type === "discovery") {
      newUrl = `${baseUrl}${list.path}?${queryString(discoveryParams)}`;
    }
    if (list.type === "list") {
      newUrl = `${baseUrl}${list.path}?${queryString(defaultParams)}`;
    }

    setUrl(newUrl);
    console.log("useTmdbList - url");
    console.log(newUrl);
    console.log("page");
    console.log(page);
  }, [list, page, startDate, defaultParams, params, setUrl]);

  useEffect(() => {
    console.log("useTmdbList - data");
    console.log(data);
    setResults("results" in data ? data.results : []);
    setTotalResults("total_results" in data ? data.total_results : 0);
    setTotalPages("total_pages" in data ? data.total_pages : 0);
    // setPage by scrolling to bottom page+1
    // setStartDate("dates" in data ? data.dates.minimum : startDate);
    if ("dates" in data) {
      setStartDate(moment(data.dates.minimum));
      setEndDate(moment(data.dates.maximum));
    }
  }, [data]);

  useEffect(() => {
    console.log(`startDate: ${startDate.format("YYYY-MM-DD")}`);
    // let end = startDate.clone().add(7, "d");
    let end = startDate.clone().endOf("week");
    // if (!("dates" in data)) {
    //   setEndDate(end);
    // }
    if (list.type === "discovery") {
      setEndDate(end);
    }

    console.log(`startDate: ${startDate.format("YYYY-MM-DD")}`);
    console.log(`endDate: ${endDate.format("YYYY-MM-DD")}`);
  }, [startDate]);

  useEffect(() => {
    console.log("STATE: useTmdbList");
    console.log("data");
    console.log(data);
    console.log("start & end Dates");
    console.log(startDate);
    console.log(endDate);
  }, [list, page, startDate, defaultParams, params, setUrl]);

  return [
    {
      data,
      isLoading,
      isError,
      list,
      setList,
      setReleaseType,
      setPage,
      startDate,
      setStartDate,
      endDate
    }
  ];
};

//
//
//

// function discoveryUrlByWeek(startDate, releaseType, page) {
//   const pageNum = page || 1;
//   const withReleaseType = releaseType || "4";
//   // const start = startDate || moment();
//   if (startDate === undefined) {
//     startDate = moment().startOf("week");
//   }
//   startDate = moment(startDate).startOf("week");
//   const endDate = moment(startDate).endOf("week");

//   const url =
//     "https://api.themoviedb.org/3/discover/movie?" +
//     `api_key=0d15450f36e2e4eaec96d1e905c43fad` +
//     "&language=en-US" +
//     "&region=US" +
//     "&include_adult=false" +
//     "&with_original_language=en" +
//     `&page=${pageNum}` +
//     "&sort_by=release_date.asc" +
//     `&release_date.gte=${startDate.format("YYYY-MM-DD")}` +
//     `&release_date.lte=${endDate.format("YYYY-MM-DD")}` +
//     `&with_release_type=${withReleaseType}`;
//   return url;
// }

// export { useTmdbUrl, discoveryUrlByWeek };
export { useTmdbUrl };
