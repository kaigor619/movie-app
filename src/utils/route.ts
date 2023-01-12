import { routesConfig } from "routes";

type Routes = typeof routesConfig;

type Pages = keyof Routes;

type SortOptionalQueries<T extends string> = T extends `${infer Part}?`
  ? T
  : never;

type SortRequiredQueries<T extends string> = T extends `${infer Part}?`
  ? never
  : T;

type UnCollect<T extends string[]> = T extends (infer S)[] ? S : never;

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

type Queries<T extends Pages> = Routes[T]["query"];

type QueryParameters<T extends Pages> = Queries<T>["length"] extends 0
  ? never
  : {
      [Key in SortOptionalQueries<Queries<T>[number]> extends `${infer Part}?`
        ? Part
        : never]?: string | number;
    } & {
      [Key in SortRequiredQueries<Queries<T>[number]>]: string | number;
    };

type IsAnyRequired<T extends Pages> = RouteParameters<T> extends never
  ? SortRequiredQueries<Queries<T>[number]>["length"] extends 0
    ? false
    : true
  : true;

type RouteObject<T extends Pages> = RouteParameters<T> extends never
  ? { route?: null | Record<string, never> }
  : { route: RouteParameters<T> };

type QueryObject<T extends Pages> = Routes[T]["query"]["length"] extends 0
  ? { query?: null | Record<string, never> }
  : UnCollect<[...Queries<T>]> extends SortOptionalQueries<Queries<T>[number]>
  ? { query?: null | Record<string, never> | QueryParameters<T> }
  : { query: QueryParameters<T> };

export const route = <T extends Pages>(
  page: T,
  ...args: IsAnyRequired<T> extends true
    ? [QueryObject<T> & RouteObject<T>]
    : Routes[T]["query"]["length"] extends 0
    ? []
    : [QueryObject<T> & RouteObject<T>] | []
): string => {
  const arg = args[0];

  let path: string = routesConfig[page].path;

  if (arg?.route) {
    Object.entries(arg.route).forEach(([key, value]: [string, string]) => {
      path = path.replace(`:${key}`, value);
    });
  }

  if (arg?.query) {
    const searchParams = new URLSearchParams();
    Object.entries(arg.query).forEach(([key, value]: [string, string]) => {
      searchParams.set(key, value);
    });

    path += `?${searchParams.toString()}`;
  }

  return path;
};
