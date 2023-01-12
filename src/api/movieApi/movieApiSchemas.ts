import { z } from "zod";

export const MoviesListSchema = z.object({
  page: z.number().int().gte(0),
  total_pages: z.number().int().gte(0),
  total_results: z.number().int().gte(0),
  results: z.array(
    z.object({
      poster_path: z.string().nullable(),
      adult: z.boolean(),
      overview: z.string(),
      release_date: z.string(),
      genre_ids: z.array(z.number().int()),
      id: z.number().int(),
      original_title: z.string(),
      original_language: z.string(),
      title: z.string(),
      backdrop_path: z.string().nullable(),
      popularity: z.number(),
      vote_count: z.number().int(),
      video: z.boolean(),
      vote_average: z.number(),
    })
  ),
});

export const NowPlayingMoviesSchema = z.object({
  page: z.number().int().positive().gte(0),
  total_pages: z.number().int().positive().gte(0),
  total_results: z.number().int().positive().gte(0),
  dates: z.object({
    maximum: z.string(),
    minimum: z.string(),
  }),
  results: z.array(
    z.object({
      poster_path: z.string().nullable(),
      adult: z.boolean(),
      overview: z.string(),
      release_date: z.string(),
      genre_ids: z.array(z.number().int()),
      id: z.number().int(),
      original_title: z.string(),
      original_language: z.string(),
      title: z.string(),
      backdrop_path: z.string().nullable(),
      popularity: z.number(),
      vote_count: z.number().int(),
      video: z.boolean(),
      vote_average: z.number(),
    })
  ),
});

export const GenreListSchema = z.object({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export const FavoriteMovieSchema = z.object({
  title: z.string(),
  genres: z.array(z.string()),
  rating: z.number(),
  file: z.instanceof(File),
  id: z.number(),
});

export const FavoriteMoviesSchema = z.array(FavoriteMovieSchema);

export const MovieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.object({}).nullable(),
  budget: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string().nullable(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(
    z.object({
      name: z.string(),
      id: z.number(),
      logo_path: z.string().nullable(),
      origin_country: z.string(),
    })
  ),
  production_countries: z.array(
    z.object({
      name: z.string(),
      iso_3166_1: z.string(),
    })
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number().nullable(),
  spoken_languages: z.array(
    z.object({
      name: z.string(),
      iso_639_1: z.string(),
    })
  ),
  status: z.enum([
    "Rumored",
    "Planned",
    "In Production",
    "Post Production",
    "Released",
    "Cancelled",
  ]),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type NowPlayingMovies = z.infer<typeof NowPlayingMoviesSchema>;

export type GenreList = z.infer<typeof GenreListSchema>;

export type MoviesList = z.infer<typeof MoviesListSchema>;

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;

export type FavoriteMovie = z.infer<typeof FavoriteMovieSchema>;

export type FavoriteMovies = z.infer<typeof FavoriteMoviesSchema>;
