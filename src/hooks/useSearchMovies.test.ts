import { renderHook, waitFor } from "@testing-library/react";
import { server } from "mocks/server";
import searchMovies from "mocks/fixtures/searchedMovies.json";
import genres from "mocks/fixtures/genres.json";
import { wrapper } from "mocks/wrapper";
import { useSearchMovies } from "./useSearchMovies";
import { rest } from "msw";
import { apiRoute } from "utils";

describe("useSearchMovies hook", () => {
  test("return list of movies and genres", async () => {
    const { result } = renderHook(
      () => useSearchMovies({ page: 1, query: "John" }),
      { wrapper }
    );

    expect(result.current).toEqual({
      error: null,
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      movies: null,
      genres: null,
    });

    await waitFor(() => expect(result.current.movies).toEqual(searchMovies));

    await waitFor(() => expect(result.current.genres).toEqual(genres));

    expect(result.current).toEqual({
      error: null,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      movies: searchMovies,
      genres: genres,
    });
  });

  test("return error", async () => {
    server.use(
      rest.get(apiRoute("search"), (req, res, ctx) =>
        res(
          ctx.status(401),
          ctx.json({
            status_code: 7,
            status_message: "Page query is not passed",
            success: false,
          })
        )
      )
    );

    const { result } = renderHook(
      () => useSearchMovies({ page: 1, query: "John" }),
      { wrapper }
    );

    expect(result.current).toEqual({
      error: null,
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      movies: null,
      genres: null,
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        error: {
          name: "Unknown",
          message: "Page query is not passed",
        },
        isLoading: false,
        isFetching: false,
        isSuccess: false,
        movies: null,
        genres,
      })
    );
  });
});
