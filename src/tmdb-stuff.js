/*
Discovery
- Type: All Movies
- Filters: 
    genre, votes, vote average, certification
- SortBy: 
    popularity, rating(votes), revenue, release date, title
- Page/View:
    month (page by month), year (page by year)
-Ex: most popular from 2010, best rating from Dec 2018

TMDb Lists
- top_rated
- popular
- now_playing
- upcoming

Releases
Needs: release type | date | page
- Type: theater, home (digital & bluray)
- View: week range (sun-sat)
- PageBy: week
- Notes: release dates are only reliable close to current date

All
- infinite scroll for paging apis data 



useTmdbApi
- build url
- doFetch (use-data-api)
- set data, 


TMDb-Api
return:
  - list: 
      results | total_results | page | total_pages | startDate | endDate
  - releases:
      + releaseType
  - discovery: 
      + genres | cert | vote avg | min votes


*/

/*
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

const url =
    "https://api.themoviedb.org/3/discover/movie?" +
    // `api_key=${AKPEIY}` +
    // "&language=en-US" +
    // "&region=US" +
    "&include_adult=false" +
    "&with_original_language=en" +
    `&page=${pageNum}` +
    "&sort_by=release_date.asc" +
    `&release_date.gte=${startDate.format("YYYY-MM-DD")}` +
    `&release_date.lte=${endDate.format("YYYY-MM-DD")}` +
    `&with_release_type=${withReleaseType}`;

*/
