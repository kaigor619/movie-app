import { MoviesListSchema, MoviesList } from "./movieApiSchemas";

// const newMovies = {
//   dates: {
//     maximum: "2022-12-19",
//     minimum: "2022-11-01",
//   },
//   page: 1,
//   results: [
//     {
//       adult: false,
//       backdrop_path: "/198vrF8k7mfQ4FjDJsBmdQcaiyq.jpg",
//       genre_ids: [878, 28, 12],
//       id: 76600,
//       original_language: "en",
//       original_title: "Avatar: The Way of Water",
//       overview:
//         "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
//       popularity: 4650.217,
//       poster_path: "/94xxm5701CzOdJdUEdIuwqZaowx.jpg",
//       release_date: "2022-12-14",
//       title: "Avatar: The Way of Water",
//       video: false,
//       vote_average: 8.1,
//       vote_count: 793,
//     },
//   ],
//   total_pages: 101,
//   total_results: 2001,
// };

// console.log("grgr");

// MoviesListSchema.parse(newMovies);

console.log(process.env);

export const MovieApi = {
  getNowPlayingMovies: () => {},
};
