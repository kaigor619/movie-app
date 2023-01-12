import { Title } from "./Title/Title";
import { Content } from "./Content/Content";
import { Grid } from "./Grid/Grid";
import styles from "./Page.module.scss";

interface Props {
  children: React.ReactNode;
}

interface PageComponents {
  Title: typeof Title;
  Content: typeof Content;
  Grid: typeof Grid;
}

type P = React.FC<Props> & PageComponents;

export const Page: P = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};

Page.Title = Title;
Page.Content = Content;
Page.Grid = Grid;
