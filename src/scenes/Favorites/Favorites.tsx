import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useQuery } from "react-query";
import { IconPlus } from "@tabler/icons";
import {
  Page,
  Modal,
  MovieCard,
  Spinner,
  ErrorMessage,
  EmptyMessage,
} from "components";
import { AddNewMovie } from "./components/AddNewMovie";
import { MovieApi, FavoriteMovies } from "api/movieApi";
import { favoritesStore, themeStore } from "stores";
import styles from "./Favorites.module.scss";

export const Favorites: React.FC = observer(() => {
  const [isOpenModal, setOpenModal] = useState(false);

  const {
    data: favorites,
    isLoading,
    error,
  } = useQuery<FavoriteMovies, Error, FavoriteMovies, QueryKeys>(
    "favorites",
    MovieApi.getFavorites,
    {
      enabled: true,
      refetchOnMount: true,
      keepPreviousData: true,
      staleTime: 1000 * 5 * 60,
    }
  );

  useEffect(() => {
    favoritesStore.getFavoritesMovies();
  }, []);

  return (
    <Page>
      <Modal
        open={isOpenModal}
        onClose={() => setOpenModal(false)}
        maxWidth={22}
      >
        <AddNewMovie onClose={() => setOpenModal(false)} />
      </Modal>

      <Page.Title title="Favorites" />

      <Page.Content>
        {error && <ErrorMessage title="Error" description={error.message} />}

        {isLoading && <Spinner size={5} center />}

        {favorites && !favorites.length && <EmptyMessage />}

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

      <div
        className={styles.addNewMovie}
        data-theme={themeStore.theme}
        onClick={() => setOpenModal(true)}
      >
        <IconPlus size="25" />
      </div>
    </Page>
  );
});
