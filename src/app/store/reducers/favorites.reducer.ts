import {Characters} from "../../models/character.model";
import {Locations} from "../../models/locations.model";
import {Episodes} from "../../models/episodes.model";
import {createReducer, on} from "@ngrx/store";
import {FavoritesAction} from "../actions/favorites.action";

export interface State {
  favorites: (Characters | Locations | Episodes)[];
}

export const initialState: State = {
  favorites: []
}

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesAction.addToFavorites, (state, {favorites}) => ({
    ...state,
    favorites: [...state.favorites, favorites]
  })),
  on(FavoritesAction.removeFromFavorites, (state, {favorites}) => ({
    ...state,
    favorites: state.favorites.filter((i) => i.name !== favorites.name)
  }))
)
