import { IconArrowNarrowRight } from "@tabler/icons";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import clsx from "clsx";
import { route } from "utils";
import { ROUTE_NAMES, routesConfig } from "routes";

import styles from "./Sidebar.module.scss";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const fromPage = searchParams.get("fromPage") || "";

  const menuList = [
    {
      name: ROUTE_NAMES["nowPlaying"],
      route: route("main"),
      label: "Now Playing",
      match: () =>
        matchPath(routesConfig["main"].path, location.pathname) ||
        matchPath(routesConfig["nowPlaying"].path, location.pathname) ||
        ROUTE_NAMES["nowPlaying"] === fromPage,
    },
    {
      name: ROUTE_NAMES["popular"],
      route: route("popular"),
      label: "Popular",
      match: () =>
        matchPath(routesConfig["popular"].path, location.pathname) ||
        ROUTE_NAMES["popular"] === fromPage,
    },
    {
      name: ROUTE_NAMES["favorites"],
      route: route("favorites"),
      label: "Favorites",
      match: () =>
        matchPath(routesConfig["favorites"].path, location.pathname) ||
        ROUTE_NAMES["favorites"] === fromPage,
    },
  ];

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarMenu}>
        {menuList.map((x) => (
          <li
            className={clsx({
              [styles.active]: Boolean(x.match()),
            })}
            key={x.name}
            onClick={() => navigate(x.route)}
          >
            <span>{x.label}</span>
            <div className={styles.menuItemIcon}>
              <IconArrowNarrowRight />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
