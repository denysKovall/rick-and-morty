import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationsListComponent} from "./locations-list.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PaginatorModule} from "../paginator/paginator.module";
import {RouterLink, RouterModule} from "@angular/router";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";


@NgModule({
  declarations: [LocationsListComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        PaginatorModule,
        RouterLink,
        RouterModule.forChild([
            {path: '', component: LocationsListComponent}
        ]),
        MatProgressBarModule,
        FavoriteButtonModule
    ]
})
export class LocationsListModule {
}
