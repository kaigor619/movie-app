import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { IconArrowLeft, IconStar } from "@tabler/icons";
import { Page, ErrorMessage, Spinner } from "components";
import { MovieApi, MovieDetails } from "api/movieApi";
import { getPosterSrc } from "utils";
import styles from "./Movie.module.scss";

export const Movie: React.FC = () => {
  const params = useParams();
  const movieId = params.movieId || "";
  const navigate = useNavigate();

  const {
    data: details,
    error,
    isLoading,
  } = useQuery<MovieDetails, Error, MovieDetails, QueryKeys>(
    ["movies", { id: movieId }],
    () => MovieApi.getMovieById(movieId || ""),
    {
      enabled: Boolean(movieId),
    }
  );

  const time = (() => {
    if (!details?.runtime) return "";

    const hours = Math.floor(details.runtime / 60);
    const minutes = Math.abs(details.runtime - hours * 60);
    return `${hours}h ${minutes}m`;
  })();

  return (
    <Page>
      <div className={styles.arrowBack}>
        <IconArrowLeft
          size="30"
          cursor="pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className={styles.row}>
        {error && <ErrorMessage title="Error" description={error.message} />}

        {isLoading && <Spinner size={5} center />}

        {details && (
          <>
            <div className={styles.poster}>
              <img
                src={
                  details.poster_path
                    ? getPosterSrc(details.poster_path, 500)
                    : ""
                }
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
                  .map((x) => x.iso_3166_1)
                  .join(", ")}
                ) • {details.genres.map((x) => x.name).join(", ")} • {time}
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
          </>
        )}
      </div>
    </Page>
  );
};
