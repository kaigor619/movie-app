import React from "react";
import { Offline } from "react-detect-offline";
import { Sidebar } from "components/Sidebar";
import { Header } from "components/Header";
import { Spinner } from "components/Spinner";
import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Sidebar />
          <div className={styles.page}>{children}</div>
        </main>
      </div>

      <Offline polling={false}>
        <div className={styles.offline}>
          <span>Currently you are offline. Trying to reconnect</span>
          <Spinner size={1} />
        </div>
      </Offline>
    </>
  );
};
