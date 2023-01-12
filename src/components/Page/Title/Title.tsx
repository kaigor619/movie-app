import styles from "./Title.module.scss";

interface Props {
  title: string;
}

export const Title: React.FC<Props> = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};
