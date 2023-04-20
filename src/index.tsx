import ReactDOM from "react-dom/client";
import { RouterProvider, Outlet, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "components/Layout";
import {
  Favorites,
  NowPlaying,
  Movie,
  Popular,
  Search,
  ErrorPage,
} from "scenes";
import { routesConfig } from "./routes";
import "./index.css";

export const ROUTE_NAMES = {
  main: "main",
  search: "search",
  nowPlaying: "nowPlaying",
  popular: "popular",
  favorites: "favorites",
  movieDetails: "movieDetails",
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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
