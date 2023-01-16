import { Spinner } from "components";
import styles from "./Overlay.module.scss";

export const Overlay: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <Spinner size={5} center />
    </div>
  );
};
