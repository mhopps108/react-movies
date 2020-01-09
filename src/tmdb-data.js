const tmdbData = {
  list: [
    {
      id: 11,
      name: "Top Rated Movies",
      path: "/movie/top_rated",
      listtype: "list",
      canSort: false,
      pageBy: ''
    },
    {
      id: 12,
      name: "Popular Movies",
      path: "/movie/popular",
      listtype: "list"
    },
    {
      id: 13,
      name: "Now Playing Movies",
      path: "/movie/now_playing",
      listtype: "list"
    },
    {
      id: 14,
      name: "Upcoming Movies",
      path: "/movie/upcoming",
      listtype: "list"
    },
    {
      id: 21,
      name: "Theater Release Dates",
      path: "/discover/movie",
      listtype: "discovery",
      releaseType: "3",
      sortBy: "release_date.asc",
      startDate: ""
    },
    {
      id: 22,
      name: "Home Release Dates",
      path: "/discover/movie",
      listtype: "discovery",
      releaseType: "4|5",
      sortBy: "release_date.asc"
    }
  ],
  genres: [
    {
      id: 28,
      name: "Action"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 16,
      name: "Animation"
    },
    {
      id: 35,
      name: "Comedy"
    },
    {
      id: 80,
      name: "Crime"
    },
    {
      id: 99,
      name: "Doc"
    },
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10751,
      name: "Family"
    },
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 36,
      name: "History"
    },
    {
      id: 27,
      name: "Horror"
    },
    {
      id: 10402,
      name: "Music"
    },
    {
      id: 9648,
      name: "Mystery"
    },
    {
      id: 10749,
      name: "Romance"
    },
    {
      id: 878,
      name: "Sci-Fi"
    },
    {
      id: 10770,
      name: "TV Movie"
    },
    {
      id: 53,
      name: "Thriller"
    },
    {
      id: 10752,
      name: "War"
    },
    {
      id: 37,
      name: "Western"
    }
  ],
  certifications: {
    US: [
      {
        name: "G",
        id: 1
      },
      {
        name: "PG",
        id: 2
      },
      {
        name: "PG-13",
        id: 3
      },
      {
        name: "R",
        id: 4
      },
      {
        name: "NC-17",
        id: 5
      },
      {
        name: "NR",
        id: 0
      }
    ]
  },
  releaseTypes: [
    //{ name: "Premiere", id: 1 },
    //{ name: "Limited", id: 2 },
    { name: "Theatrical", id: 3 },
    { name: "Digital", id: 4 },
    { name: "Physical", id: 5 }
    //{ name: "TV", id: 6 }
  ]
};

export default tmdbData;

const listNotes = [
  {
    name: "Top Rated",
    path: "/movie/top_rated",
    type: "list"
  },
  { name: "Popular", path: "/movie/popular", type: "list" },
  { name: "Now Playing", path: "/movie/now_playing", type: "list" },
  { name: "Upcoming", path: "/movie/upcoming", type: "list" },
  {
    name: "This Week",
    path: "/discover/movie",
    type: "discovery",
    sortBy: "release_date.asc",
    releaseType: "4|5",
    pageBy: "week"
  }
];
