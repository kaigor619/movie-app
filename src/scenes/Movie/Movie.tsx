import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { IconArrowLeft, IconStar } from "@tabler/icons";
import styles from "./Movie.module.scss";

export const Movie: React.FC = () => {
  const { movieId } = useParams();

  const navigate = useNavigate();

  const {
    data: details,
    error,
    isLoading,
  } = useQuery(
    ["movies", movieId],
    () =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=b086d152f4823870ce3113337b2c4355`
      ).then((res) => res.json()),
    {
      enabled: Boolean(movieId),
    }
  );

  if (!details) return null;

  const hours = Math.floor(details.runtime / 60);
  const minutes = Math.abs(details.runtime - hours * 60);

  const time = `${hours}h ${minutes}m`;

  return (
    <div className={styles.page}>
      <div className={styles.arrowBack}>
        <IconArrowLeft
          color="rgba(255, 255, 255, 0.8)"
          size="30"
          cursor="pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.poster}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
            alt=""
          />
        </div>

        <div className={styles.movieContent}>
          <h1 className={styles.title}>
            {details?.original_title} (
            {new Date(details.release_date).getFullYear()})
          </h1>

          <div className={styles.shortInfo}>
            {details.release_date.replaceAll("-", "/")} (
            {details.production_countries
              .map((x: any) => x.iso_3166_1)
              .join(", ")}
            ) • {details.genres.map((x: any) => x.name).join(", ")} • {time}
          </div>

          <div className={styles.rating}>
            <IconStar color="gold" size="18" />

            <span>{details.vote_average}</span>
          </div>

          <div className={styles.overview}>
            <h4 className={styles.overviewTitle}>Overview</h4>

            <p>{details.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
