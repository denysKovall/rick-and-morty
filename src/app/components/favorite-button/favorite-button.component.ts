import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers/favorites.reducer";
import {FavoritesSelector} from "../../store/selectors/favorites.selector";
import {map, Subject, takeUntil} from "rxjs";
import {Characters} from "../../models/characters.model";
import {Locations} from "../../models/locations.model";
import {Episodes} from "../../models/episodes.model";
import {FavoritesAction} from "../../store/actions/favorites.action";

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit, OnDestroy {
  @Input() item!: Characters | Episodes | Locations;
  private unsubscribe$ = new Subject<void>();
  favorites: string[] = [];

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.store.select(FavoritesSelector.selectFavorites).pipe( //using ngRx selector to select favorites list
      takeUntil(this.unsubscribe$),
      map((favorites: (Characters | Locations | Episodes)[]) => favorites.map(item => item.name)))
      .subscribe(favoritesList => this.favorites = favoritesList);
  }

  checkFavorites(favorites: Characters | Episodes | Locations): void {
    if (this.favorites.includes(favorites.name)) {
     return this.store.dispatch(FavoritesAction.removeFromFavorites({favorites})) // dispatching an action with props to our store, action should remove favorite item from favorites
    }
    return this.store.dispatch(FavoritesAction.addToFavorites({favorites})); // dispatching an action with props to our store, action should add favorite item from favorites
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
