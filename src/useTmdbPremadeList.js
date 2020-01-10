import { useState, useEffect } from "react";
import tmdbData from "./tmdb-data";
import { useDataApi } from "./useDataApi";
import moment from "moment";

var queryString = params =>
  Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");

const useTmdPremadeList = () => {
  // const tmdbLists = tmdbData.list;
  // const starterList = tmdbLists.find(list => list.name === "Popular Movies");
  // const [list, setList] = useState(starterList);
  // const [page, setPage] = useState(1);
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();

  /* params */
  const baseUrl = "https://api.themoviedb.org/3";
  const defaultParams = {
    api_key: "0d15450f36e2e4eaec96d1e905c43fad",
    language: "en-US",
    page: `${page}`,
    region: "US"
  };
  const params = page => {
    return {
      api_key: "0d15450f36e2e4eaec96d1e905c43fad",
      language: "en-US",
      page: `${page}`,
      region: "US"
    };
  };

  const starterUrl = `${baseUrl}${list.path}?${queryString(defaultParams)}`;
  const [{ data, isLoading, isError, setUrl }] = useDataApi(starterUrl);

  /* EFFECT */
  useEffect(() => {
    const newUrl = `${baseUrl}${list.path}?${queryString(defaultParams)}`;
    setUrl(newUrl);
  }, [list, page, defaultParams, setUrl]);

  /* EFFECT */
  useEffect(() => {
    if ("dates" in data) {
      setStartDate(moment(data.dates.minimum));
      setEndDate(moment(data.dates.maximum));
    }
  }, [data, list]);

  useEffect(() => {
    console.log("STATE: useTmdbList");
    console.log("data");
    console.log(data);
    console.log("start & end Dates");
    console.log(startDate);
    console.log(endDate);
  }, [list, page, startDate, defaultParams, setUrl, data, endDate]);

  return [
    {
      data,
      isLoading,
      isError,
      list,
      setList,
      setPage,
      startDate,
      setStartDate,
      endDate
    }
  ];
};

export { useTmdPremadeList };
