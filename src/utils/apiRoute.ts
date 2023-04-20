export const API_NAMES = {
  genres: "genres",
  movie: "movie",
  nowPlaying: "nowPlaying",
} as const;

export const routesConfig = {
  genres: {
    path: "/genre/movie/list",
  },
  movie: {
    path: "/movie/:movieId",
  },
  nowPlaying: {
    path: "/movie/now_playing",
  },
  popular: {
    path: "/movie/popular",
  },
  search: {
    path: "/search/movie",
  },
} as const;

type Routes = typeof routesConfig;

type Pages = keyof Routes;

type Split<
  T extends string,
  Delimiter extends string,
  R extends readonly string[] = []
> = T extends `${infer Before}${Delimiter}${infer After}`
  ? Split<After, Delimiter, [Before, ...R]>
  : T extends string
  ? [...R, T]
  : T;

type StartsWithPattern<
  T extends string[],
  Pattern extends string
> = T extends Array<infer A>
  ? A extends `${Pattern}${infer Word}`
    ? Word
    : never
  : never;

type RouteParameters<T extends Pages> =
  Routes[T]["path"] extends `${infer Before}:${infer After}`
    ? Record<
        StartsWithPattern<Split<Routes[T]["path"], "/">, ":">,
        string | number
      >
    : never;

type IsRouteRequired<T extends Pages> = RouteParameters<T> extends never
  ? false
  : true;

export const apiRoute = <T extends Pages>(
  page: T,
  ...args: IsRouteRequired<T> extends true ? [RouteParameters<T>] : []
): string => {
  const arg = args[0];

  let path: string = routesConfig[page].path;

  if (arg) {
    Object.entries(arg).forEach(([key, value]) => {
      path = path.replace(`:${key}`, String(value));
    });
  }

  const baseApiUrl = process.env.REACT_APP_API_URL;

  const url = baseApiUrl + path;

  return url;
};
