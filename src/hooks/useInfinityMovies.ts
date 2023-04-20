import { useQuery, useInfiniteQuery, InfiniteData } from "react-query";
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
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  movies: InfiniteData<CategoryTypes[T]> | null;
  genres: GenreList | null;
  fetchNextPage: () => void;
}

const categoryApi: {
  [Key in keyof CategoryTypes]: (page: number) => Promise<CategoryTypes[Key]>;
} = {
  nowPlaying: (page: number) => MovieApi.getNowPlayingMovies({ page }),
  popular: (page: number) => MovieApi.getPopularMovies({ page }),
};

export const useInfinityMovies = <T extends keyof CategoryTypes>({
  category,
  page,
}: {
  category: T;
  page: number;
}): ReturnHookData<T> => {
  const movieQuery = useInfiniteQuery<
    CategoryTypes[T],
    Error,
    CategoryTypes[T],
    QueryKeys
  >(
    category,
    ({ pageParam = page }) =>
      categoryApi[category](pageParam) as Promise<CategoryTypes[T]>,
    {
      getNextPageParam: (lastPage) =>
        lastPage.page + 1 > lastPage.total_pages
          ? undefined
          : lastPage.page + 1,
      getPreviousPageParam: (firstPage) => firstPage.page,
      refetchOnMount: true,
      staleTime: 1000 * 5 * 60,
      keepPreviousData: true,
    }
  );

  const genresQuery = useQuery<GenreList, Error>("genres", MovieApi.getGenres, {
    staleTime: Infinity,
  });

  const error = (movieQuery.error as Error) || genresQuery.error || null;
  const isLoading = movieQuery.isLoading || genresQuery.isLoading || false;

  return {
    error,
    isLoading,
    isSuccess: Boolean(movieQuery.data && genresQuery.data),
    movies: movieQuery.data || null,
    genres: genresQuery.data || null,
    fetchNextPage: movieQuery.fetchNextPage,
    hasNextPage: movieQuery.hasNextPage || false,
    isFetching: movieQuery.isFetching,
    isFetchingNextPage: movieQuery.isFetchingNextPage,
  };
};
