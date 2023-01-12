import styles from "./EmptyMessage.module.scss";
import noFoundImg from "./money.png";

export const EmptyMessage: React.FC = () => {
  return (
    <div className={styles.emptyMessage}>
      <img src={noFoundImg} alt="" />
      <p>Nothing was found</p>
    </div>
  );
};
