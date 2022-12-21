import { IconDeviceTv, IconSearch } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          <IconDeviceTv color="#fff" size="22" />
          <span>Movies</span>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <IconSearch size="18" color="white" className={styles.searchIcon} />
        <input type="text" className={styles.searchInput} />
        <div className={styles.searchInputBackground} />
      </div>
    </header>
  );
};
