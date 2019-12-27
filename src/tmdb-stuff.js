/*
Theater
Digital
Bluray

This Week

--
Most Popular
Release Date




https://api.themoviedb.org/3/movie/

top_rated
popular
now_playing
upcoming
?
api_key=0d15450f36e2e4eaec96d1e905c43fad
&language=en-US
&page=1
&region=US

*/

const makeTmdbUrl = type => {
  const s = `${baseUrl}${tmdb_urls[type].value}`;
};

const baseUrl = "https://api.themoviedb.org/3/movie/";
const defaultParams = {
  api_key: "0d15450f36e2e4eaec96d1e905c43fad",
  language: "en-US",
  page: "1",
  region: "US"
};
const tmdb_urls = {
  topRated: {
    name: "Top Rated",
    value: "top_rated"
  },
  popular: {
    name: "Popular",
    value: "popular"
  },
  nowPlaying: {
    name: "Now Playing",
    value: "now_playing"
  },
  upcoming: {
    name: "Upcoming",
    value: "upcoming"
  }
};

// const url =
//     "https://api.themoviedb.org/3/discover/movie?" +
//     // `api_key=${AKPEIY}` +
//     // "&language=en-US" +
//     // "&region=US" +
//     "&include_adult=false" +
//     "&with_original_language=en" +
//     `&page=${pageNum}` +
//     "&sort_by=release_date.asc" +
//     `&release_date.gte=${startDate.format("YYYY-MM-DD")}` +
//     `&release_date.lte=${endDate.format("YYYY-MM-DD")}` +
//     `&with_release_type=${withReleaseType}`;
