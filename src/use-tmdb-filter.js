import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const tmdbMovieLists = {
  topRated: {
    name: "Top Rated",
    path: "top_rated"
  },
  popular: {
    name: "Popular",
    path: "popular"
  },
  nowPlaying: {
    name: "Now Playing",
    path: "now_playing"
  },
  upcoming: {
    name: "Upcoming",
    path: "upcoming"
  }
};

const defaultParams = {
  api_key: "0d15450f36e2e4eaec96d1e905c43fad",
  language: "en-US",
  page: "1",
  region: "US"
};

const useTmdbApi = movieSection => {
  const baseUrl = "https://api.themoviedb.org/3/movie/";

  const [listName, setListname] = useState(tmdbMovieLists["popular"]);
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const makeTmdbUrl = listName => `${baseUrl}${tmdbMovieLists[listName].path}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        console.log(`Url:\n${url}`);

        const result = await axios(url, { params: params });
        // const result = await axios(url, { params: params });

        console.log("api call result");
        console.log(result);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  useEffect(() => {}, []);

  return [{ data, isLoading, isError }, setUrl];
};

export { useTmdbApi };
