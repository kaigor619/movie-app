import styles from "./Content.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
