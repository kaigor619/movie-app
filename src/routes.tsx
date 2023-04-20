export const ROUTE_NAMES = {
  main: "main",
  search: "search",
  nowPlaying: "nowPlaying",
  popular: "popular",
  favorites: "favorites",
  movieDetails: "movieDetails",
} as const;

export const routesConfig = {
  [ROUTE_NAMES.main]: {
    path: "/",
    query: [],
  },
  [ROUTE_NAMES.search]: {
    path: "/search",
    query: ["page?", "query"],
  },
  [ROUTE_NAMES.nowPlaying]: {
    path: "/now-playing/:page",
    query: [],
  },
  [ROUTE_NAMES.popular]: {
    path: "/popular",
    query: [],
  },
  [ROUTE_NAMES.favorites]: {
    path: "/favorites",
    query: [],
  },
  [ROUTE_NAMES.movieDetails]: {
    path: "/movie/:movieId",
    query: ["fromPage"],
  },
} as const;
