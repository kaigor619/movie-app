import { useEffect } from "react";
import { MovieCard } from "components/MovieCard";
import styles from "./Releases.module.scss";

export const Releases: React.FC = () => {
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/latest?api_key=b086d152f4823870ce3113337b2c4355"
    )
      .then((data) => data.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <div className={styles.releases}>
      <h1 className={styles.title}>New Releases</h1>
    </div>
  );
};
