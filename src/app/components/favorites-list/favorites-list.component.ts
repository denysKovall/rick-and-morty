import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {FavoritesAction} from "../../store/actions/favorites.action";
import {Characters} from "../../models/characters.model";
import {Locations} from "../../models/locations.model";
import {Episodes} from "../../models/episodes.model";
import {FavoritesSelector} from "../../store/selectors/favorites.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent {
  favorites$:  Observable<(Characters | Locations | Episodes)[]> = this.store.select(FavoritesSelector.selectFavorites)

  constructor(private store: Store) {
  }

  removeFromStore(favorites: Characters | Locations | Episodes): void {
    return this.store.dispatch(FavoritesAction.removeFromFavorites({favorites})) // dispatching action to remove item from favorites
  }
}
