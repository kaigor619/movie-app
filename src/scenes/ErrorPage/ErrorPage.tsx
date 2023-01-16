import { Layout } from "components/Layout";
import styles from "./ErrorPage.module.scss";
import noResultsImg from "./error-404.png";

export const ErrorPage: React.FC = () => {
  return (
    <Layout>
      <div className={styles.pageError}>
        <img src={noResultsImg} alt="" />
        <h2>404 Not Found</h2>
      </div>
    </Layout>
  );
};
