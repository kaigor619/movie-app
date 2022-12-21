import { z } from "zod";

const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

export const MoviesListSchema = z.object({
  page: z.number().int().positive().gte(0),
  total_pages: z.number().int().positive().gte(0),
  total_results: z.number().int().positive().gte(0),
  dates: z.object({
    maximum: z.string().regex(dateRegex),
    minimum: z.string().regex(dateRegex),
  }),
  results: z.array(
    z.object({
      poster_path: z.string().nullable(),
      adult: z.boolean(),
      overview: z.string(),
      release_date: z.string().regex(dateRegex),
      genre_ids: z.array(z.number().int()),
      id: z.number().int(),
      original_title: z.string(),
      original_language: z.string(),
      title: z.string(),
      backdrop_path: z.string().nullable(),
      popularity: z.number().positive(),
      vote_count: z.number().positive().int(),
      video: z.boolean(),
      vote_average: z.number().positive(),
    })
  ),
});

export type MoviesList = z.infer<typeof MoviesListSchema>;
