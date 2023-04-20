import styles from "./ErrorMessage.module.scss";
import brokenRobot from "./broken-robot.png";

interface Props {
  title?: string;
  description: string;
}

export const ErrorMessage: React.FC<Props> = ({
  title = "Error",
  description,
}) => {
  return (
    <div data-testid="error-message" className={styles.errorMessage}>
      <img className={styles.image} src={brokenRobot} alt="Broken robot" />
      <div className="">
        <h4 className={styles.title}>{title}</h4>
        <pre className={styles.description}>{description}</pre>
      </div>
    </div>
  );
};
