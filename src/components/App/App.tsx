import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Sidebar } from "components/Sidebar";
import { Header } from "components/Header";
import { Releases } from "scenes/Releases";
import { ComingSoon } from "scenes/ComingSoon";
import { NowPlaying } from "scenes/NowPlaying";
import { Movie } from "scenes/Movie";
import { Popular } from "scenes/Popular";
import styles from "./App.module.scss";

const Layout = () => {
  return <Outlet />;
};

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Sidebar />

        <div className={styles.page}>
          <Routes>
            {/* <Route element={<Layout />}> */}
            <Route path="/" element={<Outlet />}>
              <Route path="/now-playing" element={<NowPlaying />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/releases" element={<Releases />} />
              <Route path="/movie/:movieId" element={<Movie />} />

              <Route index element={<Popular />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}
