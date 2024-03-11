import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "../reducers/favorites.reducer";

export namespace FavoritesSelector {
  export const selectFavoritesState = createFeatureSelector<State>("favorites");
  export const selectFavorites = createSelector(
    selectFavoritesState,
    (state: State) => state.favorites
  );

}
