import styles from "./MovieCard.module.scss";

interface Props {
  imageSrc: string;
  rating: number;
  title: string;
  genres: string[];
  onClick: () => void;
}

export const MovieCard: React.FC<Props> = ({
  imageSrc,
  rating,
  title,
  genres,
  onClick,
}) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.imageWrap}>
        <img onClick={onClick} src={imageSrc} alt="" />

        <div className={styles.rating}>{rating}</div>
      </div>

      <h4 className={styles.title} onClick={onClick}>
        {title}
      </h4>
      <div className={styles.genres}>{genres.join(", ")}</div>
    </div>
  );
};
