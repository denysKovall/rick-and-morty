import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../components/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'characters', loadChildren: () => import('../components/characters-list/characters-list.module').then(m => m.CharactersListModule)},
  {path: 'characters/:id', loadChildren: () => import('../components/character-card/character-card.module').then(m => m.CharacterCardModule)},
  {path: 'episodes', loadChildren: () => import('../components/episodes-list/episodes-list.module').then(m => m.EpisodesListModule)},
  {path: 'episodes/:id', loadChildren: () => import('../components/episode-card/episode-card.module').then(m => m.EpisodeCardModule)},
  {path: 'locations', loadChildren: () => import('../components/locations-list/locations-list.module').then(m => m.LocationsListModule)},
  {path: 'locations/:id', loadChildren: () => import('../components/location-card/location-card.module').then(m => m.LocationCardModule)},
  {path: 'favorites', loadChildren: () => import('../components/favorites-list/favorites-list.module').then(m => m.FavoritesListModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
