import { useEffect, useRef, useState } from "react";
// import { useQuery, useQueryClient } from "react-query";
// import { MovieApi, GenreList } from "api/movieApi";

// interface CategoryTypes {
//   nowPlaying: Awaited<ReturnType<typeof MovieApi.getNowPlayingMovies>>;
//   popular: Awaited<ReturnType<typeof MovieApi.getPopularMovies>>;
// }

// const categoryApi: {
//   [Key in keyof CategoryTypes]: (page: number) => Promise<CategoryTypes[Key]>;
// } = {
//   nowPlaying: (page: number) => MovieApi.getNowPlayingMovies({ page }),
//   popular: (page: number) => MovieApi.getPopularMovies({ page }),
// };

// interface QueryState<T> {
//   isLoading: boolean;
//   isFetching: boolean;
//   error: Error | null;
//   data: T | null;
// }

// export const useMovies = <T extends keyof CategoryTypes>({
//   category,
//   page,
// }: {
//   category: T;
//   page: number;
// }) => {
//   const didMount = useRef(false);

//   const queryClient = useQueryClient();

//   const [movieQuery, setMovieQuery] = useState<QueryState<CategoryTypes[T]>>({
//     isLoading: true,
//     isFetching: true,
//     error: null,
//     data: null,
//   });

//   const getSuccessState = (data: CategoryTypes[T]) => {
//     return {
//       isLoading: false,
//       isFetching: false,
//       error: null,
//       data,
//     };
//   };

//   const getFetchingState = (isLoading = false) => {
//     return {
//       isLoading,
//       isFetching: true,
//       isSuccess: false,
//       error: null,
//       data: !isLoading ? movieQuery.data : null,
//     };
//   };
//   const getErrorState = (error: Error) => {
//     return {
//       isLoading: false,
//       isFetching: false,
//       data: null,
//       error,
//     };
//   };

//   const getMoviesFromCache = () => {
//     const queryState = queryClient.getQueryState<CategoryTypes[T], Error>([
//       category,
//       { page },
//     ]);

//     return queryState;
//   };

//   const fetchMovies = async () => {
//     const data = await queryClient.fetchQuery({
//       queryKey: [category, { page }],
//       queryFn: () => categoryApi[category](page),
//       staleTime: 0,
//       retry: false,

//       // cacheTime:
//     });

//     return data;
//   };

//   useEffect(() => {
//     (async () => {
//       const queryState = getMoviesFromCache();

//       if (queryState?.data)
//         return setMovieQuery(getSuccessState(queryState?.data));

//       setMovieQuery(getFetchingState(true));

//       try {
//         const data = (await fetchMovies()) as CategoryTypes[T];

//         setMovieQuery(getSuccessState(data));
//       } catch (error: any) {
//         if (error?.message)
//           setMovieQuery(getErrorState(new Error(error.message)));
//       }
//     })();
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     if (!didMount.current) {
//       didMount.current = true;
//       return;
//     }

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });

//     let asyncResult: {
//       scrolled: boolean;
//       moviesState: QueryState<CategoryTypes[T]> | null;
//     } = {
//       scrolled: false,
//       moviesState: null,
//     };

//     const changeAsyncResult = async (newAsyncResult: typeof asyncResult) => {
//       asyncResult = { ...newAsyncResult };

//       if (!newAsyncResult.moviesState || !newAsyncResult.scrolled) return;

//       setMovieQuery(newAsyncResult.moviesState);
//     };

//     (async () => {
//       const queryState = getMoviesFromCache();

//       if (queryState?.data) {
//         setMovieQuery(getFetchingState());
//         changeAsyncResult({
//           ...asyncResult,
//           moviesState: getSuccessState(queryState?.data),
//         });
//         return;
//       }

//       setMovieQuery(getFetchingState());

//       try {
//         const data = (await fetchMovies()) as CategoryTypes[T];

//         changeAsyncResult({
//           ...asyncResult,
//           moviesState: getSuccessState(data),
//         });
//       } catch (error) {
//         if (error instanceof Error) {
//           changeAsyncResult({
//             ...asyncResult,
//             moviesState: getErrorState(error),
//           });
//         }
//       }
//     })();

//     const onScrollHandler = () => {
//       if (window.scrollY === 0) {
//         changeAsyncResult({
//           ...asyncResult,
//           scrolled: true,
//         });
//       }
//     };

//     window.addEventListener("scroll", onScrollHandler);

//     return () => {
//       window.removeEventListener("scroll", onScrollHandler);
//     };
//     // eslint-disable-next-line
//   }, [page, category]);

//   const genresQuery = useQuery<GenreList, Error, GenreList, QueryKeys>(
//     "genres",
//     MovieApi.getGenres,
//     {
//       staleTime: Infinity,
//     }
//   );

//   const error = (movieQuery.error as Error) || genresQuery.error || null;
//   const isLoading = movieQuery.isLoading || genresQuery.isLoading || false;

//   return {
//     error,
//     isLoading,
//     isFetching: movieQuery.isFetching,
//     isSuccess: Boolean(movieQuery.data && genresQuery.data),
//     movies: movieQuery.data,
//     genres: genresQuery.data || null,
//   };
// };
