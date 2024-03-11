import {createAction, props} from "@ngrx/store";
import {Characters} from "../../models/character.model";
import {Locations} from "../../models/locations.model";
import {Episodes} from "../../models/episodes.model";

export namespace FavoritesAction {
  export const addToFavorites = createAction("ADD_TO_FAVORITES", props<{favorites: Characters | Locations | Episodes}>());
  export const removeFromFavorites = createAction("REMOVE_FROM_FAVORITES", props<{favorites: Characters | Locations | Episodes}>())
}
