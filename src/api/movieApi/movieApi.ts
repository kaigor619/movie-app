import { api } from "utils/api";
import {
  MoviesListSchema,
  GenreListSchema,
  MovieDetailsSchema,
  MoviesList,
  NowPlayingMovies,
  FavoriteMovie,
  FavoriteMoviesSchema,
  FavoriteMovies,
  NowPlayingMoviesSchema,
} from "./movieApiSchemas";
import { MoviesDb } from "services/moviesDB";

export const MovieApi = {
  getNowPlayingMovies: ({ page = 1 }: { page: number }) =>
    api<NowPlayingMovies>({
      path: "/movie/now_playing",
      responseType: "json",
      method: "GET",
      responseSchema: NowPlayingMoviesSchema,
      query: {
        page,
      },
    }),

  getPopularMovies: ({ page = 1 }: { page: number }) =>
    api<MoviesList>({
      path: "/movie/popular",
      responseType: "json",
      method: "GET",
      responseSchema: MoviesListSchema,
      query: {
        page,
      },
    }),
  getGenres: () =>
    api({
      method: "GET",
      responseType: "json",
      responseSchema: GenreListSchema,
      path: "/genre/movie/list",
    }),
  getMovieById: (movieId: string) =>
    api({
      path: `/movie/${movieId}`,
      responseType: "json",
      method: "GET",
      responseSchema: MovieDetailsSchema,
    }),
  getFavorites: () =>
    new Promise<FavoriteMovies>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const movieDb = new MoviesDb();
          const movies = await movieDb.getAll();
          const schemaResult = FavoriteMoviesSchema.safeParse(movies);
          if (schemaResult.success) resolve(movies);
          else reject(schemaResult.error?.message);
        } catch (err) {
          reject(err);
        }
      }, 2000);
    }),
  addFavoriteMovie: (newMovie: Omit<FavoriteMovie, "id">) =>
    new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const movieDb = new MoviesDb();
          await movieDb.add(newMovie);
          resolve();
        } catch (err) {
          reject(err);
        }
      }, 3000);
    }),
  searchMovies: ({
    page,
    query,
    signal,
  }: {
    page: number;
    query: string;
    signal?: AbortSignal;
  }) => {
    return api({
      path: `/search/movie`,
      method: "GET",
      responseType: "json",
      signal,
      responseSchema: MoviesListSchema,
      query: {
        page,
        query,
      },
    });
  },
} as const;
