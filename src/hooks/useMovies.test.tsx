import { renderHook, waitFor } from "@testing-library/react";
import { server } from "mocks/server";
import nowPlayingMovies from "mocks/fixtures/nowPlayingMovies.json";
import genres from "mocks/fixtures/genres.json";
import { wrapper } from "mocks/wrapper";
import { useMovies } from "./useMovies";
import { rest } from "msw";
import { apiRoute } from "utils";

describe("useMovies hook", () => {
  it("returns list of movies and genres", async () => {
    const { result } = renderHook(
      ({ page = 1 }: { page?: number } = {}) =>
        useMovies({ category: "nowPlaying", page }),
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
      expect(result.current.movies).toEqual(nowPlayingMovies)
    );

    await waitFor(() => expect(result.current.genres).toEqual(genres));

    expect(result.current).toEqual({
      error: null,
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      movies: nowPlayingMovies,
      genres: genres,
    });
  });

  test("returns api error", async () => {
    server.use(
      rest.get(apiRoute("popular"), (_, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            status_message: "Page query is not passed",
            status_code: 563,
          })
        )
      )
    );

    const { result } = renderHook(
      () => useMovies({ category: "popular", page: 1 }),
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
        error: null,
        isLoading: true,
        isFetching: true,
        isSuccess: false,
        movies: null,
        genres: null,
      })
    );

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
