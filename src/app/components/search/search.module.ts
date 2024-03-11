import {NgModule} from '@angular/core';
import {SearchComponent} from "./search.component";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [SearchComponent],
  exports: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class SearchModule {
}
