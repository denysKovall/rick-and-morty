import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpisodeCardComponent} from "./episode-card.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import {RouterLink, RouterModule} from "@angular/router";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";



@NgModule({
  declarations: [EpisodeCardComponent],
    imports: [
        CommonModule,
        CarouselModule,
        RouterLink,
        RouterModule.forChild([
            {path: '', component: EpisodeCardComponent}
        ]),
        MatProgressBarModule,
        FavoriteButtonModule
    ]
})
export class EpisodeCardModule {

}
