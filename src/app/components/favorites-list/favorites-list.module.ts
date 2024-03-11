import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesListComponent} from "./favorites-list.component";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [FavoritesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: FavoritesListComponent}
    ]),
    MatIconModule
  ]
})
export class FavoritesListModule {
}
