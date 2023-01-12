import { useQuery, useInfiniteQuery } from "react-query";
import { MovieApi, GenreList } from "api/movieApi";

interface CategoryTypes {
  nowPlaying: Awaited<ReturnType<typeof MovieApi.getNowPlayingMovies>>;
  popular: Awaited<ReturnType<typeof MovieApi.getPopularMovies>>;
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
}) => {
  const movieQuery = useInfiniteQuery<
    CategoryTypes[T],
    Error,
    CategoryTypes[T],
    QueryKeys
  >(category, ({ pageParam = page }) => categoryApi[category](pageParam || 1), {
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 > lastPage.total_pages ? undefined : lastPage.page + 1,
    getPreviousPageParam: (firstPage) => firstPage.page,
    refetchOnMount: true,
    staleTime: 1000 * 5 * 60,
  });

  const genresQuery = useQuery<GenreList, Error>("genres", MovieApi.getGenres, {
    staleTime: Infinity,
  });

  const error = (movieQuery.error as Error) || genresQuery.error || null;
  const isLoading = movieQuery.isLoading || genresQuery.isLoading || false;

  return {
    error,
    isLoading,
    isSuccess: movieQuery.data && genresQuery.data,
    movies: movieQuery.data,
    genres: genresQuery.data,
    fetchNextPage: movieQuery.fetchNextPage,
    hasNextPage: movieQuery.hasNextPage,
    isFetching: movieQuery.isFetching,
    isFetchingNextPage: movieQuery.isFetchingNextPage,
  };
};
