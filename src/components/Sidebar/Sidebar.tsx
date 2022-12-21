import { IconArrowNarrowRight } from "@tabler/icons";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import clsx from "clsx";

import styles from "./Sidebar.module.scss";

const list = [
  {
    name: "releases",
    route: "/releases",
    label: "New Releases",
  },
  {
    name: "now_playing",
    route: "/now-playing",
    label: "Now Playing",
  },
  {
    name: "popular",
    route: "/popular",
    label: "Popular",
  },
  {
    name: "coming-soon",
    route: "/coming-soon",
    label: "Coming soon",
  },
  // {
  //   name: "favorites",
  //   route: "/favorites",
  //   label: "Favorites",
  // },
  // {
  //   name: "later",
  //   route: "/later",
  //   label: "Watch Later",
  // },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarMenu}>
        {list.map((x) => (
          <li
            className={clsx({
              [styles.active]: Boolean(matchPath(x.route, location.pathname)),
            })}
            key={x.name}
            onClick={() => {
              console.log(x.route);
              navigate(x.route);
            }}
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
