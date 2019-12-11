const movieLists = {
  nowPlaying: {
    name: "Now Playing",
    url:
      "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=0d15450f36e2e4eaec96d1e905c43fad"
  },
  homeReleases: {
    name: "homeReleases",
    url:
      "https://api.themoviedb.org/3/discover/movie?" +
      "api_key=0d15450f36e2e4eaec96d1e905c43fad" +
      "&language=en-US" +
      "&region=US" +
      "&include_adult=false" +
      "&with_original_language=en" +
      "&page=1" +
      "&sort_by=release_date.asc" +
      "&release_date.gte=2019-12-13" +
      "&release_date.lte=2019-12-15" +
      "&with_release_type=4"
  }
};

function homeReleasesUrl() {
  const now = new Date();
  const url =
    "https://api.themoviedb.org/3/discover/movie?" +
    "api_key=0d15450f36e2e4eaec96d1e905c43fad" +
    "&language=en-US" +
    "&region=US" +
    "&include_adult=false" +
    "&with_original_language=en" +
    "&page=1" +
    "&sort_by=release_date.asc" +
    `&release_date.gte=${now.getFullYear()}-${now.getMonth() +
      1}-${now.getDate()}` +
    `&release_date.lte=${now.getFullYear()}-${now.getMonth() +
      1}-${now.getDate() + 7}` +
    //"&release_date.gte=2019-12-13" +
    //"&release_date.lte=2019-12-15" +
    "&with_release_type=4";
  return url;
}

export { movieLists, homeReleasesUrl };
