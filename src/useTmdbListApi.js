import { useState, useEffect } from "react";
import axios from "axios";
import tmdbData from "./tmdb-data.js";

const useTmdbListApi = () => {
  const tmdbLists = tmdbData.list;
  const [list, setList] = useState(tmdbLists.popular);
  // const [list, setList] = useState({ name: "Popular", path: "/popular" });
  const [data, setData] = useState([]);
  // const [url, setUrl] = useState(makeTmdbUrl(listName));
  // const [params, setParams] = useState(defaultParams);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const defaultParams = {
    api_key: "0d15450f36e2e4eaec96d1e905c43fad",
    language: "en-US",
    page: "1",
    region: "US"
  };
  const baseUrl = "https://api.themoviedb.org/3/movie";

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const listUrl = `${baseUrl}${list.path}`;
        console.log(`ListUrl:\n${listUrl}`);
        const result = await axios(listUrl, {
          params: defaultParams
        });
        console.log("LIST: api call result");
        console.log(result.data);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [list]);

  return [{ data, isLoading, isError }, list, setList];
};

export { useTmdbListApi };
