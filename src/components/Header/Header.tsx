import { useNavigate, useLocation, useMatch } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { IconDeviceTv, IconSearch } from "@tabler/icons";
import { useQueryClient } from "react-query";
import { observer } from "mobx-react-lite";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import debounce from "lodash.debounce";
import { themeStore } from "stores/ThemeStore";
import { route } from "utils/route";
import styles from "./Header.module.scss";

export const Header: React.FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch("/search");
  const queryClient = useQueryClient();

  const query =
    (match && new URLSearchParams(location.search).get("query")) || "";

  const [search, setSearch] = useState(query);

  useEffect(() => {
    if (!match && search) setSearch("");
    // eslint-disable-next-line
  }, [match]);

  useEffect(() => {
    if (query !== search) setSearch(query);
    // eslint-disable-next-line
  }, [query]);

  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      navigate(route("search", { query: { query: value } }), {
        replace: true,
      });
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    queryClient.cancelQueries("/search");

    if (!value) return navigate(route("nowPlaying", { route: { page: 1 } }));

    if (!match)
      navigate(route("search", { query: { query: value } }), {
        replace: true,
      });
    debouncedChangeHandler(value);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <div
            onClick={() => {
              navigate(route("main"));
            }}
          >
            <IconDeviceTv size="22" />
            <span>Movies</span>
          </div>
        </div>

        <div className={styles.searchWrap}>
          <IconSearch size="18" color="white" className={styles.searchIcon} />
          <input
            type="text"
            value={search}
            onChange={handleChange}
            className={styles.searchInput}
          />

          <div className={styles.themeSwitcher}>
            <DarkModeSwitch
              checked={themeStore.theme === "dark"}
              onChange={themeStore.toggleTheme}
              size={20}
              moonColor="#fff"
              sunColor="#fff"
            />
          </div>
        </div>
      </header>
    </>
  );
});
