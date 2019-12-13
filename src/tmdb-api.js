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

// function buildDiscoveryUrl(
//   page = 1,
//   sortBy = "release_date.asc",
//   startMonth = new Date().getMonth,
//   releaseType = 0
// ) {
export default function buildDiscoveryUrl() {
  // const page = 1;
  // const sortBy = "release_date.asc";
  // const startMonth = 11;
  // let releaseType = 4;
  // let startMonth = 11;
  // const now = new Date();
  // const startDate = new Date().setMonth(startMonth);
  // const endDate = new Date().setDate(now.getDate() + 31);

  const startDate = "2019-12-12";
  const endDate = "2019-12-19";
  const AKPEIY = "0d15450f36e2e4eaec96d1e905c43fad";
  // console.log(`StartDate: ${startDate}`);
  return (
    "https://api.themoviedb.org/3/discover/movie?" +
    `api_key=${AKPEIY}` +
    "&language=en-US" +
    "&region=US" +
    "&include_adult=false" +
    "&with_original_language=en" +
    `&page=1` +
    "&sort_by=release_date.asc" +
    `&release_date.gte=${startDate}` +
    `&release_date.lte=${endDate}` +
    `&with_release_type=4`
    // `&page=${page}` +
    // `&sort_by=${sortBy}` +
    // `&release_date.gte=${startDate}` +
    // `&release_date.lte=${endDate}` +
    // `&with_release_type=${releaseType}`
  );
}

// export { movieLists, homeReleasesUrl, buildDiscoveryUrl };
