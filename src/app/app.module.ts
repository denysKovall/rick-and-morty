import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppHeaderModule} from "./components/app-header/app-header.module";
import {GraphQLModule} from './graphql.module';
import {CharactersListModule} from "./components/characters-list/characters-list.module";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./modules/app-routing.module";
import {EpisodesListModule} from "./components/episodes-list/episodes-list.module";
import {LocationsListModule} from "./components/locations-list/locations-list.module";
import {CharacterCardModule} from "./components/character-card/character-card.module";
import {EpisodeCardModule} from "./components/episode-card/episode-card.module";
import {LocationCardModule} from "./components/location-card/location-card.module";
import {HomeComponent} from "./components/home/home.component";
import {FavoritesListModule} from "./components/favorites-list/favorites-list.module";
import {StoreModule} from "@ngrx/store";
import {favoritesReducer} from "./store/reducers/favorites.reducer";
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppHeaderModule,
    GraphQLModule,
    RouterOutlet,
    CharactersListModule,
    EpisodesListModule,
    LocationsListModule,
    CharacterCardModule,
    EpisodeCardModule,
    LocationCardModule,
    FavoritesListModule,
    StoreModule.forRoot({favorites:favoritesReducer}),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
