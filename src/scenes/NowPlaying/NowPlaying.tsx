import { useNavigate, useParams } from "react-router-dom";
import {
  Spinner,
  Page,
  ErrorMessage,
  Pagination,
  MovieCard,
  EmptyMessage,
} from "components";
import { getPosterSrc, route } from "utils";
import { useMovies } from "hooks";
import { ROUTE_NAMES } from "routes";

export const NowPlaying: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  const activePage = Number(params.page) || 1;

  const { isLoading, error, movies, genres } = useMovies({
    category: "nowPlaying",
    page: activePage,
  });

  return (
    <Page>
      <Page.Title title="Now Playing" />
      <Page.Content>
        {error && <ErrorMessage title="Error" description={error.message} />}

        {isLoading && <Spinner size={5} center />}

        {movies && !movies.results.length && <EmptyMessage />}

        {movies && genres && (
          <>
            <Page.Grid childrenCount={movies.results.length}>
              {movies.results.map((x) => (
                <MovieCard
                  key={x.id}
                  title={x.original_title}
                  imageSrc={
                    x.poster_path ? getPosterSrc(x.poster_path, 342) : null
                  }
                  genres={x.genre_ids.map(
                    (c) => genres.genres.find((z) => z.id === c)?.name || ""
                  )}
                  rating={x.vote_average}
                  onClick={() => {
                    navigate(
                      route("movieDetails", {
                        route: { movieId: x.id },
                        query: {
                          fromPage: ROUTE_NAMES["nowPlaying"],
                        },
                      })
                    );
                  }}
                />
              ))}
            </Page.Grid>

            <Pagination
              totalCount={movies.total_pages}
              activePage={activePage - 1}
              onChangePage={(pageIndex) => {
                const index = pageIndex + 1;
                navigate(route("nowPlaying", { route: { page: index || 1 } }));
              }}
            />
          </>
        )}
      </Page.Content>
    </Page>
  );
};
