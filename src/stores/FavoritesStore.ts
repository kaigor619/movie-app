import { queryClient } from "index";
import { makeAutoObservable } from "mobx";
import { MovieApi, FavoriteMovies } from "api/movieApi";

class FavoritesStore {
  favorites: FavoriteMovies | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setFavorites(favorites: FavoriteMovies) {
    this.favorites = favorites;
  }

  getFavoritesMovies = async () => {
    try {
      const queryState = await queryClient.getQueryState<FavoriteMovies, Error>(
        "favorites"
      );

      if (queryState?.data) {
        this.setFavorites(queryState.data);
        return;
      }

      const data = await queryClient.fetchQuery(
        "favorites",
        MovieApi.getFavorites
      );

      this.setFavorites(data);
    } catch (error) {
      console.log(error);
    }
  };
}

export const favoritesStore = new FavoritesStore();
