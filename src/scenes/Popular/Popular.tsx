import { useNavigate } from "react-router-dom";
import { IconRotate } from "@tabler/icons";
import { observer } from "mobx-react-lite";
import { Spinner, ErrorMessage, Page, MovieCard } from "components";
import { useInfinityMovies } from "hooks";
import { getPosterSrc, route } from "utils";
import { themeStore } from "stores";
import { ROUTE_NAMES } from "routes";
import styles from "./Popular.module.scss";

export const Popular: React.FC = observer(() => {
  const navigate = useNavigate();

  const {
    movies,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    genres,
  } = useInfinityMovies({ category: "popular", page: 1 });

  return (
    <Page>
      <Page.Title title="Popular" />

      <Page.Content>
        {error && <ErrorMessage title="Error" description={error.message} />}

        {isFetching && !isFetchingNextPage && <Spinner size={5} center />}

        {movies && genres && (
          <>
            <Page.Grid childrenCount={movies.pages[0]?.results.length || 0}>
              {movies.pages.map((page) =>
                page.results.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.original_title}
                    imageSrc={
                      movie.poster_path
                        ? getPosterSrc(movie.poster_path, 342)
                        : null
                    }
                    genres={movie.genre_ids.map(
                      (c) => genres.genres.find((z) => z.id === c)?.name || ""
                    )}
                    rating={movie.vote_average}
                    onClick={() => {
                      navigate(
                        route("movieDetails", {
                          route: { movieId: movie.id },
                          query: {
                            fromPage: ROUTE_NAMES["popular"],
                          },
                        })
                      );
                    }}
                  />
                ))
              )}
            </Page.Grid>

            {hasNextPage && (
              <button
                className={styles.loadMore}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                data-theme={themeStore.theme}
                data-testid="load-more-btn"
              >
                <IconRotate size="35" cursor="pointer" />
                <span>
                  {isFetchingNextPage ? "Loading more..." : "Load More"}
                </span>
              </button>
            )}
          </>
        )}
      </Page.Content>
    </Page>
  );
});
