import { useQuery } from "react-query";
import { MovieApi, MoviesList, GenreList } from "api/movieApi";

export const useSearchMovies = ({
  query,
  page,
}: {
  page: number;
  query: string;
}) => {
  const movieQuery = useQuery<MoviesList, Error, MoviesList, QueryKeys>(
    ["search", { page, query }],
    ({ signal }) => MovieApi.searchMovies({ page, query, signal }),
    {
      refetchOnMount: true,
      keepPreviousData: true,
      staleTime: 1000 * 5 * 60,
    }
  );

  const genresQuery = useQuery<GenreList, Error, GenreList, QueryKeys>(
    "genres",
    MovieApi.getGenres,
    {
      staleTime: Infinity,
    }
  );

  const error = movieQuery.error || genresQuery.error || null;
  const isLoading = movieQuery.isLoading || genresQuery.isLoading || false;
  const isSuccess = movieQuery.data && genresQuery.data;

  return {
    error,
    isLoading,
    isSuccess,
    isFetching: movieQuery.isFetching,
    movies: isLoading ? null : movieQuery.data,
    genres: isLoading ? null : genresQuery.data,
  };
};
