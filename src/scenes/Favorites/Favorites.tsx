import { useQuery } from "react-query";
import { IconPlus } from "@tabler/icons";
import {
  Page,
  Modal,
  MovieCard,
  Spinner,
  ErrorMessage,
  EmptyMessage,
  Overlay,
  ThemeConsumer,
  Control,
} from "components";
import { useControl } from "hooks/useControl";
import { AddNewMovie } from "./components/AddNewMovie";
import { MovieApi, FavoriteMovies } from "api/movieApi";
import styles from "./Favorites.module.scss";

export const Favorites: React.FC = () => {
  const control = useControl(false);

  const {
    data: favorites,
    isLoading,
    error,
    isFetching,
  } = useQuery<FavoriteMovies, Error, FavoriteMovies, QueryKeys>(
    "favorites",
    MovieApi.getFavorites,
    {
      staleTime: 1000 * 5 * 60,
    }
  );

  return (
    <Page>
      <Control
        control={control}
        render={(isOpenModal) => (
          <Modal
            open={isOpenModal}
            onClose={() => control.set(false)}
            maxWidth={22}
          >
            <AddNewMovie onClose={() => control.set(false)} />
          </Modal>
        )}
      />

      <Page.Title title="Favorites" />

      <Page.Content>
        {error && <ErrorMessage title="Error" description={error.message} />}

        {isLoading && <Spinner size={5} center />}

        {favorites && !favorites.length && <EmptyMessage />}

        {isFetching && !isLoading && <Overlay />}

        {favorites && (
          <Page.Grid className={styles.grid} childrenCount={favorites.length}>
            {favorites.map((x) => (
              <MovieCard
                key={x.id}
                title={x.title}
                imageSrc={URL.createObjectURL(x.file)}
                genres={x.genres}
                rating={x.rating}
              />
            ))}
          </Page.Grid>
        )}
      </Page.Content>

      <ThemeConsumer>
        {(theme) => (
          <button
            className={styles.addNewMovie}
            data-theme={theme}
            onClick={() => control.set(true)}
            data-testid="add-movie"
          >
            <IconPlus size="25" />
          </button>
        )}
      </ThemeConsumer>
    </Page>
  );
};
