import { Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "components/Layout";
import {
  Favorites,
  NowPlaying,
  Movie,
  Popular,
  Search,
  ErrorPage,
} from "scenes";

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

export const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    path: "/",
    children: [
      {
        element: <NowPlaying />,
        index: true,
      },
      {
        element: <NowPlaying />,
        path: routesConfig.nowPlaying.path,
      },
      {
        element: <Popular />,
        path: routesConfig.popular.path,
        shouldRevalidate: () => {
          return false;
        },
      },
      {
        element: <Favorites />,
        path: routesConfig.favorites.path,
      },
      {
        element: <Search />,
        path: routesConfig.search.path,
      },
      {
        element: <Movie />,
        path: routesConfig.movieDetails.path,
      },
    ],
  },
]);
