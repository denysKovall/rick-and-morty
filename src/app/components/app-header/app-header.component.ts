import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store/reducers/favorites.reducer";
import {FavoritesSelector} from "../../store/selectors/favorites.selector";
import {map, Observable} from "rxjs";
import {Characters} from "../../models/characters.model";
import {Episodes} from "../../models/episodes.model";
import {Locations} from "../../models/locations.model";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {
  noFavorites$: Observable<boolean> = this.store.select(FavoritesSelector.selectFavorites).pipe(
    map((items: (Characters | Episodes | Locations)[]) => !!items.length)
  );

  constructor(private store: Store<State>) {
  }
}
