import { rest } from "msw";
import nowPlayingMovies from "./fixtures/nowPlayingMovies.json";
import genres from "./fixtures/genres.json";
import searchedMovies from "./fixtures/searchedMovies.json";
import popularMovies from "./fixtures/popularMovies.json";
import movie from "./fixtures/movie502356.json";
import { apiRoute } from "utils";

export const handlers = [
  rest.get(apiRoute("genres"), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(genres))
  ),
  rest.get(apiRoute("search"), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(searchedMovies))
  ),
  rest.get(apiRoute("nowPlaying"), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(nowPlayingMovies))
  ),
  rest.get(apiRoute("popular"), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(popularMovies))
  ),
  rest.get(apiRoute("movie", { movieId: "502356" }), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(movie))
  ),
];
