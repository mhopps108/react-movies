import { useState, useEffect } from "react";
import moment from "moment";

const useDataApi = (initialUrl, initialData) => {
  const [releaseType, setReleaseType] = useState([]);
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [voteAvg, setVoteAvg] = useState([]); // [0, 10]

  useEffect(() => {}, []);

  return [{ data, isLoading, isError }, setUrl];
};

export { useDataApi };
