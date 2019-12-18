import moment from "moment";

const AKPEIY = "0d15450f36e2e4eaec96d1e905c43fad";

function discoveryUrlByWeek(startDate) {
  console.log(`startDate-first: ${startDate}`);
  const page = 1;
  const releaseType = 4;
  // const start = startDate || moment();
  if (startDate === undefined) {
    startDate = moment().startOf("week");
  }
  startDate = moment(startDate).startOf("week");

  const endDate = moment(startDate).endOf("week");
  console.log(
    `Dates: ${startDate.format("YYYY-MM-DD")} - ${endDate.format("YYYY-MM-DD")}`
  );

  const url =
    "https://api.themoviedb.org/3/discover/movie?" +
    `api_key=${AKPEIY}` +
    "&language=en-US" +
    "&region=US" +
    "&include_adult=false" +
    "&with_original_language=en" +
    `&page=${page}` +
    "&sort_by=release_date.asc" +
    `&release_date.gte=${startDate.format("YYYY-MM-DD")}` +
    `&release_date.lte=${endDate.format("YYYY-MM-DD")}` +
    `&with_release_type=${releaseType}`;
  return url;
}

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

function buildDiscoveryUrl(startMonth) {
  const page = 1;
  const releaseType = 4;
  if (startMonth === undefined) {
    startMonth = new Date().getMonth();
  }
  console.log(`StartMonth: ${startMonth}`);

  const startDate = new Date(2019, startMonth, 1);
  const endDate = new Date(2019, startDate.getMonth() + 1, 0);
  const startDateStr = startDate.toISOString().split("T")[0];
  const endDateStr = endDate.toISOString().split("T")[0];

  console.log(`Dates: ${startDateStr} - ${endDateStr}`);

  const url =
    "https://api.themoviedb.org/3/discover/movie?" +
    `api_key=${AKPEIY}` +
    "&language=en-US" +
    "&region=US" +
    "&include_adult=false" +
    "&with_original_language=en" +
    `&page=${page}` +
    "&sort_by=release_date.asc" +
    `&release_date.gte=${startDateStr}` +
    `&release_date.lte=${endDateStr}` +
    `&with_release_type=${releaseType}`;
  return url;
}

export { discoveryUrlByWeek, movieLists, buildDiscoveryUrl };
