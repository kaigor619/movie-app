import { renderHook, waitFor } from "@testing-library/react";
import { server } from "mocks/server";
import nowPlayingMovies from "mocks/fixtures/nowPlayingMovies.json";
import genres from "mocks/fixtures/genres.json";
import { wrapper } from "mocks/wrapper";
import { useInfinityMovies } from "./useInfinityMovies";
import { rest } from "msw";
import { apiRoute } from "utils";

describe("useInfinityMovies hook", () => {
  test("return list of movies and genres", async () => {
    const { result } = renderHook(
      () => useInfinityMovies({ page: 1, category: "nowPlaying" }),
      { wrapper }
    );

    expect(result.current).toEqual({
      error: null,
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      movies: null,
      genres: null,
      fetchNextPage: expect.anything(),
    });

    await waitFor(() =>
      expect(result.current).toEqual({
        error: null,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        movies: {
          pageParams: [undefined],
          pages: [nowPlayingMovies],
        },
        genres: genres,
        hasNextPage: true,
        isFetchingNextPage: false,
        fetchNextPage: expect.anything(),
      })
    );
  });

  test("return error", async () => {
    server.use(
      rest.get(apiRoute("popular"), (req, res, ctx) =>
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
      () => useInfinityMovies({ page: 1, category: "popular" }),
      { wrapper }
    );

    expect(result.current).toEqual({
      error: null,
      isLoading: true,
      isFetching: true,
      isSuccess: false,
      isFetchingNextPage: false,
      hasNextPage: false,
      movies: null,
      genres: null,
      fetchNextPage: expect.anything(),
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
        genres: genres,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: expect.anything(),
      })
    );
  });

  it("update hook", async () => {
    const modifiedMovies = {
      ...nowPlayingMovies,
      total_pages: 3,
      total_results: 100,
    };

    server.use(
      rest.get(apiRoute("nowPlaying"), (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            ...modifiedMovies,
            page: Number(req.url.searchParams.get("page")),
          })
        );
      })
    );
    const { result } = renderHook(
      (page: number = 1) => useInfinityMovies({ page, category: "nowPlaying" }),
      { wrapper }
    );

    await waitFor(() =>
      expect(result.current).toEqual({
        error: null,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        movies: {
          pageParams: [undefined],
          pages: [modifiedMovies],
        },
        genres: genres,
        hasNextPage: true,
        isFetchingNextPage: false,
        fetchNextPage: expect.anything(),
      })
    );

    result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.movies?.pageParams).toEqual([undefined, 2])
    );

    await waitFor(() =>
      expect(result.current).toEqual({
        error: null,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        movies: {
          pageParams: [undefined, 2],
          pages: [modifiedMovies, { ...modifiedMovies, page: 2 }],
        },
        genres: genres,
        hasNextPage: true,
        isFetchingNextPage: false,
        fetchNextPage: expect.anything(),
      })
    );
  });
});
