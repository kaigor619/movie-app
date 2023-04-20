import { useQuery } from "react-query";
import { MovieApi, GenreList } from "api/movieApi";

interface CategoryTypes {
  nowPlaying: Awaited<ReturnType<typeof MovieApi.getNowPlayingMovies>>;
  popular: Awaited<ReturnType<typeof MovieApi.getPopularMovies>>;
}

interface ReturnHookData<T extends keyof CategoryTypes> {
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  movies: CategoryTypes[T] | null;
  genres: GenreList | null;
}

const categoryApi: {
  [Key in keyof CategoryTypes]: (page: number) => Promise<CategoryTypes[Key]>;
} = {
  nowPlaying: (page: number) => MovieApi.getNowPlayingMovies({ page }),
  popular: (page: number) => MovieApi.getPopularMovies({ page }),
};

export const useMovies = <T extends keyof CategoryTypes>({
  category,
  page,
}: {
  category: T;
  page: number;
}): ReturnHookData<T> => {
  const movieQuery = useQuery<
    CategoryTypes[T],
    Error,
    CategoryTypes[T],
    QueryKeys
  >(
    [category, { page }],
    () => categoryApi[category](page) as Promise<CategoryTypes[T]>,
    {
      refetchOnMount: true,
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

  const error = (movieQuery.error as Error) || genresQuery.error || null;
  const isLoading = movieQuery.isLoading || genresQuery.isLoading || false;

  return {
    error,
    isLoading,
    isFetching: movieQuery.isFetching,
    isSuccess: Boolean(movieQuery.data && genresQuery.data),
    movies: movieQuery.data || null,
    genres: genresQuery.data || null,
  };
};
