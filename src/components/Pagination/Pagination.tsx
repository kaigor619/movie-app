import ReactPaginate from "react-paginate";
import { observer } from "mobx-react-lite";
import { themeStore } from "stores/ThemeStore";
import styles from "./Pagination.module.scss";

interface Props {
  totalCount: number;
  activePage?: number;
  onChangePage: (pageNumber: number) => void;
}

export const Pagination: React.FC<Props> = observer(
  ({ totalCount, activePage = 1, onChangePage }) => {
    return (
      <div className={styles.pagination} data-theme={themeStore.theme}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={(e) => onChangePage(e.selected)}
          pageRangeDisplayed={5}
          pageCount={totalCount}
          forcePage={activePage}
        />
      </div>
    );
  }
);
