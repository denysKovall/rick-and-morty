import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocationCardComponent} from "./location-card.component";
import {RouterLink, RouterModule} from "@angular/router";
import {CarouselModule} from "ngx-owl-carousel-o";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";



@NgModule({
  declarations: [LocationCardComponent],
    imports: [
        CommonModule,
        RouterLink,
        CarouselModule,
        RouterModule.forChild([
            {path: '', component: LocationCardComponent}
        ]),
        MatProgressBarModule,
        FavoriteButtonModule
    ]
})
export class LocationCardModule { }
