import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { MovieCard } from "components/MovieCard";
import { MovieApi } from "api/movieApi";
import styles from "./NowPlaying.module.scss";

console.log(MovieApi);

export const NowPlaying: React.FC = () => {
  const navigate = useNavigate();

  const moviesQuery = useQuery("nowPlayingMovies", () =>
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=b086d152f4823870ce3113337b2c4355"
    ).then((res) => res.json())
  );

  const genresQuery = useQuery("genres", () =>
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=b086d152f4823870ce3113337b2c4355"
    ).then((res) => res.json())
  );

  return (
    <div className={styles.nowPlaying}>
      <h1 className={styles.title}>Now Playing</h1>

      <div className={styles.grid}>
        {moviesQuery.data?.results.map((x: any) => (
          <MovieCard
            key={x.id}
            title={x.original_title}
            imageSrc={`https://image.tmdb.org/t/p/w342/${x.poster_path}`}
            genres={x.genre_ids.map(
              (c: number) =>
                genresQuery.data?.genres.find((z: any) => z.id === c)?.name ||
                ""
            )}
            rating={x.vote_average}
            onClick={() => {
              navigate(`/movie/${x.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};
