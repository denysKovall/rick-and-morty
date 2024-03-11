import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavoriteButtonComponent} from "./favorite-button.component";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [FavoriteButtonComponent],
  exports: [
    FavoriteButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class FavoriteButtonModule { }
