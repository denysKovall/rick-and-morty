import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PaginatorModule} from "../paginator/paginator.module";
import {GetDataService} from "../../services/get-data.service";
import {EpisodesListComponent} from "./episodes-list.component";
import {RouterLink, RouterModule} from "@angular/router";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";


@NgModule({
  declarations: [EpisodesListComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        PaginatorModule,
        RouterLink,
        RouterModule.forChild([
            {path: '', component: EpisodesListComponent}
        ]),
        MatProgressBarModule,
        FavoriteButtonModule
    ],
  providers: [GetDataService]
})
export class EpisodesListModule {
}
