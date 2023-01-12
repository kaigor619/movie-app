/// <reference types="react-scripts" />
interface QueryKeysConfig {
  genres: "genres";
  popular: ["popular", { page: number }] | "popular";
  nowPlaying: ["nowPlaying", { page: number }] | "nowPlaying";
  favorites: "favorites";
  movieDetails: ["movies", { id: string }];
  search: ["search", { page: number; query: string }];
}

type QueryKeys = QueryKeysConfig[keyof QueryKeysConfig];

type FormRules<FormValues> = {
  [Key in keyof FormValues]?: UseControllerProps["rules"];
};

type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
