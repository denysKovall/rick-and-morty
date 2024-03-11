import {NgModule} from "@angular/core";
import {AppHeaderComponent} from "./app-header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {SearchModule} from "../search/search.module";
import {RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@NgModule({
  declarations: [AppHeaderComponent],
  exports: [
    AppHeaderComponent
  ],
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        MatInputModule,
        SearchModule,
        RouterLink,
        AsyncPipe
    ]
})
export class AppHeaderModule { }
