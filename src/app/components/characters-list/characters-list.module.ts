import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharactersListComponent} from "./characters-list.component";
import {GetDataService} from "../../services/get-data.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PaginatorModule} from "../paginator/paginator.module";
import {RouterLink, RouterModule} from "@angular/router";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";


@NgModule({
  declarations: [CharactersListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    PaginatorModule,
    RouterLink,
    RouterModule.forChild([
      {path: '', component: CharactersListComponent}
    ]),
    MatProgressBarModule,
    FavoriteButtonModule
  ],
  providers: [GetDataService]
})
export class CharactersListModule {
}
