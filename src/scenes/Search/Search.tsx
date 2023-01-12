import { useLocation, useNavigate } from "react-router-dom";
import {
  Page,
  MovieCard,
  Spinner,
  ErrorMessage,
  EmptyMessage,
  Pagination,
} from "components";
import { route, getPosterSrc } from "utils";
import { useSearchMovies } from "hooks";
import styles from "./Search.module.scss";

export const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { movies, genres, isLoading, error } = useSearchMovies({ query, page });

  const onChangePage = (pageIndex: number) => {
    const index = pageIndex + 1;

    navigate(route("search", { query: { query, page: index || 1 } }), {
      replace: true,
    });
  };

  return (
    <Page>
      <Page.Title title={`Searched results: ${query}`} />

      <Page.Content>
        {error && <ErrorMessage title="Error" description={error.message} />}

        {isLoading && <Spinner size={5} center />}

        {movies && !movies.results.length && <EmptyMessage />}

        {!!movies?.results.length && genres && (
          <>
            <Page.Grid
              className={styles.grid}
              childrenCount={movies.results.length}
            >
              {movies.results.map((x) => (
                <MovieCard
                  key={x.id}
                  title={x.title}
                  imageSrc={
                    x.poster_path ? getPosterSrc(x.poster_path, 342) : null
                  }
                  genres={x.genre_ids.map(
                    (c) => genres.genres.find((z) => z.id === c)?.name || ""
                  )}
                  rating={x.vote_average}
                />
              ))}
            </Page.Grid>

            <Pagination
              totalCount={movies.total_pages}
              activePage={page - 1}
              onChangePage={onChangePage}
            />
          </>
        )}
      </Page.Content>
    </Page>
  );
};
