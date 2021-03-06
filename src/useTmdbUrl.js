import { useState, useEffect } from "react";
import tmdbData from "./tmdb-data";
import { useDataApi } from "./useDataApi";
import moment from "moment";

var queryString = params => {
  return Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
};

const startOfWeek = date => {
  return (moment(date) || moment()).startOf("week");
};

const useTmdbUrl = () => {
  const tmdbLists = tmdbData.list;
  const starterList = tmdbLists.find(
    list => list.name === "Home Release Dates"
  );
  const [list, setList] = useState(starterList);

  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(startOfWeek());
  const [endDate, setEndDate] = useState(moment(startDate).endOf("week"));

  const [sortBy, setSortBy] = useState("release_date.asc");
  const [releaseType, setReleaseType] = useState("4");

  /* params */
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

  const starterUrl = `${baseUrl}${list.path}?${queryString(discoveryParams)}`;
  // const [{ data, isLoading, isError, setUrl }] = useDataApi(starterUrl);
  console.log(`starterUrl: ${starterUrl}`);
  console.log(`queryString: ${queryString(discoveryParams)}`);
  const [state, setUrl] = useDataApi(starterUrl);
  const { data, isLoading, isError } = state;

  /* EFFECT */
  useEffect(() => {
    if ("releaseType" in list) {
      setReleaseType(list.releaseType);
    }
    if ("sortBy" in list) {
      setSortBy(list.sortBy);
    }

    const params =
      list.source === "discovery" ? discoveryParams : defaultParams;
    const newUrl = `${baseUrl}${list.path}?${queryString(params)}`;
    console.log(`params:`);
    console.log(params);
    console.log(`newUrl:\n${newUrl}`);
    setUrl(newUrl);
  }, [list, page, defaultParams, discoveryParams, setUrl]);

  /* EFFECT */
  useEffect(() => {
    if (list.source === "discovery") {
      setStartDate(startOfWeek(startDate));
      setEndDate(startDate.clone().endOf("week"));
    } else {
      if ("dates" in data) {
        setStartDate(moment(data.dates.minimum));
        setEndDate(moment(data.dates.maximum));
      } else {
        setStartDate(null);
        setEndDate(null);
      }
    }
  }, [data, list]);

  return {
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
  };
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

// export { useTmdbUrl };
